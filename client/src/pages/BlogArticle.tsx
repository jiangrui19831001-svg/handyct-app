import { useRoute, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import { getBlogArticleBySlug, getRelatedArticles } from '@/lib/blog-data';

export default function BlogArticle() {
  const [match, params] = useRoute('/blog/:slug');
  const article = match ? getBlogArticleBySlug(params?.slug) : null;
  const relatedArticles = article ? getRelatedArticles(article.slug) : [];

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
          <div className="container flex h-16 items-center">
            <Link href="/blog">
              <a className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700">
                <ArrowLeft className="h-4 w-4" />
                返回博客
              </a>
            </Link>
          </div>
        </header>
        <div className="container flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold text-slate-900">文章未找到</h1>
            <Link href="/blog">
              <a className="text-emerald-600 hover:text-emerald-700">返回博客列表</a>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/blog">
            <a className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700">
              <ArrowLeft className="h-4 w-4" />
              返回博客
            </a>
          </Link>
          <Link href="/">
            <a className="text-sm font-medium text-slate-600 hover:text-slate-900">返回工具</a>
          </Link>
        </div>
      </header>

      {/* 文章内容 */}
      <main className="container py-12">
        <article className="mx-auto max-w-3xl">
          {/* 文章头部 */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-2">
              <Badge className="bg-emerald-100 text-emerald-700">{article.category}</Badge>
              <span className="text-sm text-slate-500">{article.readingTime} 分钟阅读</span>
            </div>

            <h1 className="mb-4 text-4xl font-bold text-slate-900">{article.title}</h1>

            <p className="mb-6 text-lg text-slate-600">{article.description}</p>

            {/* 文章元信息 */}
            <div className="flex flex-wrap items-center gap-6 border-t border-b border-slate-200 py-4 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(article.publishedDate).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {article.readingTime} 分钟阅读时间
              </div>
              <div className="flex items-center gap-2">
                <span>作者：{article.author}</span>
              </div>
              <Button variant="ghost" size="sm" className="ml-auto">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* 文章标签 */}
          <div className="mb-8 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          {/* 文章内容 */}
          <div className="prose prose-sm max-w-none rounded-lg bg-white p-8 text-slate-900">
            <p className="text-base leading-relaxed">{article.content}</p>

            {/* SEO 关键词 */}
            <div className="mt-12 border-t border-slate-200 pt-8">
              <h3 className="mb-4 text-sm font-semibold text-slate-600">关键词</h3>
              <div className="flex flex-wrap gap-2">
                {article.keywords.map((keyword) => (
                  <Badge key={keyword} variant="secondary" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* 转化按钮 */}
          <div className="mt-12 rounded-lg bg-gradient-to-r from-emerald-50 to-emerald-100 p-8 text-center">
            <h3 className="mb-3 text-xl font-bold text-slate-900">准备好优化您的临床试验数据了吗？</h3>
            <p className="mb-6 text-slate-700">
              使用 HandyCT 2.0 自动化 CDISC 数据转换，确保 FDA 合规性。
            </p>
            <Link href="/">
              <a>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  立即尝试 HandyCT 2.0 转换工具
                </Button>
              </a>
            </Link>
          </div>

          {/* 相关文章 */}
          {relatedArticles.length > 0 && (
            <div className="mt-16">
              <h2 className="mb-8 text-2xl font-bold text-slate-900">相关文章</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedArticles.map((relatedArticle) => (
                  <Link key={relatedArticle.id} href={`/blog/${relatedArticle.slug}`}>
                    <a className="block">
                      <Card className="h-full transition-all hover:shadow-lg hover:border-emerald-200">
                        <CardHeader>
                          <Badge className="mb-2 w-fit bg-emerald-100 text-emerald-700">
                            {relatedArticle.category}
                          </Badge>
                          <CardTitle className="line-clamp-2 text-base">
                            {relatedArticle.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="line-clamp-2 text-sm text-slate-600">
                            {relatedArticle.description}
                          </p>
                        </CardContent>
                      </Card>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
    </div>
  );
}
