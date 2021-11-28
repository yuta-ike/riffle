import React from "react"
import {ROLE_LABELS} from "../../../constants/role"
import { Role } from "../../../types/models"
import Badge from "../../components/Badge"
import ROLE_COLORS from "../../constants/roleColor"

export type RoleBadgeProps = {
  role: Role
  className?: string
}

const RoleBadge: React.VFC<RoleBadgeProps> = ({ role, className }) => {
  return (
    <Badge className={className} backgroundColor={ROLE_COLORS[role]}>
      {ROLE_LABELS[role]}
    </Badge>
  )
}

export default RoleBadge
