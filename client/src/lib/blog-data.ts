/**
 * 博客文章元数据和内容管理 - 深度内容修复版
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
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-06',
    readingTime: 12,
    category: 'FDA Compliance',
    tags: ['FDA', 'SDTM', 'Clinical Trials', 'Data Audit', 'Compliance'],
    seoTitle: 'FDA 临床试验数据审计完整指南 | SDTM 标准化流程',
    seoDescription: '学习如何通过 FDA 审计：SDTM 数据标准化、质量检查、审计追踪。包含实际案例和最佳实践。',
    keywords: ['FDA审计', 'SDTM标准', '临床试验数据', '数据合规', '医药监管'],
    content: `## 1. 为什么 FDA 审计关注数据标准化？\n\nFDA 评审员需要能够快速、准确地重现申办者的统计结果。SDTM 提供了一个统一框架。`,
  },
  {
    id: '2',
    slug: 'sdtm-vs-adam-standards',
    title: 'SDTM 与 ADaM 的区别 - 为什么两个标准都需要？',
    description: '详细解释 SDTM 和 ADaM 之间的区别，以及为什么 FDA 要求同时提交两种格式的数据。',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-07',
    readingTime: 10,
    category: 'CDISC Standards',
    tags: ['SDTM', 'ADaM', 'CDISC', 'Data Standards', 'Clinical Data'],
    seoTitle: 'SDTM vs ADaM：CDISC 数据标准完全对比',
    seoDescription: 'SDTM 和 ADaM 的关键区别、各自用途、转换流程。',
    keywords: ['SDTM', 'ADaM', 'CDISC标准', '数据转换'],
    content: `## SDTM 与 ADaM：职责的划分\n\nSDTM 是对原始数据的标准化，而 ADaM 是为了支持统计分析。`,
  },
  {
    id: '3',
    slug: 'define-xml-2-1-standard',
    title: 'Define-XML 2.1：FDA 数据字典的新标准',
    description: '介绍 Define-XML 2.1 的新特性，以及如何正确创建符合标准的数据字典。',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-08',
    readingTime: 9,
    category: 'Data Standards',
    tags: ['Define-XML', 'Metadata', 'Data Dictionary', 'CDISC', 'FDA'],
    seoTitle: 'Define-XML 2.1 标准指南',
    seoDescription: '掌握 Define-XML 2.1 新特性。',
    keywords: ['Define-XML', '数据字典', '元数据'],
    content: `## Define-XML 2.1 的重要演进\n\n它是提交包中最核心的文件，2.1 版本增强了机器可读性。`,
  },
  {
    id: '4',
    slug: 'clinical-trial-data-quality-checklist',
    title: '临床试验数据的质量检查清单 - 确保 FDA 合规',
    description: '提供一个详细的数据质量检查清单，帮助企业在提交数据给 FDA 之前进行全面的质量检查。',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-09',
    readingTime: 11,
    category: 'Data Quality',
    tags: ['Data Quality', 'Quality Assurance', 'FDA Compliance'],
    seoTitle: '临床试验数据质量检查清单',
    seoDescription: '完整的数据质量检查清单。',
    keywords: ['数据质量', '质量检查', 'FDA合规'],
    content: `## 提交前必备：5 大质量检查维度\n\n包括外部一致性检查、术语库规范化、时间逻辑检查等。`,
  },
  {
    id: '5',
    slug: 'cdisc-api-integration-guide',
    title: 'CDISC API 集成指南 - 实时访问最新的术语标准',
    description: '介绍如何集成 CDISC API，以及如何使用它来自动化数据转换和验证过程。',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-10',
    readingTime: 10,
    category: 'API Integration',
    tags: ['CDISC API', 'Integration', 'Automation'],
    seoTitle: 'CDISC API 集成完全指南',
    seoDescription: '学习如何集成 CDISC API。',
    keywords: ['CDISC API', 'API集成', '自动化'],
    content: `## 自动化元数据管理的第一步\n\nCDISC Library API 提供了一个可编程的接口，用于访问标准模板。`,
  },
  {
    id: '6',
    slug: 'clinical-data-security-gdpr-hipaa',
    title: '临床试验数据的安全性和隐私保护 - GDPR 和 HIPAA 合规',
    description: '介绍如何在数据标准化过程中实现 GDPR 和 HIPAA 合规，保护患者隐私。',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-11',
    readingTime: 11,
    category: 'Data Security',
    tags: ['GDPR', 'HIPAA', 'Data Privacy'],
    seoTitle: '临床数据 GDPR & HIPAA 合规指南',
    seoDescription: '实现隐私保护最佳实践。',
    keywords: ['GDPR', 'HIPAA', '数据隐私'],
    content: `## 在合规与透明度之间寻找平衡\n\n根据 21 CFR Part 11 要求，临床数据必须受到严格保护。`,
  },
  {
    id: '7',
    slug: 'excel-to-sdtm-conversion-pitfalls',
    title: '从 Excel 到 SDTM - 常见的数据转换陷阱及其避免方法',
    description: '介绍最常见的 Excel 到 SDTM 转换陷阱。',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-12',
    readingTime: 10,
    category: 'Data Conversion',
    tags: ['Excel', 'SDTM', 'Data Conversion'],
    seoTitle: 'Excel 转 SDTM：常见陷阱与解决方案',
    seoDescription: '避免 Excel 转换中的 5 大陷阱。',
    keywords: ['Excel转换', 'SDTM', '转换陷阱'],
    content: `## 为什么 Excel 是“隐形杀手”？\n\n它的灵活性正是数据标准化的敌人，需要严格的数据约束。`,
  },
  {
    id: '8',
    slug: 'adam-dataset-creation-guide',
    title: 'ADaM 数据集的创建 - 从 SDTM 到分析就绪的数据',
    description: '介绍 ADaM 数据集的创建过程。',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-13',
    readingTime: 12,
    category: 'Data Analysis',
    tags: ['ADaM', 'ADSL', 'Data Analysis'],
    seoTitle: 'ADaM 数据集创建完全指南',
    seoDescription: '从 SDTM 创建 ADaM：ADSL、ADEFF 数据集。',
    keywords: ['ADaM', 'ADSL', '数据分析'],
    content: `## 构建统计分析的基石\n\nADaM 不仅仅是数据集，它是统计分析计划的代码实现。`,
  },
  {
    id: '9',
    slug: 'clinical-trial-data-version-control',
    title: '临床试验数据的版本控制和变更管理',
    description: '介绍如何实现有效的版本控制，确保数据的完整性。',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-14',
    readingTime: 9,
    category: 'Data Management',
    tags: ['Version Control', 'Change Management'],
    seoTitle: '临床数据版本控制与变更管理',
    seoDescription: '实现数据版本控制：版本命名、变更日志。',
    keywords: ['版本控制', '变更管理', '数据完整性'],
    content: `## 应对临床研究的动态性\n\n通过 Git 管理你的转换脚本是现代临床团队的标配。`,
  },
  {
    id: '10',
    slug: 'fda-data-submission-best-practices',
    title: 'FDA 数据提交的最佳实践 - 从准备到提交',
    description: '提供一个全面的指南，介绍从准备到提交的所有步骤。',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-15',
    readingTime: 13,
    category: 'FDA Submission',
    tags: ['FDA Submission', 'Regulatory Affairs'],
    seoTitle: 'FDA 数据提交最佳实践',
    seoDescription: '完整的 FDA 数据提交指南。',
    keywords: ['FDA提交', '监管事务', '最佳实践'],
    content: `## 赢得评审员的信任\n\n提交包不仅是数据的堆砌，更是一份说服监管机构的技术文档。`,
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
