// 背景模形式方程式動畫 - 不斷繪製和擦除

(function() {
  'use strict';

  let canvas = null;
  let ctx = null;
  let animationId = null;
  let currentEquation = null;
  let drawingProgress = 0;
  let erasingProgress = 0;
  let isDrawing = true;
  let isErasing = false;
  let pathPoints = [];
  let currentPathIndex = 0;

  // 模形式方程式模板
  const equations = [
    {
      text: 'f(τ) = ∑_{n=0}^∞ a(n)q^n',
      complexity: 'medium',
      fontSize: 24
    },
    {
      text: 'f(γτ) = (cτ+d)^k f(τ)',
      complexity: 'medium',
      fontSize: 24
    },
    {
      text: 'Δ(τ) = q∏_{n=1}^∞ (1-q^n)^{24}',
      complexity: 'high',
      fontSize: 22
    },
    {
      text: 'j(τ) = 1728 E_4(τ)^3 / Δ(τ)',
      complexity: 'high',
      fontSize: 22
    },
    {
      text: 'E_k(τ) = 1 - (2k/B_k)∑_{n=1}^∞ σ_{k-1}(n)q^n',
      complexity: 'high',
      fontSize: 20
    },
    {
      text: 'θ(τ) = ∑_{n=-∞}^∞ q^{n^2}',
      complexity: 'low',
      fontSize: 24
    },
    {
      text: 'η(τ) = q^{1/24}∏_{n=1}^∞ (1-q^n)',
      complexity: 'medium',
      fontSize: 22
    },
    {
      text: 'L(f,s) = ∑_{n=1}^∞ a(n)n^{-s}',
      complexity: 'medium',
      fontSize: 24
    },
    {
      text: 'f(τ+1) = f(τ)',
      complexity: 'low',
      fontSize: 26
    },
    {
      text: 'f(-1/τ) = τ^k f(τ)',
      complexity: 'medium',
      fontSize: 24
    }
  ];

  // 初始化 Canvas
  function initCanvas() {
    canvas = document.createElement('canvas');
    canvas.id = 'modular-form-canvas';
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
      opacity: 0.25;
      mix-blend-mode: multiply;
    `;
    document.body.appendChild(canvas);
    
    ctx = canvas.getContext('2d');
    resizeCanvas();
    
    window.addEventListener('resize', () => {
      resizeCanvas();
    });
  }

  // 調整 Canvas 大小
  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (ctx) {
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  }

  // 生成手寫路徑點 - 使用實際的筆劃模擬
  function generateHandwritingPath(text, x, y, fontSize) {
    const points = [];
    ctx.font = `${fontSize}px "Noto Serif TC", serif`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    
    // 為每個字符生成路徑點
    let currentX = x;
    const step = 1.5; // 每個點的間距（像素），更平滑
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const charMetrics = ctx.measureText(char);
      const charWidth = charMetrics.width;
      
      // 為這個字符生成多個點，模擬手寫
      const pointsPerChar = Math.max(5, Math.ceil(charWidth / step));
      
      for (let j = 0; j < pointsPerChar; j++) {
        const t = j / pointsPerChar;
        const charX = currentX + charWidth * t;
        
        // 使用正弦波和隨機抖動，創建更自然的手寫效果
        const smoothJitter = Math.sin(t * Math.PI * 2) * 0.3;
        const randomJitterX = (Math.random() - 0.5) * 0.8;
        const randomJitterY = (Math.random() - 0.5) * 0.8;
        
        // 在字符開始和結束時減少抖動
        const dampening = Math.min(t * 2, (1 - t) * 2, 1);
        
        points.push({
          x: charX + (smoothJitter + randomJitterX) * dampening,
          y: y + randomJitterY * dampening,
          char: char,
          charIndex: i,
          progress: t
        });
      }
      
      currentX += charWidth;
    }
    
    return points;
  }

  // 開始繪製新方程式
  function startNewEquation() {
    // 隨機選擇一個方程式
    const randomIndex = Math.floor(Math.random() * equations.length);
    currentEquation = equations[randomIndex];
    
    // 隨機位置（避免在內容區域中心）
    const margin = 100;
    const x = margin + Math.random() * (canvas.width - 2 * margin);
    const y = margin + Math.random() * (canvas.height - 2 * margin);
    
    // 生成手寫路徑
    pathPoints = generateHandwritingPath(
      currentEquation.text,
      x,
      y,
      currentEquation.fontSize
    );
    
    currentPathIndex = 0;
    drawingProgress = 0;
    erasingProgress = 0;
    isDrawing = true;
    isErasing = false;
  }

  // 繪製方程式 - 模擬手寫效果
  function drawEquation() {
    if (!ctx || !currentEquation || pathPoints.length === 0) return;
    
    // 計算要繪製的點數
    const totalPoints = pathPoints.length;
    const pointsToDraw = Math.floor(totalPoints * drawingProgress);
    
    if (pointsToDraw > 0) {
      // 繪製主路徑
      ctx.strokeStyle = 'rgba(139, 111, 71, 0.6)';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      ctx.beginPath();
      
      // 使用平滑的曲線連接點
      for (let i = 0; i < pointsToDraw; i++) {
        const point = pathPoints[i];
        
        if (i === 0) {
          ctx.moveTo(point.x, point.y);
        } else if (i === 1) {
          ctx.lineTo(point.x, point.y);
        } else {
          // 使用二次貝塞爾曲線，使線條更平滑
          const prevPoint = pathPoints[i - 1];
          const cpX = (prevPoint.x + point.x) / 2;
          const cpY = (prevPoint.y + point.y) / 2;
          ctx.quadraticCurveTo(prevPoint.x, prevPoint.y, cpX, cpY);
        }
      }
      
      ctx.stroke();
      
      // 在關鍵點添加墨水點，增強手寫感
      if (pointsToDraw > 10) {
        ctx.fillStyle = 'rgba(139, 111, 71, 0.4)';
        
        // 每隔幾個點添加一個小墨水點
        for (let i = 5; i < pointsToDraw; i += 8) {
          const point = pathPoints[i];
          ctx.beginPath();
          ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }

  // 擦除方程式 - 模擬逐漸消失
  function eraseEquation() {
    if (!ctx || !currentEquation) return;
    
    const totalPoints = pathPoints.length;
    const pointsToKeep = Math.floor(totalPoints * (1 - erasingProgress));
    
    if (pointsToKeep < totalPoints) {
      // 使用合成模式擦除
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      
      // 從末尾開始擦除
      const startEraseIndex = pointsToKeep;
      
      if (startEraseIndex < totalPoints) {
        ctx.beginPath();
        
        // 繪製擦除路徑
        for (let i = startEraseIndex; i < totalPoints; i++) {
          const point = pathPoints[i];
          if (i === startEraseIndex) {
            ctx.moveTo(point.x, point.y);
          } else {
            const prevPoint = pathPoints[i - 1];
            const cpX = (prevPoint.x + point.x) / 2;
            const cpY = (prevPoint.y + point.y) / 2;
            ctx.quadraticCurveTo(prevPoint.x, prevPoint.y, cpX, cpY);
          }
        }
        
        ctx.stroke();
        
        // 擦除墨水點
        for (let i = startEraseIndex; i < totalPoints; i += 8) {
          const point = pathPoints[i];
          ctx.beginPath();
          ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      // 恢復合成模式
      ctx.globalCompositeOperation = 'source-over';
    }
  }

  // 動畫循環
  function animate() {
    if (!canvas || !ctx) return;
    
    // 清除畫布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (!currentEquation) {
      startNewEquation();
    }
    
    if (isDrawing) {
      // 繪製階段
      drawingProgress += 0.006; // 繪製速度（稍慢，更真實）
      
      if (drawingProgress >= 1) {
        drawingProgress = 1;
        // 繪製完成，等待一段時間後開始擦除
        setTimeout(() => {
          isDrawing = false;
          isErasing = true;
          erasingProgress = 0;
        }, 3000); // 等待 3 秒，讓用戶看清楚
      }
      
      drawEquation();
    } else if (isErasing) {
      // 擦除階段
      erasingProgress += 0.012; // 擦除速度（稍快）
      
      if (erasingProgress >= 1) {
        erasingProgress = 1;
        // 擦除完成，開始新方程式
        setTimeout(() => {
          startNewEquation();
        }, 800);
      }
      
      // 先繪製未擦除的部分，再擦除
      drawEquation();
      eraseEquation();
    }
    
    animationId = requestAnimationFrame(animate);
  }

  // 初始化
  function init() {
    initCanvas();
    
    // 等待頁面完全加載後開始動畫
    setTimeout(() => {
      startNewEquation();
      animate();
    }, 500);
  }

  // 頁面加載完成後初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // 頁面不可見時暫停動畫
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

