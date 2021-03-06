/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/auth": {
    /** 認証情報を修正する */
    put: operations["put-auth"]
    /** ログインする。カスタムトークンを返す。 */
    post: operations["post-auth"]
    parameters: {}
  }
  "/owned-book": {
    /** 自分の持っている単語帳を取得する */
    get: operations["get-owned-book"]
    /** 新しい単語帳を登録する */
    post: operations["post-owned-book"]
    parameters: {}
  }
  "/owned-book/{bookId}": {
    /** 単語帳の詳細情報を取得する */
    get: operations["get-owned-book-bookId"]
    /** 単語帳を編集する。主にお気に入りの付与・除去や、アクセスコントロールの変更など */
    put: operations["put-owned-book-bookId"]
    parameters: {
      path: {
        bookId: number
      }
    }
  }
  "/book/{bookId}": {
    /** 単語帳のアーカイブ */
    delete: operations["delete-book-bookId"]
    parameters: {
      path: {
        bookId: string
      }
    }
  }
  "/book/{bookId}/comment": {
    /** 単語帳にコメントを投稿する */
    post: operations["post-book-bookId-comment"]
    parameters: {
      path: {
        bookId: string
      }
    }
  }
  "/book/{bookId}/comment/{commentId}": {
    /** コメントを削除する */
    delete: operations["delete-book-bookId-comment-commentId"]
    parameters: {
      path: {
        bookId: string
        commentId: string
      }
    }
  }
  "/book/{bookId}/comment/{commentId}/stamp": {
    /** スタンプの投稿 */
    post: operations["post-book-bookId-comment-commentId-stamp"]
    parameters: {
      path: {
        bookId: string
        commentId: string
      }
    }
  }
  "/book/{bookId}/comment/{commentId}/stamp/{stampId}": {
    /** スタンプの削除 */
    delete: operations["delete-book-bookId-comment-commentId-stamp-stampId"]
    parameters: {
      path: {
        bookId: string
        commentId: string
        stampId: number
      }
    }
  }
  "/book/{bookId}/word": {
    /** 単語を追加する */
    post: operations["post-book-bookId-word"]
    parameters: {
      path: {
        bookId: string
      }
    }
  }
  "/book/{bookId}/word/{wordId}": {
    /** 単語の修正 */
    put: operations["put-book-bookId-word-wordId"]
    /** 単語のアーカイブ */
    delete: operations["delete-book-bookId-word-wordId"]
    parameters: {
      path: {
        bookId: string
        wordId: number
      }
    }
  }
  "/book/{bookId}/word/{wordId}/status": {
    /** 単語のフラグやDONEの変更 */
    put: operations["put-book-bookId-word-wordId-status"]
    parameters: {
      path: {
        bookId: string
        wordId: number
      }
    }
  }
  "/book/{bookId}/word/{wordId}/comment": {
    /** コメントを投稿する */
    post: operations["post-book-bookId-word-wordId-comment"]
    parameters: {
      path: {
        bookId: string
        wordId: number
      }
    }
  }
  "/book/{bookId}/word/{wordId}/comment/{commentId}": {
    /** コメントを削除する */
    delete: operations["delete-book-bookId-comment"]
    parameters: {
      path: {
        bookId: string
        wordId: number
        commentId: string
      }
    }
  }
  "/book/{bookId}/word/{wordId}/comment/{commentId}/stamp": {
    /** スタンプの投稿 */
    post: operations["post-book-bookId-word-wordId-comment-commentId-stamp"]
    parameters: {
      path: {
        bookId: string
        commentId: string
        wordId: number
      }
    }
  }
  "/book/{bookId}/word/{wordId}/comment/{commentId}/stamp/{stampId}": {
    /** スタンプの削除 */
    delete: operations["delete-book-bookId-word-wordId-comment-commentId-stamp-stampId"]
    parameters: {
      path: {
        bookId: string
        commentId: string
        wordId: number
        stampId: number
      }
    }
  }
  "/book/{bookId}/collaborators/invite-code": {
    /** 招待コード一覧 */
    get: operations["get-book-bookId-collaborators-invite-code"]
    /** 招待コードの発行 */
    post: operations["post-book-bookId-collaborators-invite-code"]
    parameters: {
      path: {
        bookId: string
      }
    }
  }
  "/book/{bookId}/collaborators/invited": {
    /** 単語帳の共有を受ける */
    post: operations["post-book-bookId-invited"]
    parameters: {
      path: {
        bookId: string
      }
    }
  }
  "/book/{bookId}/collaborators/request": {
    /** 閲覧をリクエストする */
    post: operations["post-book-bookId-collaborators-request"]
    parameters: {
      path: {
        bookId: string
      }
    }
  }
  "/book/{bookId}/collaborators/{collaboratorId}": {
    /** アクセスコントロールの変更 */
    put: operations["put-book-bookId-preference"]
    /** BANする */
    delete: operations["delete-book-bookId-collaborators-collaboratorId"]
    parameters: {
      path: {
        bookId: string
        collaboratorId: number
      }
    }
  }
  "/book/{bookId}/collaborators/{collaboratorId}/approve": {
    /** 共有リクエストを許可する */
    post: operations["post-book-bookId-approve"]
    parameters: {
      path: {
        bookId: string
        collaboratorId: number
      }
    }
  }
  "/book/{bookId}/fork": {
    /** 単語帳をフォークする */
    post: operations["post-book-bookId-fork"]
    parameters: {
      path: {
        bookId: string
      }
    }
  }
  "/book/{bookId}/score": {
    /** 単語帳のスコアを送信する */
    post: operations["post-book-bookId-score"]
    parameters: {
      path: {
        bookId: string
      }
    }
  }
  "/friend": {
    /** フレンドのプロフィールを取得する */
    get: operations["get-friend"]
    parameters: {}
  }
  "/friend/connect-code": {
    /** フレンド申請コードを発行する */
    get: operations["get-friend-connect-code"]
    parameters: {}
  }
  "/friend/connect": {
    /** 友達とつながる */
    post: operations["post-friend-connect"]
    parameters: {}
  }
  "/friend/{friendId}": {
    /** 友達との繋がりを削除する */
    delete: operations["delete-friend-friendId"]
    parameters: {
      path: {
        friendId: string
      }
    }
  }
  "/profile": {
    /** 自分のプロフィールを取得する */
    get: operations["get-profile"]
    parameters: {}
  }
  "/verify-invite-code": {
    /** 招待コードの検証 */
    post: operations["get-verify-invite-code"]
    parameters: {}
  }
}

