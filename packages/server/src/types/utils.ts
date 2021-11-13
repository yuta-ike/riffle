/**
 * `/user/{userId}/hello`のようなパスを`/user/:userId/hello`に変換する型関数
 */
export type ConvertPlaceholderNotation<Path extends string> =
  Path extends `${infer Prefix}{${infer Variable}}${infer Postfix}`
    ? `${Prefix}:${Variable}${ConvertPlaceholderNotation<Postfix>}`
    : Path

/**
 * `/user/:userId/hello`のようなパスを`/user/{userId}/hello`に変換する型関数
 */
export type ReversePlaceholderNotation<Path extends string> =
  Path extends `${infer Prefix}:${infer Variable}/${infer PostFix}`
    ? `${Prefix}{${Variable}}/${ReversePlaceholderNotation<PostFix>}`
    : Path
