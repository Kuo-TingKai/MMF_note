// 暗黑破壞神風格的繁複花紋裝飾

(function() {
  'use strict';

  // 創建裝飾花紋容器
  function createOrnamentContainer(header) {
    const container = document.createElement('div');
    container.className = 'diablo-ornaments';
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
    header.appendChild(container);
    return container;
  }

  // 生成哥特式裝飾圖案
  function createGothicOrnament(type, x, y, width, height) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      opacity: 0.8;
    `;

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('fill', 'none');
    g.setAttribute('stroke', '#8b6f47');
    g.setAttribute('stroke-width', '2');
    g.setAttribute('stroke-linecap', 'round');
    g.setAttribute('stroke-linejoin', 'round');

    if (type === 'corner') {
      // 角落裝飾 - 複雜的哥特式卷軸和葉子圖案
      // 外層卷軸
      const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path1.setAttribute('d', `M ${width*0.05} ${height*0.15} 
        Q ${width*0.2} ${height*0.05}, ${width*0.4} ${height*0.1}
        Q ${width*0.6} ${height*0.15}, ${width*0.75} ${height*0.3}
        Q ${width*0.7} ${height*0.5}, ${width*0.75} ${height*0.7}
        Q ${width*0.6} ${height*0.85}, ${width*0.4} ${height*0.9}
        Q ${width*0.2} ${height*0.85}, ${width*0.05} ${height*0.75}`);
      g.appendChild(path1);

      // 中層裝飾線
      const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path2.setAttribute('d', `M ${width*0.15} ${height*0.25}
        Q ${width*0.3} ${height*0.2}, ${width*0.45} ${height*0.25}
        Q ${width*0.6} ${height*0.35}, ${width*0.55} ${height*0.5}
        Q ${width*0.5} ${height*0.65}, ${width*0.35} ${height*0.7}
        Q ${width*0.2} ${height*0.65}, ${width*0.15} ${height*0.55}`);
      g.appendChild(path2);

      // 內層裝飾線
      const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path3.setAttribute('d', `M ${width*0.25} ${height*0.35}
        Q ${width*0.35} ${height*0.3}, ${width*0.45} ${height*0.4}
        Q ${width*0.4} ${height*0.5}, ${width*0.3} ${height*0.55}`);
      g.appendChild(path3);

      // 多個葉子裝飾
      for (let i = 0; i < 4; i++) {
        const angle = (i * 90) * Math.PI / 180;
        const cx = width * 0.4 + Math.cos(angle) * width * 0.15;
        const cy = height * 0.5 + Math.sin(angle) * height * 0.15;
        const leaf = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        leaf.setAttribute('d', `M ${cx} ${cy}
          Q ${cx + Math.cos(angle + 0.3) * width * 0.05} ${cy + Math.sin(angle + 0.3) * height * 0.05},
            ${cx + Math.cos(angle) * width * 0.08} ${cy + Math.sin(angle) * height * 0.08}
          Q ${cx + Math.cos(angle - 0.3) * width * 0.05} ${cy + Math.sin(angle - 0.3) * height * 0.05},
            ${cx} ${cy}`);
        g.appendChild(leaf);
      }

      // 小裝飾點
      for (let i = 0; i < 6; i++) {
        const angle = (i * 60) * Math.PI / 180;
        const cx = width * 0.5 + Math.cos(angle) * width * 0.2;
        const cy = height * 0.5 + Math.sin(angle) * height * 0.2;
        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dot.setAttribute('cx', cx);
        dot.setAttribute('cy', cy);
        dot.setAttribute('r', 1.5);
        dot.setAttribute('fill', '#8b6f47');
        g.appendChild(dot);
      }
    } else if (type === 'border') {
      // 邊框裝飾 - 重複的複雜幾何圖案
      const patternWidth = width / 6;
      for (let i = 0; i < 6; i++) {
        const x = i * patternWidth;
        const centerX = x + patternWidth * 0.5;
        const centerY = height * 0.5;
        
        // 外層菱形
        const diamond1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        diamond1.setAttribute('d', `M ${centerX} ${height*0.15}
          L ${x + patternWidth*0.7} ${centerY}
          L ${centerX} ${height*0.85}
          L ${x + patternWidth*0.3} ${centerY}
          Z`);
        g.appendChild(diamond1);

        // 中層菱形
        const diamond2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        diamond2.setAttribute('d', `M ${centerX} ${height*0.3}
          L ${x + patternWidth*0.65} ${centerY}
          L ${centerX} ${height*0.7}
          L ${x + patternWidth*0.35} ${centerY}
          Z`);
        g.appendChild(diamond2);

        // 內部十字
        const cross1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        cross1.setAttribute('x1', x + patternWidth * 0.4);
        cross1.setAttribute('y1', centerY);
        cross1.setAttribute('x2', x + patternWidth * 0.6);
        cross1.setAttribute('y2', centerY);
        g.appendChild(cross1);

        const cross2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        cross2.setAttribute('x1', centerX);
        cross2.setAttribute('y1', height * 0.4);
        cross2.setAttribute('x2', centerX);
        cross2.setAttribute('y2', height * 0.6);
        g.appendChild(cross2);

        // 小裝飾點
        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dot.setAttribute('cx', centerX);
        dot.setAttribute('cy', centerY);
        dot.setAttribute('r', 1.5);
        dot.setAttribute('fill', '#8b6f47');
        g.appendChild(dot);
      }
    } else if (type === 'center') {
      // 中心裝飾 - 複雜的對稱圖案
      const centerX = width / 2;
      const centerY = height / 2;
      
      // 外圈
      const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle1.setAttribute('cx', centerX);
      circle1.setAttribute('cy', centerY);
      circle1.setAttribute('r', width * 0.3);
      g.appendChild(circle1);

      // 內圈
      const circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle2.setAttribute('cx', centerX);
      circle2.setAttribute('cy', centerY);
      circle2.setAttribute('r', width * 0.15);
      g.appendChild(circle2);

      // 十字圖案
      const cross1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      cross1.setAttribute('x1', centerX - width * 0.2);
      cross1.setAttribute('y1', centerY);
      cross1.setAttribute('x2', centerX + width * 0.2);
      cross1.setAttribute('y2', centerY);
      g.appendChild(cross1);

      const cross2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      cross2.setAttribute('x1', centerX);
      cross2.setAttribute('y1', centerY - width * 0.2);
      cross2.setAttribute('x2', centerX);
      cross2.setAttribute('y2', centerY + width * 0.2);
      g.appendChild(cross2);

      // 四角的裝飾
      for (let angle = 0; angle < 360; angle += 90) {
        const rad = (angle * Math.PI) / 180;
        const x1 = centerX + Math.cos(rad) * width * 0.25;
        const y1 = centerY + Math.sin(rad) * width * 0.25;
        const x2 = centerX + Math.cos(rad) * width * 0.35;
        const y2 = centerY + Math.sin(rad) * width * 0.35;
        
        const ray = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        ray.setAttribute('x1', x1);
        ray.setAttribute('y1', y1);
        ray.setAttribute('x2', x2);
        ray.setAttribute('y2', y2);
        g.appendChild(ray);
      }
    }

    svg.appendChild(g);
    return svg;
  }

  // 初始化裝飾
  function initOrnaments() {
    const header = document.querySelector('.site-header');
    if (!header) {
      setTimeout(initOrnaments, 100);
      return;
    }

    const container = createOrnamentContainer(header);
    const rect = header.getBoundingClientRect();
    const headerWidth = rect.width;
    const headerHeight = rect.height;

    // 左上角裝飾
    const topLeft = createGothicOrnament('corner', 0, 0, 80, 60);
    container.appendChild(topLeft);

    // 右上角裝飾（翻轉）
    const topRight = createGothicOrnament('corner', headerWidth - 80, 0, 80, 60);
    topRight.style.transform = 'scaleX(-1)';
    container.appendChild(topRight);

    // 左下角裝飾（翻轉）
    const bottomLeft = createGothicOrnament('corner', 0, headerHeight - 60, 80, 60);
    bottomLeft.style.transform = 'scaleY(-1)';
    container.appendChild(bottomLeft);

    // 右下角裝飾（翻轉）
    const bottomRight = createGothicOrnament('corner', headerWidth - 80, headerHeight - 60, 80, 60);
    bottomRight.style.transform = 'scale(-1, -1)';
    container.appendChild(bottomRight);

    // 頂部邊框裝飾
    const topBorder = createGothicOrnament('border', 100, 5, headerWidth - 200, 20);
    container.appendChild(topBorder);

    // 底部邊框裝飾
    const bottomBorder = createGothicOrnament('border', 100, headerHeight - 25, headerWidth - 200, 20);
    bottomBorder.style.transform = 'scaleY(-1)';
    container.appendChild(bottomBorder);

    // 中心裝飾（可選，如果標題在中間）
    // const center = createGothicOrnament('center', headerWidth / 2 - 40, headerHeight / 2 - 40, 80, 80);
    // container.appendChild(center);
  }

  // 頁面加載完成後初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOrnaments);
  } else {
    initOrnaments();
  }

  // 監聽窗口大小變化
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const header = document.querySelector('.site-header');
      if (header) {
        const ornaments = header.querySelector('.diablo-ornaments');
        if (ornaments) {
          ornaments.remove();
        }
        initOrnaments();
      }
    }, 200);
  });

})();

