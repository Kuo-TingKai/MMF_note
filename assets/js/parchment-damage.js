// 動態生成羊皮紙皺摺和破損效果

(function() {
  'use strict';

  // 生成不規則邊緣的 clip-path
  function generateTornEdge(edge, segments = 20) {
    const points = [];
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      // 使用正弦波和隨機變化，創建更自然的破損效果
      const smoothVariation = Math.sin(t * Math.PI * 2) * 0.01;
      const randomVariation = (Math.random() - 0.5) * 0.015;
      const variation = smoothVariation + randomVariation;
      
      if (edge === 'top') {
        // 頂邊：x 從 0 到 100%，y 在 0% 附近有輕微變化
        points.push(`${t * 100}% ${Math.max(0, variation * 100)}%`);
      } else if (edge === 'right') {
        // 右邊：x 在 100% 附近變化，y 從 0 到 100%
        points.push(`${Math.min(100, 100 + variation * 100)}% ${t * 100}%`);
      } else if (edge === 'bottom') {
        // 底邊：x 從 100% 到 0%，y 在 100% 附近變化
        points.push(`${(1 - t) * 100}% ${Math.min(100, 100 + variation * 100)}%`);
      } else { // left
        // 左邊：x 在 0% 附近變化，y 從 100% 到 0%
        points.push(`${Math.max(0, variation * 100)}% ${(1 - t) * 100}%`);
      }
    }
    return points;
  }

  // 為元素添加皺摺和破損效果
  function addDamageEffects(element, intensity = 'medium') {
    if (!element) return;

    // 為元素本身添加不規則邊緣
    if (intensity === 'high' && element.classList.contains('site-content')) {
      // 生成四條邊的點，確保正確連接
      const segments = 30;
      const allPoints = [];
      
      // 頂邊（從左到右，不包括最後一點）
      for (let i = 0; i < segments; i++) {
        const t = i / segments;
        const variation = (Math.random() - 0.5) * 0.02;
        allPoints.push(`${t * 100}% ${Math.max(-1, variation * 100)}%`);
      }
      
      // 右邊（從上到下，不包括最後一點）
      for (let i = 0; i < segments; i++) {
        const t = i / segments;
        const variation = (Math.random() - 0.5) * 0.02;
        allPoints.push(`${Math.min(101, 100 + variation * 100)}% ${t * 100}%`);
      }
      
      // 底邊（從右到左，不包括最後一點）
      for (let i = 0; i < segments; i++) {
        const t = i / segments;
        const variation = (Math.random() - 0.5) * 0.02;
        allPoints.push(`${(1 - t) * 100}% ${Math.min(101, 100 + variation * 100)}%`);
      }
      
      // 左邊（從下到上，包括回到起點）
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const variation = (Math.random() - 0.5) * 0.02;
        allPoints.push(`${Math.max(-1, variation * 100)}% ${(1 - t) * 100}%`);
      }
      
      const clipPath = `polygon(${allPoints.join(', ')})`;
      element.style.clipPath = clipPath;
    }

    const damageContainer = document.createElement('div');
    damageContainer.className = 'parchment-damage';
    damageContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
      overflow: hidden;
    `;

    // 根據強度決定皺摺數量
    const creaseCount = intensity === 'high' ? 6 : intensity === 'medium' ? 4 : 2;
    const tearCount = intensity === 'high' ? 3 : intensity === 'medium' ? 2 : 1;

    // 創建皺摺線
    for (let i = 0; i < creaseCount; i++) {
      const crease = document.createElement('div');
      crease.className = 'parchment-crease';
      
      const isVertical = Math.random() > 0.5;
      const position = Math.random() * 100;
      const length = 30 + Math.random() * 40; // 30-70%
      const startPos = position - length / 2;
      
      if (isVertical) {
        crease.style.cssText = `
          position: absolute;
          left: ${startPos}%;
          top: ${10 + Math.random() * 20}%;
          width: 2px;
          height: ${length}%;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(139, 111, 71, 0.15) 20%,
            rgba(139, 111, 71, 0.25) 50%,
            rgba(139, 111, 71, 0.15) 80%,
            transparent 100%
          );
          box-shadow: 
            -1px 0 2px rgba(44, 24, 16, 0.2),
            1px 0 2px rgba(44, 24, 16, 0.2);
          transform: rotate(${-2 + Math.random() * 4}deg);
        `;
      } else {
        crease.style.cssText = `
          position: absolute;
          left: ${10 + Math.random() * 20}%;
          top: ${startPos}%;
          width: ${length}%;
          height: 2px;
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(139, 111, 71, 0.15) 20%,
            rgba(139, 111, 71, 0.25) 50%,
            rgba(139, 111, 71, 0.15) 80%,
            transparent 100%
          );
          box-shadow: 
            0 -1px 2px rgba(44, 24, 16, 0.2),
            0 1px 2px rgba(44, 24, 16, 0.2);
          transform: rotate(${-2 + Math.random() * 4}deg);
        `;
      }
      
      damageContainer.appendChild(crease);
    }

    // 創建邊角破損
    const corners = [
      { position: 'top-left', x: 0, y: 0 },
      { position: 'top-right', x: 100, y: 0 },
      { position: 'bottom-left', x: 0, y: 100 },
      { position: 'bottom-right', x: 100, y: 100 }
    ];

    for (let i = 0; i < tearCount; i++) {
      const corner = corners[Math.floor(Math.random() * corners.length)];
      const tear = document.createElement('div');
      tear.className = 'parchment-tear';
      
      const size = 15 + Math.random() * 25; // 15-40px
      const rotation = Math.random() * 360;
      
      // 創建不規則的破損形狀
      const points = [];
      const pointCount = 8 + Math.floor(Math.random() * 4);
      for (let j = 0; j < pointCount; j++) {
        const angle = (j / pointCount) * Math.PI * 2;
        const radius = size * (0.7 + Math.random() * 0.3);
        const x = 50 + Math.cos(angle) * radius;
        const y = 50 + Math.sin(angle) * radius;
        points.push(`${x}% ${y}%`);
      }
      
      tear.style.cssText = `
        position: absolute;
        ${corner.x === 0 ? 'left' : 'right'}: -${size / 2}px;
        ${corner.y === 0 ? 'top' : 'bottom'}: -${size / 2}px;
        width: ${size}px;
        height: ${size}px;
        background: 
          radial-gradient(circle, 
            rgba(139, 111, 71, 0.2) 0%,
            rgba(139, 111, 71, 0.1) 40%,
            transparent 70%
          );
        clip-path: polygon(${points.join(', ')});
        transform: rotate(${rotation}deg);
        filter: blur(1px);
      `;
      
      damageContainer.appendChild(tear);
    }

    // 創建邊緣破損
    const edges = ['top', 'right', 'bottom', 'left'];
    for (let i = 0; i < tearCount; i++) {
      const edge = edges[Math.floor(Math.random() * edges.length)];
      const tear = document.createElement('div');
      tear.className = 'parchment-edge-tear';
      
      const position = 20 + Math.random() * 60; // 20-80%
      const size = 8 + Math.random() * 12; // 8-20px
      
      let style = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: 
          radial-gradient(circle, 
            rgba(139, 111, 71, 0.25) 0%,
            rgba(139, 111, 71, 0.15) 50%,
            transparent 80%
          );
        clip-path: polygon(
          0% 20%, 20% 0%, 50% 10%, 80% 0%, 100% 20%,
          100% 50%, 90% 80%, 100% 100%,
          80% 90%, 50% 100%, 20% 90%, 0% 100%,
          10% 80%, 0% 50%
        );
        filter: blur(0.5px);
      `;
      
      if (edge === 'top') {
        style += `
          top: -${size / 2}px;
          left: ${position}%;
          transform: translateX(-50%) rotate(${Math.random() * 180}deg);
        `;
      } else if (edge === 'right') {
        style += `
          right: -${size / 2}px;
          top: ${position}%;
          transform: translateY(-50%) rotate(${90 + Math.random() * 180}deg);
        `;
      } else if (edge === 'bottom') {
        style += `
          bottom: -${size / 2}px;
          left: ${position}%;
          transform: translateX(-50%) rotate(${180 + Math.random() * 180}deg);
        `;
      } else {
        style += `
          left: -${size / 2}px;
          top: ${position}%;
          transform: translateY(-50%) rotate(${270 + Math.random() * 180}deg);
        `;
      }
      
      tear.style.cssText = style;
      damageContainer.appendChild(tear);
    }

    element.appendChild(damageContainer);
  }

  // 為主要元素添加效果
  function initDamageEffects() {
    // 為內容區域添加高強度效果
    const siteContent = document.querySelector('.site-content');
    if (siteContent) {
      addDamageEffects(siteContent, 'high');
    }

    // 為卡片添加中等強度效果
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      addDamageEffects(card, 'medium');
    });

    // 為表格添加輕微效果
    const tables = document.querySelectorAll('table');
    tables.forEach(table => {
      addDamageEffects(table, 'low');
    });
  }

  // 頁面加載完成後初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDamageEffects);
  } else {
    initDamageEffects();
  }

  // 監聽動態添加的元素
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(node) {
        if (node.nodeType === 1) { // Element node
          if (node.classList && node.classList.contains('card')) {
            addDamageEffects(node, 'medium');
          }
          if (node.tagName === 'TABLE') {
            addDamageEffects(node, 'low');
          }
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

})();

