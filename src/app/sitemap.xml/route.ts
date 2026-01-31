import { NextResponse } from 'next/server';
import { generateSitemapEntries, generateSitemapXML } from '@/lib/sitemap';

export const dynamic = 'force-static';

export async function GET() {
  try {
    const entries = generateSitemapEntries();
    const sitemapXML = generateSitemapXML(entries);

    return new NextResponse(sitemapXML, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400', // Cache for 24 hours
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}
