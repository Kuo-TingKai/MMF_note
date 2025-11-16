// 中世紀手抄書裝飾元素背景動畫

(function() {
  'use strict';

  // 裝飾元素容器
  let backgroundContainer = null;
  let foregroundContainer = null;
  let animationId = null;
  let activeDecorations = [];
  const MAX_DECORATIONS = 12; // 同時存在的最大裝飾數量（增加以支持前景和背景）
  const SPAWN_INTERVAL = 3000; // 生成間隔（毫秒）
  const DECORATION_LIFETIME = 15000; // 裝飾元素生命週期（毫秒）
  const FOREGROUND_RATIO = 0.4; // 40% 的裝飾在前景，60% 在背景

  // 創建背景裝飾容器
  function createBackgroundContainer() {
    const container = document.createElement('div');
    container.id = 'illuminated-decorations-bg';
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
    `;
    document.body.appendChild(container);
    return container;
  }

  // 創建前景裝飾容器（在內容上方但在導航欄下方）
  function createForegroundContainer() {
    const container = document.createElement('div');
    container.id = 'illuminated-decorations-fg';
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
      overflow: hidden;
    `;
    document.body.appendChild(container);
    return container;
  }

  // SVG 裝飾元素生成器
  const DecorationGenerators = {
    // 凱爾特結
    celticKnot: function(size, x, y) {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', size);
      svg.setAttribute('height', size);
      svg.setAttribute('viewBox', '0 0 100 100');
      svg.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        opacity: 0;
        transform: translate(-50%, -50%) scale(0);
        filter: drop-shadow(2px 2px 4px rgba(44, 24, 16, 0.3));
      `;

      const colors = ['#c9a961', '#8b6f47', '#8b4513', '#a0522d'];
      const color = colors[Math.floor(Math.random() * colors.length)];

      // 創建凱爾特結圖案
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const complexity = 3 + Math.floor(Math.random() * 3);
      let pathData = 'M 20,50 ';
      
      for (let i = 0; i < complexity; i++) {
        const angle = (i * 360 / complexity) * Math.PI / 180;
        const radius = 15 + Math.random() * 10;
        const cx = 50 + Math.cos(angle) * radius;
        const cy = 50 + Math.sin(angle) * radius;
        pathData += `Q ${cx},${cy} ${50 + Math.cos(angle + Math.PI / complexity) * 20},${50 + Math.sin(angle + Math.PI / complexity) * 20} `;
      }
      pathData += 'Z';

      path.setAttribute('d', pathData);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', color);
      path.setAttribute('stroke-width', '2');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('stroke-linejoin', 'round');
      
      // 添加交織效果
      const path2 = path.cloneNode(true);
      path2.setAttribute('d', pathData.replace(/Q/g, 'L').replace(/Z/g, ''));
      path2.setAttribute('stroke', colors[Math.floor(Math.random() * colors.length)]);
      path2.setAttribute('stroke-width', '1.5');
      path2.setAttribute('opacity', '0.7');

      svg.appendChild(path);
      svg.appendChild(path2);

      return svg;
    },

    // 螺旋圖案
    spiral: function(size, x, y) {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', size);
      svg.setAttribute('height', size);
      svg.setAttribute('viewBox', '0 0 100 100');
      svg.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        opacity: 0;
        transform: translate(-50%, -50%) scale(0) rotate(0deg);
        filter: drop-shadow(1px 1px 2px rgba(44, 24, 16, 0.2));
      `;

      const colors = ['#c9a961', '#8b6f47', '#d4a574'];
      const color = colors[Math.floor(Math.random() * colors.length)];

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      let pathData = 'M 50,50 ';
      const turns = 2 + Math.random() * 2;
      const segments = 50;
      
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const angle = t * turns * Math.PI * 2;
        const radius = 5 + t * 35;
        const x = 50 + Math.cos(angle) * radius;
        const y = 50 + Math.sin(angle) * radius;
        pathData += `${i === 0 ? 'M' : 'L'} ${x},${y} `;
      }

      path.setAttribute('d', pathData);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', color);
      path.setAttribute('stroke-width', '1.5');
      path.setAttribute('stroke-linecap', 'round');

      svg.appendChild(path);
      return svg;
    },

    // 幾何圖案（菱形/鑽石）
    geometric: function(size, x, y) {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', size);
      svg.setAttribute('height', size);
      svg.setAttribute('viewBox', '0 0 100 100');
      svg.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        opacity: 0;
        transform: translate(-50%, -50%) scale(0) rotate(0deg);
        filter: drop-shadow(2px 2px 3px rgba(44, 24, 16, 0.25));
      `;

      const colors = ['#8b4513', '#a0522d', '#8b6f47'];
      const color = colors[Math.floor(Math.random() * colors.length)];

      const pattern = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      
      // 創建菱形網格
      const gridSize = 3 + Math.floor(Math.random() * 3);
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          const diamond = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
          const cx = (i + 0.5) * (100 / gridSize);
          const cy = (j + 0.5) * (100 / gridSize);
          const size = 8 + Math.random() * 5;
          
          const points = [
            `${cx},${cy - size}`,
            `${cx + size},${cy}`,
            `${cx},${cy + size}`,
            `${cx - size},${cy}`
          ].join(' ');

          diamond.setAttribute('points', points);
          diamond.setAttribute('fill', color);
          diamond.setAttribute('opacity', 0.4 + Math.random() * 0.3);
          diamond.setAttribute('stroke', '#2c1810');
          diamond.setAttribute('stroke-width', '0.5');
          
          pattern.appendChild(diamond);
        }
      }

      svg.appendChild(pattern);
      return svg;
    },

    // 動物圖案（簡化版）
    zoomorphic: function(size, x, y) {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', size);
      svg.setAttribute('height', size);
      svg.setAttribute('viewBox', '0 0 100 100');
      svg.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        opacity: 0;
        transform: translate(-50%, -50%) scale(0);
        filter: drop-shadow(2px 2px 4px rgba(44, 24, 16, 0.3));
      `;

      const colors = ['#c9a961', '#8b6f47', '#a0522d'];
      const color = colors[Math.floor(Math.random() * colors.length)];

      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      
      // 創建簡化的動物輪廓（鳥或蛇）
      const animalType = Math.random() > 0.5 ? 'bird' : 'serpent';
      
      if (animalType === 'bird') {
        // 鳥的輪廓
        const body = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        body.setAttribute('cx', '50');
        body.setAttribute('cy', '60');
        body.setAttribute('rx', '15');
        body.setAttribute('ry', '20');
        body.setAttribute('fill', color);
        body.setAttribute('opacity', '0.5');
        body.setAttribute('stroke', '#2c1810');
        body.setAttribute('stroke-width', '1');
        g.appendChild(body);

        const head = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        head.setAttribute('cx', '50');
        head.setAttribute('cy', '40');
        head.setAttribute('r', '8');
        head.setAttribute('fill', color);
        head.setAttribute('opacity', '0.5');
        head.setAttribute('stroke', '#2c1810');
        head.setAttribute('stroke-width', '1');
        g.appendChild(head);

        const beak = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        beak.setAttribute('d', 'M 50,40 L 45,35 L 50,38 Z');
        beak.setAttribute('fill', '#2c1810');
        g.appendChild(beak);
      } else {
        // 蛇的輪廓
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M 30,50 Q 40,30 50,40 Q 60,50 70,35 Q 75,45 80,50');
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', color);
        path.setAttribute('stroke-width', '3');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('opacity', '0.6');
        g.appendChild(path);

        const head = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        head.setAttribute('cx', '80');
        head.setAttribute('cy', '50');
        head.setAttribute('r', '5');
        head.setAttribute('fill', color);
        head.setAttribute('opacity', '0.6');
        head.setAttribute('stroke', '#2c1810');
        head.setAttribute('stroke-width', '1');
        g.appendChild(head);
      }

      svg.appendChild(g);
      return svg;
    },

    // 裝飾性邊框
    border: function(size, x, y) {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', size);
      svg.setAttribute('height', size);
      svg.setAttribute('viewBox', '0 0 100 100');
      svg.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        opacity: 0;
        transform: translate(-50%, -50%) scale(0);
        filter: drop-shadow(1px 1px 2px rgba(44, 24, 16, 0.2));
      `;

      const colors = ['#c9a961', '#8b6f47'];
      const color = colors[Math.floor(Math.random() * colors.length)];

      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      
      // 創建裝飾性邊框
      const borderWidth = 3;
      const pattern = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      pattern.setAttribute('x', borderWidth);
      pattern.setAttribute('y', borderWidth);
      pattern.setAttribute('width', 100 - borderWidth * 2);
      pattern.setAttribute('height', 100 - borderWidth * 2);
      pattern.setAttribute('fill', 'none');
      pattern.setAttribute('stroke', color);
      pattern.setAttribute('stroke-width', '2');
      pattern.setAttribute('opacity', '0.4');
      g.appendChild(pattern);

      // 添加角部裝飾
      const cornerSize = 10;
      for (let corner = 0; corner < 4; corner++) {
        const cornerPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        let d = '';
        const x = corner % 2 === 0 ? borderWidth : 100 - borderWidth;
        const y = corner < 2 ? borderWidth : 100 - borderWidth;
        
        if (corner === 0) {
          d = `M ${x},${y} L ${x + cornerSize},${y} L ${x},${y + cornerSize} Z`;
        } else if (corner === 1) {
          d = `M ${x},${y} L ${x - cornerSize},${y} L ${x},${y + cornerSize} Z`;
        } else if (corner === 2) {
          d = `M ${x},${y} L ${x + cornerSize},${y} L ${x},${y - cornerSize} Z`;
        } else {
          d = `M ${x},${y} L ${x - cornerSize},${y} L ${x},${y - cornerSize} Z`;
        }
        
        cornerPath.setAttribute('d', d);
        cornerPath.setAttribute('fill', color);
        cornerPath.setAttribute('opacity', '0.5');
        g.appendChild(cornerPath);
      }

      svg.appendChild(g);
      return svg;
    }
  };

  // 隨機選擇裝飾類型
  function getRandomDecoration() {
    const types = Object.keys(DecorationGenerators);
    return types[Math.floor(Math.random() * types.length)];
  }

  // 創建裝飾元素
  function createDecoration() {
    if (!backgroundContainer || !foregroundContainer) return;

    // 決定是前景還是背景裝飾
    const isForeground = Math.random() < FOREGROUND_RATIO;
    const container = isForeground ? foregroundContainer : backgroundContainer;

    // 隨機位置
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    let x, y;
    if (isForeground) {
      // 前景裝飾：可以在內容區域上方，但避免完全遮擋文字
      // 可以更靠近中心，但使用更低的透明度
      const margin = 100;
      x = margin + Math.random() * (viewportWidth - 2 * margin);
      y = margin + Math.random() * (viewportHeight - 2 * margin);
    } else {
      // 背景裝飾：避免在主要內容區域
      const margin = 200;
      x = margin + Math.random() * (viewportWidth - 2 * margin);
      y = margin + Math.random() * (viewportHeight - 2 * margin);
    }
    
    // 隨機大小（前景裝飾可以稍小一些）
    const size = isForeground 
      ? 40 + Math.random() * 60  // 40-100px（前景）
      : 60 + Math.random() * 80; // 60-140px（背景）
    
    // 選擇裝飾類型
    const type = getRandomDecoration();
    const generator = DecorationGenerators[type];
    
    if (!generator) return;

    // 創建裝飾元素
    const decoration = generator(size, x, y);
    decoration.dataset.type = type;
    decoration.dataset.created = Date.now();
    decoration.dataset.layer = isForeground ? 'foreground' : 'background';
    
    container.appendChild(decoration);
    activeDecorations.push(decoration);

    // 設置透明度（前景更透明，避免干擾閱讀）
    const opacity = isForeground ? 0.08 : 0.15;

    // 淡入動畫
    requestAnimationFrame(() => {
      decoration.style.transition = 'opacity 2s ease-in, transform 2s ease-out';
      decoration.style.opacity = opacity.toString();
      decoration.style.transform = `translate(-50%, -50%) scale(1) ${type === 'spiral' ? 'rotate(' + (Math.random() * 360) + 'deg)' : ''}`;
    });
  }

  // 移除裝飾元素
  function removeDecoration(decoration) {
    if (!decoration || !decoration.parentNode) return;

    // 淡出動畫
    decoration.style.transition = 'opacity 3s ease-out, transform 3s ease-in';
    decoration.style.opacity = '0';
    decoration.style.transform = decoration.style.transform.replace('scale(1)', 'scale(0.5)');

    setTimeout(() => {
      if (decoration.parentNode) {
        decoration.parentNode.removeChild(decoration);
      }
      const index = activeDecorations.indexOf(decoration);
      if (index > -1) {
        activeDecorations.splice(index, 1);
      }
    }, 3000);
  }

  // 清理舊裝飾
  function cleanupOldDecorations() {
    const now = Date.now();
    activeDecorations.forEach((decoration, index) => {
      const created = parseInt(decoration.dataset.created);
      if (now - created > DECORATION_LIFETIME) {
        removeDecoration(decoration);
      }
    });
  }

  // 主動畫循環
  function animate() {
    cleanupOldDecorations();
    
    // 如果裝飾數量不足，生成新的
    if (activeDecorations.length < MAX_DECORATIONS) {
      createDecoration();
    }

    // 為現有裝飾添加微妙的動畫
    activeDecorations.forEach(decoration => {
      const age = Date.now() - parseInt(decoration.dataset.created);
      const progress = age / DECORATION_LIFETIME;
      const isForeground = decoration.dataset.layer === 'foreground';
      const baseOpacity = isForeground ? 0.08 : 0.15;
      
      // 緩慢旋轉（僅對某些類型）
      if (decoration.dataset.type === 'spiral' || decoration.dataset.type === 'geometric') {
        const rotation = progress * 360;
        const currentTransform = decoration.style.transform;
        const baseTransform = currentTransform.replace(/rotate\([^)]*\)/g, '').trim();
        decoration.style.transform = `${baseTransform} rotate(${rotation}deg)`;
      }
      
      // 逐漸降低透明度
      if (progress > 0.7) {
        const fadeProgress = (progress - 0.7) / 0.3;
        decoration.style.opacity = (baseOpacity * (1 - fadeProgress)).toString();
      }
    });

    animationId = requestAnimationFrame(animate);
  }

  // 初始化
  function init() {
    backgroundContainer = createBackgroundContainer();
    foregroundContainer = createForegroundContainer();
    
    // 初始生成一些裝飾（背景和前景混合）
    for (let i = 0; i < 5; i++) {
      setTimeout(() => createDecoration(), i * 800);
    }
    
    // 定期生成新裝飾
    setInterval(() => {
      if (activeDecorations.length < MAX_DECORATIONS) {
        createDecoration();
      }
    }, SPAWN_INTERVAL);
    
    // 啟動動畫循環
    animate();
  }

  // 頁面加載完成後初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // 窗口大小改變時調整
  window.addEventListener('resize', () => {
    // 可以根據需要調整裝飾位置
  }, { passive: true });

  // 頁面可見性改變時暫停/恢復
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    } else {
      if (!animationId) {
        animate();
      }
    }
  });

})();

