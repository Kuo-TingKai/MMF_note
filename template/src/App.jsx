import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ParchmentEffects from './components/ParchmentEffects';

function App() {
  // 導航項目配置
  const navItems = [
    { label: '首頁', url: '/', active: true },
    { label: '關於', url: '/about', active: false },
    { label: '聯繫', url: '/contact', active: false },
  ];

  return (
    <div className="App">
      {/* 羊皮紙效果 */}
      <ParchmentEffects 
        enableInkTrail={true}
        enableBackground={true}
      />

      {/* 頁面內容 */}
      <Header 
        title="中世紀羊皮紙風格網站"
        navItems={navItems}
      />

      <main className="site-content wrapper">
        <h1>歡迎來到中世紀羊皮紙風格網站</h1>
        
        <div className="card">
          <h2>功能特性</h2>
          <ul>
            <li>🎨 中世紀羊皮紙質感設計</li>
            <li>✍️ 羽毛筆游標和墨水痕跡效果</li>
            <li>🎭 動態背景裝飾元素</li>
            <li>📜 羊皮紙破損和皺摺效果</li>
            <li>🕳️ 動態破洞效果</li>
          </ul>
        </div>

        <div className="card">
          <h2>技術棧</h2>
          <p>
            本模板使用 React 18 構建，包含先進的 CSS3 技術和 JavaScript API，
            實現了豐富的視覺效果和動畫。
          </p>
        </div>
      </main>

      <Footer 
        author="您的名字"
        year={new Date().getFullYear()}
      />
    </div>
  );
}

export default App;

