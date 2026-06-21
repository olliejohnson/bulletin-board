import { notFound } from "next/navigation"
import Link from "next/link"
import { IconArrowLeft, IconMessageCircle } from "@tabler/icons-react"
import { getPost } from "@/lib/posts"
import { BoardHeader } from "../board-header"
import { authorName, timeAgo } from "../format"

export default async function Page({
  params,
}: {
  params: Promise<{ postId: string }>
}) {
  const { postId } = await params
  const post = await getPost(postId)
  if (!post) notFound()

  return (
    <div className="flex min-h-svh flex-col">
      <BoardHeader />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6">
        <Link
          href="/board"
          className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <IconArrowLeft className="size-4" />
          Board
        </Link>

        <article>
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <p className="mt-1.5 flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
            {post.categories.map((c) => (
              <span key={c.id} className="text-foreground">
                ~{c.name}
              </span>
            ))}
            <span>by {authorName(post.author)}</span>
            <span>{timeAgo(post.createdAt)}</span>
          </p>
          {post.content ? (
            <div className="mt-4 text-sm whitespace-pre-wrap">
              {post.content}
            </div>
          ) : null}
        </article>

        {/* Threaded replies will live here. */}
        <section className="mt-8 border-t pt-4">
          <h2 className="flex items-center gap-1.5 text-sm font-semibold">
            <IconMessageCircle className="size-4" />
            Replies
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Threaded replies are coming soon.
          </p>
        </section>
      </main>
    </div>
  )
}
