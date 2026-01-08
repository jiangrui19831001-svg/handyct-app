import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, Clock, Search, Zap } from 'lucide-react';
import { getAllBlogArticles, BLOG_ARTICLES } from '@/lib/blog-data';
import LanguageSwitcher from '@/components/LanguageSwitcher';

// 分类翻译映射
const CATEGORY_TRANSLATIONS: { [key: string]: { zh: string; en: string } } = {
  'FDA Compliance': { zh: 'FDA 合规性', en: 'FDA Compliance' },
  'CDISC Standards': { zh: 'CDISC 标准', en: 'CDISC Standards' },
  'Data Standards': { zh: '数据标准', en: 'Data Standards' },
  'Data Quality': { zh: '数据质量', en: 'Data Quality' },
  'API Integration': { zh: 'API 集成', en: 'API Integration' },
  'Data Management': { zh: '数据管理', en: 'Data Management' },
  'Regulatory Compliance': { zh: '监管合规性', en: 'Regulatory Compliance' },
  'Best Practices': { zh: '最佳实践', en: 'Best Practices' },
  'Technical Guide': { zh: '技术指南', en: 'Technical Guide' },
};

export default function Blog() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { t, i18n } = useTranslation();
  const articles = getAllBlogArticles();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // 进入页面时滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 获取所有分类
  const categories = Array.from(new Set(BLOG_ARTICLES.map((a) => a.category)));

  // 获取当前语言的文章标题和描述
  const getArticleTitle = (article: any) => {
    return i18n.language === 'en' ? (article.titleEn || article.title) : article.title;
  };

  const getArticleDescription = (article: any) => {
    return i18n.language === 'en' ? (article.descriptionEn || article.description) : article.description;
  };

  // 获取当前语言的分类名称
  const getCategoryName = (category: string) => {
    const translation = CATEGORY_TRANSLATIONS[category];
    if (translation) {
      return i18n.language === 'en' ? translation.en : translation.zh;
    }
    return category;
  };

  // 获取当前语言的标签
  const getArticleTags = (article: any) => {
    return i18n.language === 'en' ? article.tags : (article.tagsZh || article.tags);
  };

  // 过滤文章 - 支持中英文搜索
  const filteredArticles = articles.filter((article) => {
    const currentTitle = getArticleTitle(article);
    const currentDescription = getArticleDescription(article);
    const chineseTitle = article.title;
    const chineseDescription = article.description;
    const englishTitle = article.titleEn || article.title;
    const englishDescription = article.descriptionEn || article.description;
    const currentTags = getArticleTags(article);
    
    const matchesSearch =
      currentTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currentDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chineseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chineseDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      englishTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      englishDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (article.tagsZh || []).some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      currentTags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = !selectedCategory || article.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/#/" className="flex items-center gap-3 hover:opacity-80 cursor-pointer no-underline">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">HandyCT 2.0</h1>
              <p className="text-xs text-slate-500">{t('blog.subtitle')}</p>
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
                {getCategoryName(category)}
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
                        <CardTitle className="line-clamp-2">{getArticleTitle(article)}</CardTitle>
                        <CardDescription className="mt-2 line-clamp-2">
                          {getArticleDescription(article)}
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
                      <Badge variant="secondary">{getCategoryName(article.category)}</Badge>
                      {getArticleTags(article).map((tag: string) => (
                        <Badge key={tag} variant="secondary">
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