export interface components {
  schemas: {
    Book: {
      id: string
      title: string
      category: components["schemas"]["Category"]
      description?: string
      words: components["schemas"]["Word"][]
      comments: components["schemas"]["Comment"][]
      author: components["schemas"]["User"]
      createdAt: string
      updatedAt?: string
      collaborators: components["schemas"]["Collaborator"][]
      wordScores?: components["schemas"]["WordScore"][]
    }
    /** book summary */
    BookSummary: {
      id: string
      title: string
      category: components["schemas"]["Category"]
      description?: string
      createdAt: string
      updatedAt?: string
      wordCount: number
      commentCount: number
      collaboratorCount: number
    }
    OwnedBook: {
      id: number
      book: components["schemas"]["Book"]
      type: components["schemas"]["BookType"]
      createdAt: string
      updatedAt?: string
      lastUsedAt: string
      isFavorite: boolean
      statistics: {
        done: number
      }
      role: components["schemas"]["Role"]
      accessLevel: components["schemas"]["AccessLevel"]
    }
    Word: {
      id: number
      order: number
      question: string
      answer: string
      comments: components["schemas"]["Comment"][]
      createdAt: string
      updatedAt?: string
      author: components["schemas"]["User"]
      done: boolean
      flags: number[]
    }
    Comment: {
      id: string
      content: string
      commentType: components["schemas"]["CommentType"]
      author: components["schemas"]["User"]
      createdAt: string
      stamps: components["schemas"]["Stamp"][]
    }
    Stamp: {
      id: number
      stampType: string
      author: components["schemas"]["User"]
      createdAt: string
    }
    Collaborator: {
      id: number
      user: components["schemas"]["User"]
      role: "editor" | "viewer" | "owner" | "applicant"
      joinDate?: string
      requestDate?: string
    }
    Category: "japanese" | "math" | "science" | "social_studies" | "english" | "toeic" | "toefle"
    User: {
      id: string
      name: string
      iconUrl: string
    }
    Profile: {
      id: string
      user: components["schemas"]["User"]
      ownedBooks: components["schemas"]["Book"][]
    }
    BookType: "own" | "shared"
    Role: "owner" | "editor" | "viewer"
    CommentType: "default" | "question"
    /** 単語の正誤記録 */
    WordScore: {
      id: number
      wordId: number
      result: boolean
      createdAt: string
    }
    /** roleを持たない友達への公開設定 */
    AccessLevel: "full" | "meta" | "none"
    StampType: "thumbsup" | "heart" | "star" | "award"
    CollaboratorRequest: {
      userId: string
      bookId: string
      book: components["schemas"]["Book"]
      createdAt: string
    }
  }
}

