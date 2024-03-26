import { createClient } from "@supabase/supabase-js"

import { Bookmark } from "./types"

export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || ""
)

export const createBookmark = async (bookmark: Bookmark) => {
  const { error } = await supabaseAdmin
    .from("bookmark")
    .insert([bookmark])
    .select()
  if (error) {
    console.log(error.message)
  }
}

export const fetchBookmarkList = async (): Promise<Bookmark[]> => {
  const { data: bookmarkList, error } = await supabaseAdmin
    .from("bookmark")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.log(error.message)
  }

  return (bookmarkList as Bookmark[]) || []
}

export const updateBookmarkById = async (id: string, bookmark: Bookmark) => {
  const { error } = await supabaseAdmin
    .from("bookmark")
    .update(bookmark)
    .eq("id", id)
  if (error) {
    console.log(error.message)
  }
}

export const deleteBookmarkById = async (id: string) => {
  const { error } = await supabaseAdmin.from("bookmark").delete().eq("id", id)
  if (error) {
    console.log(error.message)
  }
}
