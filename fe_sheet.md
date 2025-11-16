# 前端技術速查表 - 中世紀羊皮紙風格網站

> 📝 **說明：** 本文檔整理了本網站使用的所有先進前端技術，包括 CSS、JavaScript、動畫、渲染技術等。

## 📋 技術分類索引

| 類別 | 技術 | 用途 |
|------|------|------|
| **CSS 技術** | CSS Variables, Gradients, Filters | 羊皮紙質感、顏色管理 |
| **CSS 動畫** | @keyframes, Transitions, Transforms | 頁面動畫、交互效果 |
| **CSS 高級特性** | clip-path, mask-image, mix-blend-mode | 破洞效果、不規則邊緣 |
| **JavaScript API** | Canvas API, SVG API | 動態繪圖、裝飾元素 |
| **性能優化** | requestAnimationFrame, MutationObserver | 流暢動畫、DOM 監聽 |
| **現代 Web API** | Intersection Observer, Visibility API | 性能優化、資源管理 |

---

## 🎨 CSS 技術

### 1. CSS 自定義屬性 (CSS Variables)

**用途：** 統一管理顏色、尺寸等設計令牌

**實現：**
```css
:root {
  --parchment: #f4e8d0;
  --parchment-dark: #e8d5b7;
  --ink: #2c1810;
  --gold: #c9a961;
  --shadow-ink: rgba(44, 24, 16, 0.4);
}
```

**優勢：**
- 易於維護和主題切換
- 支持動態更新
- 減少重複代碼

---

### 2. CSS 漸變 (Gradients)

**用途：** 創建複雜的羊皮紙質感和背景效果

**技術類型：**
- **線性漸變 (Linear Gradients)**: 創建平滑的顏色過渡
- **徑向漸變 (Radial Gradients)**: 模擬污漬、老化斑點
- **重複漸變 (Repeating Gradients)**: 創建紙張紋理

**實現示例：**
```css
background: 
  linear-gradient(135deg, var(--parchment-aged) 0%, var(--parchment) 100%),
  repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 111, 71, 0.03) 2px, rgba(139, 111, 71, 0.03) 4px),
  radial-gradient(circle at 20% 30%, rgba(139, 111, 71, 0.05) 0%, transparent 50%);
```

**應用場景：**
- 羊皮紙背景質感
- 污漬和老化效果
- 按鈕和卡片的視覺層次

---

### 3. CSS 濾鏡 (CSS Filters)

**用途：** 調整視覺效果，模擬古老羊皮紙的質感

**使用的濾鏡：**
- `sepia()`: 添加復古色調
- `contrast()`: 調整對比度
- `brightness()`: 調整亮度
- `saturate()`: 調整飽和度
- `blur()`: 模糊效果（用於污漬）
- `drop-shadow()`: 文字陰影效果

**實現示例：**
```css
filter: sepia(12%) contrast(97%) brightness(98%) saturate(90%);
filter: blur(2px); /* 用於污漬 */
filter: drop-shadow(2px 2px 4px rgba(139, 111, 71, 0.3));
```

---

### 4. CSS 裁剪路徑 (clip-path)

**用途：** 創建不規則形狀，模擬破損邊緣

**技術：**
- `polygon()`: 多邊形裁剪
- 動態生成不規則形狀

**實現示例：**
```css
clip-path: polygon(
  0% 0%, 100% 5%, 0% 10%, 100% 15%, 
  0% 20%, 100% 25%, 0% 30%, 100% 35%
);
```

**應用場景：**
- 破洞效果的不規則形狀
- 頁面邊緣的破損效果
- 動態生成的皺摺邊緣

---

### 5. CSS 遮罩 (mask-image)

**用途：** 創建真正的透明破洞效果

**技術：**
- `mask-image`: 使用 Canvas 生成的圖像作為遮罩
- `mask-size`, `mask-repeat`: 控制遮罩行為

**實現方式：**
```css
mask-image: url(data:image/png;base64,...);
-webkit-mask-image: url(data:image/png;base64,...);
mask-size: 100% 100%;
```

