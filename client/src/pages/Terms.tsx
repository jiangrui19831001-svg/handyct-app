import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Terms() {
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
          <h1 className="mb-4 text-4xl font-bold text-slate-900">服务条款 / Terms of Service</h1>
          <p className="text-lg text-slate-600">最后更新：2026 年 1 月 | 版本 1.0</p>
        </div>
      </section>

      {/* Content */}
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-slate max-w-none">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <p className="text-sm text-green-800 font-semibold mb-2">
              ✅ 核心条款：数据主权完全归用户所有，HandyCT 无存储能力
            </p>
            <p className="text-sm text-green-700">
              用户上传到 HandyCT 的所有临床试验数据的完全所有权、控制权和责任归用户所有。HandyCT 采用零服务器架构，从技术上不具备存储、访问或泄露用户原始数据的能力。
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. 服务概述与技术架构</h2>
          <p className="text-slate-600 mb-4">
            <strong>1.1 服务定义</strong>
          </p>
          <p className="text-slate-600 mb-4">
            HandyCT 是一个现代化的、基于浏览器的 CDISC 数据转换工具，帮助临床试验团队自动化数据标准化和 FDA 合规性审计。HandyCT 采用"零服务器"架构，所有数据处理均在用户的浏览器本地进行。
          </p>

          <p className="text-slate-600 mb-4">
            <strong>1.2 技术架构声明</strong>
          </p>
          <p className="text-slate-600 mb-6">
            HandyCT 采用以下技术架构：
          </p>
          <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
            <li><strong>客户端优先：</strong>所有 CDISC 标准转换（SDTM、ADaM、Define-XML）均通过客户端 JavaScript 引擎在用户浏览器中执行</li>
            <li><strong>零上传：</strong>用户数据不上传到任何服务器</li>
            <li><strong>离线可用：</strong>用户可以在完全离线（断网）的状态下使用 HandyCT，数据处理能力不受影响</li>
            <li><strong>即时处理：</strong>无需等待服务器响应，数据处理在本地立即完成</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. 用户数据所有权与控制权</h2>
          <p className="text-slate-600 mb-4">
            <strong>2.1 数据主权声明</strong>
          </p>
          <p className="text-slate-600 mb-4">
            您对上传到 HandyCT 的所有数据保持完全的所有权、控制权和责任，包括但不限于：
          </p>
          <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
            <li>原始 CSV 数据文件</li>
            <li>转换后的 SDTM 数据集</li>
            <li>转换后的 ADaM 数据集</li>
            <li>Define-XML 元数据文件</li>
            <li>任何其他形式的临床试验数据</li>
          </ul>

          <p className="text-slate-600 mb-4">
            <strong>2.2 HandyCT 的无存储承诺</strong>
          </p>
          <p className="text-slate-600 mb-4">
            HandyCT 明确声明以下事项：
          </p>
          <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
            <li><strong>❌ 不存储：</strong>我们不在任何服务器上存储、缓存或备份用户数据</li>
            <li><strong>❌ 不访问：</strong>我们的后端系统完全无法访问用户的原始数据或转换结果</li>
            <li><strong>❌ 不泄露：</strong>因为我们不存储数据，所以从技术上不可能发生数据泄露</li>
            <li><strong>❌ 不使用：</strong>我们不将用户数据用于任何目的（包括模型训练、市场分析等）</li>
            <li><strong>✅ 完全控制：</strong>用户对其数据拥有完全的控制权，可以随时删除或导出</li>
          </ul>

          <p className="text-slate-600 mb-4">
            <strong>2.3 数据生命周期</strong>
          </p>
          <p className="text-slate-600 mb-6">
            用户数据的生命周期如下：
          </p>
          <ol className="list-decimal list-inside text-slate-600 mb-6 space-y-2">
            <li><strong>上传：</strong>用户选择本地文件，数据加载到浏览器内存</li>
            <li><strong>处理：</strong>所有转换在浏览器中进行，数据不离开本地设备</li>
            <li><strong>下载：</strong>用户可以下载转换结果到本地</li>
            <li><strong>删除：</strong>浏览器关闭或用户清除缓存后，数据自动删除</li>
          </ol>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. 使用许可与限制</h2>
          <p className="text-slate-600 mb-4">
            <strong>3.1 许可授予</strong>
          </p>
          <p className="text-slate-600 mb-4">
            我们授予您一个有限的、非独占的、不可转让的许可证，以便在遵守本条款的前提下使用本服务。
          </p>

          <p className="text-slate-600 mb-4">
            <strong>3.2 使用限制</strong>
          </p>
          <p className="text-slate-600 mb-4">
            您同意不会：
          </p>
          <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
            <li>进行任何非法活动或违反任何适用法律</li>
            <li>进行反向工程、反编译或尝试获取源代码</li>
            <li>进行任何可能损害或妨碍服务的行为</li>
            <li>进行大规模自动化访问或数据抓取</li>
            <li>将 HandyCT 用于任何商业竞争目的</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. 免责声明与风险承诺</h2>
          <p className="text-slate-600 mb-4">
            <strong>4.1 "现状"提供</strong>
          </p>
          <p className="text-slate-600 mb-4">
            HandyCT 按"现状"提供，不提供任何明示或暗示的保证。我们不保证：
          </p>
          <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
            <li>服务将不间断或无错误</li>
            <li>服务将满足您的所有需求</li>
            <li>数据转换的 100% 准确性（用户应进行独立验证）</li>
            <li>转换结果直接符合 FDA 要求（需由具备资质的专业人士验证）</li>
          </ul>

          <p className="text-slate-600 mb-4">
            <strong>4.2 用户验证责任</strong>
          </p>
          <p className="text-slate-600 mb-6">
            <strong>重要声明：</strong>所有通过 HandyCT 转换的数据必须经过具备资质的临床数据专家的独立验证，方可用于监管申报。HandyCT 是一个辅助工具，不能替代专业的数据验证流程。
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">5. 责任限制</h2>
          <p className="text-slate-600 mb-4">
            在任何情况下，HandyCT 对因使用或无法使用本服务而产生的任何间接、附带、特殊或后果性损害不承担责任，包括但不限于：
          </p>
          <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
            <li>数据丢失或损坏</li>
            <li>业务中断或利润损失</li>
            <li>监管申报被拒绝</li>
            <li>因数据转换错误导致的法律后果</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">6. 合规性与法律声明</h2>
          <p className="text-slate-600 mb-4">
            <strong>6.1 合规性目标</strong>
          </p>
          <p className="text-slate-600 mb-4">
            HandyCT 旨在帮助用户实现 FDA、CDISC、GDPR 和 HIPAA 等法规的合规性。但是：
          </p>
          <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
            <li>HandyCT 不提供法律或医学建议</li>
            <li>用户应咨询相关法律和医学专业人士以确保完全合规</li>
            <li>HandyCT 对因使用本服务而产生的任何合规性问题不承担责任</li>
          </ul>

          <p className="text-slate-600 mb-4">
            <strong>6.2 监管申报免责</strong>
          </p>
          <p className="text-slate-600 mb-6">
            HandyCT 开发者不对以下事项承担责任：
          </p>
          <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
            <li>数据转换的绝对准确性</li>
            <li>转换结果是否符合 FDA 或其他监管机构的要求</li>
            <li>因使用 HandyCT 而导致的监管申报被拒绝或延迟</li>
            <li>因数据错误导致的临床试验失败或患者安全问题</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">7. 服务修改与终止</h2>
          <p className="text-slate-600 mb-4">
            我们保留随时修改、暂停或终止服务的权利，恕不另行通知。我们将尽力提前通知重大变更。
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">8. 知识产权</h2>
          <p className="text-slate-600 mb-4">
            HandyCT 的源代码、算法和用户界面受知识产权法保护。用户不得复制、修改或分发 HandyCT 的任何部分。
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">9. 第三方链接</h2>
          <p className="text-slate-600 mb-4">
            HandyCT 可能包含指向第三方网站的链接。我们对第三方网站的内容、准确性或合法性不承担责任。
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">10. 条款修改</h2>
          <p className="text-slate-600 mb-4">
            我们可能不时更新本条款。重大变更将通过网站公告或电子邮件通知。继续使用 HandyCT 表示您接受更新后的条款。
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">11. 管辖权与争议解决</h2>
          <p className="text-slate-600 mb-4">
            本条款受适用法律管辖。如果您对 HandyCT 的服务有任何争议，请首先尝试通过友好协商解决。如果协商失败，您可以通过法律途径解决。
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">12. 联系方式</h2>
          <p className="text-slate-600 mb-4">
            如有任何关于本条款的问题，请通过以下方式联系：
          </p>
          <p className="text-slate-600 mb-6">
            <strong>邮箱：</strong> legal@handyct.org<br />
            <strong>通过表单：</strong> <a href="/contact" className="text-blue-600 hover:text-blue-800">联系我们</a><br />
            <strong>响应时间：</strong> 我们将在 30 天内回复所有法律相关的咨询
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mt-8">
            <p className="text-sm text-amber-800 font-semibold mb-2">
              ⚖️ 最终声明
            </p>
            <p className="text-sm text-amber-700">
              本服务条款构成了 HandyCT 与用户之间的完整协议。如果本条款的任何部分被认定为无效或不可执行，其余部分仍然有效。HandyCT 对因使用本服务而产生的任何直接或间接损害不承担责任。用户使用 HandyCT 即表示接受本条款的所有条件。
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
