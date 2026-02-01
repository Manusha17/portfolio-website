import { NextResponse } from 'next/server';
import { generateWebAppManifest } from '@/lib/manifest';

export const dynamic = 'force-static';

export async function GET() {
  try {
    const manifest = generateWebAppManifest();

    return new NextResponse(JSON.stringify(manifest, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/manifest+json',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400', // Cache for 24 hours
      },
    });
  } catch (error) {
    console.error('Error generating manifest:', error);
    return new NextResponse('Error generating manifest', { status: 500 });
  }
}
