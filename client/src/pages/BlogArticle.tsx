import { useState, useMemo, useEffect } from 'react';
import { useRoute, Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock, BookOpen } from 'lucide-react';
import { getBlogArticleBySlug, getRelatedArticles } from '@/lib/blog-data';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function BlogArticle() {
  const [match, params] = useRoute('/blog/:slug');
  const { i18n, t } = useTranslation();
  const article = match ? getBlogArticleBySlug(params?.slug) : null;
  const relatedArticles = article ? getRelatedArticles(article.slug) : [];
  const [showTOC, setShowTOC] = useState(false);
  const [tableOfContents, setTableOfContents] = useState<Array<{id: string, text: string, level: number}>>([]);
  const [headingIndex, setHeadingIndex] = useState(0);

  // Scroll to top when article changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [article?.slug]);

  // Generate table of contents from markdown headings - 根据当前语言生成
  useEffect(() => {
    // 根据当前语言选择要使用的内容
    const contentForTOC = i18n.language === 'en' ? (article?.contentEn || article?.content) : article?.content;
    if (contentForTOC) {
      const headings = contentForTOC.match(/^#{2,3} .+$/gm) || [];
      const toc = headings.map((heading, index) => {
        const match = heading.match(/^#+/);
        const level = match ? match[0].length : 2;
        const text = heading.replace(/^#+\s+/, '');
        // 使用与 ReactMarkdown 组件相同的 ID 生成方式
        const id = `heading-${text.replace(/\s+/g, '-').toLowerCase()}`;
        return { id, text, level };
      });
      setTableOfContents(toc);
    }
  }, [article?.content, article?.contentEn, i18n.language]);

  // 调试：打印 TOC 和实际标题的 ID
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const headings = document.querySelectorAll('h2[id], h3[id]');
      console.log('实际标题 IDs:', Array.from(headings).map(h => h.id));
      console.log('TOC IDs:', tableOfContents.map(t => t.id));
      console.log('当前语言:', i18n.language);
    }
  }, [tableOfContents, i18n.language]);

  // Handle TOC link clicks with smooth scroll
  const handleTOCClick = (id: string) => {
    console.log('尝试滚动到 ID:', id);
    const element = document.getElementById(id);
    if (element) {
      console.log('找到元素，执行滚动');
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      console.log('未找到 ID 为', id, '的元素');
    }
  };

  // 获取当前语言的内容
  const currentContent = i18n.language === 'en' ? (article?.contentEn || article?.content) : article?.content;
  const currentTitle = i18n.language === 'en' ? (article?.titleEn || article?.title) : article?.title;
  const currentDescription = i18n.language === 'en' ? (article?.descriptionEn || article?.description) : article?.description;

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
          <div className="container flex h-16 items-center justify-between">
            <a href="/#/blog" className="no-underline">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                {t('blog.backToBlog')}
              </Button>
            </a>
            <LanguageSwitcher />
          </div>
        </header>
        <main className="container py-12">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold text-slate-900">{t('blog.notFound')}</h1>
            <a href="/#/blog" className="no-underline">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                {t('blog.returnToBlog')}
              </Button>
            </a>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2">
              <img src="/logo-icon.png" alt="HandyCT" className="w-10 h-10" />
              <div>
                <h1 className="text-lg font-bold text-slate-900">HandyCT</h1>
                <p className="text-xs text-slate-500">{t('home.subtitle')}</p>
              </div>
            </a>
          </Link>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/">
              <a className="text-slate-600 hover:text-slate-900 text-sm">{t('common.home')}</a>
            </Link>
            <Link href="/services">
              <a className="text-slate-600 hover:text-slate-900 text-sm">{t('footer.services')}</a>
            </Link>
            <Link href="/security">
              <a className="text-slate-600 hover:text-slate-900 text-sm">{t('footer.security')}</a>
            </Link>
            <Link href="/blog">
              <a className="text-slate-600 hover:text-slate-900 text-sm font-medium text-emerald-600">{t('home.techBlog')}</a>
            </Link>
            <LanguageSwitcher />
          </div>
          <button className="md:hidden">
            <LanguageSwitcher />
          </button>
        </div>
      </header>

      <main className="container py-8 md:py-12">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* 浮动目录（大屏幕固定） */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-20 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="mb-4 font-semibold text-slate-900">{t('blog.tableOfContents')}</h3>
              <nav className="space-y-2 text-sm">
                {tableOfContents.length > 0 ? (
                  tableOfContents.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleTOCClick(item.id)}
                      className={`block w-full text-left text-slate-600 hover:text-emerald-600 transition-colors ${
                        item.level === 3 ? 'ml-4' : ''
                      }`}
                    >
                      {item.text}
                    </button>
                  ))
                ) : (
                  <p className="text-slate-500">No headings</p>
                )}
              </nav>
            </div>
          </aside>

          {/* 主要内容 */}
          <div className="lg:col-span-3">
            {/* 文章头部 */}
            <article className="rounded-lg border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
              {/* 元信息 */}
              <div className="mb-6 border-b border-slate-200 pb-6">
                <div className="mb-4 flex flex-wrap gap-2">
                  <Badge variant="secondary">{article.category}</Badge>
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h1 className="mb-3 text-3xl md:text-4xl font-bold text-slate-900">{currentTitle}</h1>
                <p className="mb-4 text-base md:text-lg text-slate-600">{currentDescription}</p>

                <div className="flex flex-wrap gap-4 md:gap-6 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(article.publishedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
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
                      <h1 className="text-3xl font-bold mt-8 mb-4 text-slate-900 scroll-mt-20" {...props} />
                    ),
                    h2: ({ node, children, ...props }: any) => {
                      const id = `heading-${String(children || '').replace(/\s+/g, '-').toLowerCase()}`;
                      return (
                        <h2 id={id} className="text-2xl font-bold mt-6 mb-3 text-slate-900 scroll-mt-20" {...props}>
                          {children}
                        </h2>
                      );
                    },
                    h3: ({ node, children, ...props }: any) => {
                      const id = `heading-${String(children || '').replace(/\s+/g, '-').toLowerCase()}`;
                      return (
                        <h3 id={id} className="text-xl font-semibold mt-4 mb-2 text-slate-900 scroll-mt-20" {...props}>
                          {children}
                        </h3>
                      );
                    },
                    p: ({ node, ...props }: any) => (
                      <p className="text-slate-700 leading-relaxed mb-4" {...props} />
                    ),
                    ul: ({ node, ...props }: any) => (
                      <ul className="list-disc list-inside mb-4 space-y-2 text-slate-700" {...props} />
                    ),
                    ol: ({ node, ...props }: any) => (
                      <ol className="list-decimal list-inside mb-4 space-y-2 text-slate-700" {...props} />
                    ),
                    li: ({ node, ...props }: any) => (
                      <li className="text-slate-700" {...props} />
                    ),
                    blockquote: ({ node, ...props }: any) => (
                      <blockquote className="border-l-4 border-emerald-500 bg-emerald-50 p-4 my-4 italic text-slate-700" {...props} />
                    ),
                    code: ({ node, inline, ...props }: any) =>
                      inline ? (
                        <code className="bg-slate-100 px-2 py-1 rounded text-sm font-mono text-slate-900" {...props} />
                      ) : (
                        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto my-4">
                          <code className="font-mono text-sm" {...props} />
                        </pre>
                      ),
                    table: ({ node, ...props }: any) => (
                      <table className="w-full border-collapse border border-slate-300 my-4" {...props} />
                    ),
                    th: ({ node, ...props }: any) => (
                      <th className="border border-slate-300 bg-slate-100 p-2 text-left font-semibold" {...props} />
                    ),
                    td: ({ node, ...props }: any) => (
                      <td className="border border-slate-300 p-2" {...props} />
                    ),
                    a: ({ node, ...props }: any) => (
                      <a className="text-emerald-600 hover:text-emerald-700 underline" {...props} />
                    ),
                  }}
                >
                  {currentContent || ''}
                </ReactMarkdown>
              </div>

              {/* 转化按钮 */}
              <div className="mt-12 border-t border-slate-200 pt-8">
                <div className="rounded-lg bg-emerald-50 p-6">
                  <h3 className="mb-2 text-lg font-semibold text-emerald-900">{t('blog.cta')}</h3>
                  <p className="mb-4 text-emerald-800">{t('blog.ctaDescription')}</p>
                  <a href="/#/" className="no-underline">
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                      <BookOpen className="mr-2 h-4 w-4" />
                      {t('blog.tryNow')}
                    </Button>
                  </a>
                </div>
              </div>

              {/* 关键词 */}
              <div className="mt-8 border-t border-slate-200 pt-6">
                <h4 className="mb-3 font-semibold text-slate-900">{t('blog.keywords')}</h4>
                <div className="flex flex-wrap gap-2">
                  {article.keywords.map((keyword) => (
                    <Badge key={keyword} variant="secondary">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </article>

            {/* 相关文章 */}
            {relatedArticles.length > 0 && (
              <div className="mt-12">
                <h2 className="mb-6 text-2xl font-bold text-slate-900">{t('blog.relatedArticles')}</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {relatedArticles.map((relArticle) => (
                    <a key={relArticle.slug} href={`/#/blog/${relArticle.slug}`} className="block no-underline">
                      <Card className="h-full transition-shadow hover:shadow-lg cursor-pointer">
                        <CardHeader>
                          <div className="mb-2 flex gap-2">
                            <Badge variant="secondary">{relArticle.category}</Badge>
                          </div>
                          <CardTitle className="line-clamp-2 text-lg">
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
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* 返回按钮 */}
            <div className="mt-12">
              <a href="/#/" className="no-underline">
                <Button variant="outline" className="w-full">
                  {t('blog.backToTools')}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-slate-900 mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link href="/"><a className="hover:text-slate-900">Converter</a></Link></li>
                <li><Link href="/services"><a className="hover:text-slate-900">Services</a></Link></li>
                <li><Link href="/security"><a className="hover:text-slate-900">Security</a></Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link href="/blog"><a className="hover:text-slate-900">Blog</a></Link></li>
                <li><Link href="/contact"><a className="hover:text-slate-900">Contact</a></Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-slate-900">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-slate-900">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-4">Standards</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>FDA Compliant</li>
                <li>CDISC Standards</li>
                <li>GDPR & HIPAA Ready</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-8 text-center text-sm text-slate-600">
            <p>&copy; 2026 HandyCT. All rights reserved. | <a href="#" className="hover:text-slate-900">Privacy</a> | <a href="#" className="hover:text-slate-900">Terms</a></p>
            <p className="mt-2">HandyCT is a tool for CDISC data conversion. Always verify converted data before submission.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
