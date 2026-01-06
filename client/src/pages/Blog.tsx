import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, Clock, Search } from 'lucide-react';
import { getAllBlogArticles, BLOG_ARTICLES } from '@/lib/blog-data';

export default function Blog() {
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
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-3 hover:opacity-80">
              <div className="rounded-lg bg-emerald-600 p-2">
                <span className="text-lg font-bold text-white">⚡</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">HandyCT 2.0</h1>
                <p className="text-xs text-slate-500">技术博客</p>
              </div>
            </a>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/">
              <a className="text-sm font-medium text-slate-600 hover:text-slate-900">返回工具</a>
            </Link>
          </div>
        </div>
      </header>

      {/* 博客标题区域 */}
      <section className="border-b border-slate-200 bg-white py-12">
        <div className="container">
          <h1 className="mb-4 text-4xl font-bold text-slate-900">FDA 数据审计与 CDISC 标准化</h1>
          <p className="mb-8 text-lg text-slate-600">
            深入探讨临床试验数据标准化、FDA 合规性审查和最佳实践。
          </p>

          {/* 搜索框 */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              placeholder="搜索文章..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* 分类过滤 */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(null)}
              className={selectedCategory === null ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
            >
              全部
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

      {/* 文章列表 */}
      <main className="container py-12">
        {filteredArticles.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
            {filteredArticles.map((article) => (
              <Link key={article.id} href={`/blog/${article.slug}`}>
                <a className="block">
                  <Card className="h-full transition-all hover:shadow-lg hover:border-emerald-200">
                    <CardHeader>
                      <div className="mb-3 flex items-start justify-between">
                        <Badge className="bg-emerald-100 text-emerald-700">{article.category}</Badge>
                        <span className="text-xs text-slate-500">{article.readingTime} 分钟阅读</span>
                      </div>
                      <CardTitle className="line-clamp-2 text-xl hover:text-emerald-600">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">{article.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {article.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm text-slate-500">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(article.publishedDate).toLocaleDateString('zh-CN')}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {article.readingTime} 分钟
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-emerald-600" />
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-slate-200 bg-white p-12 text-center">
            <p className="text-slate-600">未找到匹配的文章</p>
          </div>
        )}
      </main>

      {/* 底部 CTA */}
      <section className="border-t border-slate-200 bg-white py-12">
        <div className="container text-center">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">准备好优化您的临床试验数据了吗？</h2>
          <p className="mb-8 text-slate-600">
            使用 HandyCT 2.0 自动化 CDISC 数据转换，确保 FDA 合规性。
          </p>
          <Link href="/">
            <a>
              <Button className="bg-emerald-600 hover:bg-emerald-700">立即尝试 HandyCT 2.0</Button>
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}
