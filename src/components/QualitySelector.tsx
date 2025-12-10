'use client';

import { useState } from 'react';
import { Volume2, Youtube } from 'lucide-react';


interface QualitySelectorProps {
    formats: (VideoFormat | AudioFormat)[];
    downloadType: 'video' | 'audio';
    onDownload: (token: string) => void;
    isDownloading?: boolean;
}

export function QualitySelector({ formats, downloadType, onDownload, isDownloading = false }: QualitySelectorProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleDownload = () => {
        const selectedFormat = formats[selectedIndex];
        if (selectedFormat) {
            onDownload(selectedFormat.token);
        }
    };

    return (
        <div className="animate-in fade-in duration-300">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Select {downloadType === 'video' ? 'Video Quality' : 'Audio Quality'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                {formats.map((format, index) => {
                    const isVideo = 'resolution' in format;
                    const isSelected = selectedIndex === index;

                    return (
                        <button
                            key={index}
                            className={`relative flex flex-col gap-2 p-4 rounded-xl border-2 transition-all duration-200 min-h-11 text-left
                ${isSelected
                                    ? 'border-red-600 dark:border-red-500 bg-red-50 dark:bg-red-950/30 shadow-md'
                                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-red-600 dark:hover:border-red-500 hover:-translate-y-1 hover:shadow-md'
                                }`}
                            onClick={() => setSelectedIndex(index)}
                        >
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-lg  text-gray-900 dark:text-white relative pt-1.5 pr-3">
                                    <span>{isVideo ? format.quality : format.qualityHuman}</span>
                                    {
                                        isVideo && format.qualityHuman && (
                                            <div className='text-center px-0.5 min-w-4 py-0.5 bg-red-600 text-white rounded text-[8px] font-medium absolute top-0 right-0'>
                                                {format.qualityHuman}
                                            </div>
                                        )
                                    }
                                </span>
                                <span className="flex items-center text-center gap-1 px-2 py-1 bg-green-500 text-white rounded text-xs font-medium">
                                    {isVideo ? <Youtube size={13} /> : <Volume2 size={13} />}
                                    {isVideo ? 'Video' : 'Audio'}
                                </span>
                            </div>

                            <div className="flex items-center gap-3 flex-wrap text-sm text-gray-600 dark:text-gray-400">
                                {isVideo && (
                                    <span>
                                        {(format as VideoFormat).resolution}
                                    </span>
                                )}
                                <span className="font-medium">
                                    {format.filesizeHuman}
                                </span>
                            </div>

                            {isSelected && (
                                <div className="absolute top-2 right-2 animate-in zoom-in duration-200">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <circle cx="10" cy="10" r="10" fill="#dc2626" className="dark:fill-red-500" />
                                        <path
                                            d="M6 10L9 13L14 7"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            <button
                className="flex items-center justify-center gap-2 w-full py-4 px-6 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded-xl font-semibold text-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 min-h-[54px]"
                onClick={handleDownload}
                disabled={isDownloading}
            >
                {isDownloading ? (
                    <>
                        <svg className="animate-spin" width="20" height="20" viewBox="0 0 20 20">
                            <circle
                                cx="10"
                                cy="10"
                                r="8"
                                stroke="currentColor"
                                strokeWidth="3"
                                fill="none"
                                strokeDasharray="40"
                                strokeDashoffset="10"
                            />
                        </svg>
                        Starting Download...
                    </>
                ) : (
                    <>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path
                                d="M10 3V13M10 13L6 9M10 13L14 9"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M3 17H17"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                        Download
                    </>
                )}
            </button>
        </div>
    );
}
