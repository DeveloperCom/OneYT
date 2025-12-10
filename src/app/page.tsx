'use client';

import { useState } from 'react';
import { VideoInfoCard } from '@/components/VideoInfoCard';
import { QualitySelector } from '@/components/QualitySelector';
import { BadgeAlert, ChevronLeft, LoaderCircle, Volume2, Youtube } from 'lucide-react';

type DownloadType = 'video' | 'audio';

interface VideoInfo {
  title: string;
  duration: number;
  durationHuman: string;
  thumbnail: string;
  uploader: string;
  videoFormats: VideoFormat[];
  audioFormats: AudioFormat[];
}

export default function Home() {
  const [url, setUrl] = useState('');
  const [downloadType, setDownloadType] = useState<DownloadType>('video');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // Extract video ID from URL
  const extractVideoId = (inputUrl: string): string | null => {
    try {
      const urlObj = new URL(inputUrl);

      // YouTube
      if (urlObj.hostname.includes('youtube.com')) {
        return urlObj.searchParams.get('v');
      }
      if (urlObj.hostname.includes('youtu.be')) {
        return urlObj.pathname.slice(1);
      }

      // For other platforms, return the full URL
      return inputUrl;
    } catch {
      return null;
    }
  };

  const handleGetInfo = async () => {
    if (!url.trim()) {
      setError('Please enter a video URL');
      return;
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      setError('Invalid URL format');
      return;
    }

    setLoading(true);
    setError('');
    setVideoInfo(null);

    try {
      const response = await fetch(`/api/info?id=${encodeURIComponent(videoId)}&downloadType=${downloadType}`);
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || data.details || 'Failed to fetch video information');
      }

      setVideoInfo(data.info);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (token: string) => {
    setIsDownloading(true);

    // Trigger download using token
    window.location.href = `/api/download?token=${encodeURIComponent(token)}`;

    // Reset downloading state after delay
    setTimeout(() => {
      setIsDownloading(false);
    }, 2000);
  };

  const handleReset = () => {
    setUrl('');
    setVideoInfo(null);
    setError('');
  };

  return (
    <div className="w-full max-w-2xl space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="max-w-3xl mx-auto">
        {!videoInfo ? (
          <div className="text-center">
            <div className="text-center space-y-4 mb-3">
              <h1 className="text-5xl font-extrabold tracking-tight lg:text-7xl">
                <span className="text-foreground">One</span>
                <span className="text-primary">YT</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                The ultimate YouTube downloader. Simple, fast, and beautiful.
              </p>
            </div>

            {/* Clean Minimal Container - Matching Mockup */}
            <div className="rounded-3xl border border-border/40 bg-card shadow-lg p-8 space-y-6">
              <div className="space-y-6">
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-foreground mb-2 text-left">
                    Video URL
                  </label>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleGetInfo()}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-4 py-4 text-base bg-background/80 text-foreground border border-border rounded-xl transition-all duration-200 focus:outline-none focus:border-primary focus:border-2 disabled:opacity-60 disabled:cursor-not-allowed placeholder:text-muted-foreground/60 min-h-[54px] hover:border-border/80"
                    disabled={loading}
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-foreground mb-2 text-left">
                    Download Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label
                      className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 font-medium min-h-[54px] hover:scale-[1.02]
                      ${downloadType === 'video'
                          ? 'border-primary text-primary'
                          : 'border-border bg-background text-foreground hover:border-primary/50'
                        }`}
                    >
                      <input
                        type="radio"
                        value="video"
                        checked={downloadType === 'video'}
                        onChange={(e) => setDownloadType(e.target.value as DownloadType)}
                        className="sr-only"
                        disabled={loading}
                      />
                      <Youtube className="w-5 h-5" />
                      <span>Video</span>
                    </label>

                    <label
                      className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 font-medium min-h-[54px] hover:scale-[1.02]
                      ${downloadType === 'audio'
                          ? 'border-primary text-primary'
                          : 'border-border bg-background text-foreground hover:border-primary/50'
                        }`}
                    >
                      <input
                        type="radio"
                        value="audio"
                        checked={downloadType === 'audio'}
                        onChange={(e) => setDownloadType(e.target.value as DownloadType)}
                        className="sr-only"
                        disabled={loading}
                      />
                      <Volume2 className="w-5 h-5" />
                      <span>Audio</span>
                    </label>
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-3 mb-4 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-500 rounded-xl text-sm animate-in slide-in-from-left duration-300">
                    <BadgeAlert />
                    {error}
                  </div>
                )}

                <button
                  onClick={handleGetInfo}
                  disabled={loading || !url.trim()}
                  className="flex items-center justify-center gap-2 w-full py-4 px-6 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded-xl font-semibold text-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 min-h-[54px]"
                >
                  {loading ? (
                    <>
                      <LoaderCircle className="animate-spin" size={20} />
                      Fetching Info...
                    </>
                  ) : (
                    <>
                      Download
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in duration-300">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 py-2 px-4 mb-6 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-xl font-medium transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:-translate-x-1"
            >
              <ChevronLeft size={18} />
              Back
            </button>

            <div className="flex flex-col gap-6">
              <VideoInfoCard
                title={videoInfo.title}
                thumbnail={videoInfo.thumbnail}
                uploader={videoInfo.uploader}
                durationHuman={videoInfo.durationHuman}
              />

              <QualitySelector
                formats={downloadType === 'video' ? videoInfo.videoFormats : videoInfo.audioFormats}
                downloadType={downloadType}
                onDownload={handleDownload}
                isDownloading={isDownloading}
              />
            </div>
          </div>
        )}
      </div>
    </div >
  );
}
