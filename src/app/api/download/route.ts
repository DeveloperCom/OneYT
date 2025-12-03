import { NextRequest, NextResponse } from 'next/server';
import { YtDlp } from 'ytdlp-nodejs';
import { PassThrough, Readable } from 'stream';

type Quality = '144p' | '240p' | '360p' | '720p' | '1080p' | '1440p' | '2160p'
const types: ('video' | 'audio')[] = ['video', 'audio']
const qualitys: Quality[] = ['144p', '240p', '360p', '720p', '1080p', '1440p', '2160p']

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const url = searchParams.get('url');
    const type = searchParams.get('type');
    const quality = searchParams.get('quality');
    const title = 'klk'

    if (!url) {
        return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }
    if (type !== 'audio' && type !== 'video') {
        return NextResponse.json({ error: 'Please provide valid type' }, { status: 400 });
    }
    if (type === 'video') {
        if (!quality) {
            return NextResponse.json({ error: 'quality is required' }, { status: 400 });
        }
        if (!qualitys.includes(quality as Quality)) {
            return NextResponse.json({ error: 'Please provide valid video quality' }, { status: 400 });
        }
    }

    const ytdlp = new YtDlp();

    // Ensure FFmpeg is available (might take time on first run)
    // In a production app, this should be done during build or startup
    try {
        await ytdlp.downloadFFmpeg();
    } catch (error) {
        console.error('Failed to download FFmpeg:', error);
        // Continue, as it might already be there or not needed for some formats
    }

    try {
        // Create a PassThrough stream to act as the bridge
        const stream = new PassThrough();

        let formatOptions: { filter: 'mergevideo' | 'audioonly', quality?: Quality | 0, type: any } = {
            filter: 'mergevideo',
            quality: '360p',
            type: 'mp4'
        };

        if (type === 'audio') {
            // Audio quality: 0 is best, 10 is worst. Default to 0 (highest).
            // If user passes 'highest', map to 0.

            formatOptions = {
                filter: 'audioonly',
                // quality: 0,
                type: 'mp3'
            };
        } else {
            // Video
            formatOptions = {
                filter: 'mergevideo',
                quality: quality as Quality,
                type: 'mp4'
            };
        }

        // Use the stream method from ytdlp-nodejs
        // It returns an object with a pipe method
        const ytdlpStream = ytdlp.stream(url, {
            format: formatOptions,
        });

        ytdlpStream.pipe(stream);

        // Convert Node.js Readable stream to Web ReadableStream
        // @ts-ignore - Readable.toWeb is available in recent Node.js versions
        const webStream = Readable.toWeb(stream);

        const filename = type === 'audio' ? `${title}_audio` : `${title}_video(${quality})`;
        const contentType = type === 'audio' ? 'audio/mpeg' : 'video/mp4';

        return new Response(webStream as any, {
            headers: {
                'Content-Type': contentType,
                'Content-Disposition': `attachment; filename="${filename}"`,
            },
        });
    } catch (error) {
        console.error('Error streaming video:', error);
        return NextResponse.json({ error: 'Failed to stream video' }, { status: 500 });
    }
}
