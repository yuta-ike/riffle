import React from "react"
import { Loader } from "react-feather"

const Loading: React.VFC = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="flex items-center space-x-4">
        <Loader aria-hidden className="animate-spin" />
        <span className="font-bold tracking-widest">LOADING...</span>
      </div>
    </div>
  )
}

export default Loading
