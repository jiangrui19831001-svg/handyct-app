import { useState } from 'react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, Clock, Search, ChevronRight } from 'lucide-react';
import { getAllBlogArticles, BLOG_ARTICLES } from '@/lib/blog-data';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Blog() {
  const { i18n, t } = useTranslation();
  const articles = getAllBlogArticles();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 获取所有分类
  const categories = Array.from(new Set(BLOG_ARTICLES.map((a) => a.category)));

  // 过滤文章
  const filteredArticles = articles.filter((article) => {
    const currentTitle = i18n.language === 'en' ? (article.titleEn || article.title) : article.title;
    const currentDescription = i18n.language === 'en' ? (article.descriptionEn || article.description) : article.description;
    
    const matchesSearch =
      currentTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currentDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = !selectedCategory || article.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-3 hover:opacity-80 cursor-pointer transition-opacity">
              <div className="rounded-lg bg-emerald-600 p-2">
                <span className="text-lg font-bold text-white">⚡</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">HandyCT 2.0</h1>
                <p className="text-xs text-slate-500">Tech Blog</p>
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/">
              <span className="text-sm font-medium text-slate-600 hover:text-emerald-600 cursor-pointer transition-colors">
                {t('blog.backToTools')}
              </span>
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* 博客标题区域 */}
      <section className="border-b border-slate-200 bg-white py-16">
        <div className="container">
          <div className="mb-8">
            <h1 className="mb-4 text-4xl font-bold text-slate-900 leading-tight">
              {i18n.language === 'en' ? 'FDA Data Audit & CDISC Standardization' : 'FDA 数据审计与 CDISC 标准化'}
            </h1>
            <p className="mb-8 text-lg text-slate-600 leading-relaxed">
              {i18n.language === 'en' 
                ? 'Deep dive into clinical trial data standardization, FDA compliance review, and best practices.'
                : '深入探讨临床试验数据标准化、FDA 合规性审查和最佳实践。'}
            </p>
          </div>

          {/* 搜索框 */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              placeholder={i18n.language === 'en' ? 'Search articles...' : '搜索文章...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-3 text-base hover:border-emerald-300 focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* 分类过滤 */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(null)}
              className={`transition-all ${
                selectedCategory === null 
                  ? 'bg-emerald-600 hover:bg-emerald-700 shadow-md' 
                  : 'hover:border-emerald-300 hover:text-emerald-600'
              }`}
            >
              {i18n.language === 'en' ? 'All' : '全部'}
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={`transition-all ${
                  selectedCategory === category
                    ? 'bg-emerald-600 hover:bg-emerald-700 shadow-md'
                    : 'hover:border-emerald-300 hover:text-emerald-600'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* 结果计数 */}
          <div className="mt-6 text-sm text-slate-600">
            {filteredArticles.length} {i18n.language === 'en' ? 'articles found' : '篇文章'}
          </div>
        </div>
      </section>

      {/* 文章列表 */}
      <main className="container py-16">
        {filteredArticles.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
            {filteredArticles.map((article) => {
              const currentTitle = i18n.language === 'en' ? (article.titleEn || article.title) : article.title;
              const currentDescription = i18n.language === 'en' ? (article.descriptionEn || article.description) : article.description;
              
              return (
                <Link key={article.id} href={`/blog/${article.slug}`}>
                  <div className="block">
                    <Card className="h-full transition-all hover:shadow-lg hover:border-emerald-200 hover:scale-[1.01] group">
                      <CardHeader>
                        <div className="mb-3 flex items-start justify-between">
                          <Badge className="bg-emerald-100 text-emerald-700 group-hover:bg-emerald-200 transition-colors">
                            {article.category}
                          </Badge>
                          <span className="text-xs text-slate-500">{article.readingTime} {i18n.language === 'en' ? 'min read' : '分钟阅读'}</span>
                        </div>
                        <CardTitle className="line-clamp-2 text-xl group-hover:text-emerald-600 transition-colors">
                          {currentTitle}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 mt-2">
                          {currentDescription}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {article.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs group-hover:border-emerald-300 transition-colors">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-sm text-slate-500">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-emerald-600" />
                              {new Date(article.publishedDate).toLocaleDateString(i18n.language === 'en' ? 'en-US' : 'zh-CN')}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-emerald-600" />
                              {article.readingTime} {i18n.language === 'en' ? 'min' : '分钟'}
                            </div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="rounded-lg border border-slate-200 bg-white p-16 text-center">
            <p className="text-slate-600 text-lg">
              {i18n.language === 'en' ? 'No articles found' : '未找到匹配的文章'}
            </p>
          </div>
        )}
      </main>

      {/* 底部 CTA */}
      <section className="border-t border-slate-200 bg-white py-16">
        <div className="container text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 leading-tight">
            {i18n.language === 'en' 
              ? 'Ready to Optimize Your Clinical Trial Data?'
              : '准备好优化您的临床试验数据了吗？'}
          </h2>
          <p className="mb-8 text-slate-600 text-lg leading-relaxed">
            {i18n.language === 'en'
              ? 'Automate CDISC data conversion with HandyCT 2.0 and ensure FDA compliance.'
              : '使用 HandyCT 2.0 自动化 CDISC 数据转换，确保 FDA 合规性。'}
          </p>
          <Link href="/">
            <Button className="bg-emerald-600 hover:bg-emerald-700 transition-all hover:shadow-lg px-8 py-3 text-base">
              {i18n.language === 'en' ? 'Try HandyCT 2.0 Now' : '立即尝试 HandyCT 2.0'}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
