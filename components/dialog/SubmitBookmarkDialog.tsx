"use client"

import { useState } from "react"
import { SendIcon } from "lucide-react"

import {
  XDialog,
  XDialogContent,
  XDialogDescription,
  XDialogHeader,
  XDialogTitle,
  XDialogTrigger,
} from "@/components/ui/XDialog"
import { XButton } from "@/components/ui/XButton"
import { Bookmark } from "@/lib/types"
import { InsertBookmarkForm } from "@/app/bookmarks/modules/InsertBookmarkForm"

interface IProps {
  bookmarks: Bookmark[]
  currentBookmark: Bookmark
}

export const SubmitBookmarkDialog = ({
  bookmarks,
  currentBookmark,
}: IProps) => {
  const [open, setOpen] = useState(false)

  return (
    <XDialog open={open} onOpenChange={setOpen}>
      <XDialogTrigger asChild>
        <XButton size="sm" className="relative">
          <SendIcon size={16} className="mr-2" />
          Submit
          <span className="absolute -right-1 -top-1 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-500"></span>
          </span>
        </XButton>
      </XDialogTrigger>
      <XDialogContent>
        <XDialogHeader>
          <XDialogTitle>Submit a bookmark</XDialogTitle>
          <XDialogDescription>
            Send me a website you like and if I like it too, you&apos;ll see it
            in the bookmarks list. With respect, please do not submit more than
            5 websites a day.
          </XDialogDescription>
        </XDialogHeader>
        <InsertBookmarkForm
          setDialogOpen={setOpen}
          bookmarks={bookmarks}
          currentBookmark={currentBookmark}
        />
      </XDialogContent>
    </XDialog>
  )
}
