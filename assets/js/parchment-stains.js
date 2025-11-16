// 動態生成羊皮紙污漬效果

(function() {
  'use strict';

  // 創建污漬容器
  function createStainContainer() {
    const container = document.createElement('div');
    container.id = 'parchment-stains';
    container.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
    `;
    return container;
  }

  // 生成隨機污漬
  function createStain(container) {
    const stain = document.createElement('div');
    
    // 隨機位置
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    // 隨機大小和形狀
    const size = 50 + Math.random() * 150; // 50-200px
    const aspectRatio = 0.5 + Math.random() * 1; // 0.5-1.5
    const width = size;
    const height = size * aspectRatio;
    
    // 隨機透明度
    const opacity = 0.05 + Math.random() * 0.1; // 0.05-0.15
    
    // 隨機顏色（棕色系）
    const colors = [
      'rgba(139, 111, 71, ',
      'rgba(139, 105, 20, ',
      'rgba(101, 67, 33, ',
      'rgba(160, 82, 45, '
    ];
    const color = colors[Math.floor(Math.random() * colors.length)] + opacity + ')';
    
    // 隨機形狀（橢圓或不規則）
    const shape = Math.random();
    let borderRadius = '50%';
    if (shape > 0.5) {
      // 不規則形狀
      borderRadius = `${30 + Math.random() * 40}% ${50 + Math.random() * 30}% ${40 + Math.random() * 30}% ${50 + Math.random() * 20}%`;
    } else if (shape > 0.3) {
      // 橢圓形
      borderRadius = `${40 + Math.random() * 30}% ${60 + Math.random() * 20}%`;
    }
    
    // 隨機旋轉
    const rotation = Math.random() * 360;
    
    stain.style.cssText = `
      position: absolute;
      left: ${x}%;
      top: ${y}%;
      width: ${width}px;
      height: ${height}px;
      background: radial-gradient(ellipse, ${color} 0%, ${color} 40%, transparent 70%);
      border-radius: ${borderRadius};
      transform: translate(-50%, -50%) rotate(${rotation}deg);
      filter: blur(${2 + Math.random() * 3}px);
      opacity: 0;
      transition: opacity 3s ease-in;
    `;
    
    container.appendChild(stain);
    
    // 淡入動畫
    requestAnimationFrame(() => {
      stain.style.opacity = '1';
    });
    
    return stain;
  }

  // 初始化污漬
  function initStains() {
    const siteContent = document.querySelector('.site-content');
    if (!siteContent) {
      // 如果內容區域還沒加載，等待一下
      setTimeout(initStains, 100);
      return;
    }
    
    const container = createStainContainer();
    siteContent.appendChild(container);
    
    // 生成初始污漬（8-12 個）
    const stainCount = 8 + Math.floor(Math.random() * 5);
    for (let i = 0; i < stainCount; i++) {
      setTimeout(() => {
        createStain(container);
      }, i * 200);
    }
    
    // 定期添加新污漬（每 10-15 秒）
    setInterval(() => {
      if (container.children.length < 15) {
        createStain(container);
      }
    }, 10000 + Math.random() * 5000);
    
    // 定期移除舊污漬（保持數量平衡）
    setInterval(() => {
      if (container.children.length > 12) {
        const oldestStain = container.firstChild;
        if (oldestStain) {
          oldestStain.style.transition = 'opacity 2s ease-out';
          oldestStain.style.opacity = '0';
          setTimeout(() => {
            if (oldestStain.parentNode) {
              oldestStain.parentNode.removeChild(oldestStain);
            }
          }, 2000);
        }
      }
    }, 8000);
  }

  // 頁面加載完成後初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStains);
  } else {
    initStains();
  }

})();

