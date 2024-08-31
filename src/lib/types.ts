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

export type CloudinaryResponse = {
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
