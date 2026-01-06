/**
 * 博客文章元数据和内容管理 - 深度专业资产版 (v2.0)
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
    slug: 'fda-data-submission-best-practices',
    title: 'FDA 数据提交的最佳实践 - 从准备到提交',
    description: '药企数据提交的最终成功指南，涵盖从数据清洗到最终 eCTD 提交的全流程。',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-15',
    readingTime: 13,
    category: 'FDA Submission',
    tags: ['FDA', 'Submission', 'Regulatory'],
    seoTitle: 'FDA 数据提交最佳实践 | 临床试验合规指南',
    seoDescription: '深度解析 FDA 数据提交全流程，包括 SDTM 转换、P21 验证及 SDRG 编写。',
    keywords: ['FDA提交', '数据合规', 'CDISC', 'SDRG'],
    content: `
# FDA 数据提交的终极成功指南

在现代药物研发中，向 FDA 提交的数据质量直接决定了审评周期。一份不合规的提交包可能导致 **Refuse to File (RTF)**，造成数百万美元的损失。

---

## 一、 准备阶段：构建“不可动摇”的基础

### 1. ALCOA+ 原则的落地
所有提交数据必须满足：**可归属性、清晰性、同步性、原始性和准确性**。
- **原始数据核对**：确保源数据（Raw Data）与 SDTM 的映射链路完全透明。
- **映射规范 (Mapping Spec)**：在写代码前，必须完成详尽的字段映射文档。

> **专家提示：** 评审员最反感的是在 SDTM 中看到无法解释的派生逻辑。

---

## 二、 转换阶段：SDTM 与 ADaM 的黄金准则

### 1. SDTM 的追溯性 (Traceability)
SDTM 域名必须严格遵守 CDISC IG 3.4 版本。
- **USUBJID 的唯一性**：跨研究集成时，确保受试者 ID 的全局唯一。
- **ISO 8601 格式**：日期和时间必须符合规范，哪怕是缺失日期的补齐。

### 2. ADaM 的分析就绪性
ADaM 不仅是数据集，更是统计逻辑的体现。**ADSL** 是灵魂，它决定了所有后续分析的基准。

---

## 三、 验证与提交：跨越最后的障碍

### 1. Pinnacle 21 验证策略
0 个 **Error** 是底线。对于无法消除的 **Warning**，必须在 **SDRG (Study Data Reviewer's Guide)** 中逐条说明。

### 2. 定义文件的力量 (Define-XML 2.1)
Define-XML 是评审员的地图。如果链接（Link）无法直接跳转到对应的计算逻辑或代码，审评效率将大幅下降。

---

**结论：** 成功的提交在于细节。使用 HandyCT 2.0 的自动化引擎，可以将手动检查工作量降低 70% 以上。
`
  },
  {
    id: '2',
    slug: 'sdtm-vs-adam-standards',
    title: 'SDTM 与 ADaM 的深度博弈：职责、差异与共生',
    description: '深入探讨 SDTM 和 ADaM 的技术差异，以及它们如何共同构建监管透明度。',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-14',
    readingTime: 10,
    category: 'CDISC Standards',
    tags: ['SDTM', 'ADaM', 'CDISC'],
    seoTitle: 'SDTM vs ADaM 深度对比 | CDISC 标准解析',
    seoDescription: '解析 SDTM（展示模型）与 ADaM（分析模型）的区别，确保临床数据合规提交。',
    keywords: ['SDTM', 'ADaM', '数据标准'],
    content: `
# SDTM vs ADaM：临床数据的“双子星”

许多刚入行的程序员会混淆这两者。理性来看，它们分别解决了**“采集了什么”**和**“发现了什么”**的问题。

### 1. SDTM (展示层)
- **目标**：忠实记录临床现场。
- **结构**：横向（Horizontal）或扁平化，侧重于域名的分类。
- **限制**：严禁包含任何统计逻辑。

### 2. ADaM (分析层)
- **目标**：支持统计推断。
- **结构**：垂直（Vertical）或分析就绪型（BDS 结构）。
- **核心**：允许派生变量，重点是支持图表（TLF）的生成。

---

## 为什么 FDA 需要两者？
如果你只给 SDTM，评审员要自己写复杂的统计代码；如果你只给 ADaM，评审员无法验证你是否在转换过程中“修饰”了原始数据。
`
  }
];

// 保持现有的功能函数不变
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
