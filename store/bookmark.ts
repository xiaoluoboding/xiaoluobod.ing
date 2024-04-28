import { create } from "zustand"
import { persist, devtools } from "zustand/middleware"
import { merge, cloneDeep } from "lodash-es"

import { Bookmark, Collection } from "@/lib/types"

export interface BookmarkState {
  isReRender: boolean
  isSearching: boolean
  bookmarkList: Bookmark[]
  collectionList: Collection[]
  getState: () => BookmarkState
  setBookmarkList: (list: Bookmark[]) => void
  setCollectionList: (list: Collection[]) => void
  setBookmarkState: (state: Partial<BookmarkState>) => void
}

export const useBookmarkStore = create<BookmarkState>()(
  devtools(
    persist(
      (set, get) => ({
        isReRender: false,
        isSearching: false,
        bookmarkList: [],
        collectionList: [],
        getState: () => get(),
        setBookmarkList: (bookmarkList: Bookmark[]) =>
          set((state) => ({ bookmarkList })),
        setCollectionList: (collectionList: Collection[]) =>
          set((state) => ({ collectionList })),
        setBookmarkState: (state: Partial<BookmarkState>) => set(state),
      }),
      {
        name: "rs-bookmark-storage",
        merge: (persistedState, currentState) =>
          merge(currentState, persistedState),
      }
    )
  )
)
