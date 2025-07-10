import { NextResponse, type NextRequest } from "next/server"

const publicRoutes = ["/sign-in", "/sign-up", "/reset-password"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const accessToken = request.cookies.get("access_token")?.value

  if (publicRoutes.some((path) => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  if (!accessToken) {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }

  // try {
  //   // Validate the token by fetching the user's profile
  //   await authenticationApi.authenticationControllerGetProfile({
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`
  //     }
  //   })
  // } catch (error) {
  //   // If the token is invalid, redirect to the sign-in page
  //   const response = NextResponse.redirect(new URL("/sign-in", request.url))
  //   // Clear the invalid token
  //   response.cookies.delete("access_token")
  //   return response
  // }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*.(?:svg|png|jpg|jpeg|gif|webp)$).*)"
  ]
}
