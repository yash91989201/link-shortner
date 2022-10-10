import { NextRequest, NextResponse, NextFetchEvent } from "next/server";

export default async function middleware(req: NextRequest, res: NextResponse, event: NextFetchEvent) {
    if (req.nextUrl.pathname.startsWith("/api/get-url")) {
        console.log("returning early");
        return
    }

}