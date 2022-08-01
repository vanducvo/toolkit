import * as core from '@actions/core'

/**
 * Options to control cache upload
 */
export interface UploadOptions {
  /**
   * Number of parallel cache upload
   *
   * @default 4
   */
  uploadConcurrency?: number
  /**
   * Maximum chunk size in bytes for cache upload
   *
   * @default 32MB
   */
  uploadChunkSize?: number

  useS3Sdk?: boolean

  s3EndPoint?: string

  s3AccessKey?: string

  s3SecretKey?: string

  s3Region?: string

  s3Bucket?: string
}

/**
 * Options to control cache download
 */
export interface DownloadOptions {
  /**
   * Indicates whether to use the Azure Blob SDK to download caches
   * that are stored on Azure Blob Storage to improve reliability and
   * performance
   *
   * @default true
   */
  useAzureSdk?: boolean

  useS3Sdk?: boolean

  s3EndPoint?: string

  s3AccessKey?: string

  s3SecretKey?: string

  s3Region?: string

  s3Bucket?: string

  /**
   * Number of parallel downloads (this option only applies when using
   * the Azure SDK)
   *
   * @default 8
   */
  downloadConcurrency?: number

  /**
   * Maximum time for each download request, in milliseconds (this
   * option only applies when using the Azure SDK)
   *
   * @default 30000
   */
  timeoutInMs?: number
}

/**
 * Returns a copy of the upload options with defaults filled in.
 *
 * @param copy the original upload options
 */
export function getUploadOptions(copy?: UploadOptions): UploadOptions {
  const result: UploadOptions = {
    uploadConcurrency: 4,
    uploadChunkSize: 32 * 1024 * 1024
  }

  if (copy) {
    if (typeof copy.useS3Sdk === 'boolean') {
      result.useS3Sdk = copy.useS3Sdk
    }

    if (typeof copy.uploadConcurrency === 'number') {
      result.uploadConcurrency = copy.uploadConcurrency
    }

    if (typeof copy.uploadChunkSize === 'number') {
      result.uploadChunkSize = copy.uploadChunkSize
    }

    if (typeof copy.s3SecretKey == 'string'){
      result.s3SecretKey = copy.s3SecretKey
    }

    if (typeof copy.s3AccessKey == 'string'){
      result.s3AccessKey = copy.s3AccessKey
    }

    if (typeof copy.s3EndPoint == 'string'){
      result.s3EndPoint = copy.s3EndPoint
    }

    if (typeof copy.s3Region == 'string'){
      result.s3Region = copy.s3Region
    }
    if (typeof copy.s3Bucket == 'string'){
      result.s3Bucket = copy.s3Bucket
    }
  }

  core.debug(`Use S3 SDK: ${result.useS3Sdk}`)
  core.debug(`Upload concurrency: ${result.uploadConcurrency}`)
  core.debug(`Upload chunk size: ${result.uploadChunkSize}`)

  return result
}

/**
 * Returns a copy of the download options with defaults filled in.
 *
 * @param copy the original download options
 */
export function getDownloadOptions(copy?: DownloadOptions): DownloadOptions {
  const result: DownloadOptions = {
    useAzureSdk: true,
    useS3Sdk: false,
    downloadConcurrency: 8,
    timeoutInMs: 30000
  }

  if (copy) {
    if (typeof copy.useAzureSdk === 'boolean') {
      result.useAzureSdk = copy.useAzureSdk
    }

    if (typeof copy.useS3Sdk === 'boolean') {
      result.useS3Sdk = copy.useS3Sdk
    }

    if (typeof copy.downloadConcurrency === 'number') {
      result.downloadConcurrency = copy.downloadConcurrency
    }

    if (typeof copy.timeoutInMs === 'number') {
      result.timeoutInMs = copy.timeoutInMs
    }

    if (typeof copy.s3SecretKey == 'string'){
      result.s3SecretKey = copy.s3SecretKey
    }

    if (typeof copy.s3AccessKey == 'string'){
      result.s3AccessKey = copy.s3AccessKey
    }

    if (typeof copy.s3EndPoint == 'string'){
      result.s3EndPoint = copy.s3EndPoint
    }

    if (typeof copy.s3Region == 'string'){
      result.s3Region = copy.s3Region
    }
    if (typeof copy.s3Bucket == 'string'){
      result.s3Bucket = copy.s3Bucket
    }
  }

  core.debug(`Use Azure SDK: ${result.useAzureSdk}`)
  core.debug(`Use S3 SDK: ${result.useS3Sdk}`)
  core.debug(`Download concurrency: ${result.downloadConcurrency}`)
  core.debug(`Request timeout (ms): ${result.timeoutInMs}`)

  return result
}
