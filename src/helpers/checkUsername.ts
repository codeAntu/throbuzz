import redis from '@/dbConfig/redis'
import User from '@/models/userModel'
import { BloomFilter } from 'bloom-filters'

const BLOOM_FILTER_KEY = 'usernames_bloom_filter'

async function checkUsernameInDatabase(username: string) {
  try {
    const user = await User.findOne({ username })
    return !!user
  } catch (error) {
    console.error('Error checking username in database:', error)
    return false
  }
}

async function checkUsernameExists(username: string) {
  try {
    const serializedFilter = await redis.get(BLOOM_FILTER_KEY)
    if (!serializedFilter) return await checkUsernameInDatabase(username)

    const bits = typeof serializedFilter === 'string' ? JSON.parse(serializedFilter) : serializedFilter
    const bloom = BloomFilter.fromJSON(bits)

    if (!bloom.has(username)) return false

    return await checkUsernameInDatabase(username)
  } catch (error) {
    console.error('Error checking username existence:', error)
    return await checkUsernameInDatabase(username)
  }
}

async function addUsernameToBloomFilter(username: string) {
  try {
    let serializedFilter = await redis.get<string>(BLOOM_FILTER_KEY)
    let bloom: BloomFilter

    if (!serializedFilter) {
      bloom = new BloomFilter(1000, 7)
    } else {
      const bits = typeof serializedFilter === 'string' ? JSON.parse(serializedFilter) : serializedFilter
      bloom = BloomFilter.fromJSON(bits)
    }

    bloom.add(username)
    await redis.set('usernames_bloom_filter', JSON.stringify(bloom.saveAsJSON()))
  } catch (error) {
    console.error('Error adding username to bloom filter:', error)
  }
}

async function initializeBloomFilter() {
  try {
    await redis.del(BLOOM_FILTER_KEY)

    const bloom = new BloomFilter(1000, 7)

    const users = await User.find({}, { username: 1 }).lean()

    users.forEach((user) => {
      if (user.username) {
        bloom.add(user.username)
      }
    })

    await redis.set(BLOOM_FILTER_KEY, JSON.stringify(bloom.saveAsJSON()))
    console.log('Bloom filter cleared and reinitialized successfully')
  } catch (error) {
    console.error('Error clearing and reinitializing bloom filter:', error)
  }
}

export { addUsernameToBloomFilter, checkUsernameExists, checkUsernameInDatabase, initializeBloomFilter }