**優勢：**
- 真正的透明效果（而非視覺模擬）
- 可以動態生成複雜形狀
- 性能優於多個 DOM 元素

---

### 6. CSS 混合模式 (mix-blend-mode)

**用途：** 控制元素與背景的混合方式

**使用的模式：**
- `multiply`: 正片疊底效果
- `destination-out`: 用於擦除效果
- `source-over`: 正常疊加

**應用場景：**
- 破洞效果的邊緣混合
- 墨水痕跡與背景的融合
- 裝飾元素的層疊效果

---

### 7. CSS 3D 變換 (3D Transforms)

**用途：** 創建立體視覺效果

**技術：**
- `perspective()`: 3D 透視
- `translateZ()`: Z 軸位移
- `rotateX()`, `rotateY()`: 3D 旋轉

**實現示例：**
```css
transform: perspective(500px) translateZ(0);
transform: perspective(500px) rotateX(2deg);
```

**應用場景：**
- 按鈕的 3D 立體效果
- 頁面元素的深度感
- 交互時的視覺反饋

---

### 8. CSS 動畫 (@keyframes)

**用途：** 創建流暢的動畫效果

**動畫類型：**
- `fadeInOut`: 淡入淡出
- `sparkle`: 閃爍效果
- `inkFadeOut`: 墨水痕跡淡出

**實現示例：**
```css
@keyframes sparkle {
  0%, 100% { opacity: 0.6; transform: scale(1) rotate(0deg); }
  50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
}

@keyframes inkFadeOut {
  0% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.7); }
}
```

---

### 9. CSS 背景裁剪 (background-clip)

**用途：** 將背景應用到文字

**技術：**
- `background-clip: text`: 文字背景裁剪
- `-webkit-text-fill-color: transparent`: 透明文字填充

**實現示例：**
```css
background: linear-gradient(135deg, var(--accent-red) 0%, var(--ink-light) 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

**應用場景：**
- 標題的漸變文字效果
- 創建視覺吸引力

---

### 10. CSS 隔離上下文 (isolation)

**用途：** 創建新的堆疊上下文，控制混合模式

**實現：**
```css
isolation: isolate;
```

**應用場景：**
- 控制破洞效果的層級
- 管理混合模式的影響範圍

---

## 🎬 JavaScript 技術

### 11. Canvas API

**用途：** 動態繪製圖形和文字

**應用場景：**
1. **模形式方程式動畫**
   - 使用 Canvas 繪製數學公式
   - 模擬手寫效果
   - 動態擦除和重繪

2. **破洞效果生成**
   - 使用 Canvas 生成 mask 圖像
   - 動態創建不規則形狀
   - 轉換為 data URL

3. **文字測量**
   - 使用 `ctx.measureText()` 精確測量文字寬度
   - 用於文字破損效果的定位

**關鍵 API：**
```javascript
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'black';
ctx.fill();
const dataURL = canvas.toDataURL();
```

---

### 12. SVG API

**用途：** 創建可縮放的向量圖形

**應用場景：**
1. **自定義游標**
   - 使用 SVG 創建羽毛筆游標
   - Data URI 格式嵌入

2. **動態裝飾元素**
   - 生成中世紀手抄書裝飾
   - 動態 SVG 路徑生成

3. **邊框效果**
   - 使用 SVG path 創建不規則邊框
   - 響應式調整

**關鍵 API：**
```javascript
const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
path.setAttribute('d', 'M 0 0 L 100 100');
svg.appendChild(path);
```

---

### 13. requestAnimationFrame

**用途：** 優化動畫性能，與瀏覽器刷新率同步

**應用場景：**
- 模形式方程式的繪製動畫
- 背景裝飾元素的動畫循環
- 墨水痕跡的淡出動畫

**實現模式：**
```javascript
function animate() {
  // 動畫邏輯
  animationId = requestAnimationFrame(animate);
}
animate();

