import { NextRequest } from "next/server"

import { fetchBookmarkList } from "@/lib/supabase"
import { Bookmark } from "@/lib/types"
import { tryCatchNextResponse } from "@/lib/utils"

export const runtime = "edge"

export async function GET(req: NextRequest) {
  return tryCatchNextResponse<Bookmark[]>(async () => {
    const res = await fetchBookmarkList()
    return res
  })
}
