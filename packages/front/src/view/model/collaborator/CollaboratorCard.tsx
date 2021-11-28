import React, { useCallback, useState } from "react"
import c from "classnames"
import { Collaborator, OwnedBook, Role } from "../../../types/models"
import Card from "../../base/Card"
import CircleImage from "../../components/CircleImage"
import RoleBadge from "../user/RoleBadge"
import IconButton from "../../base/IconButton"
import { Edit } from "react-feather"
import CollaboratorEditModal from "./CollaboratorEditModal"

export type CollaboratorCardProps = {
  ownedBook: OwnedBook
  collaborator: Collaborator
  className?: string
  onChangeRole: (role: Role) => void
  onClickKick: () => void
}

const CollaboratorCard: React.VFC<CollaboratorCardProps> = ({
  ownedBook,
  collaborator,
  className,
  onChangeRole,
  onClickKick,
}) => {
  const [open, setOpen] = useState(false)

  const handleClickEdit = useCallback(() => setOpen(true), [])

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
      <CollaboratorEditModal
        open={open}
        onClose={() => setOpen(false)}
        ownedBook={ownedBook}
        collaborator={collaborator}
      />
    </>
  )
}

export default CollaboratorCard
