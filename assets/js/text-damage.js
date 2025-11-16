// 為標題文字添加輕微破損效果

(function() {
  'use strict';

  // 為文字元素添加破損效果
  function addTextDamage(element) {
    if (!element) return;

    // 獲取文字內容和位置信息
    const text = element.textContent;
    const textLength = text.length;
    
    // 使用 Canvas 測量文字寬度
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const computedStyle = window.getComputedStyle(element);
    ctx.font = `${computedStyle.fontSize} ${computedStyle.fontFamily}`;
    
    // 計算每個字符的位置
    const charPositions = [];
    let currentX = 0;
    for (let i = 0; i < textLength; i++) {
      const char = text[i];
      const charWidth = ctx.measureText(char).width;
      charPositions.push({
        char: char,
        x: currentX,
        width: charWidth
      });
      currentX += charWidth;
    }
    
    const totalWidth = currentX;
    
    // 創建破損裝飾容器
    const damageContainer = document.createElement('span');
    damageContainer.className = 'text-damage-overlay';
    damageContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      overflow: visible;
    `;

    // 為部分字符添加輕微破損（8-15% 的字符）
    const damageCount = Math.floor(textLength * (0.08 + Math.random() * 0.07));
    const damagedIndices = new Set();
    
    while (damagedIndices.size < damageCount) {
      const index = Math.floor(Math.random() * textLength);
      if (text[index] !== ' ' && text[index] !== '\n') { // 避免在空格和換行處添加破損
        damagedIndices.add(index);
      }
    }

    // 創建破損標記
    damagedIndices.forEach(index => {
      if (index >= charPositions.length) return;
      
      const charPos = charPositions[index];
      const damage = document.createElement('span');
      damage.className = 'text-damage-mark';
      
      // 隨機破損類型
      const damageType = Math.random();
      const relativeX = (charPos.x / totalWidth) * 100;
      
      if (damageType < 0.4) {
        // 小點破損
        damage.style.cssText = `
          position: absolute;
          left: ${relativeX + (charPos.width / totalWidth) * 50}%;
          top: 25%;
          width: 0.8px;
          height: 0.8px;
          background: rgba(139, 111, 71, 0.25);
          border-radius: 50%;
          transform: translateX(-50%);
        `;
      } else if (damageType < 0.7) {
        // 小線條破損
        damage.style.cssText = `
          position: absolute;
          left: ${relativeX + (charPos.width / totalWidth) * 50}%;
          top: 20%;
          width: 0.4px;
          height: 50%;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(139, 111, 71, 0.15) 50%,
            transparent 100%
          );
          transform: translateX(-50%) rotate(${-1.5 + Math.random() * 3}deg);
        `;
      } else {
        // 小缺口
        damage.style.cssText = `
          position: absolute;
          left: ${relativeX + (charPos.width / totalWidth) * 50}%;
          top: 30%;
          width: 1.2px;
          height: 35%;
          background: transparent;
          border-left: 0.4px solid rgba(139, 111, 71, 0.12);
          border-right: 0.4px solid rgba(139, 111, 71, 0.12);
          transform: translateX(-50%);
        `;
      }
      
      damageContainer.appendChild(damage);
    });

    // 添加破損容器
    if (element.style.position !== 'relative' && element.style.position !== 'absolute') {
      element.style.position = 'relative';
    }
    element.appendChild(damageContainer);
  }

  // 初始化
  function init() {
    const siteTitle = document.querySelector('.site-title');
    if (siteTitle) {
      addTextDamage(siteTitle);
    }
  }

  // 頁面加載完成後初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // 監聽動態添加的元素
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(node) {
        if (node.nodeType === 1 && node.classList && node.classList.contains('site-title')) {
          addTextDamage(node);
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

})();