// 暫停動畫
if (animationId) {
  cancelAnimationFrame(animationId);
}
```

**優勢：**
- 與瀏覽器刷新率同步（通常 60fps）
- 頁面不可見時自動暫停
- 比 `setInterval` 更高效

---

### 14. MutationObserver

**用途：** 監聽 DOM 變化，動態添加效果

**應用場景：**
- 監聽新添加的卡片元素
- 為動態內容添加破損效果
- 響應 DOM 結構變化

**實現示例：**
```javascript
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    mutation.addedNodes.forEach(function(node) {
      if (node.classList && node.classList.contains('card')) {
        addHolesToElement(node);
      }
    });
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
```

---

### 15. Visibility API

**用途：** 檢測頁面可見性，優化性能

**應用場景：**
- 頁面不可見時暫停動畫
- 節省 CPU 和電池資源

**實現：**
```javascript
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    cancelAnimationFrame(animationId);
  } else {
    animate();
  }
});
```

---

### 16. Intersection Observer (潛在應用)

**用途：** 檢測元素進入視口

**應用場景：**
- 懶加載效果
- 視口內動畫觸發
- 性能優化

---

### 17. LocalStorage API

**用途：** 保存用戶偏好設置

**應用場景：**
- 保存語言偏好
- 用戶設置持久化

**實現：**
```javascript
localStorage.setItem('preferredLanguage', 'en');
const lang = localStorage.getItem('preferredLanguage');
```

---

### 18. Data URI

**用途：** 將 SVG/Canvas 嵌入為內聯資源

**應用場景：**
- 自定義游標（SVG data URI）
- Canvas 生成的 mask 圖像
- 減少 HTTP 請求

**實現示例：**
```javascript
const svgDataURI = `data:image/svg+xml,${encodeURIComponent(svgString)}`;
const canvasDataURI = canvas.toDataURL();
```

---

## 🎯 性能優化技術

### 19. 防抖 (Debouncing)

**用途：** 限制函數執行頻率

**應用場景：**
- 窗口大小改變事件
- 滾動事件處理

**實現模式：**
```javascript
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // 處理邏輯
  }, 300);
});
```

---

### 20. 節流 (Throttling)

**用途：** 控制事件處理頻率

**應用場景：**
- 滑鼠移動事件
- 滾動事件

**實現模式：**
```javascript
let lastTime = 0;
function throttle(func, delay) {
  const now = Date.now();
  if (now - lastTime >= delay) {
    func();
    lastTime = now;
  }
}
```

---

### 21. 元素池 (Element Pooling)

**用途：** 重用 DOM 元素，減少創建/銷毀開銷

**應用場景：**
- 墨水痕跡元素
- 裝飾元素

**實現模式：**
```javascript
const MAX_ELEMENTS = 50;
const elementPool = [];

function getElement() {
  return elementPool.pop() || createNewElement();
}

