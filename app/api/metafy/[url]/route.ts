import { tryCatchNextResponse } from "@/lib/utils"
import { NextRequest } from "next/server"

export async function GET(
  req: NextRequest,
  { params }: { params: { url: string } }
) {
  const { url } = params

  return tryCatchNextResponse<any>(async () => {
    const res = await fetch(`https://metafy.vercel.app/api?url=${url}`)
    const json = await res.json()
    return json
  })
}
