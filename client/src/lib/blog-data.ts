/**
 * 博客文章元数据和内容管理 - 完整功能版
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
    description: '深入探讨如何通过正确的数据标准化流程通过 FDA 审计。',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-06',
    readingTime: 12,
    category: 'FDA Compliance',
    tags: ['FDA', 'SDTM', 'Compliance'],
    seoTitle: 'FDA 临床试验数据审计完整指南',
    seoDescription: '学习如何通过 FDA 审计。',
    keywords: ['FDA审计', 'SDTM', '合规'],
    content: `## 核心审计要求\n\nFDA 评审员关注数据的可追溯性和完整性。使用 SDTM 标准是确保通过审计的第一步。`
  },
  {
    id: '2',
    slug: 'sdtm-vs-adam-standards',
    title: 'SDTM 与 ADaM 的区别 - 为什么两个标准都需要？',
    description: '详细解释 SDTM 和 ADaM 之间的区别。',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-07',
    readingTime: 10,
    category: 'CDISC Standards',
    tags: ['SDTM', 'ADaM', 'CDISC'],
    seoTitle: 'SDTM vs ADaM：完全对比',
    seoDescription: 'SDTM 和 ADaM 的关键区别。',
    keywords: ['SDTM', 'ADaM'],
    content: `## 职责划分\n\nSDTM 用于展示原始观察结果，而 ADaM 用于支持统计分析和生成 TLFs。`
  },
  {
    id: '3',
    slug: 'define-xml-2-1-standard',
    title: 'Define-XML 2.1：FDA 数据字典的新标准',
    description: '介绍 Define-XML 2.1 的新特性。',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-08',
    readingTime: 9,
    category: 'Data Standards',
    tags: ['Define-XML', 'Metadata'],
    seoTitle: 'Define-XML 2.1 标准指南',
    seoDescription: '掌握 Define-XML 2.1 新特性。',
    keywords: ['Define-XML', '元数据'],
    content: `## 2.1 版本的进步\n\n增强了机器可读性，支持更复杂的变量衍生逻辑描述。`
  },
  {
    id: '4',
    slug: 'clinical-trial-data-quality-checklist',
    title: '临床试验数据的质量检查清单 - 确保 FDA 合规',
    description: '提供详细的数据质量检查清单。',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-09',
    readingTime: 11,
    category: 'Data Quality',
    tags: ['Data Quality', 'Validation'],
    seoTitle: '临床数据质量检查清单',
    seoDescription: '确保提交前的质量。',
    keywords: ['质量检查', '数据验证'],
    content: `## 关键检查点\n\n包括交叉域名一致性检查、术语库映射准确性以及 ISO 8601 时间格式校验。`
  },
  {
    id: '5',
    slug: 'cdisc-api-integration-guide',
    title: 'CDISC API 集成指南 - 实时访问最新的术语标准',
    description: '如何集成 CDISC API。',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-10',
    readingTime: 10,
    category: 'API Integration',
    tags: ['API', 'Integration'],
    seoTitle: 'CDISC API 集成指南',
    seoDescription: '自动化术语查询。',
    keywords: ['CDISC API', '自动化'],
    content: `## 实时标准同步\n\n通过 CDISC Library API，可以自动获取最新的 Controlled Terminology，减少人工录入错误。`
  },
  {
    id: '6',
    slug: 'clinical-data-security-gdpr-hipaa',
    title: '临床试验数据的安全性和隐私保护 - GDPR 和 HIPAA 合规',
    description: '数据标准化过程中的隐私保护。',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-11',
    readingTime: 11,
    category: 'Data Security',
    tags: ['Privacy', 'GDPR'],
    seoTitle: '临床数据安全指南',
    seoDescription: '数据加密与脱敏。',
    keywords: ['数据安全', '隐私保护'],
    content: `## 安全协议\n\n所有提交至监管机构的数据必须经过脱敏处理，确保受试者 PII 信息不被泄露。`
  },
  {
    id: '7',
    slug: 'excel-to-sdtm-conversion-pitfalls',
    title: '从 Excel 到 SDTM - 常见的数据转换陷阱及其避免方法',
    description: '最常见的转换陷阱。',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-12',
    readingTime: 10,
    category: 'Data Conversion',
    tags: ['Excel', 'SDTM'],
    seoTitle: 'Excel 转 SDTM 陷阱',
    seoDescription: '避免常见的转换错误。',
    keywords: ['Excel', 'SDTM'],
    content: `## 避坑指南\n\n警惕 Excel 自动日期转换和隐藏字符。建议在转换前使用脚本进行数据清理。`
  },
  {
    id: '8',
    slug: 'adam-dataset-creation-guide',
    title: 'ADaM 数据集的创建 - 从 SDTM 到分析就绪的数据',
    description: 'ADaM 数据集的创建过程。',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-13',
    readingTime: 12,
    category: 'Data Analysis',
    tags: ['ADaM', 'Analysis'],
    seoTitle: 'ADaM 创建指南',
    seoDescription: '从 SDTM 到分析。',
    keywords: ['ADaM', '分析'],
    content: `## 分析模型\n\n构建 ADSL 是所有分析的基础，确保所有派生变量具备单向追溯性。`
  },
  {
    id: '9',
    slug: 'clinical-trial-data-version-control',
    title: '临床试验数据的版本控制和变更管理',
    description: '有效的版本控制和变更管理。',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-14',
    readingTime: 9,
    category: 'Data Management',
    tags: ['Git', 'Management'],
    seoTitle: '临床数据版本管理',
    seoDescription: '确保数据一致性。',
    keywords: ['版本控制', '管理'],
    content: `## 变更审计\n\n每一次数据结构的修改都应在变更日志中记录，以满足监管机构对审计追踪的要求。`
  },
  {
    id: '10',
    slug: 'fda-data-submission-best-practices',
    title: 'FDA 数据提交的最佳实践 - 从准备到提交',
    description: '全面的数据提交指南。',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-15',
    readingTime: 13,
    category: 'FDA Submission',
    tags: ['FDA', 'Submission'],
    seoTitle: 'FDA 数据提交最佳实践',
    seoDescription: '加速上市流程。',
    keywords: ['FDA', '提交'],
    content: `## 成功提交\n\n高质量的 Reviewer's Guide 是说服评审员的关键，应清晰解释所有 Pinnacle 21 的验证结果。`
  },
];

export function getBlogArticleBySlug(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find((article) => article.slug === slug);
}

export function getAllBlogArticles(): BlogArticle[] {
  return [...BLOG_ARTICLES].sort(
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
