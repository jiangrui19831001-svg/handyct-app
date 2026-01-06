/**
 * 博客文章元数据和内容管理 - 深度价值资产版
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
    tags: ['FDA', 'SDTM', 'Compliance'],
    seoTitle: 'FDA 临床试验数据审计完整指南',
    seoDescription: '学习如何通过 FDA 审计：SDTM 数据标准化、质量检查、审计追踪。',
    keywords: ['FDA审计', 'SDTM', '合规'],
    content: `## 1. 为什么 FDA 审计关注数据标准化？\n\nFDA 评审员需要能够快速、准确地重现申办者的统计结果。SDTM 提供了一个统一的框架，使得评审员可以使用标准化的工具进行自动化检查。审计的核心支柱包括：\n- **可追溯性 (Traceability)**：从临床摘要到原始数据的端到端链路。\n- **数据完整性 (Data Integrity)**：确保数据在转换过程中未被篡改。\n\n## 2. 准备审计的关键步骤\n\n### 执行内部验证\n在提交前，必须运行最新的验证规则。任何“Error”都应被修复，而“Warning”必须在审评说明中给出合逻辑的解释。使用 HandyCT 2.0 可以自动化这一流程，确保数据在源头就符合监管要求。`
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
    tags: ['SDTM', 'ADaM', 'CDISC'],
    seoTitle: 'SDTM vs ADaM：CDISC 数据标准完全对比',
    seoDescription: 'SDTM 和 ADaM 的关键区别、各自用途。',
    keywords: ['SDTM', 'ADaM', 'CDISC'],
    content: `## SDTM 与 ADaM：职责的划分\n\n### SDTM：数据的“原貌”\nSDTM 是对采集到的原始临床数据进行标准化的模型。它的核心目的是**存储和展示**。每个域名都反映了研究中特定的观察结果，不包含任何分析逻辑。\n\n### ADaM：分析的“引擎”\nADaM 是为了支持统计分析而设计的。它直接用于生成图表。ADaM 允许包含衍生数据，比如“基线改变值”或“复合终点指标”。两者相辅相成，确保了从数据采集到结论分析的透明度。`
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
    tags: ['Define-XML', 'Metadata'],
    seoTitle: 'Define-XML 2.1 标准指南',
    seoDescription: '掌握 Define-XML 2.1 新特性。',
    keywords: ['Define-XML', '元数据'],
    content: `## Define-XML 2.1 的重要演进\n\nDefine-XML 是提交包中最核心的文件之一。2.1 版本增强了机器可读性，使得元数据驱动的审评成为可能。关键改进点包括：\n- **对 Value Level Metadata 的增强描述**：允许对同一个变量在不同条件下的取值进行定义。\n- **支持标准子集**：更好地支持 CDISC Library 术语库集成。\n\n高质量的元数据是成功提交的保障，它充当了评审员的“地图”。`
  },
  {
    id: '4',
    slug: 'clinical-trial-data-quality-checklist',
    title: '临床试验数据的质量检查清单 - 确保 FDA 合规',
    description: '提供一个详细的数据质量检查清单，帮助企业在提交数据前进行全面质量检查。',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-09',
    readingTime: 11,
    category: 'Data Quality',
    tags: ['Quality', 'Checklist'],
    seoTitle: '临床数据质量检查清单',
    seoDescription: '完整的数据质量检查清单。',
    keywords: ['数据质量', '质量检查'],
    content: `## 提交前必备：质量检查维度\n\n在数据锁库前，必须进行以下检查：\n1. **外部一致性检查**：确保 AE, DS, DM 域名中的关键日期（如死亡日期）同步。\n2. **术语库规范化**：所有 AE 术语是否正确映射到最新的 MedDRA 版本？\n3. **时间逻辑检查**：受试者随机化日期是否在知情同意之后？\n\nHandyCT 2.0 的自动化验证模块可以覆盖 90% 以上的静态检查需求。`
  },
  {
    id: '5',
    slug: 'cdisc-api-integration-guide',
    title: 'CDISC API 集成指南 - 实时访问最新的术语标准',
    description: '介绍如何集成 CDISC API，自动化数据转换和验证过程。',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-10',
    readingTime: 10,
    category: 'API Integration',
    tags: ['API', 'Integration'],
    seoTitle: 'CDISC API 集成完全指南',
    seoDescription: '学习如何集成 CDISC API。',
    keywords: ['CDISC API', '自动化'],
    content: `## 自动化元数据管理\n\nCDISC Library API 提供了一个可编程接口。集成步骤包括：\n- **获取 API Key**：在官方平台注册。\n- **调用 Endpoint**：获取最新的 SDTM IG v3.4 域名规格。\n\n这种集成可以实现“动态版本升级”，当标准更新时，系统自动拉取新定义，极大降低了人工比对的错误率。`
  },
  {
    id: '6',
    slug: 'clinical-data-security-gdpr-hipaa',
    title: '临床试验数据的安全性和隐私保护 - GDPR 和 HIPAA 合规',
    description: '介绍如何在数据标准化过程中实现隐私保护。',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-11',
    readingTime: 11,
    category: 'Data Security',
    tags: ['Security', 'GDPR'],
    seoTitle: '临床数据安全指南',
    seoDescription: '实现隐私保护最佳实践。',
    keywords: ['GDPR', 'HIPAA', '隐私保护'],
    content: `## 保护受试者隐私\n\n根据 GDPR 和 HIPAA，临床数据必须进行脱敏。在 SDTM 转换中，必须将姓名、身份证号等 PII 信息替换为唯一的 USUBJID。同时，所有云端处理过程必须采用 TLS 1.3 加密。系统必须记录详细的审计追踪（Audit Trail），以备监管机构核查。`
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
    tags: ['Excel', 'SDTM'],
    seoTitle: 'Excel 转 SDTM 陷阱',
    seoDescription: '避免 Excel 转换中的 5 大陷阱。',
    keywords: ['Excel', 'SDTM', '数据转换'],
    content: `## 警惕“隐形杀手”\n\nExcel 虽灵活，但其自动格式转换（如将日期变更为 Jan-25）会导致标准化失败。末尾的空格或不可见字符也会让验证软件报错。建议在导入 HandyCT 前先进行数据预处理，强制执行数据类型约束。`
  },
  {
    id: '8',
    slug: 'adam-dataset-creation-guide',
    title: 'ADaM 数据集的创建 - 从 SDTM 到分析就绪的数据',
    description: '介绍 ADaM 数据集的创建过程，包括 ADSL 等关键数据集。',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-13',
    readingTime: 12,
    category: 'Data Analysis',
    tags: ['ADaM', 'Analysis'],
    seoTitle: 'ADaM 数据集创建指南',
    seoDescription: '从 SDTM 创建分析数据集。',
    keywords: ['ADaM', 'ADSL', '统计分析'],
    content: `## 构建分析的桥梁\n\nADaM 的核心是支持统计分析计划。ADSL（人口学分析数据集）是所有后续分析的基础。在创建时，必须保持单向追溯性，确保评审员能仅凭 ADaM 变量名在 SDTM 中找到源数据。高质量的 ADaM 能显著缩短 FDA 的审评响应周期。`
  },
  {
    id: '9',
    slug: 'clinical-trial-data-version-control',
    title: '临床试验数据的版本控制和变更管理',
    description: '实现有效的版本控制，确保数据的完整性和可追溯性。',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-14',
    readingTime: 9,
    category: 'Data Management',
    tags: ['Git', 'Version Control'],
    seoTitle: '临床数据版本管理',
    seoDescription: '实现数据版本控制最佳实践。',
    keywords: ['版本控制', '变更管理', '审计追踪'],
    content: `## 应对数据的动态变化\n\n数据清洗过程中会有多次变更。建议采用语义化版本（如 v0.9, v1.0.0）。每一次映射脚本的修改都应记录在变更日志中。数据冻结后应立即生成快照，防止非预期的回改，这是数据治理的核心要求。`
  },
  {
    id: '10',
    slug: 'fda-data-submission-best-practices',
    title: 'FDA 数据提交的最佳实践 - 从准备到提交',
    description: '提供一个全面的指南，介绍数据准备到提交的所有步骤。',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-15',
    readingTime: 13,
    category: 'FDA Submission',
    tags: ['FDA', 'Submission'],
    seoTitle: 'FDA 数据提交最佳实践',
    seoDescription: '完整的 FDA 数据提交指南。',
    keywords: ['FDA提交', '监管事务', '最佳实践'],
    content: `## 赢得评审员的信任\n\n提交包不仅是数据的堆砌，更是一份技术说明书。核心要素包括：高质量的审评说明（Reviewer's Guide）以及标准化的文件命名。如果能清晰解释 Pinnacle 21 的遗留警告，将极大增加你的通过概率。`
  }
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
    return article.tags.some(tag => current.tags.includes(tag));
  });
  return related.slice(0, limit);
}
