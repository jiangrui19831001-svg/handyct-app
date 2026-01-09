import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';

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
          <p className="text-lg text-slate-600">最后更新：2026 年 1 月</p>
        </div>
      </section>

      {/* Content */}
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. 信息收集</h2>
          <p className="text-slate-600 mb-4">
            HandyCT 尊重您的隐私。我们仅在以下情况下收集个人信息：
          </p>
          <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
            <li>当您主动提供信息（如联系表单）</li>
            <li>当您使用我们的服务时自动收集的技术信息</li>
            <li>用于改进服务的分析数据</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. 数据处理与存储</h2>
          <p className="text-slate-600 mb-4">
            所有数据处理均遵循 GDPR 和 HIPAA 标准。我们：
          </p>
          <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
            <li>采用行业标准加密技术保护数据</li>
            <li>不会与第三方共享您的个人信息（除非法律要求）</li>
            <li>在本地浏览器中处理敏感的临床数据</li>
            <li>不在服务器上存储用户上传的文件</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Cookie 和追踪</h2>
          <p className="text-slate-600 mb-4">
            我们使用最小化的分析工具来了解用户行为，但不会追踪个人身份信息。您可以随时禁用 Cookie。
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. 用户权利</h2>
          <p className="text-slate-600 mb-4">
            根据 GDPR，您有权：
          </p>
          <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
            <li>访问我们持有的您的数据</li>
            <li>要求更正或删除数据</li>
            <li>撤回同意</li>
            <li>向数据保护机构投诉</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">5. 联系方式</h2>
          <p className="text-slate-600 mb-4">
            如有任何隐私问题，请通过以下方式联系我们：
          </p>
          <p className="text-slate-600 mb-6">
            邮箱：privacy@handyct.org<br />
            地址：[您的公司地址]
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
            <p className="text-sm text-blue-800">
              <strong>注意：</strong> 本隐私政策为草案版本，仅供参考。请根据您的实际业务需求和法律要求进行修改和完善。
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
