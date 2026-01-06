import { useState, useMemo, useEffect } from 'react';
import { useRoute, Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock, BookOpen, ChevronRight, Mail, Phone } from 'lucide-react';
import { getBlogArticleBySlug, getRelatedArticles } from '@/lib/blog-data';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface HeadingNode {
  level: number;
  text: string;
  id: string;
}

export default function BlogArticle() {
  const [match, params] = useRoute('/blog/:slug');
  const { i18n, t } = useTranslation();
  const article = match ? getBlogArticleBySlug(params?.slug) : null;
  const relatedArticles = article ? getRelatedArticles(article.slug) : [];
  const [headings, setHeadings] = useState<HeadingNode[]>([]);

  // 获取当前语言的内容
  const currentContent = i18n.language === 'en' ? (article?.contentEn || article?.content) : article?.content;
  const currentTitle = i18n.language === 'en' ? (article?.titleEn || article?.title) : article?.title;
  const currentDescription = i18n.language === 'en' ? (article?.descriptionEn || article?.description) : article?.description;

  // 提取 Markdown 中的标题生成目录
  useEffect(() => {
    if (!currentContent) return;
    
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const extractedHeadings: HeadingNode[] = [];
    let match;
    
    while ((match = headingRegex.exec(currentContent)) !== null) {
      const level = match[1].length;
      const text = match[2];
      const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      extractedHeadings.push({ level, text, id });
    }
    
    setHeadings(extractedHeadings);
  }, [currentContent]);

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                {t('blog.backToBlog')}
              </Button>
            </Link>
            <LanguageSwitcher />
          </div>
        </header>
        <main className="container py-12">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold text-slate-900">{t('blog.notFound')}</h1>
            <Link href="/blog">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                {t('blog.returnToBlog')}
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/blog">
            <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-slate-100 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              {t('blog.backToBlog')}
            </Button>
          </Link>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="container py-12">
        {/* 面包屑导航 */}
        <div className="mb-8 flex items-center gap-2 text-sm text-slate-600">
          <Link href="/">
            <span className="hover:text-emerald-600 cursor-pointer transition-colors">Home</span>
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/blog">
            <span className="hover:text-emerald-600 cursor-pointer transition-colors">Blog</span>
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-slate-900 font-medium">{article.category}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          {/* 浮动目录（大屏幕固定） */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-20 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="mb-4 font-semibold text-slate-900 text-sm uppercase tracking-wide">Table of Contents</h3>
              {headings.length > 0 ? (
                <nav className="space-y-2 text-sm">
                  {headings.map((heading) => (
                    <a
                      key={heading.id}
                      href={`#${heading.id}`}
                      className={`block text-slate-600 hover:text-emerald-600 transition-colors ${
                        heading.level === 3 ? 'pl-4' : ''
                      }`}
                    >
                      {heading.text}
                    </a>
                  ))}
                </nav>
              ) : (
                <p className="text-slate-500 text-xs">No headings found</p>
              )}
            </div>
          </aside>

          {/* 主要内容 */}
          <div className="lg:col-span-3">
            {/* 文章头部 */}
            <article className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
              {/* 元信息 */}
              <div className="mb-8 border-b border-slate-200 pb-8">
                <div className="mb-4 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">{article.category}</Badge>
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="hover:bg-slate-100 transition-colors">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h1 className="mb-4 text-4xl font-bold text-slate-900 leading-tight">{currentTitle}</h1>
                <p className="mb-6 text-lg text-slate-600 leading-relaxed">{currentDescription}</p>

                <div className="flex flex-wrap gap-6 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-emerald-600" />
                    <span>{new Date(article.publishedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-emerald-600" />
                    <span>{article.readingTime} {t('blog.readingTime')}</span>
                  </div>
                  <div className="text-slate-500">
                    {t('blog.author')}: {article.author}
                  </div>
                </div>
              </div>

              {/* Markdown 内容 - 使用 prose 排版 */}
              <div className="prose prose-slate lg:prose-lg mx-auto max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    h1: ({ node, ...props }: any) => (
                      <h1 className="text-3xl font-bold mt-10 mb-5 text-slate-900 scroll-mt-20" {...props} />
                    ),
                    h2: ({ node, children, ...props }: any) => {
                      const text = children?.[0] || '';
                      const id = String(text).toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
                      return (
                        <h2 id={id} className="text-2xl font-bold mt-8 mb-4 text-slate-900 scroll-mt-20" {...props} />
                      );
                    },
                    h3: ({ node, children, ...props }: any) => {
                      const text = children?.[0] || '';
                      const id = String(text).toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
                      return (
                        <h3 id={id} className="text-xl font-semibold mt-6 mb-3 text-slate-900 scroll-mt-20" {...props} />
                      );
                    },
                    p: ({ node, ...props }: any) => (
                      <p className="text-slate-700 leading-relaxed mb-5" {...props} />
                    ),
                    ul: ({ node, ...props }: any) => (
                      <ul className="list-disc list-inside mb-5 space-y-2 text-slate-700" {...props} />
                    ),
                    ol: ({ node, ...props }: any) => (
                      <ol className="list-decimal list-inside mb-5 space-y-2 text-slate-700" {...props} />
                    ),
                    li: ({ node, ...props }: any) => (
                      <li className="text-slate-700 mb-2" {...props} />
                    ),
                    blockquote: ({ node, ...props }: any) => (
                      <blockquote className="border-l-4 border-emerald-500 bg-emerald-50 p-5 my-6 italic text-slate-700 rounded-r-lg" {...props} />
                    ),
                    code: ({ node, inline, ...props }: any) =>
                      inline ? (
                        <code className="bg-slate-100 px-2 py-1 rounded text-sm font-mono text-slate-900" {...props} />
                      ) : (
                        <pre className="bg-slate-900 text-slate-100 p-5 rounded-lg overflow-x-auto my-5">
                          <code className="font-mono text-sm" {...props} />
                        </pre>
                      ),
                    table: ({ node, ...props }: any) => (
                      <table className="w-full border-collapse border border-slate-300 my-5" {...props} />
                    ),
                    th: ({ node, ...props }: any) => (
                      <th className="border border-slate-300 bg-slate-100 p-3 text-left font-semibold" {...props} />
                    ),
                    td: ({ node, ...props }: any) => (
                      <td className="border border-slate-300 p-3" {...props} />
                    ),
                    a: ({ node, ...props }: any) => (
                      <a className="text-emerald-600 hover:text-emerald-700 underline transition-colors" {...props} />
                    ),
                  }}
                >
                  {currentContent || ''}
                </ReactMarkdown>
              </div>

              {/* 转化按钮 */}
              <div className="mt-12 border-t border-slate-200 pt-8">
                <div className="rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 p-8 border border-emerald-200">
                  <h3 className="mb-3 text-lg font-semibold text-emerald-900">{t('blog.cta')}</h3>
                  <p className="mb-6 text-emerald-800 leading-relaxed">{t('blog.ctaDescription')}</p>
                  <Link href="/">
                    <Button className="bg-emerald-600 hover:bg-emerald-700 transition-all hover:shadow-lg">
                      <BookOpen className="mr-2 h-4 w-4" />
                      {t('blog.tryNow')}
                    </Button>
                  </Link>
                </div>
              </div>

              {/* 关键词 */}
              <div className="mt-10 border-t border-slate-200 pt-8">
                <h4 className="mb-4 font-semibold text-slate-900 text-sm uppercase tracking-wide">Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {article.keywords.map((keyword) => (
                    <Badge key={keyword} variant="secondary" className="hover:bg-slate-200 transition-colors">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* 专家咨询 CTA */}
              <div className="mt-10 border-t border-slate-200 pt-8">
                <div className="rounded-lg bg-slate-900 p-8 text-white">
                  <h3 className="mb-3 text-lg font-semibold">Need Expert Guidance?</h3>
                  <p className="mb-6 text-slate-300">Our CDISC specialists are ready to help optimize your clinical trial data.</p>
                  <div className="flex flex-wrap gap-4">
                    <Button className="bg-white text-slate-900 hover:bg-slate-100 transition-all">
                      <Mail className="mr-2 h-4 w-4" />
                      Request a Demo
                    </Button>
                    <Button variant="outline" className="border-white text-white hover:bg-white/10 transition-all">
                      <Phone className="mr-2 h-4 w-4" />
                      Contact Expert
                    </Button>
                  </div>
                </div>
              </div>
            </article>

            {/* 相关文章 */}
            {relatedArticles.length > 0 && (
              <div className="mt-16">
                <h2 className="mb-8 text-2xl font-bold text-slate-900">Related Articles</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {relatedArticles.map((relArticle) => (
                    <Link key={relArticle.slug} href={`/blog/${relArticle.slug}`}>
                      <Card className="h-full transition-all hover:shadow-lg hover:border-emerald-200 cursor-pointer group">
                        <CardHeader>
                          <div className="mb-2 flex gap-2">
                            <Badge variant="secondary" className="group-hover:bg-emerald-100 transition-colors">{relArticle.category}</Badge>
                          </div>
                          <CardTitle className="line-clamp-2 text-lg group-hover:text-emerald-600 transition-colors">
                            {i18n.language === 'en' ? (relArticle.titleEn || relArticle.title) : relArticle.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="mb-4 line-clamp-3 text-sm text-slate-600">
                            {i18n.language === 'en' ? (relArticle.descriptionEn || relArticle.description) : relArticle.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {relArticle.readingTime} {t('blog.readingTime')}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* 返回按钮 */}
            <div className="mt-16">
              <Link href="/">
                <Button variant="outline" className="w-full hover:bg-slate-100 transition-all">
                  {t('blog.backToTools')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