export interface operations {
  /** 認証情報を修正する */
  "put-auth": {
    parameters: {}
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": {
            user: components["schemas"]["User"]
          }
        }
      }
    }
    requestBody: {
      content: {
        "application/json": {
          name?: string
        }
      }
    }
  }
  /** ログインする。カスタムトークンを返す。 */
  "post-auth": {
    parameters: {}
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": {
            user: components["schemas"]["User"]
            token: string
          }
        }
      }
    }
  }
  /** 自分の持っている単語帳を取得する */
  "get-owned-book": {
    parameters: {}
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": {
            ownedBooks: components["schemas"]["OwnedBook"][]
          }
        }
      }
    }
  }
  /** 新しい単語帳を登録する */
  "post-owned-book": {
    parameters: {}
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": {
            ownedBook: components["schemas"]["OwnedBook"]
          }
        }
      }
    }
    requestBody: {
      content: {
        "application/json": {
          title: string
          category: components["schemas"]["Category"]
          description?: string
          words: {
            question: string
            answer: string
          }[]
          accessLevel: components["schemas"]["AccessLevel"]
        }
      }
    }
  }
  /** 単語帳の詳細情報を取得する */
  "get-owned-book-bookId": {
    parameters: {
      path: {
        bookId: number
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": {
            ownedBook: components["schemas"]["OwnedBook"]
          }
        }
      }
    }
  }
  /** 単語帳を編集する。主にお気に入りの付与・除去や、アクセスコントロールの変更など */
  "put-owned-book-bookId": {
    parameters: {
      path: {
        bookId: number
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": {
            ownedBook: components["schemas"]["OwnedBook"]
          }
        }
      }
    }
    requestBody: {
      content: {
        "application/json": {
          title?: string
          category?: components["schemas"]["Category"]
          description?: string
          isFavorite?: boolean
        }
      }
    }
  }
  /** 単語帳のアーカイブ */
  "delete-book-bookId": {
    parameters: {
      path: {
        bookId: string
      }
    }
    responses: {
      /** OK */
      200: unknown
    }
    requestBody: {
      content: {
        "application/json": {
          hardDelete?: boolean
        }
      }
    }
  }
  /** 単語帳にコメントを投稿する */
  "post-book-bookId-comment": {
    parameters: {
      path: {
        bookId: string
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": {
            comment: components["schemas"]["Comment"]
          }
        }
      }
    }
    requestBody: {
      content: {
        "application/json": {
          content: string
          type: components["schemas"]["CommentType"]
        }
      }
    }
  }
  /** コメントを削除する */
  "delete-book-bookId-comment-commentId": {
    parameters: {
      path: {
        bookId: string
        commentId: string
      }
    }
    responses: {
      /** OK */
      200: unknown
    }
  }
  /** スタンプの投稿 */
  "post-book-bookId-comment-commentId-stamp": {
    parameters: {
      path: {
        bookId: string
        commentId: string
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": {
            stamp: components["schemas"]["Stamp"]
          }
        }
      }
    }
    requestBody: {
      content: {
        "application/json": {
          stampType: components["schemas"]["StampType"]
        }
      }
    }
  }
  /** スタンプの削除 */
  "delete-book-bookId-comment-commentId-stamp-stampId": {
    parameters: {
      path: {
        bookId: string
        commentId: string
        stampId: number
      }
    }
    responses: {
      /** OK */
      200: unknown
    }
  }
  /** 単語を追加する */
  "post-book-bookId-word": {
    parameters: {
      path: {
        bookId: string
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": {
            word: components["schemas"]["Word"]
          }
        }
      }
    }
    requestBody: {
      content: {
        "application/json": {
          order?: number
          question: string
          answer: string
        }
      }
    }
  }
  /** 単語の修正 */
  "put-book-bookId-word-wordId": {
    parameters: {
      path: {
        bookId: string
        wordId: number
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": {
            word: components["schemas"]["Word"]
          }
        }
      }
    }
    requestBody: {
      content: {
        "application/json": {
          order?: number
          question?: string
          answer?: string
        }
      }
    }
  }
  /** 単語のアーカイブ */
  "delete-book-bookId-word-wordId": {
    parameters: {
      path: {
        bookId: string
        wordId: number
      }
    }
    responses: {
      /** OK */
      200: unknown
    }
    requestBody: {
      content: {
        "application/json": {
          hardDelete?: boolean
        }
      }
    }
  }
  /** 単語のフラグやDONEの変更 */
  "put-book-bookId-word-wordId-status": {
    parameters: {
      path: {
        bookId: string
        wordId: number
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": {
            word: components["schemas"]["Word"]
          }
        }
      }
    }
    requestBody: {
      content: {
        "application/json": {
          done?: boolean
          flags?: number[]
        }
      }
    }
  }
  /** コメントを投稿する */
  "post-book-bookId-word-wordId-comment": {
    parameters: {
      path: {
        bookId: string
        wordId: number
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": {
            comment: components["schemas"]["Comment"]
          }
        }
      }
    }
    requestBody: {
      content: {
        "application/json": {
          type: components["schemas"]["CommentType"]
          content: string
        }
      }
    }
  }
  /** コメントを削除する */
  "delete-book-bookId-comment": {
    parameters: {
      path: {
        bookId: string
        wordId: number
        commentId: string
      }
    }
    responses: {
      /** OK */
      200: unknown
    }
  }
  /** スタンプの投稿 */
  "post-book-bookId-word-wordId-comment-commentId-stamp": {
    parameters: {
      path: {
        bookId: string
        commentId: string
        wordId: number
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": {
            stamp: components["schemas"]["Stamp"]
          }
        }
      }
    }
    requestBody: {
      content: {
        "application/json": {
          stampType: components["schemas"]["StampType"]
        }
      }
    }
  }
  /** スタンプの削除 */
  "delete-book-bookId-word-wordId-comment-commentId-stamp-stampId": {
    parameters: {
      path: {
        bookId: string
        commentId: string
        wordId: number
        stampId: number
      }
    }
    responses: {
      /** OK */
      200: unknown
    }
  }
  /** 招待コード一覧 */
  "get-book-bookId-collaborators-invite-code": {
    parameters: {
      path: {
        bookId: string
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": {
            inviteCodes: {
              expireDate: string
              inviteCode: string
              role: components["schemas"]["Role"]
              deauthorizedAt?: string
              accepted?: boolean
            }[]
          }
        }
      }
    }
  }
  /** 招待コードの発行 */
  "post-book-bookId-collaborators-invite-code": {
    parameters: {
      path: {
        bookId: string
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": {
            inviteCode: string
          }
        }
      }
    }
    requestBody: {
      content: {
        "application/json": {
          role: components["schemas"]["Role"]
        }
      }
    }
  }
  /** 単語帳の共有を受ける */
  "post-book-bookId-invited": {
    parameters: {
      path: {
        bookId: string
      }
    }
    responses: {
      /** OK */
      200: unknown
    }
    requestBody: {
      content: {
        "application/json": {
          accept: boolean
          inviteCode: string
        }
      }
    }
  }
  /** 閲覧をリクエストする */
  "post-book-bookId-collaborators-request": {
    parameters: {
      path: {
        bookId: string
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": {
            collaboratorRequest: components["schemas"]["CollaboratorRequest"]
          }
        }
      }
    }
  }
  /** アクセスコントロールの変更 */
  "put-book-bookId-preference": {
    parameters: {
      path: {
        bookId: string
        collaboratorId: number
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": {
            collaborator: components["schemas"]["Collaborator"]
          }
        }
      }
    }
    requestBody: {
      content: {
        "application/json": {
          role: components["schemas"]["Role"]
        }
      }
    }
  }
  /** BANする */
  "delete-book-bookId-collaborators-collaboratorId": {
    parameters: {
      path: {
        bookId: string
        collaboratorId: number
      }
    }
    responses: {
      /** OK */
      200: unknown
    }
    requestBody: {
      content: {
        "application/json": {
          hardDelete?: boolean
        }
      }
    }
  }
  /** 共有リクエストを許可する */
  "post-book-bookId-approve": {
    parameters: {
      path: {
        bookId: string
        collaboratorId: number
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": {
            collaborator: components["schemas"]["Collaborator"]
          }
        }
      }
    }
    requestBody: {
      content: {
        "application/json": {
          approve: boolean
        }
      }
    }
  }
  /** 単語帳をフォークする */
  "post-book-bookId-fork": {
    parameters: {
      path: {
        bookId: string
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": {
            ownerdBook: components["schemas"]["OwnedBook"]
          }
        }
      }
    }
  }
  /** 単語帳のスコアを送信する */
  "post-book-bookId-score": {
    parameters: {
      path: {
        bookId: string
      }
    }
    responses: {
      /** OK */
      200: unknown
    }
    requestBody: {
      content: {
        "application/json": {
          wordScores: {
            wordId: number
            result: boolean
          }[]
        }
      }
    }
  }
  /** フレンドのプロフィールを取得する */
  "get-friend": {
    parameters: {}
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": {
            friend: components["schemas"]["Profile"][]
          }
        }
      }
    }
  }
  /** フレンド申請コードを発行する */
  "get-friend-connect-code": {
    parameters: {}
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": {
            connectCode: string
          }
        }
      }
    }
  }
  /** 友達とつながる */
  "post-friend-connect": {
    parameters: {}
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": {
            friend: components["schemas"]["Profile"]
          }
        }
      }
    }
  }
  /** 友達との繋がりを削除する */
  "delete-friend-friendId": {
    parameters: {
      path: {
        friendId: string
      }
    }
    responses: {
      /** OK */
      200: unknown
    }
  }
  /** 自分のプロフィールを取得する */
  "get-profile": {
    parameters: {}
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": {
            profile: components["schemas"]["Profile"]
          }
        }
      }
    }
  }
  /** 招待コードの検証 */
  "get-verify-invite-code": {
    parameters: {}
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": {
            bookSummary: components["schemas"]["BookSummary"]
            expired: boolean
            deauthorized: boolean
            inviterUser: components["schemas"]["User"]
          }
        }
      }
    }
    requestBody: {
      content: {
        "application/json": {
          inviteCode: string
        }
      }
    }
  }
}

export interface external {}
