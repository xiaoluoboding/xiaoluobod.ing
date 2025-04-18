export interface Tweet {
  id: string
  date: string
  title?: string
  description?: string
  categories?: string[]
}

export const tweets: Tweet[] = [
  {
    id: "1911661341905133806",
    date: "2025-04-14",
    title: "Pitch Your Product",
    categories: ["#buildinpublic", "#indiehackers"],
  },
  {
    id: "1858060224382521539",
    date: "2024-11-17",
    title: "Side Space",
    categories: ["Side Space", "Product"],
  },
  {
    id: "1847854010168201602",
    date: "2024-10-20",
    title: "Vue Sonner",
    categories: ["Vue Sonner", "Vue.js"],
  },
  {
    id: "1847189626630689064",
    date: "2024-10-18",
    title: "Stunning UI",
    categories: ["Stunning UI", "Vue.js"],
  },
  {
    id: "1780087473667981634",
    date: "2024-04-16",
    title: "Auth Tools",
    categories: ["Auth"],
  },
  {
    id: "1691403873209159680",
    date: "2023-08-15",
    title: "Auth UI Vue",
    categories: ["frontend", "frameworks", "Vue.js"],
  },
]

export const getFilteredTweets = (category?: string) => {
  if (!category) return tweets
  return tweets.filter((tweet) => tweet.categories?.includes(category))
}

export const getAllCategories = (): string[] => {
  const categoriesSet = new Set<string>()
  tweets.forEach((tweet) => {
    tweet.categories?.forEach((category) => {
      categoriesSet.add(category)
    })
  })
  return Array.from(categoriesSet)
}
