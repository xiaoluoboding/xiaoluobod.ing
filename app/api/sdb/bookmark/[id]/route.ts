import { deleteBookmarkById, updateBookmarkById } from "@/lib/supabase"
import { Bookmark } from "@/lib/types"
import { tryCatchNextResponse } from "@/lib/utils"
import { NextRequest } from "next/server"

export const runtime = "edge"

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params
  const bookmark = (await req.json()) as Bookmark
  return tryCatchNextResponse(async () => {
    await updateBookmarkById(id, bookmark)
  })
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params
  return tryCatchNextResponse(async () => {
    await deleteBookmarkById(id)
  })
}
