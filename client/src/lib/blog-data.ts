/*
 * 博客文章元数据和内容管理 - 10 篇深度资产恢复版 (v3.0)
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
  tagsZh?: string[];
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  content: string;
  imageUrl?: string;
  contentEn?: string;
  titleEn?: string;
  descriptionEn?: string;
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: '1',
    slug: 'fda-clinical-trial-data-audit-guide',
    title: 'FDA 临床试验数据审计的完整指南 - 从 SDTM 到合规',
    titleEn: 'Complete Guide to FDA Clinical Trial Data Audit - From SDTM to Compliance',
    description: '深入探讨如何通过正确的数据标准化流程通过 FDA 审计。',
    descriptionEn: 'In-depth exploration of how to pass FDA audits through proper data standardization processes.',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-06',
    readingTime: 12,
    category: 'FDA Compliance',
    tags: ['FDA', 'SDTM', 'Compliance'],
    tagsZh: ['FDA', 'SDTM', '合规性'],
    seoTitle: 'FDA 临床试验数据审计完整指南',
    seoDescription: '学习如何通过 FDA 审计：SDTM 数据标准化、质量检查、审计追踪。',
    keywords: ['FDA审计', 'SDTM', '合规'],
    content: `## 核心审计要求

FDA 评审员关注数据的可追溯性和完整性。使用 SDTM 标准是确保通过审计的第一步。根据最新的监管要求，申办方必须证明从源数据到提交数据集的每一步转换都是透明且可验证的。

### SDTM 的关键角色

SDTM（Study Data Tabulation Model）是 FDA 要求的标准数据格式。它定义了如何将原始临床数据转换为标准化的表格形式。

- **域（Domain）**：每个域代表一类数据（如 DM 代表人口统计数据）
- **变量（Variable）**：每个变量代表一个数据元素
- **记录（Record）**：每条记录代表一个观察结果

### 审计追踪（Audit Trail）

FDA 要求完整的审计追踪，包括：
- 数据的来源
- 每一步的转换逻辑
- 修改的时间和人员

## 实施步骤

1. **数据映射**：建立源数据到 SDTM 的映射规范
2. **编码实现**：使用 SAS、R 或 Python 进行数据转换
3. **质量检查**：运行 Pinnacle 21 等工具进行验证
4. **文档编写**：准备 Define-XML 和 SDRG 文档

## 常见问题

**Q: 如何处理缺失数据？**
A: 在 SDTM 中，缺失数据应使用特定的缺失值代码标记，如 "NA"、"ND" 等。

**Q: SDTM 版本如何选择？**
A: 应选择与试验启动时最新的 SDTM 版本一致的版本，通常为 SDTM-IG v3.3 或更高版本。`,
    contentEn: `## Core Audit Requirements

FDA reviewers focus on data traceability and completeness. Using the SDTM standard is the first step to ensure audit passage. According to the latest regulatory requirements, sponsors must demonstrate that every transformation step from source data to submitted datasets is transparent and verifiable.

### The Key Role of SDTM

SDTM (Study Data Tabulation Model) is the standard data format required by the FDA. It defines how to convert raw clinical data into standardized tabular form.

- **Domains**: Each domain represents a class of data (e.g., DM for demographics)
- **Variables**: Each variable represents a data element
- **Records**: Each record represents an observation

### Audit Trail

FDA requires complete audit trails, including:
- Data source
- Transformation logic at each step
- Time and personnel of modifications

## Implementation Steps

1. **Data Mapping**: Establish mapping specifications from source data to SDTM
2. **Code Implementation**: Use SAS, R, or Python for data transformation
3. **Quality Checks**: Run validation tools like Pinnacle 21
4. **Documentation**: Prepare Define-XML and SDRG documents

## Common Questions

**Q: How to handle missing data?**
A: In SDTM, missing data should be marked with specific missing value codes, such as "NA", "ND", etc.

**Q: How to choose SDTM version?**
A: Select the SDTM version consistent with the latest version at trial initiation, typically SDTM-IG v3.3 or higher.`
  },
  {
    id: '2',
    slug: 'sdtm-vs-adam-standards',
    title: 'SDTM 与 ADaM 的区别 - 为什么两个标准都需要？',
    titleEn: 'Difference Between SDTM and ADaM - Why Both Standards Are Needed?',
    description: '详细解释 SDTM 和 ADaM 之间的职责划分与联系。',
    descriptionEn: 'Detailed explanation of the division of responsibilities and connections between SDTM and ADaM.',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-07',
    readingTime: 10,
    category: 'CDISC Standards',
    tags: ['SDTM', 'ADaM', 'CDISC'],
    tagsZh: ['SDTM', 'ADaM', 'CDISC'],
    seoTitle: 'SDTM vs ADaM：完全对比',
    seoDescription: 'SDTM 和 ADaM 的关键区别与各自用途。',
    keywords: ['SDTM', 'ADaM'],
    content: `## 职责划分

SDTM 用于展示原始观察结果，提供数据的"快照"；而 ADaM 用于支持统计分析和生成 TLFs。FDA 要求同时提交两者，以便在不查阅原始代码的情况下重现分析结果。

### SDTM 的特点

- **原始性**：尽可能接近源数据
- **标准化**：遵循 CDISC 标准
- **可追溯性**：每个数据点都能追溯到源数据

### ADaM 的特点

- **分析就绪**：为统计分析优化
- **派生变量**：包含计算得出的新变量
- **可重现性**：基于 SDTM 的明确转换规则

## 数据流

源数据 → SDTM（标准化） → ADaM（分析优化） → 统计分析 → TLF 输出

## 为什么需要两个标准？

1. **监管要求**：FDA 要求同时提交 SDTM 和 ADaM
2. **数据完整性**：SDTM 保证原始数据的完整性
3. **分析透明度**：ADaM 确保分析的可重现性
4. **审计便利**：评审员可以独立验证分析过程

## 常见错误

- 在 SDTM 中过度派生变量
- 在 ADaM 中丢失追溯性
- 不一致的变量定义`,
    contentEn: `## Division of Responsibilities

SDTM is used to display raw observations, providing a "snapshot" of the data; while ADaM is used to support statistical analysis and generate TLFs. FDA requires submission of both to enable reproduction of analysis results without consulting the original code.

### Characteristics of SDTM

- **Originality**: As close to source data as possible
- **Standardization**: Complies with CDISC standards
- **Traceability**: Every data point can be traced to source data

### Characteristics of ADaM

- **Analysis-Ready**: Optimized for statistical analysis
- **Derived Variables**: Contains newly calculated variables
- **Reproducibility**: Based on clear transformation rules from SDTM

## Data Flow

Source Data → SDTM (Standardization) → ADaM (Analysis Optimization) → Statistical Analysis → TLF Output

## Why Both Standards Are Needed?

1. **Regulatory Requirement**: FDA requires submission of both SDTM and ADaM
2. **Data Integrity**: SDTM ensures completeness of original data
3. **Analysis Transparency**: ADaM ensures reproducibility of analysis
4. **Audit Convenience**: Reviewers can independently verify the analysis process

## Common Mistakes

- Over-derivation of variables in SDTM
- Loss of traceability in ADaM
- Inconsistent variable definitions`
  },
  {
    id: '3',
    slug: 'define-xml-2-1-standard',
    title: 'Define-XML 2.1：FDA 数据字典的新标准',
    titleEn: 'Define-XML 2.1: The New Standard for FDA Data Dictionaries',
    description: '介绍 Define-XML 2.1 的新特性及其对提交的影响。',
    descriptionEn: 'Introduction to new features of Define-XML 2.1 and its impact on submissions.',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-08',
    readingTime: 9,
    category: 'Data Standards',
    tags: ['Define-XML', 'Metadata'],
    tagsZh: ['Define-XML', '元数据'],
    seoTitle: 'Define-XML 2.1 标准指南',
    seoDescription: '掌握 Define-XML 2.1 新特性。',
    keywords: ['Define-XML', '元数据'],
    content: `## 2.1 版本的进步

增强了机器可读性，支持更复杂的变量衍生逻辑描述（VLM）。它是评审员理解数据集结构的"唯一真经"，质量不合格将直接导致审评延期。

### Define-XML 的核心功能

- **元数据定义**：定义所有变量的属性
- **衍生逻辑**：描述如何从源数据派生新变量
- **代码列表**：定义所有使用的代码和术语
- **计算公式**：记录复杂计算的详细步骤

### 2.1 版本的新增功能

1. **增强的 VLM 支持**：更详细的变量衍生逻辑描述
2. **改进的代码列表管理**：支持更复杂的代码映射
3. **更好的机器可读性**：便于自动化工具解析
4. **扩展的元数据**：支持更多的数据属性

## 实施建议

1. 使用专业工具（如 Pinnacle 21）生成 Define-XML
2. 确保所有变量都有清晰的定义
3. 记录所有衍生逻辑
4. 定期验证 XML 的有效性

## 常见问题

**Q: Define-XML 2.1 是否向后兼容？**
A: 大多数情况下是兼容的，但建议在升级前进行充分测试。

**Q: 如何验证 Define-XML 的质量？**
A: 使用 Pinnacle 21 或其他验证工具进行检查。`,
    contentEn: `## Advances in Version 2.1

Enhanced machine readability and support for more complex variable derivation logic descriptions (VLM). It is the "only truth" for reviewers to understand dataset structure, and poor quality will directly lead to review delays.

### Core Functions of Define-XML

- **Metadata Definition**: Define attributes of all variables
- **Derivation Logic**: Describe how to derive new variables from source data
- **Code Lists**: Define all codes and terminology used
- **Calculation Formulas**: Record detailed steps of complex calculations

### New Features in Version 2.1

1. **Enhanced VLM Support**: More detailed variable derivation logic descriptions
2. **Improved Code List Management**: Support for more complex code mappings
3. **Better Machine Readability**: Facilitates parsing by automated tools
4. **Extended Metadata**: Support for more data attributes

## Implementation Recommendations

1. Use professional tools (such as Pinnacle 21) to generate Define-XML
2. Ensure all variables have clear definitions
3. Document all derivation logic
4. Regularly validate XML validity

## Common Questions

**Q: Is Define-XML 2.1 backward compatible?**
A: In most cases yes, but thorough testing is recommended before upgrading.

**Q: How to validate the quality of Define-XML?**
A: Use Pinnacle 21 or other validation tools for checking.`
  },
  {
    id: '4',
    slug: 'clinical-trial-data-quality-checklist',
    title: '临床试验数据的质量检查清单 - 确保 FDA 合规',
    titleEn: 'Clinical Trial Data Quality Checklist - Ensuring FDA Compliance',
    description: '提供详细的数据质量检查清单，涵盖 P21 核心规则。',
    descriptionEn: 'Provides a detailed data quality checklist covering P21 core rules.',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-09',
    readingTime: 11,
    category: 'Data Quality',
    tags: ['Data Quality', 'Validation'],
    tagsZh: ['数据质量', '验证'],
    seoTitle: '临床数据质量检查清单',
    seoDescription: '确保提交前的质量。',
    keywords: ['质量检查', '数据验证'],
    content: `## 关键检查点

包括交叉域名一致性检查、术语库映射准确性以及 ISO 8601 时间格式校验。通过自动化工具，可以大幅降低"Error"级别的错误率。

### 数据完整性检查

- **必填字段**：确保所有必填字段都有值
- **数据类型**：验证数据类型是否正确
- **值域范围**：检查数值是否在允许的范围内
- **缺失值处理**：确保缺失值使用正确的代码标记

### 一致性检查

- **交叉域检查**：验证不同域之间的数据一致性
- **参考完整性**：确保所有引用都指向有效的记录
- **时间顺序**：验证事件的时间顺序是否合理

### 术语库检查

- **代码映射**：验证所有代码是否正确映射到标准术语
- **版本一致性**：确保使用的术语库版本一致
- **已弃用代码**：检查是否使用了已弃用的代码

### Pinnacle 21 规则

Pinnacle 21 是 FDA 推荐的验证工具，包含数百条规则：
- **Error 级别**：必须修复
- **Warning 级别**：应该审查
- **Info 级别**：可选信息

## 质量保证流程

1. 初步检查：使用自动化工具进行初步验证
2. 手动审查：由数据管理员进行人工审查
3. 最终验证：在提交前进行最后的验证
4. 文档记录：记录所有发现和解决方案`,
    contentEn: `## Key Checkpoints

Including cross-domain consistency checks, terminology mapping accuracy, and ISO 8601 time format validation. Through automated tools, the error rate at the "Error" level can be significantly reduced.

### Data Integrity Checks

- **Required Fields**: Ensure all required fields have values
- **Data Types**: Verify that data types are correct
- **Value Range**: Check if values are within allowed ranges
- **Missing Value Handling**: Ensure missing values are marked with correct codes

### Consistency Checks

- **Cross-Domain Checks**: Verify data consistency between different domains
- **Referential Integrity**: Ensure all references point to valid records
- **Time Sequence**: Verify that event time sequence is reasonable

### Terminology Checks

- **Code Mapping**: Verify that all codes are correctly mapped to standard terminology
- **Version Consistency**: Ensure consistent use of terminology library versions
- **Deprecated Codes**: Check if deprecated codes are used

### Pinnacle 21 Rules

Pinnacle 21 is the FDA-recommended validation tool with hundreds of rules:
- **Error Level**: Must be fixed
- **Warning Level**: Should be reviewed
- **Info Level**: Optional information

## Quality Assurance Process

1. Initial Check: Use automated tools for preliminary validation
2. Manual Review: Manual review by data managers
3. Final Verification: Final verification before submission
4. Documentation: Record all findings and solutions`
  },
  {
    id: '5',
    slug: 'cdisc-api-integration-guide',
    title: 'CDISC API 集成指南 - 实时访问最新的术语标准',
    titleEn: 'CDISC API Integration Guide - Real-time Access to Latest Terminology Standards',
    description: '如何利用 API 自动化术语标准对齐。',
    descriptionEn: 'How to leverage APIs to automate terminology standard alignment.',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-10',
    readingTime: 10,
    category: 'API Integration',
    tags: ['API', 'Integration'],
    tagsZh: ['API', '集成'],
    seoTitle: 'CDISC API 集成指南',
    seoDescription: '自动化术语查询。',
    keywords: ['CDISC API', '自动化'],
    content: `## 实时标准同步

通过 CDISC Library API，可以自动获取最新的受控术语（CT），减少人工录入和映射错误。

### CDISC API 的主要端点

- **术语库查询**：获取最新的代码列表
- **变量定义**：查询标准变量定义
- **域信息**：获取域的详细信息
- **版本管理**：查询不同版本的标准

### 集成步骤

1. **获取 API 密钥**：在 CDISC 网站注册并获取 API 密钥
2. **认证设置**：配置 API 认证参数
3. **数据查询**：编写查询脚本
4. **缓存管理**：实现本地缓存以提高性能
5. **错误处理**：实现完善的错误处理机制

### 代码示例

\`\`\`python
import requests

# 查询 SDTM 术语库
response = requests.get(
    'https://api.library.cdisc.org/api/mdr/ct/packages',
    headers={'Authorization': 'Bearer YOUR_API_KEY'}
)

# 获取最新版本
latest_version = response.json()['packages'][0]['version']
\`\`\`

### 最佳实践

- 定期更新术语库
- 实现版本控制
- 记录所有 API 调用
- 监控 API 性能`,
    contentEn: `## Real-time Standard Synchronization

Through the CDISC Library API, you can automatically obtain the latest controlled terminology (CT), reducing manual entry and mapping errors.

### Main Endpoints of CDISC API

- **Terminology Query**: Get the latest code lists
- **Variable Definition**: Query standard variable definitions
- **Domain Information**: Get detailed information about domains
- **Version Management**: Query standards of different versions

### Integration Steps

1. **Get API Key**: Register on the CDISC website and obtain an API key
2. **Authentication Setup**: Configure API authentication parameters
3. **Data Query**: Write query scripts
4. **Cache Management**: Implement local caching to improve performance
5. **Error Handling**: Implement comprehensive error handling mechanisms

### Code Example

\`\`\`python
import requests

# Query SDTM terminology library
response = requests.get(
    'https://api.library.cdisc.org/api/mdr/ct/packages',
    headers={'Authorization': 'Bearer YOUR_API_KEY'}
)

# Get latest version
latest_version = response.json()['packages'][0]['version']
\`\`\`

### Best Practices

- Update terminology library regularly
- Implement version control
- Record all API calls
- Monitor API performance`
  },
  {
    id: '6',
    slug: 'clinical-data-security-gdpr-hipaa',
    title: '临床试验数据的安全性和隐私保护 - GDPR 和 HIPAA 合规',
    titleEn: 'Clinical Trial Data Security and Privacy Protection - GDPR and HIPAA Compliance',
    description: '数据标准化过程中的隐私保护最佳实践。',
    descriptionEn: 'Best practices for privacy protection in the data standardization process.',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-11',
    readingTime: 11,
    category: 'Data Security',
    tags: ['Privacy', 'GDPR'],
    tagsZh: ['隐私', 'GDPR'],
    seoTitle: '临床数据安全指南',
    seoDescription: '实现隐私保护最佳实践。',
    keywords: ['数据安全', '隐私保护'],
    content: `## 安全协议

所有提交至监管机构的数据必须经过脱敏处理，确保受试者 PII 信息不被泄露。

### GDPR 合规要求

- **数据最小化**：只收集必要的数据
- **目的限制**：数据只能用于指定目的
- **存储限制**：数据不能无限期保存
- **访问控制**：限制对敏感数据的访问

### HIPAA 合规要求

- **隐私规则**：保护受保护的健康信息（PHI）
- **安全规则**：实施技术和组织安全措施
- **违规通知**：在发生数据泄露时及时通知
- **业务伙伴协议**：与第三方签署 BAA 协议

### 脱敏技术

1. **直接标识符删除**：移除姓名、地址等直接标识信息
2. **间接标识符处理**：处理可能识别个人的其他信息
3. **数据聚合**：将数据聚合到无法识别个人的水平
4. **加密**：对敏感数据进行加密存储

### 访问控制

- **基于角色的访问控制（RBAC）**：根据职位分配权限
- **最小权限原则**：只授予必要的权限
- **审计日志**：记录所有数据访问
- **定期审查**：定期审查访问权限

## 风险评估

进行定期的数据安全风险评估，包括：
- 识别潜在威胁
- 评估风险等级
- 制定缓解措施
- 监控实施效果`,
    contentEn: `## Security Protocols

All data submitted to regulatory authorities must be de-identified to ensure that subject PII information is not leaked.

### GDPR Compliance Requirements

- **Data Minimization**: Only collect necessary data
- **Purpose Limitation**: Data can only be used for specified purposes
- **Storage Limitation**: Data cannot be stored indefinitely
- **Access Control**: Restrict access to sensitive data

### HIPAA Compliance Requirements

- **Privacy Rule**: Protect Protected Health Information (PHI)
- **Security Rule**: Implement technical and organizational security measures
- **Breach Notification**: Notify promptly in case of data breach
- **Business Associate Agreement**: Sign BAA with third parties

### De-identification Techniques

1. **Direct Identifier Removal**: Remove direct identifying information such as names and addresses
2. **Indirect Identifier Processing**: Handle other information that could identify individuals
3. **Data Aggregation**: Aggregate data to a level where individuals cannot be identified
4. **Encryption**: Encrypt sensitive data for storage

### Access Control

- **Role-Based Access Control (RBAC)**: Assign permissions based on position
- **Principle of Least Privilege**: Grant only necessary permissions
- **Audit Logs**: Record all data access
- **Regular Review**: Regularly review access permissions

## Risk Assessment

Conduct regular data security risk assessments, including:
- Identify potential threats
- Assess risk levels
- Develop mitigation measures
- Monitor implementation effectiveness`
  },
  {
    id: '7',
    slug: 'excel-to-sdtm-conversion-pitfalls',
    title: '从 Excel 到 SDTM - 常见的数据转换陷阱及其避免方法',
    titleEn: 'From Excel to SDTM - Common Data Conversion Pitfalls and How to Avoid Them',
    description: '最常见的 Excel 转换陷阱与解决方案。',
    descriptionEn: 'Most common Excel conversion pitfalls and solutions.',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-12',
    readingTime: 10,
    category: 'Data Conversion',
    tags: ['Excel', 'SDTM'],
    tagsZh: ['Excel', 'SDTM'],
    seoTitle: 'Excel 转 SDTM 陷阱',
    seoDescription: '避免常见的转换错误。',
    keywords: ['Excel转换', 'SDTM'],
    content: `## 避坑指南

警惕 Excel 的自动日期转换功能，它往往会破坏 ISO 8601 格式。建议在转换前使用脚本进行数据清理。

### 常见陷阱 1：日期格式问题

Excel 会自动将日期转换为其内部格式，导致：
- 日期格式不一致
- ISO 8601 格式丢失
- 时区信息丢失

**解决方案**：
- 在 Excel 中将日期列设置为文本格式
- 使用脚本验证日期格式
- 保留原始日期字符串

### 常见陷阱 2：数据类型混淆

Excel 不区分数据类型，可能导致：
- 数字被识别为文本
- 文本被识别为数字
- 布尔值被识别为数字

**解决方案**：
- 在导出前明确指定数据类型
- 使用数据验证规则
- 在转换脚本中进行类型检查

### 常见陷阱 3：缺失值处理

Excel 中的空单元格可能被：
- 忽略
- 转换为零
- 转换为空字符串

**解决方案**：
- 在 Excel 中使用特定的缺失值标记
- 在转换脚本中明确处理缺失值
- 使用标准的缺失值代码

### 常见陷阱 4：编码问题

不同的编码可能导致：
- 特殊字符丢失
- 中文字符乱码
- 符号显示错误

**解决方案**：
- 使用 UTF-8 编码
- 在导出前检查编码
- 在转换脚本中指定编码

## 最佳实践

1. 在转换前进行数据验证
2. 保留原始 Excel 文件
3. 记录所有转换步骤
4. 进行质量检查
5. 保存转换日志`,
    contentEn: `## Pitfall Avoidance Guide

Be wary of Excel's automatic date conversion feature, which often breaks ISO 8601 format. It is recommended to use scripts to clean data before conversion.

### Common Pitfall 1: Date Format Issues

Excel automatically converts dates to its internal format, resulting in:
- Inconsistent date formats
- Loss of ISO 8601 format
- Loss of timezone information

**Solution**:
- Set date columns to text format in Excel
- Use scripts to validate date formats
- Preserve original date strings

### Common Pitfall 2: Data Type Confusion

Excel does not distinguish between data types, which may result in:
- Numbers being recognized as text
- Text being recognized as numbers
- Boolean values being recognized as numbers

**Solution**:
- Explicitly specify data types before export
- Use data validation rules
- Perform type checking in conversion scripts

### Common Pitfall 3: Missing Value Handling

Empty cells in Excel may be:
- Ignored
- Converted to zero
- Converted to empty strings

**Solution**:
- Use specific missing value markers in Excel
- Explicitly handle missing values in conversion scripts
- Use standard missing value codes

### Common Pitfall 4: Encoding Issues

Different encodings may result in:
- Loss of special characters
- Chinese character garbled
- Symbol display errors

**Solution**:
- Use UTF-8 encoding
- Check encoding before export
- Specify encoding in conversion scripts

## Best Practices

1. Validate data before conversion
2. Keep original Excel files
3. Document all conversion steps
4. Perform quality checks
5. Save conversion logs`
  },
  {
    id: '8',
    slug: 'adam-dataset-creation-guide',
    title: 'ADaM 数据集的创建 - 从 SDTM 到分析就绪的数据',
    titleEn: 'ADaM Dataset Creation - From SDTM to Analysis-Ready Data',
    description: 'ADaM 数据集的创建过程与追溯性原则。',
    descriptionEn: 'The ADaM dataset creation process and traceability principles.',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-13',
    readingTime: 12,
    category: 'Data Analysis',
    tags: ['ADaM', 'Analysis'],
    tagsZh: ['ADaM', '分析'],
    seoTitle: 'ADaM 创建指南',
    seoDescription: '从 SDTM 到分析。',
    keywords: ['ADaM', '分析'],
    content: `## 分析模型

构建 ADSL 是所有分析的基础。在派生变量时，必须确保其具备单向追溯性。

### ADaM 的核心数据集

1. **ADSL（受试者级数据集）**
   - 包含受试者的基本信息
   - 包含治疗分配和安全性标志
   - 是所有其他分析数据集的基础

2. **ADAE（不良事件数据集）**
   - 包含所有报告的不良事件
   - 包含事件的严重程度和关系评估
   - 用于安全性分析

3. **ADLB（实验室数据集）**
   - 包含实验室检查结果
   - 包含相对基线的变化
   - 用于有效性分析

4. **ADVS（生命体征数据集）**
   - 包含生命体征测量
   - 包含相对基线的变化
   - 用于安全性和有效性分析

### 派生变量的创建

派生变量是从 SDTM 数据计算得出的新变量，包括：
- **相对基线变化**：(当前值 - 基线值) / 基线值 * 100
- **分类变量**：根据数值范围分类
- **标志变量**：标记特定条件
- **计算变量**：复杂的数学计算

### 追溯性原则

每个派生变量都必须能够追溯到源数据：
- 记录派生逻辑
- 保存计算公式
- 记录数据来源
- 文档化假设

## 创建步骤

1. **需求分析**：确定需要哪些分析数据集
2. **规范编写**：编写详细的 ADaM 规范
3. **代码开发**：编写 SAS 或 R 代码
4. **质量检查**：验证派生变量的正确性
5. **文档编写**：准备 Define-XML 和分析计划

## 常见问题

**Q: 如何处理缺失的基线值？**
A: 应在 ADaM 规范中明确定义处理方法，通常使用最后观察结转法（LOCF）或其他方法。

**Q: 派生变量应该在 SDTM 还是 ADaM 中创建？**
A: 原则上，分析相关的派生变量应在 ADaM 中创建，以保持 SDTM 的原始性。`,
    contentEn: `## Analysis Model

Building ADSL is the foundation for all analyses. When deriving variables, you must ensure single-directional traceability.

### Core ADaM Datasets

1. **ADSL (Subject-Level Dataset)**
   - Contains basic information about subjects
   - Contains treatment assignment and safety flags
   - Is the foundation for all other analysis datasets

2. **ADAE (Adverse Event Dataset)**
   - Contains all reported adverse events
   - Contains event severity and relationship assessment
   - Used for safety analysis

3. **ADLB (Laboratory Dataset)**
   - Contains laboratory test results
   - Contains changes from baseline
   - Used for efficacy analysis

4. **ADVS (Vital Signs Dataset)**
   - Contains vital signs measurements
   - Contains changes from baseline
   - Used for safety and efficacy analysis

### Derived Variable Creation

Derived variables are new variables calculated from SDTM data, including:
- **Change from Baseline**: (Current Value - Baseline Value) / Baseline Value * 100
- **Categorical Variables**: Categorization based on value ranges
- **Flag Variables**: Mark specific conditions
- **Calculated Variables**: Complex mathematical calculations

### Traceability Principle

Each derived variable must be traceable to source data:
- Record derivation logic
- Save calculation formulas
- Record data source
- Document assumptions

## Creation Steps

1. **Requirements Analysis**: Determine which analysis datasets are needed
2. **Specification Writing**: Write detailed ADaM specifications
3. **Code Development**: Write SAS or R code
4. **Quality Check**: Verify correctness of derived variables
5. **Documentation**: Prepare Define-XML and analysis plan

## Common Questions

**Q: How to handle missing baseline values?**
A: The handling method should be clearly defined in the ADaM specification, typically using Last Observation Carried Forward (LOCF) or other methods.

**Q: Should derived variables be created in SDTM or ADaM?**
A: In principle, analysis-related derived variables should be created in ADaM to maintain the originality of SDTM.`
  },
  {
    id: '9',
    slug: 'clinical-trial-data-version-control',
    title: '临床试验数据的版本控制和变更管理',
    titleEn: 'Clinical Trial Data Version Control and Change Management',
    description: '如何在动态的数据清洗过程中保持一致性。',
    descriptionEn: 'How to maintain consistency in dynamic data cleaning processes.',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-14',
    readingTime: 9,
    category: 'Data Management',
    tags: ['Version Control', 'Audit Trail'],
    tagsZh: ['版本控制', '审计追踪'],
    seoTitle: '临床数据版本管理',
    seoDescription: '确保数据一致性。',
    keywords: ['版本控制', '变更管理'],
    content: `## 变更审计

每一次数据结构的修改都应在变更日志中记录，以满足监管机构对审计追踪的要求。

### 版本控制系统

建立完善的版本控制系统，包括：
- **版本编号**：使用语义版本号（如 v1.0.0）
- **变更日志**：记录每个版本的变更内容
- **发布说明**：说明新版本的主要改进
- **回滚机制**：能够回滚到之前的版本

### 变更管理流程

1. **变更请求**：提交变更请求并说明原因
2. **审查批准**：由数据管理员审查并批准
3. **实施变更**：在测试环境中实施变更
4. **质量检查**：验证变更的正确性
5. **生产部署**：将变更部署到生产环境
6. **文档更新**：更新相关文档和规范

### 审计追踪

维护完整的审计追踪，包括：
- **谁**：执行变更的人员
- **什么**：变更的具体内容
- **何时**：变更的时间
- **为什么**：变更的原因
- **如何**：变更的方法

### 数据备份

定期进行数据备份，包括：
- **完整备份**：定期进行完整备份
- **增量备份**：定期进行增量备份
- **备份验证**：验证备份的完整性
- **恢复测试**：定期测试备份恢复

## 最佳实践

1. 建立清晰的变更管理流程
2. 记录所有变更
3. 定期进行备份
4. 进行定期的审计
5. 培训团队成员

## 工具推荐

- **Git**：用于代码和脚本版本控制
- **Subversion**：用于数据文件版本控制
- **Jira**：用于变更请求管理
- **Confluence**：用于文档管理`,
    contentEn: `## Change Audit

Every modification to the data structure should be recorded in the change log to meet regulatory requirements for audit trails.

### Version Control System

Establish a comprehensive version control system, including:
- **Version Number**: Use semantic versioning (e.g., v1.0.0)
- **Change Log**: Record changes for each version
- **Release Notes**: Explain major improvements in new version
- **Rollback Mechanism**: Ability to rollback to previous versions

### Change Management Process

1. **Change Request**: Submit change request and explain reason
2. **Review and Approval**: Review and approve by data manager
3. **Implement Change**: Implement change in test environment
4. **Quality Check**: Verify correctness of change
5. **Production Deployment**: Deploy change to production environment
6. **Documentation Update**: Update related documents and specifications

### Audit Trail

Maintain complete audit trail, including:
- **Who**: Personnel who performed the change
- **What**: Specific content of the change
- **When**: Time of the change
- **Why**: Reason for the change
- **How**: Method of the change

### Data Backup

Perform regular data backups, including:
- **Full Backup**: Perform full backup regularly
- **Incremental Backup**: Perform incremental backup regularly
- **Backup Verification**: Verify completeness of backup
- **Recovery Testing**: Regularly test backup recovery

## Best Practices

1. Establish clear change management process
2. Record all changes
3. Perform regular backups
4. Conduct regular audits
5. Train team members

## Recommended Tools

- **Git**: For code and script version control
- **Subversion**: For data file version control
- **Jira**: For change request management
- **Confluence**: For documentation management`
  },
  {
    id: '10',
    slug: 'fda-data-submission-best-practices',
    title: 'FDA 数据提交的最佳实践 - 从准备到提交',
    titleEn: 'FDA Data Submission Best Practices - From Preparation to Submission',
    description: '药企成功提交数据的最终路径。',
    descriptionEn: 'The ultimate path for pharmaceutical companies to successfully submit data.',
    author: 'HandyCT Expert Team',
    publishedDate: '2026-01-15',
    readingTime: 13,
    category: 'FDA Submission',
    tags: ['FDA', 'Submission'],
    tagsZh: ['FDA', 'Submission'],
    seoTitle: 'FDA 数据提交最佳实践',
    seoDescription: '加速上市流程。',
    keywords: ['FDA提交', '提交策略'],
    content: `## 成功提交

高质量的 Reviewer's Guide (SDRG/ADRG) 是说服评审员的关键，应清晰解释所有 Pinnacle 21 的验证结果。

### 提交前的准备

1. **数据完整性检查**
   - 运行 Pinnacle 21 验证
   - 解决所有 Error 级别的问题
   - 记录所有 Warning 和 Info 级别的问题

2. **文档准备**
   - 准备 SDRG（Study Data Reviewer's Guide）
   - 准备 ADRG（Analysis Data Reviewer's Guide）
   - 准备 Define-XML
   - 准备数据管理计划

3. **质量保证**
   - 进行最终的数据质量审查
   - 验证所有文档的完整性
   - 进行交叉检查

### 提交包的结构

标准的 FDA 提交包应包括：
- **eCTD 结构**：按照 eCTD 格式组织
- **数据集**：SDTM 和 ADaM 数据集
- **元数据**：Define-XML 和其他元数据
- **文档**：SDRG、ADRG 和其他支持文档
- **代码**：数据转换和分析代码

### 常见问题

**Q: 如何处理 Pinnacle 21 的 Warning？**
A: 所有 Warning 都应该被审查和解释。如果无法解决，应在 SDRG 中说明原因。

**Q: 是否需要提交源代码？**
A: 通常需要提交数据转换代码，但分析代码可以选择性提交。

**Q: 提交后如何处理评审员的问题？**
A: 应及时回复评审员的问题，并提供详细的解释和支持文件。

## 成功要素

1. **充分的准备**：提前进行充分的准备工作
2. **高质量的文档**：准备清晰、详细的文档
3. **及时的沟通**：与 FDA 保持及时的沟通
4. **专业的团队**：组建专业的提交团队
5. **持续的改进**：根据反馈不断改进

## 提交时间表

- **准备阶段**：3-6 个月
- **质量检查**：1-2 个月
- **最终审查**：2-4 周
- **提交**：1-2 周
- **FDA 审评**：6-10 个月（标准审评）或 2-3 个月（优先审评）`,
    contentEn: `## Successful Submission

High-quality Reviewer's Guide (SDRG/ADRG) is key to convincing reviewers and should clearly explain all Pinnacle 21 validation results.

### Pre-Submission Preparation

1. **Data Integrity Check**
   - Run Pinnacle 21 validation
   - Resolve all Error-level issues
   - Document all Warning and Info-level issues

2. **Documentation Preparation**
   - Prepare SDRG (Study Data Reviewer's Guide)
   - Prepare ADRG (Analysis Data Reviewer's Guide)
   - Prepare Define-XML
   - Prepare Data Management Plan

3. **Quality Assurance**
   - Conduct final data quality review
   - Verify completeness of all documents
   - Perform cross-checks

### Submission Package Structure

A standard FDA submission package should include:
- **eCTD Structure**: Organized according to eCTD format
- **Datasets**: SDTM and ADaM datasets
- **Metadata**: Define-XML and other metadata
- **Documents**: SDRG, ADRG and other supporting documents
- **Code**: Data transformation and analysis code

### Common Questions

**Q: How to handle Pinnacle 21 Warnings?**
A: All Warnings should be reviewed and explained. If unable to resolve, explain the reason in the SDRG.

**Q: Is it necessary to submit source code?**
A: Data transformation code is usually required, but analysis code can be submitted selectively.

**Q: How to handle reviewer questions after submission?**
A: Respond promptly to reviewer questions and provide detailed explanations and supporting documents.

## Success Factors

1. **Adequate Preparation**: Conduct adequate preparation in advance
2. **High-Quality Documentation**: Prepare clear and detailed documentation
3. **Timely Communication**: Maintain timely communication with FDA
4. **Professional Team**: Assemble a professional submission team
5. **Continuous Improvement**: Continuously improve based on feedback

## Submission Timeline

- **Preparation Phase**: 3-6 months
- **Quality Check**: 1-2 months
- **Final Review**: 2-4 weeks
- **Submission**: 1-2 weeks
- **FDA Review**: 6-10 months (Standard Review) or 2-3 months (Priority Review)`
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
