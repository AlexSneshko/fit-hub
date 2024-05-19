import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/:id", "/gym/:id", "/posts/:id", "/create", "/gym/create", "/api/uploadthing"],
  async afterAuth(auth, req) {
    const fitLine = new URL("/fitline", req.url);

    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url })
    }

    
    // if (auth.userId && (req.nextUrl.pathname === "/")) {
    //   return NextResponse.redirect(fitLine)
    // }

    //const selectType = new URL("/select-type", req.url)

    // if (!auth.userId && !auth.isPublicRoute && (req.nextUrl.pathname !== "/sign-in" && req.nextUrl.pathname !== "/sign-up")) {
    //   return NextResponse.redirect(fitLine)
    // }
  }
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};