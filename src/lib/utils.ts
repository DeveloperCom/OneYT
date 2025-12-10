import type { NextRequest } from "next/server";
export const getSafeVideoURL = (id: string) => `https://www.youtube.com/watch?v=${id}`

export function getRealIP(req: NextRequest) {
    const xRealIp = req.headers.get("x-real-ip");
    if (xRealIp) return xRealIp;

    const xff = req.headers.get("x-forwarded-for");
    if (xff) return xff.split(",")[0].trim();

    // Node.js only — not available in edge
    // @ts-ignore
    return req.socket?.remoteAddress ?? "unknown";
}
