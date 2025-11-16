import { useEffect, useRef } from 'react';

/**
 * 中世紀手抄書裝飾背景動畫組件
 */
function IlluminatedBackground() {
  const backgroundContainerRef = useRef(null);
  const foregroundContainerRef = useRef(null);
  const activeDecorationsRef = useRef([]);
  const animationIdRef = useRef(null);

  const MAX_DECORATIONS = 8;
  const DECORATION_LIFETIME = 15000;
  const FOREGROUND_RATIO = 0.4;

  // 創建裝飾容器
  const createContainer = (isForeground) => {
    const container = document.createElement('div');
    container.className = isForeground ? 'illuminated-foreground' : 'illuminated-background';
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: ${isForeground ? 1 : 0};
      opacity: ${isForeground ? 0.08 : 0.15};
    `;
    document.body.appendChild(container);
    return container;
  };

  // 生成 SVG 裝飾元素
  const createDecoration = (type, size, isForeground) => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.setAttribute('viewBox', '0 0 100 100');
    
    const x = isForeground 
      ? window.innerWidth * 0.3 + Math.random() * window.innerWidth * 0.4
      : Math.random() * window.innerWidth;
    const y = isForeground
      ? window.innerHeight * 0.3 + Math.random() * window.innerHeight * 0.4
      : Math.random() * window.innerHeight;

    svg.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      opacity: 0;
      transition: opacity 2s ease-in;
    `;

    // 根據類型創建不同的 SVG 路徑
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    if (type === 'spiral') {
      path.setAttribute('d', 'M 50 50 Q 30 30, 20 50 Q 30 70, 50 50');
      path.setAttribute('fill', 'rgba(139, 111, 71, 0.2)');
    } else if (type === 'flourish') {
      path.setAttribute('d', 'M 20 50 Q 50 20, 80 50 Q 50 80, 20 50');
      path.setAttribute('fill', 'rgba(201, 169, 97, 0.15)');
    } else {
      path.setAttribute('d', 'M 50 20 L 80 50 L 50 80 L 20 50 Z');
      path.setAttribute('fill', 'rgba(139, 111, 71, 0.18)');
    }

    svg.appendChild(path);
    svg.dataset.created = Date.now().toString();
    svg.dataset.type = type;
    svg.dataset.layer = isForeground ? 'foreground' : 'background';

    return { svg, x, y };
  };

  // 添加裝飾
  const addDecoration = () => {
    if (activeDecorationsRef.current.length >= MAX_DECORATIONS) return;

    const isForeground = Math.random() < FOREGROUND_RATIO;
    const container = isForeground ? foregroundContainerRef.current : backgroundContainerRef.current;
    if (!container) return;

    const types = ['spiral', 'flourish', 'geometric'];
    const type = types[Math.floor(Math.random() * types.length)];
    const size = isForeground 
      ? 40 + Math.random() * 30
      : 50 + Math.random() * 50;

    const { svg } = createDecoration(type, size, isForeground);
    container.appendChild(svg);

    // 淡入
    requestAnimationFrame(() => {
      svg.style.opacity = '1';
    });

    activeDecorationsRef.current.push(svg);
  };

  // 清理舊裝飾
  const cleanupOldDecorations = () => {
    const now = Date.now();
    activeDecorationsRef.current = activeDecorationsRef.current.filter(decoration => {
      const age = now - parseInt(decoration.dataset.created);
      if (age > DECORATION_LIFETIME) {
        decoration.style.transition = 'opacity 2s ease-out';
        decoration.style.opacity = '0';
        setTimeout(() => {
          if (decoration.parentNode) {
            decoration.parentNode.removeChild(decoration);
          }
        }, 2000);
        return false;
      }
      return true;
    });
  };

  // 動畫循環
  const animate = () => {
    cleanupOldDecorations();

    if (activeDecorationsRef.current.length < MAX_DECORATIONS) {
      addDecoration();
    }

    // 更新現有裝飾的透明度
    activeDecorationsRef.current.forEach(decoration => {
      const age = Date.now() - parseInt(decoration.dataset.created);
      const progress = age / DECORATION_LIFETIME;
      const isForeground = decoration.dataset.layer === 'foreground';
      const baseOpacity = isForeground ? 0.08 : 0.15;

      if (progress > 0.7) {
        const fadeProgress = (progress - 0.7) / 0.3;
        decoration.style.opacity = (baseOpacity * (1 - fadeProgress)).toString();
      }
    });

    animationIdRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    // 創建容器
    backgroundContainerRef.current = createContainer(false);
    foregroundContainerRef.current = createContainer(true);

    // 初始生成一些裝飾
    for (let i = 0; i < 3; i++) {
      setTimeout(() => addDecoration(), i * 800);
    }

    // 定期生成新裝飾
    const spawnInterval = setInterval(() => {
      if (activeDecorationsRef.current.length < MAX_DECORATIONS) {
        addDecoration();
      }
    }, 5000);

    // 啟動動畫
    animate();

    // 頁面不可見時暫停
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
          animationIdRef.current = null;
        }
      } else {
        if (!animationIdRef.current) {
          animate();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(spawnInterval);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (backgroundContainerRef.current?.parentNode) {
        backgroundContainerRef.current.parentNode.removeChild(backgroundContainerRef.current);
      }
      if (foregroundContainerRef.current?.parentNode) {
        foregroundContainerRef.current.parentNode.removeChild(foregroundContainerRef.current);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return null; // 此組件不渲染任何內容
}

export default IlluminatedBackground;

