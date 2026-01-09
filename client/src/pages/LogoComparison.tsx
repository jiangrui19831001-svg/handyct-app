export default function LogoComparison() {
  const logos = [
    {
      id: 1,
      name: 'Logo Main',
      path: '/logo-main.png',
      description: '盾牌设计风格，H+CT 结合，医疗感强'
    },
    {
      id: 2,
      name: 'Logo Horizontal',
      path: '/logo-horizontal.png',
      description: '横向版本，带 HandyCT 文字和 Medical Technology'
    },
    {
      id: 3,
      name: 'Logo Icon',
      path: '/logo-icon.png',
      description: '简洁几何风格，H+CT 结合，深蓝色'
    },
    {
      id: 4,
      name: 'Logo Full',
      path: '/logo-full.png',
      description: '横向全版本，带 PRECISION DATA & COMPLIANCE SOLUTIONS'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">LOGO 方案对比</h1>
        <p className="text-lg text-slate-600 mb-12">请选择最终使用的 LOGO 方案</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {logos.map((logo) => (
            <div key={logo.id} className="bg-white rounded-lg shadow-md p-8 border-2 border-slate-200 hover:border-emerald-500 transition-colors">
              <h2 className="text-xl font-bold text-slate-900 mb-4">{logo.name}</h2>
              <p className="text-sm text-slate-600 mb-6">{logo.description}</p>
              
              {/* 白色背景展示 */}
              <div className="bg-white border border-slate-200 rounded p-6 mb-6 flex items-center justify-center min-h-48">
                <img src={logo.path} alt={logo.name} className="max-h-40 max-w-full" />
              </div>

              {/* 深色背景展示 */}
              <div className="bg-slate-900 border border-slate-700 rounded p-6 flex items-center justify-center min-h-48">
                <img src={logo.path} alt={logo.name} className="max-h-40 max-w-full" />
              </div>

              <div className="mt-6 text-center">
                <p className="text-xs text-slate-500 mb-4">文件: {logo.path}</p>
                <button className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-medium transition-colors">
                  选择此方案
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-2">选择说明</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• <strong>Logo Icon</strong>：推荐用于 Header 和 Favicon（简洁、清晰）</li>
            <li>• <strong>Logo Main</strong>：适合营销材料和品牌展示</li>
            <li>• <strong>Logo Horizontal / Full</strong>：适合横幅和登陆页</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
