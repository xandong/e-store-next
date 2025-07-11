// src/utils/supabase/middleware.ts

import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"
import { getSupabaseEnvironment } from "./common"
import {
  authRoutes,
  privateRoutes,
  publicRoutes,
  signInPath
} from "../../utils/routes"

export async function updateSession(request: NextRequest) {
  const supabaseResponse = NextResponse.next({
    request
  })
  const { NEXT_PUBLIC_SUPABASE_ANON_KEY, NEXT_PUBLIC_SUPABASE_URL } =
    getSupabaseEnvironment()

  const supabase = createServerClient(
    NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          } catch (err) {
            console.error("Error when set all cookies: " + JSON.stringify(err))
          }
        }
      }
    }
  )

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (
    !user &&
    !authRoutes.some((authR) => request.nextUrl.pathname.startsWith(authR)) &&
    !publicRoutes.some((publicR) =>
      request.nextUrl.pathname.startsWith(publicR)
    ) &&
    privateRoutes.some((privateR) =>
      request.nextUrl.pathname.startsWith(privateR)
    )
  ) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone()
    url.pathname = signInPath
    return NextResponse.redirect(url)
  }

  if (user && authRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse
}
