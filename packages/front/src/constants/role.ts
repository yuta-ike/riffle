import { Role } from "../types/models"

const ROLE_LABELS: Record<Role, string> = {
  owner: "管理者",
  editor: "編集",
  viewer: "閲覧",
}

export default ROLE_LABELS
