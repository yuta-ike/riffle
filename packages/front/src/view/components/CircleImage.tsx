import React from "react"
import c from "classnames"

export type CircleImageProps = {
  url: string
  alt?: string
  size: "large" | "small" | "tiny"
  className?: string
}

const CircleImage: React.VFC<CircleImageProps> = ({ url, alt, size, className }) => {
  return (
    <div
      className={c(
        "w-16 h-16 overflow-hidden rounded-full",
        size === "large" ? "w-16 h-16" : size === "small" ? "w-8 h-8" : "w-5 h-5",
        className,
      )}
    >
      <img src={url} alt={alt ?? ""} className="object-cover w-full h-full" />
    </div>
  )
}

export default CircleImage
