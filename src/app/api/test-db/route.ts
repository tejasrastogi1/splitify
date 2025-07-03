import { NextResponse } from 'next/server'
import { p as prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect()
    
    // Test if tables exist
    const tableCheck = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('Group', 'Participant', 'Category')
    `
    
    await prisma.$disconnect()
    
    return NextResponse.json({
      status: 'success',
      message: 'Database connection successful',
      tables: tableCheck
    })
  } catch (error) {
    console.error('Database test failed:', error)
    return NextResponse.json({
      status: 'error',
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
