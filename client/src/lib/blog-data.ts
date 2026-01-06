/**
 * 博客文章元数据和内容管理
 */

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  description: string;
  author: string;
  publishedDate: string;
  readingTime: number;
  category: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  content: string;
  imageUrl?: string;
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: '1',
    slug: 'fda-clinical-trial-data-audit-guide',
    title: 'FDA 临床试验数据审计的完整指南 - 从 SDTM 到合规',
    description: '深入探讨如何通过正确的数据标准化流程通过 FDA 审计，包括数据完整性、可追溯性和合规性的核心要求。',
    author: 'Manus AI',
    publishedDate: '2026-01-06',
    readingTime: 12,
    category: 'FDA Compliance',
    tags: ['FDA', 'SDTM', 'Clinical Trials', 'Data Audit', 'Compliance'],
    seoTitle: 'FDA 临床试验数据审计完整指南 | SDTM 标准化流程',
    seoDescription: '学习如何通过 FDA 审计：SDTM 数据标准化、质量检查、审计追踪。包含实际案例和最佳实践。',
    keywords: ['FDA审计', 'SDTM标准', '临床试验数据', '数据合规', '医药监管'],
    content: 'FDA 临床试验数据审计的完整指南...',
  },
  {
    id: '2',
    slug: 'sdtm-vs-adam-standards',
    title: 'SDTM 与 ADaM 的区别 - 为什么两个标准都需要？',
    description: '详细解释 SDTM 和 ADaM 之间的区别，以及为什么 FDA 要求同时提交两种格式的数据。',
    author: 'Manus AI',
    publishedDate: '2026-01-07',
    readingTime: 10,
    category: 'CDISC Standards',
    tags: ['SDTM', 'ADaM', 'CDISC', 'Data Standards', 'Clinical Data'],
    seoTitle: 'SDTM vs ADaM：CDISC 数据标准完全对比',
    seoDescription: 'SDTM 和 ADaM 的关键区别、各自用途、转换流程。FDA 为什么要求两个标准？',
    keywords: ['SDTM', 'ADaM', 'CDISC标准', '数据转换', '临床数据模型'],
    content: 'SDTM 与 ADaM 的区别...',
  },
  {
    id: '3',
    slug: 'define-xml-2-1-standard',
    title: 'Define-XML 2.1：FDA 数据字典的新标准',
    description: '介绍 Define-XML 2.1 的新特性，以及如何正确创建符合标准的数据字典。',
    author: 'Manus AI',
    publishedDate: '2026-01-08',
    readingTime: 9,
    category: 'Data Standards',
    tags: ['Define-XML', 'Metadata', 'Data Dictionary', 'CDISC', 'FDA'],
    seoTitle: 'Define-XML 2.1 标准指南 | FDA 数据字典创建',
    seoDescription: '掌握 Define-XML 2.1 新特性：衍生变量、缺失值处理、审计追踪。完整的数据字典创建指南。',
    keywords: ['Define-XML', '数据字典', '元数据', 'FDA标准', '2025新标准'],
    content: 'Define-XML 2.1：FDA 数据字典的新标准...',
  },
  {
    id: '4',
    slug: 'clinical-trial-data-quality-checklist',
    title: '临床试验数据的质量检查清单 - 确保 FDA 合规',
    description: '提供一个详细的数据质量检查清单，帮助企业在提交数据给 FDA 之前进行全面的质量检查。',
    author: 'Manus AI',
    publishedDate: '2026-01-09',
    readingTime: 11,
    category: 'Data Quality',
    tags: ['Data Quality', 'Quality Assurance', 'FDA Compliance', 'Clinical Trials'],
    seoTitle: '临床试验数据质量检查清单 | FDA 合规保证',
    seoDescription: '完整的数据质量检查清单：完整性、准确性、代码列表、缺失值处理、审计追踪。',
    keywords: ['数据质量', '质量检查', 'FDA合规', '临床试验', '数据验证'],
    content: '临床试验数据的质量检查清单...',
  },
  {
    id: '5',
    slug: 'cdisc-api-integration-guide',
    title: 'CDISC API 集成指南 - 实时访问最新的术语标准',
    description: '介绍如何集成 CDISC API，以及如何使用它来自动化数据转换和验证过程。',
    author: 'Manus AI',
    publishedDate: '2026-01-10',
    readingTime: 10,
    category: 'API Integration',
    tags: ['CDISC API', 'Integration', 'Automation', 'Terminology', 'Development'],
    seoTitle: 'CDISC API 集成完全指南 | 实时术语查询',
    seoDescription: '学习如何集成 CDISC API：获取 API 密钥、实现代码、错误处理、自动化验证。',
    keywords: ['CDISC API', 'API集成', '术语库', '自动化', '开发指南'],
    content: 'CDISC API 集成指南...',
  },
  {
    id: '6',
    slug: 'clinical-data-security-gdpr-hipaa',
    title: '临床试验数据的安全性和隐私保护 - GDPR 和 HIPAA 合规',
    description: '介绍如何在数据标准化过程中实现 GDPR 和 HIPAA 合规，保护患者隐私。',
    author: 'Manus AI',
    publishedDate: '2026-01-11',
    readingTime: 11,
    category: 'Data Security',
    tags: ['GDPR', 'HIPAA', 'Data Privacy', 'Security', 'Compliance'],
    seoTitle: '临床数据 GDPR & HIPAA 合规指南 | 隐私保护',
    seoDescription: '实现 GDPR 和 HIPAA 合规：数据最小化、加密、访问控制、隐私保护最佳实践。',
    keywords: ['GDPR', 'HIPAA', '数据隐私', '安全合规', '患者隐私'],
    content: '临床试验数据的安全性和隐私保护...',
  },
  {
    id: '7',
    slug: 'excel-to-sdtm-conversion-pitfalls',
    title: '从 Excel 到 SDTM - 常见的数据转换陷阱及其避免方法',
    description: '介绍最常见的 Excel 到 SDTM 转换陷阱及其避免方法。',
    author: 'Manus AI',
    publishedDate: '2026-01-12',
    readingTime: 10,
    category: 'Data Conversion',
    tags: ['Excel', 'SDTM', 'Data Conversion', 'Data Migration', 'Best Practices'],
    seoTitle: 'Excel 转 SDTM：常见陷阱与解决方案',
    seoDescription: '避免 Excel 到 SDTM 转换中的 5 大陷阱：数据类型、缺失值、编码、公式、多工作表。',
    keywords: ['Excel转换', 'SDTM', '数据迁移', '数据清理', '转换陷阱'],
    content: '从 Excel 到 SDTM - 常见的数据转换陷阱...',
  },
  {
    id: '8',
    slug: 'adam-dataset-creation-guide',
    title: 'ADaM 数据集的创建 - 从 SDTM 到分析就绪的数据',
    description: '介绍 ADaM 数据集的创建过程，包括 ADSL、ADEFF、ADAE 等数据集的创建。',
    author: 'Manus AI',
    publishedDate: '2026-01-13',
    readingTime: 12,
    category: 'Data Analysis',
    tags: ['ADaM', 'ADSL', 'Data Analysis', 'Statistical Analysis', 'SAS', 'R'],
    seoTitle: 'ADaM 数据集创建完全指南 | SDTM 到分析数据',
    seoDescription: '从 SDTM 创建 ADaM：ADSL、ADEFF、ADAE 数据集。使用 SAS 或 R 自动化创建。',
    keywords: ['ADaM', 'ADSL', '数据分析', '统计分析', '数据转换'],
    content: 'ADaM 数据集的创建...',
  },
  {
    id: '9',
    slug: 'clinical-trial-data-version-control',
    title: '临床试验数据的版本控制和变更管理',
    description: '介绍如何实现有效的版本控制和变更管理，确保数据的完整性和可追溯性。',
    author: 'Manus AI',
    publishedDate: '2026-01-14',
    readingTime: 9,
    category: 'Data Management',
    tags: ['Version Control', 'Change Management', 'Data Governance', 'Audit Trail'],
    seoTitle: '临床数据版本控制与变更管理 | 数据治理',
    seoDescription: '实现数据版本控制：版本命名、变更日志、数据冻结、变更请求流程。',
    keywords: ['版本控制', '变更管理', '数据治理', '审计追踪', '数据完整性'],
    content: '临床试验数据的版本控制和变更管理...',
  },
  {
    id: '10',
    slug: 'fda-data-submission-best-practices',
    title: 'FDA 数据提交的最佳实践 - 从准备到提交',
    description: '提供一个全面的指南，介绍从数据准备到最终提交的所有步骤。',
    author: 'Manus AI',
    publishedDate: '2026-01-15',
    readingTime: 13,
    category: 'FDA Submission',
    tags: ['FDA Submission', 'Data Submission', 'Regulatory Affairs', 'Best Practices'],
    seoTitle: 'FDA 数据提交最佳实践 | 从准备到上市',
    seoDescription: '完整的 FDA 数据提交指南：准备、格式、内容、提交后跟进。加快药物上市。',
    keywords: ['FDA提交', '数据提交', '监管事务', '上市流程', '最佳实践'],
    content: 'FDA 数据提交的最佳实践...',
  },
];

export function getBlogArticleBySlug(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find((article) => article.slug === slug);
}

export function getAllBlogArticles(): BlogArticle[] {
  return BLOG_ARTICLES.sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );
}

export function getBlogArticlesByCategory(category: string): BlogArticle[] {
  return BLOG_ARTICLES.filter((article) => article.category === category).sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );
}

export function getBlogArticlesByTag(tag: string): BlogArticle[] {
  return BLOG_ARTICLES.filter((article) => article.tags.includes(tag)).sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );
}

export function getRelatedArticles(currentSlug: string, limit: number = 3): BlogArticle[] {
  const current = getBlogArticleBySlug(currentSlug);
  if (!current) return [];

  const related = BLOG_ARTICLES.filter((article) => {
    if (article.slug === currentSlug) return false;
    const commonTags = article.tags.filter((tag) => current.tags.includes(tag));
    return commonTags.length > 0;
  });

  return related.slice(0, limit);
}
