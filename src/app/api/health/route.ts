import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'API is working correctly',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    apiVersion: '1.0.0'
  });
}

export async function POST() {
  return NextResponse.json({
    status: 'ok',
    message: 'POST API is working correctly',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    apiVersion: '1.0.0'
  });
}
