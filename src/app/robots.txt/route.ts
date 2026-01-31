import { NextResponse } from 'next/server';
import { generateRobotsTxt } from '@/lib/sitemap';

export const dynamic = 'force-static';

export async function GET() {
  try {
    const robotsTxt = generateRobotsTxt();

    return new NextResponse(robotsTxt, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400', // Cache for 24 hours
      },
    });
  } catch (error) {
    console.error('Error generating robots.txt:', error);
    return new NextResponse('Error generating robots.txt', { status: 500 });
  }
}
