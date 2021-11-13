export * as Schema from "./generated/schema"
import { paths as rawPaths } from "./generated/schema"
import { ConvertPlaceholderNotation } from "./utils"

type TransferTable = {
  [RawKey in keyof rawPaths]: ConvertPlaceholderNotation<RawKey>
}

type InverseTransferTable<Key extends TransferTable[keyof TransferTable]> = {
  [RawKey in keyof rawPaths]: Key extends ConvertPlaceholderNotation<RawKey> ? RawKey : never
}[keyof rawPaths]

type paths = {
  [Key in ConvertPlaceholderNotation<keyof rawPaths>]: rawPaths[InverseTransferTable<Key>]
}

export { paths }
