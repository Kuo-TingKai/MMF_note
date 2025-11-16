// 為頁面添加隨機形狀的小破洞效果

(function() {
  'use strict';

  // 生成不規則破洞形狀的 clip-path
  function generateHoleShape(size) {
    const points = [];
    const segments = 8 + Math.floor(Math.random() * 4); // 8-12 個點
    
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments * Math.PI * 2);
      const radius = size * (0.6 + Math.random() * 0.4); // 60-100% 的半徑變化
      const x = 50 + Math.cos(angle) * radius;
      const y = 50 + Math.sin(angle) * radius;
      points.push(`${x}% ${y}%`);
    }
    
    return `polygon(${points.join(', ')})`;
  }

  // 創建破洞元素
  function createHole(x, y, size) {
    const hole = document.createElement('div');
    hole.className = 'parchment-hole';
    
    const shape = generateHoleShape(size);
    const rotation = Math.random() * 360;
    
    hole.style.cssText = `
      position: absolute;
      left: ${x}%;
      top: ${y}%;
      width: ${size}px;
      height: ${size}px;
      clip-path: ${shape};
      background: transparent;
      pointer-events: none;
      z-index: 1;
      transform: translate(-50%, -50%) rotate(${rotation}deg);
      /* 使用 box-shadow 創建破洞邊緣效果 */
      box-shadow: 
        inset 0 0 ${size * 0.3}px rgba(139, 111, 71, 0.15),
        0 0 ${size * 0.2}px rgba(44, 24, 16, 0.1);
    `;
    
    return hole;
  }

  // 為元素添加破洞
  function addHolesToElement(element, intensity = 'medium') {
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // 根據強度決定破洞數量
    const holeCount = intensity === 'high' 
      ? Math.floor((width * height) / 15000)  // 高強度：更多破洞
      : intensity === 'medium'
      ? Math.floor((width * height) / 25000)  // 中等強度
      : Math.floor((width * height) / 40000); // 低強度：較少破洞
    
    // 限制破洞數量，避免過多
    const maxHoles = Math.min(holeCount, 15);
    
    // 創建破洞容器
    const holesContainer = document.createElement('div');
    holesContainer.className = 'parchment-holes-container';
    holesContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
      overflow: hidden;
    `;
    
    // 生成破洞
    const existingHoles = new Set();
    
    for (let i = 0; i < maxHoles; i++) {
      // 隨機位置（避免太靠近邊緣和文字區域）
      const margin = 30;
      const x = margin + Math.random() * (100 - 2 * margin);
      const y = margin + Math.random() * (100 - 2 * margin);
      
      // 檢查是否與現有破洞太近
      let tooClose = false;
      for (const existing of existingHoles) {
        const dx = x - existing.x;
        const dy = y - existing.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 5) { // 至少 5% 的距離
          tooClose = true;
          break;
        }
      }
      
      if (tooClose) continue;
      
      // 隨機大小（8-20px）
      const size = 8 + Math.random() * 12;
      
      const hole = createHole(x, y, size);
      holesContainer.appendChild(hole);
      
      existingHoles.add({ x, y });
    }
    
    // 確保元素有相對定位
    if (window.getComputedStyle(element).position === 'static') {
      element.style.position = 'relative';
    }
    
    element.appendChild(holesContainer);
  }

  // 使用 mask 創建破洞效果（更精確的方法）
  function addHolesWithMask(element, intensity = 'medium') {
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // 創建 Canvas 用於生成 mask
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    // 填充白色（不透明區域）
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
    
    // 根據強度決定破洞數量
    const holeCount = intensity === 'high' 
      ? Math.floor((width * height) / 15000)
      : intensity === 'medium'
      ? Math.floor((width * height) / 25000)
      : Math.floor((width * height) / 40000);
    
    const maxHoles = Math.min(holeCount, 20);
    
    // 繪製破洞（黑色 = 透明區域）
    ctx.fillStyle = 'black';
    const existingHoles = new Set();
    
    for (let i = 0; i < maxHoles; i++) {
      const margin = 30;
      const x = margin + Math.random() * (width - 2 * margin);
      const y = margin + Math.random() * (height - 2 * margin);
      
      // 檢查距離
      let tooClose = false;
      for (const existing of existingHoles) {
        const dx = x - existing.x;
        const dy = y - existing.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 40) {
          tooClose = true;
          break;
        }
      }
      
      if (tooClose) continue;
      
      // 繪製不規則破洞
      const size = 8 + Math.random() * 12;
      ctx.beginPath();
      
      // 創建不規則形狀
      const segments = 6 + Math.floor(Math.random() * 4);
      for (let j = 0; j < segments; j++) {
        const angle = (j / segments) * Math.PI * 2;
        const radius = size * (0.5 + Math.random() * 0.5);
        const px = x + Math.cos(angle) * radius;
        const py = y + Math.sin(angle) * radius;
        
        if (j === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }
      
      ctx.closePath();
      ctx.fill();
      
      existingHoles.add({ x, y });
    }
    
    // 將 Canvas 轉換為 data URL
    const maskImage = canvas.toDataURL();
    
    // 創建 mask 容器
    const maskContainer = document.createElement('div');
    maskContainer.className = 'parchment-holes-mask';
    maskContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
      mask-image: url(${maskImage});
      -webkit-mask-image: url(${maskImage});
      mask-size: 100% 100%;
      -webkit-mask-size: 100% 100%;
      background: transparent;
    `;
    
    // 確保元素有相對定位
    if (window.getComputedStyle(element).position === 'static') {
      element.style.position = 'relative';
    }
    
    element.appendChild(maskContainer);
  }

  // 使用 mask 創建真正的破洞效果
  function addHolesWithMask(element, intensity = 'medium') {
    if (!element) return;

    // 等待元素完全渲染
    const updateHoles = () => {
      const rect = element.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        setTimeout(updateHoles, 100);
        return;
      }

      const width = rect.width;
      const height = rect.height;
      
      // 根據強度決定破洞數量
      const holeCount = intensity === 'high' 
        ? Math.floor((width * height) / 20000)
        : intensity === 'medium'
        ? Math.floor((width * height) / 30000)
        : Math.floor((width * height) / 50000);
      
      const maxHoles = Math.min(holeCount, 30);
      
      // 創建 Canvas 用於生成 mask
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      
      // 填充白色（不透明區域）
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, width, height);
      
      // 繪製破洞（黑色 = 透明區域）
      ctx.fillStyle = 'black';
      const existingHoles = new Set();
      
      for (let i = 0; i < maxHoles; i++) {
        const margin = 30;
        const x = margin + Math.random() * (width - 2 * margin);
        const y = margin + Math.random() * (height - 2 * margin);
        
        // 檢查距離
        let tooClose = false;
        for (const existing of existingHoles) {
          const dx = x - existing.x;
          const dy = y - existing.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 35) {
            tooClose = true;
            break;
          }
        }
        
        if (tooClose) continue;
        
        // 繪製不規則破洞
        const size = 6 + Math.random() * 14;
        ctx.beginPath();
        
        // 創建不規則形狀
        const segments = 6 + Math.floor(Math.random() * 5);
        for (let j = 0; j < segments; j++) {
          const angle = (j / segments) * Math.PI * 2;
          const radius = size * (0.5 + Math.random() * 0.5);
          const px = x + Math.cos(angle) * radius;
          const py = y + Math.sin(angle) * radius;
          
          if (j === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }
        
        ctx.closePath();
        ctx.fill();
        
        existingHoles.add({ x, y });
      }
      
      // 將 Canvas 轉換為 data URL
      const maskImage = canvas.toDataURL();
      
      // 移除舊的 mask（如果存在）
      const oldMask = element.querySelector('.parchment-holes-mask');
      if (oldMask) {
        oldMask.remove();
      }
      
      // 創建 mask 容器
      const maskContainer = document.createElement('div');
      maskContainer.className = 'parchment-holes-mask';
      maskContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        mask-image: url(${maskImage});
        -webkit-mask-image: url(${maskImage});
        mask-size: 100% 100%;
        -webkit-mask-size: 100% 100%;
        mask-repeat: no-repeat;
        -webkit-mask-repeat: no-repeat;
        background: transparent;
      `;
      
      // 確保元素有相對定位
      const computedStyle = window.getComputedStyle(element);
      if (computedStyle.position === 'static') {
        element.style.position = 'relative';
      }
      
      // 將 mask 應用到元素本身
      element.style.maskImage = `url(${maskImage})`;
      element.style.webkitMaskImage = `url(${maskImage})`;
      element.style.maskSize = '100% 100%';
      element.style.webkitMaskSize = '100% 100%';
      element.style.maskRepeat = 'no-repeat';
      element.style.webkitMaskRepeat = 'no-repeat';
    };
    
    updateHoles();
  }

  // 使用簡單的透明 div 創建破洞（最可靠的方法）
  function addHolesWithPseudoElements(element, intensity = 'medium') {
    if (!element) return;

    const updateHoles = () => {
      const rect = element.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        setTimeout(updateHoles, 100);
        return;
      }

      const width = rect.width;
      const height = rect.height;
      
      // 根據強度決定破洞數量
      const holeCount = intensity === 'high' 
        ? Math.floor((width * height) / 20000)
        : intensity === 'medium'
        ? Math.floor((width * height) / 30000)
        : Math.floor((width * height) / 50000);
      
      const maxHoles = Math.min(holeCount, 25);
      
      // 移除舊的破洞容器
      const oldContainer = element.querySelector('.parchment-holes-container');
      if (oldContainer) {
        oldContainer.remove();
      }
      
      // 創建破洞容器
      const holesContainer = document.createElement('div');
      holesContainer.className = 'parchment-holes-container';
      holesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        overflow: visible;
      `;
      
      // 生成破洞
      const existingHoles = new Set();
      
      for (let i = 0; i < maxHoles; i++) {
        const margin = 25;
        const x = margin + Math.random() * (100 - 2 * margin);
        const y = margin + Math.random() * (100 - 2 * margin);
        
        // 檢查距離
        let tooClose = false;
        for (const existing of existingHoles) {
          const dx = x - existing.x;
          const dy = y - existing.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 4) {
            tooClose = true;
            break;
          }
        }
        
        if (tooClose) continue;
        
        // 隨機大小（6-18px）
        const size = 6 + Math.random() * 12;
        const shape = generateHoleShape(size);
        const rotation = Math.random() * 360;
        
        const hole = document.createElement('div');
        hole.className = 'parchment-hole';
        hole.style.cssText = `
          position: absolute;
          left: ${x}%;
          top: ${y}%;
          width: ${size}px;
          height: ${size}px;
          clip-path: ${shape};
          -webkit-clip-path: ${shape};
          background: transparent;
          pointer-events: none;
          transform: translate(-50%, -50%) rotate(${rotation}deg);
          /* 破洞邊緣效果 - 使用陰影模擬邊緣 */
          box-shadow: 
            inset 0 0 ${size * 0.5}px rgba(139, 111, 71, 0.25),
            0 0 ${size * 0.4}px rgba(44, 24, 16, 0.2);
        `;
        
        holesContainer.appendChild(hole);
        
        existingHoles.add({ x, y });
      }
      
      // 確保元素有相對定位
      const computedStyle = window.getComputedStyle(element);
      if (computedStyle.position === 'static') {
        element.style.position = 'relative';
      }
      
      element.appendChild(holesContainer);
    };
    
    updateHoles();
  }

  // 初始化破洞
  function initHoles() {
    // 為主要內容區域添加破洞（使用 mask 方法）
    const siteContent = document.querySelector('.site-content');
    if (siteContent) {
      addHolesWithMask(siteContent, 'high');
    }

    // 為卡片添加破洞
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      addHolesWithMask(card, 'medium');
    });

    // 為導航欄添加少量破洞
    const siteHeader = document.querySelector('.site-header');
    if (siteHeader) {
      addHolesWithMask(siteHeader, 'low');
    }
  }

  // 頁面加載完成後初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHoles);
  } else {
    // 等待一下確保元素已渲染
    setTimeout(initHoles, 100);
  }

  // 監聽動態添加的元素
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(node) {
        if (node.nodeType === 1) { // Element node
          if (node.classList && node.classList.contains('card')) {
            setTimeout(() => {
              addHolesWithPseudoElements(node, 'medium');
            }, 50);
          }
          if (node.classList && node.classList.contains('site-content')) {
            setTimeout(() => {
              addHolesWithPseudoElements(node, 'high');
            }, 50);
          }
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // 監聽窗口大小變化，重新生成破洞
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // 移除舊的破洞
      document.querySelectorAll('.parchment-holes-container').forEach(container => {
        container.remove();
      });
      // 重新生成
      initHoles();
    }, 300);
  });

})();

