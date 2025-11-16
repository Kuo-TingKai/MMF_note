// 動態生成羊皮紙皺摺和破損效果

(function() {
  'use strict';

  // 創建跟隨破損軌跡的雙線條邊框
  function createTornBorder(element, edgePoints) {
    // 等待元素尺寸確定
    const updateBorder = () => {
      const rect = element.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      // 創建 SVG 邊框
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.className = 'torn-border';
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
      svg.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: visible;
      `;
      
      // 將百分比點轉換為像素坐標
      function pointsToPixels(points) {
        return points.map(point => {
          const [x, y] = point.split('%').map(v => parseFloat(v));
          return {
            x: (x / 100) * width,
            y: (y / 100) * height
          };
        });
      }
      
      const pixelPoints = pointsToPixels(edgePoints);
      
      // 計算垂直偏移路徑
      function offsetPath(points, offset) {
        const pathData = [];
        for (let i = 0; i < points.length; i++) {
          const current = points[i];
          const next = points[(i + 1) % points.length];
          const prev = points[(i - 1 + points.length) % points.length];
          
          // 計算切線方向
          const dx1 = next.x - current.x;
          const dy1 = next.y - current.y;
          const dx2 = current.x - prev.x;
          const dy2 = current.y - prev.y;
          
          // 平均切線方向
          const avgDx = (dx1 + dx2) / 2;
          const avgDy = (dy1 + dy2) / 2;
          const length = Math.sqrt(avgDx * avgDx + avgDy * avgDy);
          
          // 垂直方向（法向量）
          const perpX = -avgDy / length;
          const perpY = avgDx / length;
          
          const offsetX = current.x + perpX * offset;
          const offsetY = current.y + perpY * offset;
          
          if (i === 0) {
            pathData.push(`M ${offsetX} ${offsetY}`);
          } else {
            pathData.push(`L ${offsetX} ${offsetY}`);
          }
        }
        pathData.push('Z');
        return pathData.join(' ');
      }
      
      // 創建外層邊框（向外偏移）
      const outerPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const outerPathData = offsetPath(pixelPoints, 3);
      outerPath.setAttribute('d', outerPathData);
      outerPath.setAttribute('fill', 'none');
      outerPath.setAttribute('stroke', '#8b6f47');
      outerPath.setAttribute('stroke-width', '3');
      outerPath.setAttribute('stroke-linejoin', 'round');
      outerPath.setAttribute('stroke-linecap', 'round');
      
      // 創建內層邊框（向內偏移）
      const innerPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const innerPathData = offsetPath(pixelPoints, -3);
      innerPath.setAttribute('d', innerPathData);
      innerPath.setAttribute('fill', 'none');
      innerPath.setAttribute('stroke', '#8b6f47');
      innerPath.setAttribute('stroke-width', '3');
      innerPath.setAttribute('stroke-linejoin', 'round');
      innerPath.setAttribute('stroke-linecap', 'round');
      
      svg.appendChild(outerPath);
      svg.appendChild(innerPath);
      
      // 移除舊的邊框（如果存在）
      const oldBorder = element.querySelector('.torn-border');
      if (oldBorder) {
        oldBorder.remove();
      }
      
      element.appendChild(svg);
    };
    
    // 等待元素尺寸確定後執行
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        updateBorder();
      });
    });
    
    // 監聽窗口大小變化
    let resizeTimer;
    const resizeHandler = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateBorder, 100);
    };
    window.addEventListener('resize', resizeHandler);
    
    // 存儲 resize handler 以便後續清理（如果需要）
    element._resizeHandler = resizeHandler;
  }

  // 生成不規則邊緣的 clip-path（保留用於其他元素）
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

    // 為元素本身添加不規則邊緣和跟隨破損的邊框
    if (intensity === 'high' && element.classList.contains('site-content')) {
      // 生成四條邊的點，確保正確連接
      const segments = 40; // 增加分段數以獲得更平滑的邊緣
      const allPoints = [];
      
      // 頂邊（從左到右）
      for (let i = 0; i < segments; i++) {
        const t = i / segments;
        const variation = (Math.random() - 0.5) * 0.015;
        allPoints.push(`${t * 100}% ${Math.max(-0.5, variation * 100)}%`);
      }
      
      // 右邊（從上到下）
      for (let i = 0; i < segments; i++) {
        const t = i / segments;
        const variation = (Math.random() - 0.5) * 0.015;
        allPoints.push(`${Math.min(100.5, 100 + variation * 100)}% ${t * 100}%`);
      }
      
      // 底邊（從右到左）
      for (let i = 0; i < segments; i++) {
        const t = i / segments;
        const variation = (Math.random() - 0.5) * 0.015;
        allPoints.push(`${(1 - t) * 100}% ${Math.min(100.5, 100 + variation * 100)}%`);
      }
      
      // 左邊（從下到上，回到起點）
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const variation = (Math.random() - 0.5) * 0.015;
        allPoints.push(`${Math.max(-0.5, variation * 100)}% ${(1 - t) * 100}%`);
      }
      
      const clipPath = `polygon(${allPoints.join(', ')})`;
      element.style.clipPath = clipPath;
      
      // 創建跟隨破損軌跡的雙線條邊框
      createTornBorder(element, allPoints);
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

    // 創建皺摺線 - 非常短的筆觸，像筆尖不小心劃過的痕跡
    for (let i = 0; i < creaseCount; i++) {
      const isVertical = Math.random() > 0.5;
      // 非常短的長度，像意外劃過的痕跡（0.5-2%）
      const mainLength = 0.5 + Math.random() * 1.5;
      const position = 15 + Math.random() * 70; // 避免太靠近邊緣
      
      // 主筆觸的位置和參數
      let mainX, mainY, mainRotation, mainOpacity;
      
      if (isVertical) {
        // 垂直短筆觸
        mainX = 15 + Math.random() * 70;
        mainY = position;
        mainRotation = -0.3 + Math.random() * 0.6;
        mainOpacity = 0.6 + Math.random() * 0.3;
      } else {
        // 水平短筆觸
        mainX = position;
        mainY = 15 + Math.random() * 70;
        mainRotation = -0.3 + Math.random() * 0.6;
        mainOpacity = 0.6 + Math.random() * 0.3;
      }
      
      // 創建主筆觸
      const mainCrease = document.createElement('div');
      mainCrease.className = 'parchment-crease';
      
      if (isVertical) {
        mainCrease.style.cssText = `
          position: absolute;
          left: ${mainX}%;
          top: ${mainY}%;
          width: 0.3px;
          height: ${mainLength}%;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(44, 24, 16, ${mainOpacity * 0.6}) 10%,
            rgba(44, 24, 16, ${mainOpacity}) 40%,
            rgba(44, 24, 16, ${mainOpacity}) 60%,
            rgba(44, 24, 16, ${mainOpacity * 0.6}) 90%,
            transparent 100%
          );
          box-shadow: 0 0 0.3px rgba(44, 24, 16, 0.2);
          transform: rotate(${mainRotation}deg);
          opacity: 1;
        `;
      } else {
        mainCrease.style.cssText = `
          position: absolute;
          left: ${mainX}%;
          top: ${mainY}%;
          width: ${mainLength}%;
          height: 0.3px;
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(44, 24, 16, ${mainOpacity * 0.6}) 10%,
            rgba(44, 24, 16, ${mainOpacity}) 40%,
            rgba(44, 24, 16, ${mainOpacity}) 60%,
            rgba(44, 24, 16, ${mainOpacity * 0.6}) 90%,
            transparent 100%
          );
          box-shadow: 0 0 0.3px rgba(44, 24, 16, 0.2);
          transform: rotate(${mainRotation}deg);
          opacity: 1;
        `;
      }
      
      damageContainer.appendChild(mainCrease);
      
      // 在主筆觸周圍生成 2-4 條更短的隨機線條
      const nearbyCount = 2 + Math.floor(Math.random() * 3); // 2-4 條
      
      for (let j = 0; j < nearbyCount; j++) {
        const nearbyCrease = document.createElement('div');
        nearbyCrease.className = 'parchment-crease';
        
        // 隨機偏移距離（很近，1-3%）
        const offsetDistance = 0.3 + Math.random() * 0.5;
        const offsetAngle = Math.random() * Math.PI * 2;
        const offsetX = Math.cos(offsetAngle) * offsetDistance;
        const offsetY = Math.sin(offsetAngle) * offsetDistance;
        
        // 更短的長度（主筆觸的 30-70%）
        const nearbyLength = mainLength * (0.3 + Math.random() * 0.4);
        
        // 隨機方向（可以是任意角度）
        const nearbyRotation = Math.random() * 360;
        const nearbyOpacity = mainOpacity * (0.5 + Math.random() * 0.3); // 稍淺
        
        // 判斷是水平還是垂直（基於旋轉角度）
        const isNearbyVertical = Math.abs(Math.sin(nearbyRotation * Math.PI / 180)) > Math.abs(Math.cos(nearbyRotation * Math.PI / 180));
        
        if (isNearbyVertical) {
          nearbyCrease.style.cssText = `
            position: absolute;
            left: ${mainX + offsetX}%;
            top: ${mainY + offsetY}%;
            width: 0.25px;
            height: ${nearbyLength}%;
            background: linear-gradient(
              to bottom,
              transparent 0%,
              rgba(44, 24, 16, ${nearbyOpacity * 0.5}) 15%,
              rgba(44, 24, 16, ${nearbyOpacity}) 50%,
              rgba(44, 24, 16, ${nearbyOpacity * 0.5}) 85%,
              transparent 100%
            );
            box-shadow: 0 0 0.2px rgba(44, 24, 16, 0.15);
            transform: rotate(${nearbyRotation}deg);
            opacity: 1;
          `;
        } else {
          nearbyCrease.style.cssText = `
            position: absolute;
            left: ${mainX + offsetX}%;
            top: ${mainY + offsetY}%;
            width: ${nearbyLength}%;
            height: 0.25px;
            background: linear-gradient(
              to right,
              transparent 0%,
              rgba(44, 24, 16, ${nearbyOpacity * 0.5}) 15%,
              rgba(44, 24, 16, ${nearbyOpacity}) 50%,
              rgba(44, 24, 16, ${nearbyOpacity * 0.5}) 85%,
              transparent 100%
            );
            box-shadow: 0 0 0.2px rgba(44, 24, 16, 0.15);
            transform: rotate(${nearbyRotation}deg);
            opacity: 1;
          `;
        }
        
        damageContainer.appendChild(nearbyCrease);
      }
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

