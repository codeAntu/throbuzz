import { Document, Schema } from 'mongoose'

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
