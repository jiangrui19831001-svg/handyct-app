import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />

      {/* Page Title */}
      <section className="border-b border-slate-200 bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-slate-900">隐私政策 / Privacy Policy</h1>
          <p className="text-lg text-slate-600">最后更新：2026 年 1 月 | 版本 1.0</p>
        </div>
      </section>

      {/* Content */}
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-slate max-w-none">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <p className="text-sm text-green-800 font-semibold mb-2">
              🔐 核心承诺：数据主权完全归用户所有
            </p>
            <p className="text-sm text-green-700">
              HandyCT 采用"零服务器"架构。您的所有临床试验数据在浏览器本地处理，永远不会上传、存储或传输到任何服务器。因此，我们无法访问、修改或泄露您的原始数据。
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. 数据处理架构与主权声明</h2>
          <p className="text-slate-600 mb-4">
            <strong>1.1 客户端优先原则</strong>
          </p>
          <p className="text-slate-600 mb-4">
            HandyCT 采用 Web-AI 技术架构，所有数据处理均在您的浏览器本地内存中执行。这意味着：
          </p>
          <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
            <li><strong>零上传：</strong>您的 CSV 文件、SDTM 数据、ADaM 数据等任何形式的临床数据均不会上传到任何服务器</li>
            <li><strong>零存储：</strong>HandyCT 服务器不存储、缓存或备份任何用户数据</li>
            <li><strong>零访问：</strong>我们的后端系统完全无法访问您的原始数据</li>
            <li><strong>零泄露风险：</strong>因为我们不存储数据，所以从技术上不可能发生数据泄露</li>
          </ul>

          <p className="text-slate-600 mb-4">
            <strong>1.2 数据主权归属</strong>
          </p>
          <p className="text-slate-600 mb-6">
            您上传到 HandyCT 的所有临床试验数据的完全所有权和控制权始终属于您。HandyCT 不对这些数据拥有任何所有权、访问权或使用权。您可以随时离线使用 HandyCT（断网状态下），数据处理能力不受影响。
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. 技术实现与合规性</h2>
          <p className="text-slate-600 mb-4">
            <strong>2.1 客户端 JavaScript 处理</strong>
          </p>
          <p className="text-slate-600 mb-4">
            所有 CDISC 标准转换（SDTM、ADaM、Define-XML）均通过客户端 JavaScript 引擎完成，无需任何服务器参与。这确保了：
          </p>
          <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
            <li>数据永不离开您的设备</li>
            <li>完全离线可用（断网后仍可继续转换）</li>
            <li>即时处理，无网络延迟</li>
            <li>完全符合 GDPR、HIPAA、FDA 21 CFR Part 11 对数据隐私的要求</li>
          </ul>

          <p className="text-slate-600 mb-4">
            <strong>2.2 可选的元数据收集</strong>
          </p>
          <p className="text-slate-600 mb-6">
            为了改进服务，我们可能收集以下非个人、非敏感的信息：
          </p>
          <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
            <li>转换成功/失败的统计数据（不包含实际数据内容）</li>
            <li>使用的 CDISC 标准版本（如 SDTM v1.7）</li>
            <li>浏览器类型和操作系统（用于兼容性分析）</li>
            <li>页面访问统计（通过匿名分析工具）</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. 无服务器存储承诺</h2>
          <p className="text-slate-600 mb-4">
            <strong>我们明确声明：</strong>
          </p>
          <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
            <li>❌ 不存储用户上传的任何 CSV 文件</li>
            <li>❌ 不存储转换后的 SDTM/ADaM 数据</li>
            <li>❌ 不存储用户的转换历史或元数据</li>
            <li>❌ 不存储用户的个人信息（除非您主动提供，如联系表单）</li>
            <li>❌ 不维护用户数据的审计日志</li>
            <li>✅ 仅在您明确同意的情况下收集匿名使用统计</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Cookie 和追踪</h2>
          <p className="text-slate-600 mb-4">
            HandyCT 使用最小化的分析工具（如 Google Analytics）来了解用户行为，但：
          </p>
          <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
            <li>不会追踪个人身份信息（PII）</li>
            <li>不会追踪您上传的数据内容</li>
            <li>不会在 Cookie 中存储敏感信息</li>
            <li>您可以随时在浏览器设置中禁用 Cookie</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">5. 用户权利（GDPR 合规）</h2>
          <p className="text-slate-600 mb-4">
            根据欧盟《通用数据保护条例》（GDPR），您有以下权利：
          </p>
          <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
            <li><strong>访问权：</strong>您有权了解我们持有的关于您的数据</li>
            <li><strong>更正权：</strong>您有权要求更正不准确的数据</li>
            <li><strong>删除权：</strong>您有权要求删除我们持有的您的数据</li>
            <li><strong>撤回同意权：</strong>您可以随时撤回对数据处理的同意</li>
            <li><strong>投诉权：</strong>您有权向当地数据保护机构投诉</li>
          </ul>

          <p className="text-slate-600 mb-4">
            <strong>注意：</strong>由于 HandyCT 不存储用户数据，大多数 GDPR 请求（如数据导出、删除）无需处理——您的数据已经完全在您的控制下。
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">6. HIPAA 和 FDA 合规性</h2>
          <p className="text-slate-600 mb-4">
            HandyCT 架构完全符合以下法规要求：
          </p>
          <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
            <li><strong>HIPAA（美国健康保险可携带性和责任法案）：</strong>我们不存储受保护的健康信息（PHI），因此不受 HIPAA 直接约束。但我们的架构确保了 HIPAA 级别的数据保护</li>
            <li><strong>FDA 21 CFR Part 11：</strong>所有转换均在客户端完成，符合电子记录的完整性和真实性要求</li>
            <li><strong>ICH-GCP E6(R2)：</strong>我们遵循国际临床试验良好实践指南，确保数据的完整性和可追溯性</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">7. 安全自检：证明您的数据从未触网</h2>
          <p className="text-slate-600 mb-4">
            <strong>您可以通过以下步骤验证 HandyCT 的离线能力：</strong>
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <p className="text-sm text-blue-900 font-semibold mb-3">🔍 安全自检 1-2-3</p>
            <ol className="list-decimal list-inside text-sm text-blue-800 space-y-2">
              <li><strong>打开网页：</strong>访问 HandyCT 首页，上传您的 CSV 文件</li>
              <li><strong>断开网络：</strong>在浏览器开发者工具中禁用网络连接（或拔掉网线），或将浏览器切换到离线模式</li>
              <li><strong>照常转换：</strong>继续执行 SDTM/ADaM 转换操作。如果转换成功，证明您的数据从未上传到服务器</li>
            </ol>
            <p className="text-xs text-blue-700 mt-4">
              💡 提示：如果断网后转换仍然成功，这证明了所有处理都在您的浏览器本地进行。
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">8. 第三方集成</h2>
          <p className="text-slate-600 mb-4">
            HandyCT 不与任何第三方共享您的临床数据。我们可能使用以下第三方服务，但仅限于非敏感信息：
          </p>
          <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
            <li><strong>Google Analytics：</strong>用于网站流量分析（不追踪个人身份）</li>
            <li><strong>云服务提供商：</strong>仅用于托管静态网站内容，不存储用户数据</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">9. 数据保留政策</h2>
          <p className="text-slate-600 mb-4">
            由于 HandyCT 不存储用户数据，保留政策简单明了：
          </p>
          <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
            <li>您上传的数据在浏览器关闭后自动删除</li>
            <li>转换结果仅保存在您的本地设备上（您可以选择下载或删除）</li>
            <li>我们不维护任何用户数据的备份或存档</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">10. 政策变更</h2>
          <p className="text-slate-600 mb-4">
            我们可能不时更新本隐私政策。重大变更将通过网站公告或电子邮件通知。继续使用 HandyCT 表示您接受更新后的政策。
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">11. 联系方式</h2>
          <p className="text-slate-600 mb-4">
            如有任何隐私问题或数据主体权利请求，请通过以下方式联系我们：
          </p>
          <p className="text-slate-600 mb-6">
            <strong>邮箱：</strong> privacy@handyct.org<br />
            <strong>通过表单：</strong> <a href="/contact" className="text-blue-600 hover:text-blue-800">联系我们</a><br />
            <strong>响应时间：</strong> 我们将在 30 天内回复所有隐私相关的咨询
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mt-8">
            <p className="text-sm text-amber-800 font-semibold mb-2">
              ⚖️ 法律声明
            </p>
            <p className="text-sm text-amber-700">
              本隐私政策受适用法律管辖。如果您对 HandyCT 的隐私实践有任何疑问，我们建议您咨询法律专业人士。HandyCT 对因使用本服务而产生的任何间接、附带或后续损害不承担责任。
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
