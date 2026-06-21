import { SiteHeader } from "@/components/admin/site-header"
import ProfileHeader from "@/components/admin/users/detail/profile-header"
import { prisma } from "@/lib/prisma"
import { IconCircleX, IconDiscountCheck } from "@tabler/icons-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  })

  if (!user) {
    return <></>
  }

  return (
    <>
      <SiteHeader title={user.name} />
      <div className="grid-cols-1 px-2 py-3">
        <ProfileHeader user={user} />
      </div>
    </>
  )
}
