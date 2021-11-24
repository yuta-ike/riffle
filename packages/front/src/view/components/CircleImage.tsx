import React from "react"
import Image from "next/image"
import c from "classnames"

export type CircleImageProps = {
  url: string
  alt?: string
  size: "large" | "small" | "xs" | "tiny"
  className?: string
}

const CircleImage: React.VFC<CircleImageProps> = ({ url, alt, size, className }) => {
  return (
    <div
      className={c(
        "w-16 h-16 overflow-hidden rounded-full relative",
        size === "large" ? "w-16 h-16" : size === "small" ? "w-8 h-8" : size === "xs" ? "w-6 h-6" : "w-5 h-5",
        className,
      )}
    >
      <Image src={url} alt={alt ?? ""} layout="fill" className="object-cover w-full h-full" />
    </div>
  )
}

export default CircleImage
