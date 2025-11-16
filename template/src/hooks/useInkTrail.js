import { useEffect, useRef } from 'react';

/**
 * 羽毛筆游標和墨水痕跡效果 Hook
 */
export function useInkTrail() {
  const containerRef = useRef(null);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const markCountRef = useRef(0);
  const MAX_MARKS = 50;

  // 創建羽毛筆游標 SVG
  const getQuillCursorDataURI = () => {
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
        <path d="M 8 4 L 8 28 L 12 24 L 12 8 Z" fill="#8b6f47" filter="url(#shadow)"/>
        <path d="M 12 8 Q 14 6, 16 8 Q 18 10, 20 8 L 20 24 Q 18 22, 16 24 Q 14 22, 12 24 Z" 
              fill="#c9a961" filter="url(#shadow)"/>
        <path d="M 8 28 L 10 30 L 12 28 Z" fill="#2c1810"/>
      </svg>
    `);
    return `data:image/svg+xml,${svg}`;
  };

  // 創建墨水痕跡
  const createInkMark = (x, y) => {
    if (!containerRef.current) return;

    const size = 3 + Math.random() * 4;
    const rotation = Math.random() * 360;
    const opacity = 0.3 + Math.random() * 0.4;

    const mark = document.createElement('div');
    mark.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle, rgba(44, 24, 16, ${opacity}) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(calc(-50% + -12px), calc(-50% + 12px)) rotate(${rotation}deg);
      animation: inkFadeOut 2s ease-out forwards;
    `;

    containerRef.current.appendChild(mark);
    markCountRef.current++;

    // 自動移除
    setTimeout(() => {
      if (mark.parentNode) {
        mark.parentNode.removeChild(mark);
        markCountRef.current--;
      }
    }, 2000);
  };

  useEffect(() => {
    // 創建容器
    const container = document.createElement('div');
    container.id = 'ink-trail-container';
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9998;
    `;
    document.body.appendChild(container);
    containerRef.current = container;

    // 添加 CSS 動畫
    if (!document.getElementById('ink-fade-style')) {
      const style = document.createElement('style');
      style.id = 'ink-fade-style';
      style.textContent = `
        @keyframes inkFadeOut {
          0% {
            opacity: 1;
            transform: translate(calc(-50% + -12px), calc(-50% + 12px)) rotate(var(--rotation, 0deg)) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(calc(-50% + -12px), calc(-50% + 12px)) rotate(var(--rotation, 0deg)) scale(0.7);
          }
        }
      `;
      document.head.appendChild(style);
    }

    // 設置游標
    const cursorDataURI = getQuillCursorDataURI();
    const cursor = `url("${cursorDataURI}") 4 28, auto`;
    document.body.style.cursor = cursor;

    // 滑鼠移動處理
    let isMoving = false;
    let trailTimer = null;

    const handleMouseMove = (e) => {
      if (markCountRef.current >= MAX_MARKS) return;

      const distance = Math.sqrt(
        Math.pow(e.clientX - lastPositionRef.current.x, 2) +
        Math.pow(e.clientY - lastPositionRef.current.y, 2)
      );

      if (distance > 5) {
        if (!isMoving) {
          isMoving = true;
        }

        createInkMark(e.clientX, e.clientY);
        lastPositionRef.current = { x: e.clientX, y: e.clientY };
      }

      clearTimeout(trailTimer);
      trailTimer = setTimeout(() => {
        isMoving = false;
      }, 100);
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
      document.body.style.cursor = 'auto';
    };
  }, []);
}