function recycleElement(element) {
  if (elementPool.length < MAX_ELEMENTS) {
    elementPool.push(element);
  }
}
```

---

## 🎨 視覺效果技術

### 22. 自定義游標 (Custom Cursor)

**用途：** 使用 SVG 創建羽毛筆游標

**實現：**
```css
cursor: url("data:image/svg+xml,...") 4 28, pointer;
```

**技術細節：**
- SVG data URI
- 熱點定位 (4, 28)
- 備選游標 (pointer)

---

### 23. 動態樣式注入

**用途：** 動態添加 CSS 規則

**實現：**
```javascript
const style = document.createElement('style');
style.textContent = `
  @keyframes inkFadeOut {
    0% { opacity: 1; }
    100% { opacity: 0; }
  }
`;
document.head.appendChild(style);
```

---

### 24. 響應式設計技術

**技術：**
- CSS Media Queries
- 動態 Canvas 大小調整
- 視口單位 (vw, vh, vmin, vmax)

**實現：**
```javascript
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
```

---

## 🔧 現代 Web 標準

### 25. ES6+ 語法

**使用的特性：**
- Arrow Functions
- Template Literals
- Destructuring
- const/let
- IIFE (Immediately Invoked Function Expression)

---

### 26. 模塊化組織

**結構：**
- 每個功能獨立的 JavaScript 文件
- 使用 IIFE 避免全局污染
- 清晰的命名空間

---

### 27. 事件委派 (Event Delegation)

**用途：** 優化事件處理性能

**實現：**
```javascript
document.addEventListener('click', (e) => {
  if (e.target.matches('.language-switcher')) {
    switchLanguage();
  }
});
```

---

## 📊 技術統計

| 技術類別 | 數量 | 主要用途 |
|---------|------|---------|
| CSS 特性 | 10+ | 視覺效果、質感 |
| JavaScript API | 8+ | 動態交互、動畫 |
| 性能優化 | 5+ | 流暢體驗 |
| 現代標準 | 5+ | 代碼質量 |

---

## 🎯 核心技術亮點

### 1. **Canvas + Mask 破洞效果**
   - 使用 Canvas 動態生成 mask 圖像
   - 真正的透明效果
   - 性能優化

### 2. **requestAnimationFrame 動畫循環**
   - 60fps 流暢動畫
   - 自動暫停機制
   - 資源節省

### 3. **SVG 動態生成**
   - 程序化生成裝飾元素
   - 響應式調整
   - 可縮放向量圖形

### 4. **CSS 混合模式與濾鏡**
   - 複雜的視覺效果
   - 硬體加速
   - 瀏覽器原生支持

### 5. **MutationObserver 動態監聽**
   - 自動為新元素添加效果
   - 無需手動觸發
   - 響應式設計

---

## 📚 參考資源

### CSS 規範
- [CSS Variables (Custom Properties)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [CSS clip-path](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path)
- [CSS mask-image](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-image)
- [CSS mix-blend-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode)

### JavaScript API
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [SVG API](https://developer.mozilla.org/en-US/docs/Web/API/SVG_API)
- [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
- [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)

### 性能優化
- [Web Performance Best Practices](https://web.dev/performance/)
- [Optimizing Canvas Performance](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas)

---

## 🔍 技術實現細節

### 破洞效果實現流程

1. **Canvas 生成**
   ```javascript
   const canvas = document.createElement('canvas');
   const ctx = canvas.getContext('2d');
   ctx.fillStyle = 'white'; // 不透明區域
   ctx.fillRect(0, 0, width, height);
   ctx.fillStyle = 'black'; // 透明區域（破洞）
   // 繪製不規則形狀
   ctx.fill();
   ```

2. **轉換為 Data URL**
   ```javascript
   const maskImage = canvas.toDataURL();
   ```

3. **應用 CSS Mask**
   ```css
   mask-image: url(data:image/png;base64,...);
   ```

### 墨水痕跡實現流程

1. **滑鼠移動監聽**
   ```javascript
   document.addEventListener('mousemove', handleMouseMove);
   ```

2. **創建痕跡元素**
   ```javascript
   const mark = document.createElement('div');
   mark.style.cssText = `...`;
   ```

3. **淡出動畫**
   ```css
   animation: inkFadeOut 2s ease-out forwards;
   ```

4. **自動清理**
   ```javascript
   setTimeout(() => mark.remove(), 2000);
   ```

---

## 💡 最佳實踐

### 1. **性能優化**
   - 使用 `requestAnimationFrame` 而非 `setInterval`
   - 限制同時存在的元素數量
   - 頁面不可見時暫停動畫

### 2. **代碼組織**
   - 每個功能獨立的文件
   - 使用 IIFE 避免全局污染
   - 清晰的命名和註釋

### 3. **瀏覽器兼容性**
   - 使用 `-webkit-` 前綴支持舊版瀏覽器
   - 提供備選方案
   - 漸進增強

### 4. **可維護性**
   - CSS Variables 統一管理
   - 模塊化 JavaScript
   - 清晰的代碼結構

---

## 🎓 學習要點

1. **CSS 高級特性**：clip-path, mask, mix-blend-mode 的實際應用
2. **Canvas API**：動態圖形生成和處理
3. **SVG API**：可縮放向量圖形的程序化生成
4. **性能優化**：requestAnimationFrame, MutationObserver 的使用
5. **現代 Web 標準**：ES6+ 語法、模塊化組織

---

**最後更新：** 2024年
**技術棧版本：** 現代瀏覽器標準（ES6+, CSS3）

