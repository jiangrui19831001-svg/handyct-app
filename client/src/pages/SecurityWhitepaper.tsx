import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, Shield, Lock, Wifi, Eye } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

export default function SecurityWhitepaper() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { t } = useTranslation();

  const handleDownloadWhitepaper = () => {
    const content = `
# HandyCT IT 安全白皮书

## 执行摘要

HandyCT 采用端侧 AI 技术架构，确保临床试验数据 100% 本地处理，规避数据传输风险，完全符合 GDPR、HIPAA 和 FDA 21 CFR Part 11 要求。

## 1. 技术架构：端侧 AI 模型加载

HandyCT 的核心安全特性源于其独特的技术架构。所有 CDISC 标准转换模型（SDTM、ADaM、Define-XML）在用户浏览器内存中加载和执行，无需任何后端服务器参与。

### 1.1 模型加载流程
- 用户访问 HandyCT 网页时，JavaScript 引擎在浏览器内存中初始化 CDISC 转换模型
- 所有规则库（FDA 21 CFR Part 11、CDISC IG 最新标准）预加载到客户端
- 数据处理完全在本地内存中进行，无任何网络传输

### 1.2 内存隔离
- 每个用户的浏览器实例拥有独立的内存空间
- 数据处理不涉及任何共享存储或服务器端数据库
- 浏览器关闭后，所有数据自动从内存清除

## 2. 无后端 API 接收文件：物理断网可用

HandyCT 的最大安全优势是"零服务器存储"架构。系统不存在任何后端 API 接收、存储或处理用户文件。

### 2.1 数据流向
- 用户上传 CSV 文件 → 加载到浏览器内存
- 所有转换在浏览器中进行 → 数据不离开本地设备
- 用户下载结果 → 数据保存到本地磁盘
- 浏览器关闭 → 内存数据自动删除

### 2.2 物理断网转换验证
用户可通过以下步骤验证 HandyCT 的离线能力：
1. 打开 HandyCT 网页，上传 CSV 文件
2. 在浏览器开发者工具中禁用网络连接（或拔掉网线）
3. 继续执行 SDTM 转换操作
4. 如果转换成功，证明所有处理均在本地进行

这一特性意味着即使网络中断，用户仍可继续使用 HandyCT，数据处理能力不受影响。

## 3. GDPR/HIPAA 数据传输风险规避

### 3.1 GDPR 合规
- 数据不跨境传输，无需 Standard Contractual Clauses（SCC）
- 用户对数据拥有完全控制权，可随时删除
- 无数据处理协议（DPA）需求，因为 HandyCT 不处理用户数据

### 3.2 HIPAA 合规
- 不存储受保护的健康信息（PHI）
- 无需 Business Associate Agreement（BAA）
- 数据加密在浏览器本地进行，无需传输层加密

### 3.3 FDA 21 CFR Part 11 合规
- 所有转换在客户端完成，符合电子记录完整性要求
- 审计日志由用户维护，HandyCT 不记录任何操作历史
- 数据真实性由用户验证，HandyCT 不干预

## 4. 审计透明：支持 Network 抓包验证

HandyCT 的安全性可通过网络流量分析进行验证。

### 4.1 Network 抓包验证步骤
1. 打开浏览器开发者工具（F12 → Network 标签页）
2. 上传 CSV 文件并执行转换
3. 观察网络请求：
   - 仅包含页面加载请求（HTML、CSS、JavaScript）
   - 不存在任何 POST/PUT 请求上传用户数据
   - 不存在任何 API 调用涉及数据处理

### 4.2 预期的网络流量
- GET 请求：获取静态资源（网页、脚本、样式表）
- 无 API 请求：不存在 /api/convert、/api/validate 等端点
- 无数据上传：用户数据不通过网络传输

## 5. 安全承诺与责任边界

### 5.1 HandyCT 的安全承诺
- ✅ 100% 本地数据处理
- ✅ 零服务器存储
- ✅ 物理支持断网转换
- ✅ 无后端 API 接收文件
- ✅ 完全符合 GDPR、HIPAA、FDA 要求

### 5.2 用户的安全责任
- 用户对转换结果的准确性承担责任
- 用户应在具备资质的临床数据专家指导下使用 HandyCT
- 用户应定期备份转换结果
- 用户应遵守本地数据安全政策

## 6. 结论

HandyCT 通过端侧 AI 技术架构，实现了业界最高的数据安全标准。用户的临床试验数据永远不会离开其本地设备，从技术上规避了数据泄露风险。这一架构完全符合 GDPR、HIPAA 和 FDA 的所有数据保护要求。

---

**白皮书版本：** 1.0  
**发布日期：** 2026 年 1 月  
**有效期：** 2026 年 1 月 - 2027 年 1 月
    `;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'HandyCT_IT_Security_Whitepaper.txt');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />

      {/* Page Title */}
      <section className="border-b border-slate-200 bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-slate-900">IT 安全白皮书 / Security Whitepaper</h1>
          <p className="text-lg text-slate-600">端侧 AI 技术架构、数据安全与合规性分析</p>
        </div>
      </section>

      {/* Content */}
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Executive Summary */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-8 mb-8">
          <div className="flex gap-4">
            <Shield className="w-8 h-8 text-blue-600 flex-shrink-0" />
            <div>
              <h2 className="text-xl font-bold text-blue-900 mb-3">执行摘要</h2>
              <p className="text-sm text-blue-800">
                HandyCT 采用端侧 AI 技术架构，确保临床试验数据 100% 本地处理，规避数据传输风险，完全符合 GDPR、HIPAA 和 FDA 21 CFR Part 11 要求。所有 CDISC 标准转换在用户浏览器内存中进行，无任何后端服务器参与。
              </p>
            </div>
          </div>
        </div>

        {/* Core Features */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Feature 1 */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-green-600" />
              <h3 className="font-bold text-slate-900">端侧 AI 模型加载</h3>
            </div>
            <p className="text-sm text-slate-600">
              所有 CDISC 转换模型在用户浏览器内存中加载和执行。规则库预加载到客户端，数据处理完全在本地内存中进行，无需任何后端服务器参与。
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Wifi className="w-6 h-6 text-purple-600" />
              <h3 className="font-bold text-slate-900">物理断网可用</h3>
            </div>
            <p className="text-sm text-slate-600">
              无后端 API 接收文件。用户可在完全离线状态下使用 HandyCT，转换功能不受影响。通过 Network 抓包可验证：不存在任何数据上传请求。
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-orange-600" />
              <h3 className="font-bold text-slate-900">审计透明</h3>
            </div>
            <p className="text-sm text-slate-600">
              用户可通过浏览器开发者工具验证数据安全性。Network 标签页中不存在任何 API 调用涉及数据处理，所有请求仅为静态资源加载。
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-red-600" />
              <h3 className="font-bold text-slate-900">法规合规</h3>
            </div>
            <p className="text-sm text-slate-600">
              完全符合 GDPR（数据不跨境传输）、HIPAA（不存储 PHI）、FDA 21 CFR Part 11（电子记录完整性）等国际法规要求。
            </p>
          </div>
        </div>

        {/* Detailed Content */}
        <div className="prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. 技术架构：端侧 AI 模型加载</h2>
          <p className="text-slate-600 mb-4">
            HandyCT 的核心安全特性源于其独特的技术架构。所有 CDISC 标准转换模型（SDTM、ADaM、Define-XML）在用户浏览器内存中加载和执行，无需任何后端服务器参与。
          </p>

          <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">1.1 模型加载流程</h3>
          <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
            <li>用户访问 HandyCT 网页时，JavaScript 引擎在浏览器内存中初始化 CDISC 转换模型</li>
            <li>所有规则库（FDA 21 CFR Part 11、CDISC IG 最新标准）预加载到客户端</li>
            <li>数据处理完全在本地内存中进行，无任何网络传输</li>
          </ul>

          <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">1.2 内存隔离</h3>
          <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
            <li>每个用户的浏览器实例拥有独立的内存空间</li>
            <li>数据处理不涉及任何共享存储或服务器端数据库</li>
            <li>浏览器关闭后，所有数据自动从内存清除</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. 无后端 API 接收文件：物理断网可用</h2>
          <p className="text-slate-600 mb-4">
            HandyCT 的最大安全优势是"零服务器存储"架构。系统不存在任何后端 API 接收、存储或处理用户文件。
          </p>

          <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">2.1 数据流向</h3>
          <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
            <li>用户上传 CSV 文件 → 加载到浏览器内存</li>
            <li>所有转换在浏览器中进行 → 数据不离开本地设备</li>
            <li>用户下载结果 → 数据保存到本地磁盘</li>
            <li>浏览器关闭 → 内存数据自动删除</li>
          </ul>

          <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">2.2 物理断网转换验证</h3>
          <p className="text-slate-600 mb-4">用户可通过以下步骤验证 HandyCT 的离线能力：</p>
          <ol className="list-decimal list-inside text-slate-600 mb-6 space-y-2">
            <li>打开 HandyCT 网页，上传 CSV 文件</li>
            <li>在浏览器开发者工具中禁用网络连接（或拔掉网线）</li>
            <li>继续执行 SDTM 转换操作</li>
            <li>如果转换成功，证明所有处理均在本地进行</li>
          </ol>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. GDPR/HIPAA 数据传输风险规避</h2>
          <p className="text-slate-600 mb-4">
            通过端侧处理架构，HandyCT 完全规避了数据跨境传输的法律风险。
          </p>

          <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">3.1 GDPR 合规</h3>
          <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
            <li>数据不跨境传输，无需 Standard Contractual Clauses（SCC）</li>
            <li>用户对数据拥有完全控制权，可随时删除</li>
            <li>无数据处理协议（DPA）需求，因为 HandyCT 不处理用户数据</li>
          </ul>

          <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">3.2 HIPAA 合规</h3>
          <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
            <li>不存储受保护的健康信息（PHI）</li>
            <li>无需 Business Associate Agreement（BAA）</li>
            <li>数据加密在浏览器本地进行，无需传输层加密</li>
          </ul>

          <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">3.3 FDA 21 CFR Part 11 合规</h3>
          <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
            <li>所有转换在客户端完成，符合电子记录完整性要求</li>
            <li>审计日志由用户维护，HandyCT 不记录任何操作历史</li>
            <li>数据真实性由用户验证，HandyCT 不干预</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. 审计透明：支持 Network 抓包验证</h2>
          <p className="text-slate-600 mb-4">
            HandyCT 的安全性可通过网络流量分析进行验证。
          </p>

          <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">4.1 Network 抓包验证步骤</h3>
          <ol className="list-decimal list-inside text-slate-600 mb-6 space-y-2">
            <li>打开浏览器开发者工具（F12 → Network 标签页）</li>
            <li>上传 CSV 文件并执行转换</li>
            <li>观察网络请求：仅包含页面加载请求，不存在任何数据上传</li>
          </ol>

          <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">4.2 预期的网络流量</h3>
          <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
            <li>GET 请求：获取静态资源（网页、脚本、样式表）</li>
            <li>无 API 请求：不存在 /api/convert、/api/validate 等端点</li>
            <li>无数据上传：用户数据不通过网络传输</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">5. 结论</h2>
          <p className="text-slate-600 mb-4">
            HandyCT 通过端侧 AI 技术架构，实现了业界最高的数据安全标准。用户的临床试验数据永远不会离开其本地设备，从技术上规避了数据泄露风险。这一架构完全符合 GDPR、HIPAA 和 FDA 的所有数据保护要求。
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mt-8">
            <p className="text-sm text-amber-800">
              <strong>白皮书版本：</strong> 1.0 | <strong>发布日期：</strong> 2026 年 1 月 | <strong>有效期：</strong> 2026 年 1 月 - 2027 年 1 月
            </p>
          </div>
        </div>

        {/* Download Button */}
        <div className="mt-12 text-center">
          <Button
            onClick={handleDownloadWhitepaper}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 flex items-center gap-2 mx-auto"
          >
            <Download className="w-5 h-5" />
            下载完整白皮书（TXT）
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
