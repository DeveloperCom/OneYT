'use client';

import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [type, setType] = useState('video');
  const [quality, setQuality] = useState('highest');
  const [loading, setLoading] = useState(false);

  const handleDownload = () => {
    if (!url) return;
    setLoading(true);

    // Construct the API URL
    const apiUrl = `/api/download?url=${encodeURIComponent(url)}&type=${type}&quality=${quality}`;

    // Trigger download by opening in new tab or setting window location
    // Using window.location.href to trigger download in same tab (browser handles attachment)
    window.location.href = apiUrl;

    // Reset loading state after a short delay (since we can't easily track download progress of a direct link)
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Video Downloader</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option value="video">Video</option>
              <option value="audio">Audio</option>
            </select>
          </div>

          {type === 'video' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quality</label>
              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              >
                <option value="1080p">1080p</option>
                <option value="720p">720p</option>
                <option value="480p">480p</option>
                <option value="360p">360p</option>
                <option value="240p">240p</option>
                <option value="144p">144p</option>
              </select>
            </div>
          )}

          <button
            onClick={handleDownload}
            disabled={!url || loading}
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${!url || loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
              }`}
          >
            {loading ? 'Starting Download...' : 'Download'}
          </button>
        </div>
      </div>
    </div>
  );
}
