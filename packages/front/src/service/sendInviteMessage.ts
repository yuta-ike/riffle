import { Liff } from "@line/liff/dist/lib"
import { Book, User } from "../types/models"

const sendInviteMessage = async (liff: Liff, inviter: User, book: Book, url: string) => {
  await liff.shareTargetPicker([
    {
      type: "flex",
      altText: `${inviter}さんから「${book.title}」へ招待されています。招待を受ける場合は${url}にアクセスしてください。`,
      contents: {
        type: "bubble",
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: `${inviter}さんから「${book.title}」へ招待されています`,
              wrap: true,
            },
          ],
          spacing: "lg",
        },
        footer: {
          type: "box",
          layout: "vertical",
          spacing: "sm",
          contents: [
            {
              type: "button",
              style: "link",
              height: "sm",
              action: {
                type: "uri",
                label: "参加する",
                uri: url,
              },
            },
            {
              type: "button",
              style: "link",
              height: "sm",
              action: {
                type: "uri",
                label: "Riffleについて",
                uri: "", // TODO: set correct url
              },
            },
          ],
          flex: 0,
        },
      },
    },
  ])
}

export default sendInviteMessage
