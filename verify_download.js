const http = require('http');
const fs = require('fs');

const videoUrl = 'https://www.youtube.com/watch?v=5cRaQqQb14Q';

function download(type, quality, filename) {
    const apiUrl = `http://localhost:3000/api/download?url=${videoUrl}&type=${type}&quality=${quality}`;
    const file = fs.createWriteStream(filename);

    console.log(`Testing download: Type=${type}, Quality=${quality}...`);

    http.get(apiUrl, (response) => {
        console.log(`[${type}-${quality}] Status Code:`, response.statusCode);
        console.log(`[${type}-${quality}] Headers:`, response.headers);

        if (response.statusCode !== 200) {
            console.error(`[${type}-${quality}] Failed to download`);
            response.resume();
            return;
        }

        let downloadedBytes = 0;
        response.on('data', (chunk) => {
            downloadedBytes += chunk.length;
            file.write(chunk);
            if (downloadedBytes > 1024 * 1024) { // 1MB
                console.log(`[${type}-${quality}] Downloaded 1MB, stopping verification...`);
                response.destroy();
                file.end();
            }
        });

        file.on('finish', () => {
            file.close();
            console.log(`[${type}-${quality}] Verification completed.`);
            try {
                const stats = fs.statSync(filename);
                console.log(`[${type}-${quality}] File size:`, stats.size, 'bytes');
            } catch (e) { }
        });
    }).on('error', (err) => {
        if (err.message === 'socket hang up') {
            console.log(`[${type}-${quality}] Download aborted as expected.`);
        } else {
            console.error(`[${type}-${quality}] Error:`, err.message);
        }
    });
}

// Test Video (720p)
download('video', '720p', 'video_720p.mp4');

// Test Audio (Highest)
setTimeout(() => {
    download('audio', 'highest', 'audio_highest.mp3');
}, 5000);

// Test Audio (Lowest)
setTimeout(() => {
    download('audio', '9', 'audio_lowest.mp3');
}, 10000);
