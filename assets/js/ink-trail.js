// 羽毛筆游標和墨水痕跡效果

(function() {
  'use strict';

  // 創建羽毛筆游標 SVG（使用 data URI 確保兼容性）
  function getQuillCursorDataURI() {
    const svg = encodeURIComponent(`
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1"/>
            <feOffset dx="1" dy="1" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <!-- 羽毛筆筆桿 -->
        <path d="M 8 4 L 8 28 L 12 24 L 12 8 Z" fill="#8b6f47" filter="url(#shadow)"/>
        <!-- 羽毛筆羽毛 -->
        <path d="M 12 8 Q 14 6, 16 8 Q 18 10, 20 8 L 20 24 Q 18 22, 16 24 Q 14 22, 12 24 Z" 
              fill="#c9a961" filter="url(#shadow)"/>
        <!-- 筆尖 -->
        <path d="M 8 28 L 10 30 L 12 28 Z" fill="#2c1810"/>
        <!-- 羽毛細節 -->
        <path d="M 14 10 Q 15 9, 16 10 Q 17 11, 18 10" stroke="#8b6914" stroke-width="0.5" fill="none"/>
        <path d="M 14 14 Q 15 13, 16 14 Q 17 15, 18 14" stroke="#8b6914" stroke-width="0.5" fill="none"/>
        <path d="M 14 18 Q 15 17, 16 18 Q 17 19, 18 18" stroke="#8b6914" stroke-width="0.5" fill="none"/>
      </svg>
    `);
    return `data:image/svg+xml,${svg}`;
  }

  // 設置自定義游標
  function setupCustomCursor() {
    const cursorDataURI = getQuillCursorDataURI();
    const cursor = `url("${cursorDataURI}") 4 28, auto`;
    
    // 設置全局游標
    document.body.style.cursor = cursor;
    
    // 為所有可交互元素設置游標
    const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea, select, .site-nav a');
    interactiveElements.forEach(el => {
      el.style.cursor = cursor;
    });
    
    // 為表格行設置游標
    const tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach(row => {
      row.style.cursor = cursor;
    });
  }

  // 創建墨水痕跡容器
  function createInkTrailContainer() {
    const container = document.createElement('div');
    container.id = 'ink-trail-container';
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
    `;
    document.body.appendChild(container);
    return container;
  }

  // 創建單個墨水痕跡
  function createInkMark(x, y) {
    const mark = document.createElement('div');
    mark.className = 'ink-mark';
    
    // 隨機大小和形狀，模擬真實墨水
    const size = 3 + Math.random() * 4; // 3-7px
    const opacity = 0.3 + Math.random() * 0.2; // 0.3-0.5
    const rotation = Math.random() * 360;
    
    // 創建不規則的墨水形狀
    const shape = Math.random();
    let borderRadius = '50%';
    if (shape > 0.7) {
      // 橢圓形
      borderRadius = `${50 + Math.random() * 30}% ${50 - Math.random() * 20}%`;
    } else if (shape > 0.4) {
      // 不規則形狀
      borderRadius = `${30 + Math.random() * 40}% ${50 + Math.random() * 30}% ${40 + Math.random() * 30}% ${50 + Math.random() * 20}%`;
    }
    
    mark.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle, rgba(44, 24, 16, ${opacity}) 0%, rgba(44, 24, 16, ${opacity * 0.5}) 50%, transparent 100%);
      border-radius: ${borderRadius};
      transform: translate(-50%, -50%) rotate(${rotation}deg);
      pointer-events: none;
      animation: inkFadeOut 2s ease-out forwards;
      filter: blur(0.5px);
    `;
    
    return mark;
  }

  // 添加墨水淡出動畫
  function addInkFadeAnimation() {
    if (document.getElementById('ink-fade-style')) return;
    
    const style = document.createElement('style');
    style.id = 'ink-fade-style';
    style.textContent = `
      @keyframes inkFadeOut {
        0% {
          opacity: 1;
          transform: translate(-50%, -50%) rotate(var(--rotation, 0deg)) scale(1);
        }
        50% {
          opacity: 0.5;
          transform: translate(-50%, -50%) rotate(var(--rotation, 0deg)) scale(0.9);
        }
        100% {
          opacity: 0;
          transform: translate(-50%, -50%) rotate(var(--rotation, 0deg)) scale(0.7);
        }
      }
      
      /* 確保所有元素都使用羽毛筆游標 */
      * {
        cursor: inherit;
      }
      
      /* 為可點擊元素添加特殊效果 */
      a:hover, .btn:hover, button:hover, .site-nav a:hover {
        cursor: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 8 4 L 8 28 L 12 24 L 12 8 Z' fill='%238b6f47'/%3E%3Cpath d='M 12 8 Q 14 6, 16 8 Q 18 10, 20 8 L 20 24 Q 18 22, 16 24 Q 14 22, 12 24 Z' fill='%23c9a961'/%3E%3Cpath d='M 8 28 L 10 30 L 12 28 Z' fill='%232c1810'/%3E%3C/svg%3E") 4 28, pointer !important;
      }
    `;
    document.head.appendChild(style);
  }

  // 追蹤滑鼠移動
  let lastX = 0;
  let lastY = 0;
  let trailContainer = null;
  let isMoving = false;
  let trailTimer = null;
  let markCount = 0;
  const MAX_MARKS = 50; // 最大痕跡數量，防止性能問題

  function handleMouseMove(e) {
    if (!trailContainer) return;
    
    const x = e.clientX;
    const y = e.clientY;
    
    // 計算移動距離，只在移動足夠距離時創建痕跡
    const distance = Math.sqrt(Math.pow(x - lastX, 2) + Math.pow(y - lastY, 2));
    
    if (distance > 2) { // 至少移動 2px 才創建痕跡（更流暢）
      // 限制痕跡密度，但允許更頻繁的創建
      if (markCount < MAX_MARKS) {
        const mark = createInkMark(x, y);
        trailContainer.appendChild(mark);
        markCount++;
        
        // 2秒後移除元素（動畫完成後）
        setTimeout(() => {
          if (mark.parentNode) {
            mark.parentNode.removeChild(mark);
            markCount--;
          }
        }, 2000);
      } else {
        // 如果達到上限，移除最舊的痕跡
        const oldestMark = trailContainer.firstChild;
        if (oldestMark) {
          trailContainer.removeChild(oldestMark);
          markCount--;
          // 創建新痕跡
          const mark = createInkMark(x, y);
          trailContainer.appendChild(mark);
          markCount++;
          setTimeout(() => {
            if (mark.parentNode) {
              mark.parentNode.removeChild(mark);
              markCount--;
            }
          }, 2000);
        }
      }
      
      lastX = x;
      lastY = y;
    }
    
    // 清理舊痕跡（如果超過限制）
    if (trailContainer.children.length > MAX_MARKS) {
      const oldestMark = trailContainer.firstChild;
      if (oldestMark) {
        trailContainer.removeChild(oldestMark);
        markCount--;
      }
    }
  }

  // 滑鼠離開頁面時清理
  function handleMouseLeave() {
    if (trailContainer) {
      // 快速淡出所有痕跡
      const marks = trailContainer.querySelectorAll('.ink-mark');
      marks.forEach(mark => {
        mark.style.animation = 'inkFadeOut 0.5s ease-out forwards';
        setTimeout(() => {
          if (mark.parentNode) {
            mark.parentNode.removeChild(mark);
            markCount--;
          }
        }, 500);
      });
    }
  }

  // 初始化
  function init() {
    // 添加淡出動畫樣式
    addInkFadeAnimation();
    
    // 創建痕跡容器
    trailContainer = createInkTrailContainer();
    
    // 設置自定義游標
    setupCustomCursor();
    
    // 綁定事件
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // 為動態添加的元素設置游標
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === 1) { // Element node
            const cursorDataURI = getQuillCursorDataURI();
            const cursor = `url("${cursorDataURI}") 4 28, auto`;
            
            if (node.tagName === 'A' || node.tagName === 'BUTTON' || (node.classList && node.classList.contains('btn'))) {
              node.style.cursor = cursor;
            }
            // 為子元素設置游標
            const interactive = node.querySelectorAll && node.querySelectorAll('a, button, .btn, .site-nav a');
            if (interactive) {
              interactive.forEach(el => {
                el.style.cursor = cursor;
              });
            }
          }
        });
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // 頁面加載完成後初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // 優化：使用 requestAnimationFrame 節流
  let rafId = null;
  const optimizedHandleMouseMove = function(e) {
    if (rafId) {
      cancelAnimationFrame(rafId);
    }
    rafId = requestAnimationFrame(() => {
      handleMouseMove(e);
      rafId = null;
    });
  };

  // 替換原來的 mousemove 處理器
  document.removeEventListener('mousemove', handleMouseMove);
  document.addEventListener('mousemove', optimizedHandleMouseMove, { passive: true });

})();

