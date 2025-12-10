"use client"

import Link from "next/link"
import Image from "next/image"
import { ThemeToggle } from "@/components/ui/ThemeToggle"

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground shadow-lg group-hover:scale-105 transition-transform duration-300">
                            <Image src={'./icon.svg'} alt="" height={60} width={60} />
                            {/* <Youtube className="w-6 h-6 fill-current" /> */}
                        </div>
                        <span className="text-3xl font-bold tracking-tight">One<span className="text-red-500">YT</span></span>
                    </Link>
                </div>

                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link href="/" className="hover:text-primary transition-colors">
                        Home
                    </Link>
                    <Link href="#" className="hover:text-primary transition-colors text-muted-foreground">
                        Features
                    </Link>
                    <Link href="#" className="hover:text-primary transition-colors text-muted-foreground">
                        About
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    <ThemeToggle />
                </div>
            </div>
        </header>
    )
}
