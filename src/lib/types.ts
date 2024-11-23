export interface ResponseT {
  title: string
  error: string
  success: boolean
}

export interface TokenDataT {
  email: string
  username: string
  id: string
  isVerified: boolean
}

export type CloudinaryImageResponse = {
  asset_id: string
  public_id: string
  version: number
  version_id: string
  signature: string
  width: number
  height: number
  format: string
  resource_type: string
  created_at: string
  tags: string[]
  bytes: number
  type: string
  etag: string
  placeholder: boolean
  url: string
  secure_url: string
  asset_folder: string
  display_name: string
  original_filename: string
  api_key: string
}

export type CloudinaryVideoResponse = {
  asset_id: string
  public_id: string
  version: number
  version_id: string
  signature: string
  width: number
  height: number
  format: string
  resource_type: string
  created_at: string
  tags: string[]
  pages: number
  bytes: number
  type: string
  etag: string
  placeholder: boolean
  url: string
  secure_url: string
  playback_url: string
  asset_folder: string
  display_name: string
  audio: {
    codec: string
    bit_rate: string
    frequency: number
    channels: number
    channel_layout: string
  }
  video: {
    pix_format: string
    codec: string
    level: number
    profile: string
    bit_rate: string
    dar: string
    time_base: string
  }
  is_audio: boolean
  frame_rate: number
  bit_rate: number
  duration: number
  rotation: number
  original_filename: string
  nb_frames: number
  api_key: string
}

export interface UserT {
  id: string
  name: string
  username: string
  bio: string
  profilePic: {
    imageUrl: string
    publicId: string
  }
  followers: number
  following: number
  posts: number
  isMe: boolean
  isFollowing: boolean
  about: {
    email: string
    phone: string
    mapPin: string
    instagram: string
    twitter: string
    github: string
    linkedin: string
    website: string
    dob: string
  }
}
export interface PostT {
  _id: string
  author: {
    name: string
    username: string
    profilePic: {
      imageUrl: string
      publicId: string
    }
  }
  userId: string
  text: string
  postImages: {
    publicId: string
    imageUrl: string
    _id: string
  }[]
  visibility: string
  likes: number
  comments: number
  createdAt: Date
  updatedAt: Date
  // __v: number
  isLiked: boolean
  isMine?: boolean
  color:
    | 'slate'
    | 'stone'
    | 'red'
    | 'orange'
    | 'amber'
    | 'yellow'
    | 'lime'
    | 'green'
    | 'emerald'
    | 'teal'
    | 'cyan'
    | 'sky'
    | 'blue'
    | 'indigo'
    | 'violet'
    | 'purple'
    | 'pink'
    | 'fuchsia'
}

export interface CommentT {
  _id: string
  userId: string
  postId: string
  content: string
  likes: number
  comments: number
  createdAt: Date
  user: {
    _id: string
    name: string
    username: string
    profilePic: {
      imageUrl: string
      publicId: string
    }
  }
  isLiked: boolean
}

export interface CommentReplaysT {
  _id: string
  userId: string
  commentId: string
  content: string
  likes: number
  createdAt: Date
  user: {
    _id: string
    name: string
    username: string
    profilePic: {
      imageUrl: string
      publicId: string
    }
  }
  isLiked: boolean
}
export interface PeopleT {
  _id: string
  status: string
  isFollowing: boolean
  isMe: boolean
  details: {
    _id: string
    name: string
    username: string
    profilePic: {
      imageUrl: string
      publicId: string
    }
    bio: string
  }
}

// interface CommentT {
//   _id: string
//   userId: {
//     profilePic: { imageUrl: string; publicId: string }
//     _id: string
//     name: string
//     username: string
//   }
//   postId: string
//   content: string
//   likes: number
//   isLiked: boolean
//   comments: number
//   createdAt: Date
//   updatedAt: Date
//   __v: number
// }
