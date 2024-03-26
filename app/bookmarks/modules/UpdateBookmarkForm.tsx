"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import dayjs from "dayjs"
import { toast } from "sonner"
import { ChangeEvent, useState } from "react"
import { nanoid } from "nanoid"

import {
  XForm,
  XFormControl,
  XFormDescription,
  XFormField,
  XFormItem,
  XFormLabel,
  XFormMessage,
} from "@/components/ui/XForm"
import { XButton } from "@/components/ui/XButton"
import { XInput } from "@/components/ui/XInput"
import { XTextarea } from "@/components/ui/XTextarea"
import { Bookmark } from "@/lib/types"
import { MinusIcon, PlusIcon } from "lucide-react"
import { useBookmarkStore } from "@/store/bookmark"
import { AnimatePresence, motion } from "framer-motion"

const formSchema = z.object({
  title: z.string().min(0, {
    message: "Please enter a title.",
  }),
  link: z.string().min(0, {
    message: "Please enter a link.",
  }),
  description: z.string().min(0, {
    message: "Please enter a description.",
  }),
  tags: z.array(
    z.object({ id: z.string(), name: z.string(), color: z.string() })
  ),
})

interface UpdateFormProps {
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
  bookmark: Bookmark
}

export function UpdateBookmarkForm({
  bookmark,
  setDialogOpen,
}: UpdateFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const bookmarkStore = useBookmarkStore()
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: bookmark.title,
      link: bookmark.link,
      description: bookmark.description,
      tags: bookmark.tags,
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // console.log(values)
    try {
      await handleUpdateBookmarkByLink(values.link)
      bookmarkStore.setBookmarkState({
        isReRender: true,
      })
      toast.success("Bookmark updated successfully")
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
      setDialogOpen(false)
    }
  }

  const handleChangeTagField = (value: string, id: string) => {
    const newTagList = form.getValues("tags").map((tag) => {
      if (tag.id === id) {
        return {
          ...tag,
          name: value,
        }
      }
      return tag
    })
    form.setValue("tags", newTagList)
  }

  const handleAddEmptyTag = () => {
    const newTagList = [
      ...bookmark.tags,
      { id: nanoid(32), name: "", color: "" },
    ]
    form.setValue("tags", newTagList)
  }

  async function handleUpdateBookmarkByLink(link: string) {
    setIsLoading(true)
    let data: Partial<Bookmark> = {}
    try {
      const res = await fetch(`https://metafy.vercel.app/api?url=${link}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      data = (await res.json()) as Partial<Bookmark>
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
    const newBookmark = {
      ...bookmark,
      ...data,
      link: form.getValues("link"),
      tags: form.getValues("tags"),
      updated_at: dayjs().valueOf(),
    }
    const result = await fetch(`/api/sdb/bookmark/${bookmark.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBookmark),
    })
  }

  return (
    <XForm {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <XFormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <XFormItem>
              <XFormLabel>Link</XFormLabel>
              <XFormControl>
                <XInput placeholder="Please enter a link." {...field} />
              </XFormControl>
              <XFormMessage />
            </XFormItem>
          )}
        />
        <XFormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <XFormItem>
              <XFormLabel>Title</XFormLabel>
              <XFormControl>
                <XInput placeholder="Please enter a title." {...field} />
              </XFormControl>
              <XFormMessage />
            </XFormItem>
          )}
        />
        <XFormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <XFormItem>
              <XFormLabel>Description</XFormLabel>
              <XFormControl>
                <XTextarea
                  className="h-32"
                  placeholder="Please enter a description."
                  {...field}
                />
              </XFormControl>
              <XFormMessage />
            </XFormItem>
          )}
        />
        <XFormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <XFormItem>
              <XFormLabel className="flex justify-between items-center">
                <span>Tags</span>
                <XButton
                  variant={"ghost"}
                  size="icon"
                  onClick={(e) => {
                    e.preventDefault()
                    handleAddEmptyTag()
                  }}
                >
                  <PlusIcon className="h-4 w-4" />
                </XButton>
              </XFormLabel>
              {form.getValues("tags").map((item) => {
                return (
                  <div key={item.id} className="flex items-center gap-2">
                    <XFormControl>
                      <XInput
                        placeholder="Please enter a tag name."
                        defaultValue={item.name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleChangeTagField(e.target.value, item.id)
                        }
                      />
                    </XFormControl>
                    <XButton
                      variant={"ghost"}
                      size="icon"
                      onClick={(e) => {
                        e.preventDefault()
                        form.setValue(
                          "tags",
                          form
                            .getValues("tags")
                            .filter((tag) => tag.id !== item.id)
                        )
                      }}
                    >
                      <MinusIcon className="h-4 w-4" />
                    </XButton>
                  </div>
                )
              })}
              <XFormDescription>
                Click <kbd>+</kbd> to add a new tag
              </XFormDescription>
              <XFormMessage />
            </XFormItem>
          )}
        />
        <XButton type="submit" className="w-full" disabled={isLoading}>
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
        </XButton>
      </form>
    </XForm>
  )
}
