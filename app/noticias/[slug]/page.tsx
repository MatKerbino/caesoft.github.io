import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllPostSlugs, getPostBySlug } from '@/lib/posts'
import { formatBRDate } from '@/lib/utils'

type Params = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: 'Notícia' }
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
  }
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return notFound()

  return (
    <main className="min-h-screen pt-24 pb-16 container mx-auto px-4">
      <nav className="mb-6 text-sm">
        <Link href="/noticias" className="text-caesoft-purple hover:text-caesoft-green">← Voltar para notícias</Link>
      </nav>

      <article>
        <header className="mb-6">
          <h1 className="text-4xl font-bold title-quanta text-light mb-2">{post.title}</h1>
          <div className="text-light-muted text-sm flex items-center gap-3">
            <span>{post.author}</span>
            <span>•</span>
            <time dateTime={post.createdAt}>Publicado em {formatBRDate(post.createdAt)}</time>
            {post.updatedAt !== post.createdAt && (
              <>
                <span>•</span>
                <time dateTime={post.updatedAt}>Atualizado em {formatBRDate(post.updatedAt)}</time>
              </>
            )}
          </div>
        </header>

        {post.coverImage && (
          <img src={post.coverImage} alt="" className="w-full max-h-[420px] object-cover rounded-xl border border-purple-soft mb-8" />
        )}

        <div className="prose prose-invert max-w-none prose-headings:font-bold prose-a:text-caesoft-green prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:border prose-img:border-purple-soft prose-img:shadow-lg" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

        {post.categories.length > 0 && (
          <footer className="mt-10">
            <div className="flex flex-wrap gap-2">
              {post.categories.map((c) => (
                <span key={c} className="px-3 py-1 text-xs rounded-full border border-purple-soft text-light-muted">{c}</span>
              ))}
            </div>
          </footer>
        )}
      </article>
    </main>
  )
}
