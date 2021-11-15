import React, { useCallback, useState } from "react"
import c from "classnames"
import { Collaborator, Role } from "../../../types/models"
import Card from "../../base/Card"
import CircleImage from "../../components/CircleImage"
import RoleBadge from "../user/RoleBadge"
import IconButton from "../../base/IconButton"
import { Edit } from "react-feather"
import BottomModal from "../../base/BottomModal"
import SelectButton from "../../components/SelectButton"
import ROLE_LABELS from "../../../constants/role"

export type CollaboratorCardProps = {
  collaborator: Collaborator
  className?: string
  onChangeRole: (role: Role) => void
  onClickKick: () => void
}

const CollaboratorCard: React.VFC<CollaboratorCardProps> = ({ collaborator, className, onChangeRole, onClickKick }) => {
  const [open, setOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<Role>(collaborator.role as Role)

  const handleClickEdit = useCallback(() => setOpen(true), [])
  const handleChangeRole = useCallback((role: Role) => {
    setSelectedRole(role)
  }, [])
  const handleSendRoleChange = useCallback(() => {
    onChangeRole(selectedRole)
  }, [])
  return (
    <>
      <Card className={c("flex items-center justify-between", className)}>
        <div className="flex items-center space-x-4">
          <CircleImage url={collaborator.user.iconUrl} alt="" size="small" className="flex-shrink-0" />
          <p className="">{collaborator.user.name}</p>
          <RoleBadge role={collaborator.role as Role} />
        </div>
        <div>
          <IconButton onClick={handleClickEdit} label="設定">
            <Edit size="16px" />
          </IconButton>
        </div>
      </Card>
      <BottomModal open={open} onClose={() => setOpen(false)} height="short" title="ロールの変更">
        <div className="flex flex-col items-start">
          <div className="w-full space-y-4">
            <div className="space-y-2">
              <h2>{collaborator.user.name} さん</h2>
              <div className="flex w-full">
                {(["owner", "editor", "viewer"] as const).map((role, index) => (
                  <SelectButton
                    selected={role === selectedRole}
                    isFirst={index === 0}
                    isLast={index === 2}
                    onClick={() => handleChangeRole(role)}
                  >
                    {ROLE_LABELS[role]}
                  </SelectButton>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="w-full px-3 py-2 border-2 border-solid rounded-lg text-primary border-primary/80 disabled:text-gray-300 disabled:border-gray-200 "
                disabled={selectedRole === collaborator.role}
                onClick={handleSendRoleChange}
              >
                変更を反映
              </button>
            </div>
          </div>
          <hr className="w-full mt-8 mb-4" />
          <button className="text-sm text-gray-400 underline" onClick={onClickKick}>
            ユーザーをキックする
          </button>
        </div>
      </BottomModal>
    </>
  )
}

export default CollaboratorCard
