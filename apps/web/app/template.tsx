import ImpersonateBanner from "@/components/impersonate-banner"
import { getCurrentUser, getSession } from "@/lib/session"

export default async function Template({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  const user = await getCurrentUser()
  const isImpersonating = session?.impersonatedBy != null

  return (
    <>
      {isImpersonating && <ImpersonateBanner user={user} />}
      {children}
    </>
  )
}
