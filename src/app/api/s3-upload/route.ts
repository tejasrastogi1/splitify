import { randomId } from '@/lib/api'
import { POST as route } from 'next-s3-upload/route'

// Check if S3 upload is enabled via environment variables
const isS3Enabled = !!(
  process.env.S3_UPLOAD_KEY &&
  process.env.S3_UPLOAD_SECRET &&
  process.env.S3_UPLOAD_BUCKET &&
  process.env.S3_UPLOAD_REGION &&
  process.env.NEXT_PUBLIC_ENABLE_EXPENSE_DOCUMENTS === 'true'
)

// Configure S3 upload or return 404 if not enabled
export const POST = isS3Enabled 
  ? route.configure({
      key(req, filename) {
        const [, extension] = filename.match(/(\.[^\.]*)$/) ?? [null, '']
        const timestamp = new Date().toISOString()
        const random = randomId()
        return `document-${timestamp}-${random}${extension.toLowerCase()}`
      },
      endpoint: process.env.S3_UPLOAD_ENDPOINT,
      // forcing path style is only necessary for providers other than AWS
      forcePathStyle: !!process.env.S3_UPLOAD_ENDPOINT,
    })
  : async () => {
      return new Response('S3 upload not configured', { status: 404 })
    }
