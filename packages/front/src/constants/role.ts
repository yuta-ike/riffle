import { Role } from "../types/models"

// TODO: 文言の修正
export const ROLES: readonly { value: Role; label: string }[] = [
  { value: "owner", label: "管理者" },
  { value: "editor", label: "編集者" },
  { value: "viewer", label: "閲覧者" },
] as const

export const ROLE_LABELS: Record<Role, string> = {
  owner: "管理者",
  editor: "編集",
  viewer: "閲覧",
} as const
