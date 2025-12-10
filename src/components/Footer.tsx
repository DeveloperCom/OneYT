export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t bg-background md:py-0">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    © {currentYear} OneYT. Built with ❤️
                </p>
                <div className="flex items-center gap-3 flex-wrap justify-center">
                    {/* <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors">
                        Privacy
                    </a>
                    <span className="text-gray-400 dark:text-gray-600">•</span>
                    <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors">
                        Terms
                    </a>
                    <span className="text-gray-400 dark:text-gray-600">•</span>
                    <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors">
                        Support
                    </a> */}
                </div>
            </div>
        </footer>
    );
}
