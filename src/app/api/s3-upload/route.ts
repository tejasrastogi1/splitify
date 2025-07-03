import { NextRequest, NextResponse } from 'next/server'

// S3 upload is disabled in production
// To enable S3 uploads, configure the required environment variables
export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: 'S3 upload not configured' },
    { status: 404 }
  )
}