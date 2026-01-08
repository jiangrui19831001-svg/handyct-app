import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, Clock, Search } from 'lucide-react';
import { getAllBlogArticles, BLOG_ARTICLES } from '@/lib/blog-data';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Blog() {
  const { t } = useTranslation();
  const articles = getAllBlogArticles();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 获取所有分类
  const categories = Array.from(new Set(BLOG_ARTICLES.map((a) => a.category)));

  // 过滤文章
  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = !selectedCategory || article.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <a href="/#/" className="flex items-center gap-3 hover:opacity-80 cursor-pointer no-underline">
            <div className="rounded-lg bg-emerald-600 p-2">
              <span className="text-lg font-bold text-white">⚡</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">HandyCT 2.0</h1>
              <p className="text-xs text-slate-500">{t('blog.title')}</p>
            </div>
          </a>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <a href="/#/" className="text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer no-underline">
              {t('blog.backToTools')}
            </a>
          </div>
        </div>
      </header>

      {/* Blog Title Section */}
      <section className="border-b border-slate-200 bg-white py-12">
        <div className="container">
          <h1 className="mb-4 text-4xl font-bold text-slate-900">{t('blog.title')}</h1>
          <p className="mb-8 text-lg text-slate-600">
            {t('blog.subtitle')}
          </p>

          {/* Search Box */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              placeholder={t('blog.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(null)}
              className={selectedCategory === null ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
            >
              {t('blog.all')}
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Article List */}
      <main className="container py-12">
        {filteredArticles.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
            {filteredArticles.map((article) => (
              <a key={article.id} href={`/#/blog/${article.slug}`} className="block no-underline">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                        <CardDescription className="mt-2 line-clamp-2">
                          {article.description}
                        </CardDescription>
                      </div>
                      <ArrowRight className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-1" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {article.publishedDate}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {article.readingTime} {t('blog.readingTime')}
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Badge variant="secondary">{article.category}</Badge>
                      {article.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-600">{t('blog.notFound')}</p>
          </div>
        )}
      </main>
    </div>
  );
}
