import { useRoute, Link } from 'wouter';
import { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock, Share2, Menu, X } from 'lucide-react';
import { getBlogArticleBySlug, getRelatedArticles } from '@/lib/blog-data';

interface TableOfContentsItem {
  level: number;
  text: string;
  id: string;
}

export default function BlogArticle() {
  const [match, params] = useRoute('/blog/:slug');
  const article = match ? getBlogArticleBySlug(params?.slug) : null;
  const relatedArticles = article ? getRelatedArticles(article.slug) : [];
  const [showTOC, setShowTOC] = useState(false);

  // 提取目录
  const tableOfContents: TableOfContentsItem[] = useMemo(() => {
    if (!article) return [];
    const headings: TableOfContentsItem[] = [];
    const lines = article.content.split('\n');
    
    lines.forEach((line, index) => {
      const match = line.match(/^(#{1,6})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2];
        const id = `heading-${index}`;
        headings.push({ level, text, id });
      }
    });
    
    return headings;
  }, [article]);

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
          <div className="flex items-center gap-4">
            {tableOfContents.length > 0 && (
              <button
                onClick={() => setShowTOC(!showTOC)}
                className="text-slate-600 hover:text-slate-900 lg:hidden"
              >
                {showTOC ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            )}
            <Link href="/">
              <a className="text-sm font-medium text-slate-600 hover:text-slate-900">返回工具</a>
            </Link>
          </div>
        </div>
      </header>

      {/* 主容器 */}
      <div className="container py-12">
        <div className="flex gap-8">
          {/* 浮动目录（仅在大屏幕显示） */}
          {tableOfContents.length > 0 && (
            <aside className="hidden w-64 lg:block">
              <div className="sticky top-24 rounded-lg border border-slate-200 bg-white p-4">
                <h3 className="mb-4 font-semibold text-slate-900">目录</h3>
                <nav className="space-y-2 text-sm">
                  {tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block truncate transition-colors hover:text-emerald-600 ${
                        item.level === 2
                          ? 'text-slate-700'
                          : item.level === 3
                            ? 'ml-4 text-slate-600'
                            : 'ml-8 text-slate-500'
                      }`}
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          {/* 文章内容 */}
          <article className="flex-1">
            {/* 移动端目录 */}
            {showTOC && tableOfContents.length > 0 && (
              <div className="mb-6 rounded-lg border border-slate-200 bg-white p-4 lg:hidden">
                <h3 className="mb-4 font-semibold text-slate-900">目录</h3>
                <nav className="space-y-2 text-sm">
                  {tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setShowTOC(false)}
                      className={`block truncate transition-colors hover:text-emerald-600 ${
                        item.level === 2
                          ? 'text-slate-700'
                          : item.level === 3
                            ? 'ml-4 text-slate-600'
                            : 'ml-8 text-slate-500'
                      }`}
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* 文章头部 */}
            <div className="mb-8 rounded-lg bg-white p-8">
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

            {/* 文章内容 - Markdown 渲染 */}
            <div className="prose prose-slate lg:prose-xl mx-auto max-w-none rounded-lg bg-white p-8 text-slate-900">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }: any) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
                  h2: ({ node, ...props }: any) => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
                  h3: ({ node, ...props }: any) => <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />,
                  p: ({ node, ...props }: any) => <p className="text-base leading-7 mb-4" {...props} />,
                  ul: ({ node, ...props }: any) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
                  ol: ({ node, ...props }: any) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
                  li: ({ node, ...props }: any) => <li className="text-base leading-7" {...props} />,
                  blockquote: ({ node, ...props }: any) => (
                    <blockquote className="border-l-4 border-emerald-500 bg-emerald-50 px-4 py-2 italic text-slate-700 mb-4" {...props} />
                  ),
                  code: ({ node, ...props }: any) => {
                    const isInline = !props.children?.toString().includes('\n');
                    return isInline ? (
                      <code className="bg-slate-100 px-2 py-1 rounded text-sm font-mono text-slate-900" {...props} />
                    ) : (
                      <code className="block bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto mb-4" {...props} />
                    );
                  },
                  a: ({ node, ...props }: any) => <a className="text-emerald-600 hover:text-emerald-700 underline" {...props} />,
                  table: ({ node, ...props }: any) => <table className="w-full border-collapse mb-4" {...props} />,
                  th: ({ node, ...props }: any) => <th className="border border-slate-300 bg-slate-100 px-4 py-2 text-left font-semibold" {...props} />,
                  td: ({ node, ...props }: any) => <td className="border border-slate-300 px-4 py-2" {...props} />,
                }}
              >
                {article.content}
              </ReactMarkdown>
            </div>

            {/* SEO 关键词 */}
            <div className="mt-12 rounded-lg border border-slate-200 bg-white p-8">
              <h3 className="mb-4 text-sm font-semibold text-slate-600">关键词</h3>
              <div className="flex flex-wrap gap-2">
                {article.keywords.map((keyword) => (
                  <Badge key={keyword} variant="secondary" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
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
        </div>
      </div>
    </div>
  );
}
