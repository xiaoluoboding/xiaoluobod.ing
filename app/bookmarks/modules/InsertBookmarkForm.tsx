"use client"

import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { AnimatePresence, motion } from "framer-motion"
import dayjs from "dayjs"
import { nanoid } from "nanoid"
import { useState } from "react"
import { pick } from "lodash-es"

import { XButton } from "@/components/ui/XButton"
import {
  XForm,
  XFormControl,
  XFormField,
  XFormItem,
  XFormLabel,
  XFormDescription,
  XFormMessage,
} from "@/components/ui/XForm"
import {
  XSelect,
  XSelectContent,
  XSelectItem,
  XSelectTrigger,
  XSelectValue,
} from "@/components/ui/XSelect"
import { XInput } from "@/components/ui/XInput"
import { cn } from "@/lib/utils"
import { Bookmark } from "@/lib/types"
import { useBookmarkStore } from "@/store/bookmark"

const formSchema = z.object({
  link: z.string().url({
    message: "Invalid URL.",
  }),
  // email: z.string().email({
  //   message: "Invalid email address.",
  // }),
  tags: z.string().optional(),
})

interface IProps {
  className?: string
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
  bookmarks: Bookmark[]
  currentBookmark?: Bookmark
}

export function InsertBookmarkForm({
  className,
  setDialogOpen,
  bookmarks,
  currentBookmark,
}: IProps) {
  const [isLoading, setIsLoading] = useState(false)
  const bookmarkStore = useBookmarkStore()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      link: "",
      // email: "",
      tags: currentBookmark?.title ?? "",
    },
  })
  const {
    formState: { isSubmitting, errors },
    setError,
  } = form
  const hasErrors = Object.keys(errors).length > 0

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await handleInsertBookmarkByLink(values.link)
      bookmarkStore.setBookmarkState({
        isReRender: true,
      })
      toast.success("Bookmark submitted!")
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
      setDialogOpen(false)
    }
  }

  async function handleInsertBookmarkByLink(link: string) {
    setIsLoading(true)
    let data: Partial<Bookmark> = {}
    try {
      const res = await fetch(`/api/metafy/${encodeURIComponent(link)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      data = (await res.json()) as Partial<Bookmark>
      console.log(data)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
    const newBookmark = {
      ...pick(data, [
        "title",
        "description",
        "image",
        "logo",
        "author",
        "publisher",
      ]),
      id: nanoid().slice(0, 16),
      link: form.getValues("link"),
      tags: [
        {
          id: nanoid(32),
          name: form.getValues("tags"),
          color: "Blue",
        },
      ],
      created_at: dayjs().valueOf(),
      updated_at: dayjs().valueOf(),
    }
    await fetch(`/api/sdb/bookmark`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBookmark),
    })
  }

  return (
    <XForm {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-6", className)}
      >
        <XFormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <XFormItem>
              <XFormLabel className="text-accent-foreground">
                Website URL
              </XFormLabel>
              <XFormControl>
                <XInput placeholder="https://example.com" {...field} />
              </XFormControl>
              <XFormMessage />
            </XFormItem>
          )}
        />
        {/* <XFormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <XFormItem>
              <XFormLabel className="text-accent-foreground">Email</XFormLabel>
              <XFormControl>
                <XInput placeholder="johndoe@gmail.com" {...field} />
              </XFormControl>
              <XFormMessage />
            </XFormItem>
          )}
        /> */}
        <XFormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <XFormItem>
              <XFormLabel className="text-accent-foreground">Tags</XFormLabel>
              <XSelect
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <XFormControl>
                  <XSelectTrigger className="dark:text-neutral-200">
                    <XSelectValue placeholder="Select a bookmark tag" />
                  </XSelectTrigger>
                </XFormControl>
                <XSelectContent>
                  {bookmarks.map((bookmark) => (
                    <XSelectItem key={bookmark.title} value={bookmark.title}>
                      {bookmark.title}
                    </XSelectItem>
                  ))}
                </XSelectContent>
              </XSelect>
              <XFormDescription>
                Optional but helps me categorize the bookmark.
              </XFormDescription>
              <XFormMessage />
            </XFormItem>
          )}
        />
        <XButton type="submit" className="w-full" disabled={isLoading}>
          {hasErrors ? (
            "Submit"
          ) : (
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isLoading ? "summitting" : "submit"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </motion.span>
            </AnimatePresence>
          )}
        </XButton>
      </form>
    </XForm>
  )
}
