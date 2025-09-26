import { connect } from '@/dbConfig/dbConfig'
import { initializeBloomFilter } from '@/helpers/checkUsername'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function POST(request: NextRequest) {
  try {
    await initializeBloomFilter()

    return NextResponse.json(
      {
        message: 'Bloom filter initialized successfully',
        success: true,
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error('Error initializing bloom filter:', error)
    return NextResponse.json(
      {
        message: 'Failed to initialize bloom filter',
        error: error.message,
        success: false,
      },
      { status: 500 },
    )
  }
}
