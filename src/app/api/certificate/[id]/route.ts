import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

// Whitelist — only these IDs are valid
const ALLOWED: Record<string, string> = {
    'iso-9001':  'iso-9001.pdf',
    'iso-14001': 'iso-14001.pdf',
    'iso-45001': 'iso-45001.pdf',
    'tse':       'tse.pdf',
};

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    // Reject unknown IDs
    const filename = ALLOWED[id];
    if (!filename) {
        return new NextResponse('Not found', { status: 404 });
    }

    // Referer check — must come from our own site
    const referer = request.headers.get('referer') || '';
    const host = request.headers.get('host') || '';
    if (referer && !referer.includes(host)) {
        return new NextResponse('Forbidden', { status: 403 });
    }

    try {
        const filePath = path.join(process.cwd(), 'private', 'certificates', filename);
        const fileBuffer = await readFile(filePath);

        return new NextResponse(fileBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                // inline = tarayıcıda aç, attachment olursa indirir
                'Content-Disposition': `inline; filename="${filename}"`,
                // Önbelleğe alma — her seferinde server'dan gelsin
                'Cache-Control': 'no-store',
                // MIME sniffing engelle
                'X-Content-Type-Options': 'nosniff',
                // Başka sitelerden iframe ile açılmasın
                'X-Frame-Options': 'SAMEORIGIN',
            },
        });
    } catch {
        return new NextResponse('Not found', { status: 404 });
    }
}
