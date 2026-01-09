import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';

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
          <p className="text-lg text-slate-600">最后更新：2026 年 1 月</p>
        </div>
      </section>

      {/* Content */}
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. 服务概述</h2>
          <p className="text-slate-600 mb-4">
            HandyCT 是一个现代化的 CDISC 数据转换工具，帮助临床试验团队自动化数据标准化和 FDA 合规性审计。
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. 使用许可</h2>
          <p className="text-slate-600 mb-4">
            我们授予您一个有限的、非独占的、不可转让的许可证，以便在遵守本条款的前提下使用本服务。您同意：
          </p>
          <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
            <li>仅将服务用于合法目的</li>
            <li>不进行反向工程、反编译或尝试获取源代码</li>
            <li>不进行任何可能损害或妨碍服务的行为</li>
            <li>遵守所有适用的法律和法规</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. 免责声明</h2>
          <p className="text-slate-600 mb-4">
            HandyCT 按"现状"提供，不提供任何明示或暗示的保证。我们不保证：
          </p>
          <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
            <li>服务将不间断或无错误</li>
            <li>服务将满足您的所有需求</li>
            <li>数据转换的 100% 准确性（用户应进行独立验证）</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. 责任限制</h2>
          <p className="text-slate-600 mb-4">
            在任何情况下，HandyCT 对因使用或无法使用本服务而产生的任何间接、附带、特殊或后果性损害不承担责任，包括但不限于数据丢失或业务中断。
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">5. 用户数据</h2>
          <p className="text-slate-600 mb-4">
            您对上传到 HandyCT 的所有数据保持完全所有权和责任。我们：
          </p>
          <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
            <li>在本地浏览器中处理敏感数据</li>
            <li>不在服务器上持久存储用户文件</li>
            <li>建议您对所有转换结果进行独立验证</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">6. 合规性声明</h2>
          <p className="text-slate-600 mb-4">
            HandyCT 旨在帮助用户实现 FDA 合规性，但我们不提供法律或医学建议。用户应咨询相关专业人士以确保完全合规。
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">7. 服务修改</h2>
          <p className="text-slate-600 mb-4">
            我们保留随时修改或终止服务的权利，恕不另行通知。我们将尽力提前通知重大变更。
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">8. 联系方式</h2>
          <p className="text-slate-600 mb-4">
            如有任何关于本条款的问题，请联系：
          </p>
          <p className="text-slate-600 mb-6">
            邮箱：legal@handyct.org<br />
            地址：[您的公司地址]
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
            <p className="text-sm text-blue-800">
              <strong>注意：</strong> 本服务条款为草案版本，仅供参考。请根据您的实际业务需求、管辖权和法律要求进行修改和完善。建议咨询法律专业人士。
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12 mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-slate-600">
          <p>&copy; 2026 HandyCT. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
