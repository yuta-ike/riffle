const removeTrailingComma = (url: string) => {
  if (url[url.length - 1] === "/") {
    return url.slice(0, -1)
  }
  return url
}

export default removeTrailingComma
