import { UserRound } from 'lucide-react';
import Image from 'next/image';

interface VideoInfoCardProps {
    title: string;
    thumbnail: string;
    uploader: string;
    durationHuman: string;
}

export function VideoInfoCard({ title, thumbnail, uploader, durationHuman }: VideoInfoCardProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg animate-in zoom-in duration-300">
            <div className="relative w-full aspect-video bg-gray-100 dark:bg-gray-900 overflow-hidden group">
                <Image
                    src={thumbnail}
                    alt={title}
                    width={480}
                    height={270}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                />
                <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-semibold backdrop-blur-sm">
                    {durationHuman}
                </div>
            </div>
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight">
                    {title}
                </h2>
                <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <UserRound />
                    {uploader}
                </p>
            </div>
        </div>
    );
}
