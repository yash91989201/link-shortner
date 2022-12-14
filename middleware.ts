import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/r/")) {
    const slug = req.nextUrl.pathname.split("/").pop();
    const slugFetch = await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`);

    if (slugFetch.status === 404) {
      return NextResponse.redirect(req.nextUrl.origin);
    }

    const data = await slugFetch.json();
    if (data?.url) {
      return NextResponse.redirect(data.url);
    }
  }
}

export const config = {
  matcher: "/r/:slug*",
};
