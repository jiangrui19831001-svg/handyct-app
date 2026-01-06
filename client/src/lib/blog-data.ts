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
    description: '深入探讨如何通过正确的数据标准化流程通过 FDA 审计。',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-06',
    readingTime: 12,
    category: 'FDA Compliance',
    tags: ['FDA', 'SDTM', 'Compliance'],
    seoTitle: 'FDA 临床试验数据审计完整指南',
    seoDescription: '学习如何通过 FDA 审计：SDTM 数据标准化、质量检查、审计追踪。',
    keywords: ['FDA审计', 'SDTM', '合规'],
    content: `## 核心导读\n\n在现代临床试验中，高质量的电子数据提交（eSub）是获得 FDA 批准的关键路径。根据最新的《eCTD 指南》，提交的成功率很大程度上取决于数据的合规性与可追踪性。\n\n### 1. 临床数据标准化的金字塔\n\n成功提交的基础在于严格遵守 CDISC 标准。FDA 目前强制要求所有新药申请（NDA）必须包含：\n- **SDTM (Study Data Tabulation Model)**：原始数据的标准化表示。\n- **ADaM (Analysis Data Model)**：支持分析统计结论的派生数据。\n- **Define-XML**：描述元数据的“机器指南”。\n\n### 2. 关键成功因素：Data Traceability\n\nFDA 评审员最关注的是“数据追溯性”。这意味着从最终分析图表中的一个数字，必须能够反向追溯到 ADaM 记录，再追溯到 SDTM 域名，最后定位到原始 CRF（个案报告表）数据。\n\n### 3. 提交前的内部审计建议\n\n在正式提交前，必须运行最新的 Pinnacle 21 验证规则。任何“Error”级别的错误都必须在审评报告中给出详尽解释。`
  },
  {
    id: '2',
    slug: 'sdtm-vs-adam-standards',
    title: 'SDTM 与 ADaM 的区别 - 为什么两个标准都需要？',
    description: '详细解释 SDTM 和 ADaM 之间的区别，以及为什么监管机构要求同时提交。',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-07',
    readingTime: 10,
    category: 'CDISC Standards',
    tags: ['SDTM', 'ADaM', 'CDISC'],
    seoTitle: 'SDTM vs ADaM：CDISC 数据标准完全对比',
    seoDescription: 'SDTM 和 ADaM 的关键区别、各自用途。',
    keywords: ['SDTM', 'ADaM', 'CDISC'],
    content: `## 职责的划分\n\n### SDTM：数据的“原貌”\nSDTM 是对采集到的原始临床数据进行标准化的模型。它的核心目的是**存储和展示**。每个域名（如 DM, AE）都反映了研究中特定的观察结果，不包含任何复杂的分析逻辑。\n\n### ADaM：分析的“引擎”\nADaM 是为了支持统计分析而设计的。它直接用于生成图表。ADaM 允许包含衍生数据，比如“基线改变值”或“复合终点指标”。\n\n## 为什么两者都不可或缺？\n\n1. **透明度**：FDA 需要通过 SDTM 验证原始数据的真实性。\n2. **效率**：FDA 通过 ADaM 验证统计分析逻辑的正确性。通过 HandyCT 2.0，这种从 SDTM 到 ADaM 的映射关系将变得清晰可读。`
  },
  {
    id: '3',
    slug: 'define-xml-2-1-standard',
    title: 'Define-XML 2.1：FDA 数据字典的新标准',
    description: '介绍 Define-XML 2.1 的新特性及其重要性。',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-08',
    readingTime: 9,
    category: 'Data Standards',
    tags: ['Define-XML', 'Metadata'],
    seoTitle: 'Define-XML 2.1 标准指南',
    seoDescription: '掌握 Define-XML 2.1 新特性。',
    keywords: ['Define-XML', '元数据'],
    content: `## 评审员的“地图”\n\nDefine-XML 2.1 是提交包中最核心的文件之一。它不仅仅是一份说明书，更是一份机器可读的元数据指南。\n\n### 2.1 版本的进步：\n- **Value Level Metadata (VLM)**：增强了对变量在特定条件下取值规则的描述。\n- **支持标准子集**：更好地集成 CDISC Library 术语库。\n- **改进的衍生逻辑**：鼓励使用更清晰的算法公式描述衍生变量。\n\n高质量的 Define-XML 是避免被 FDA 发出 Information Request (IR) 的第一道防线。`
  },
  {
    id: '4',
    slug: 'clinical-trial-data-quality-checklist',
    title: '临床试验数据的质量检查清单 - 确保 FDA 合规',
    description: '提供一个详细的数据质量检查清单。',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-09',
    readingTime: 11,
    category: 'Data Quality',
    tags: ['Quality', 'Checklist'],
    seoTitle: '临床数据质量检查清单',
    seoDescription: '完整的数据质量检查清单。',
    keywords: ['数据质量', '质量检查'],
    content: `## 提交前必备：5 大质量检查维度\n\n### 1. 外部一致性检查 (Cross-Domain Consistency)\n- 死亡日期：AE, DS, DM 域名中的死亡日期是否同步？\n- 用药史：CM 中的记录是否与 MH 域名中的医疗史相呼应？\n\n### 2. 时间逻辑检查\n- 受试者给药日期必须在知情同意日期之后。\n- 实验室检查时间应在随访周期窗口内。\n\n### 3. ISO 8601 格式校验\n所有日期变量必须符合标准格式，特别要注意缺失日期的处理（如 --DTC 变量的补齐规则）。`
  },
  {
    id: '5',
    slug: 'cdisc-api-integration-guide',
    title: 'CDISC API 集成指南 - 实时访问最新的术语标准',
    description: '介绍如何通过 API 自动化术语标准对齐。',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-10',
    readingTime: 10,
    category: 'API Integration',
    tags: ['API', 'Integration'],
    seoTitle: 'CDISC API 集成指南',
    seoDescription: '自动化术语查询。',
    keywords: ['CDISC API', '自动化'],
    content: `## 自动化元数据管理的第一步\n\nCDISC Library API 提供了一个可编程的接口。通过 HandyCT 2.0 的深度集成，您可以实现以下功能：\n- **实时拉取 CT (Controlled Terminology)**：确保您的数据集始终使用最新的行业术语。\n- **动态版本校验**：当项目从 SDTM 3.3 升级到 3.4 时，系统会自动标识出需要变更的变量字段。\n- **减少人工比对**：API 驱动的转换流程可降低 70% 以上的人工映射错误风险。`
  },
  {
    id: '6',
    slug: 'clinical-data-security-gdpr-hipaa',
    title: '临床试验数据的安全性和隐私保护 - GDPR 和 HIPAA 合规',
    description: '如何在数据标准化过程中实现隐私保护最佳实践。',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-11',
    readingTime: 11,
    category: 'Data Security',
    tags: ['Security', 'GDPR'],
    seoTitle: '临床数据安全指南',
    seoDescription: '实现隐私保护最佳实践。',
    keywords: ['GDPR', 'HIPAA', '隐私保护'],
    content: `## 保护受试者的信任\n\n根据 GDPR 准则，临床试验数据必须受到严格保护。脱敏（De-identification）是 SDTM 转换中的必经步骤。\n\n### 核心安全策略：\n- **USUBJID 的生成逻辑**：禁止包含患者真实姓名或生日。\n- **加密传输**：数据在从申办者上传至云端处理中心时，必须进行 TLS 1.3 加密。\n- **审计追踪 (Audit Trail)**：详细记录每一次变量映射逻辑的修改，确保数据的完整性不可被篡改。`
  },
  {
    id: '7',
    slug: 'excel-to-sdtm-conversion-pitfalls',
    title: '从 Excel 到 SDTM - 常见的数据转换陷阱及其避免方法',
    description: '解析 Excel 转换中的常见错误。',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-12',
    readingTime: 10,
    category: 'Data Conversion',
    tags: ['Excel', 'SDTM'],
    seoTitle: 'Excel 转 SDTM 陷阱',
    seoDescription: '避免常见的转换错误。',
    keywords: ['Excel', 'SDTM'],
    content: `## 警惕“隐形杀手”\n\nExcel 虽灵活，但其自动日期转换（如将 2025-01 自动变为 Jan-25）会导致标准化失败。此外，末尾的隐藏空格和公式错误是导致 Pinnacle 21 报错的常见原因。\n\n### 解决方案：\n在导入 HandyCT 前，先将 Excel 另存为 CSV 格式以剔除隐藏格式，并利用我们的预扫描模块（Pre-scan）强制执行数据类型校验，确保所有字段符合 SAS7BDAT 的存储要求。`
  },
  {
    id: '8',
    slug: 'adam-dataset-creation-guide',
    title: 'ADaM 数据集的创建 - 从 SDTM 到分析就绪的数据',
    description: '深度解析 ADaM 核心数据集的构建逻辑。',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-13',
    readingTime: 12,
    category: 'Data Analysis',
    tags: ['ADaM', 'Analysis'],
    seoTitle: 'ADaM 创建指南',
    seoDescription: '从 SDTM 到分析。',
    keywords: ['ADaM', '分析'],
    content: `## 统计分析的基石\n\n构建 ADaM 数据集不是简单的格式转换，而是分析逻辑的实现。\n\n### 核心模型：\n- **ADSL (Subject-Level)**：受试者级别的数据，包含随机化分组和关键人口学特征。\n- **BDS (Basic Data Structure)**：适用于实验室指标和生命体征的重复测量模型。\n- **OCCDS (Occurrence Data Structure)**：专门处理 AE（不良事件）等频率数据的统计模型。\n\n高质量的 ADaM 应确保所有衍生变量（如 AVAL, BASE）都能追溯到唯一的 SDTM 源变量。`
  },
  {
    id: '9',
    slug: 'clinical-trial-data-version-control',
    title: '临床试验数据的版本控制和变更管理',
    description: '如何在动态的数据清洗过程中保持一致性。',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-14',
    readingTime: 9,
    category: 'Data Management',
    tags: ['Git', 'Management'],
    seoTitle: '临床数据版本管理',
    seoDescription: '确保数据一致性。',
    keywords: ['版本控制', '管理'],
    content: `## 应对数据的动态变化\n\n临床数据在锁库前会经历多次变更（Query Resolution）。我们建议采用语义化版本管理逻辑（如 v0.1, v0.9, v1.0）。\n\n### 最佳实践：\n- **变更日志 (Change Log)**：记录每一轮数据生成中映射脚本的修改。\n- **数据冻结 (Data Freeze)**：一旦达到期中分析节点，应立即生成数据快照（Snapshot）。\n- **Git 工作流**：通过代码化管理转换逻辑，确保每一行代码的变更都有据可查。`
  },
  {
    id: '10',
    slug: 'fda-data-submission-best-practices',
    title: 'FDA 数据提交的最佳实践 - 从准备到提交',
    description: '药企数据提交的最终成功指南。',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-15',
    readingTime: 13,
    category: 'FDA Submission',
    tags: ['FDA', 'Submission'],
    seoTitle: 'FDA 数据提交最佳实践',
    seoDescription: '加速上市流程。',
    keywords: ['FDA', '提交'],
    content: `## 赢得评审员的信任\n\n高质量的提交不仅是数据的对齐，更是信心的建立。\n\n### 成功提交的三个细节：\n1. **高质量的审评说明 (SDRG/ADRG)**：清晰解释所有 Pinnacle 21 的遗留警告，而不是简单忽略。\n2. **标准化的文件命名**：严格遵守 FDA 的命名规范，确保链接在不同系统下均可跳转。\n3. **Define-XML 深度绑定**：确保 Define-XML 中的链接功能能一键直达对应的 SAS 算法描述文件。这是评审员最看重的追溯能力。`
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
