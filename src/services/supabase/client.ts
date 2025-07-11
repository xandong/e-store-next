// src/utils/supabase/client.ts

import { createBrowserClient } from "@supabase/ssr"
import { getSupabaseEnvironment } from "./common"

export function createClient() {
  const { NEXT_PUBLIC_SUPABASE_ANON_KEY, NEXT_PUBLIC_SUPABASE_URL } =
    getSupabaseEnvironment()

  return createBrowserClient(
    NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}
