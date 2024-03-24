import NextImage from "next/image"

import ZustandIcon from "@/assets/zustand.png"

const Zustand = ({ className }: { className?: string }) => {
  return (
    <>
      <NextImage
        src={ZustandIcon}
        alt="zustand"
        width={48}
        height={48}
        className={className}
      />
    </>
  )
}

export default Zustand
