# 使用說明

## 快速開始

1. **複製模板**
   ```bash
   cp -r template/ your-new-project/
   cd your-new-project
   ```

2. **安裝依賴**
   ```bash
   npm install
   ```

3. **啟動開發服務器**
   ```bash
   npm start
   ```

4. **構建生產版本**
   ```bash
   npm run build
   ```

## 自定義配置

### 修改網站標題和導航

編輯 `src/App.jsx`:

```jsx
const navItems = [
  { label: '首頁', url: '/', active: true },
  { label: '關於', url: '/about', active: false },
  // 添加更多導航項目
];

<Header 
  title="您的網站標題"
  navItems={navItems}
/>
```

### 啟用/禁用效果

在 `src/App.jsx` 中：

```jsx
<ParchmentEffects 
  enableInkTrail={true}      // 羽毛筆游標效果
  enableBackground={true}     // 背景裝飾動畫
/>
```

### 修改顏色主題

編輯 `src/styles/style.css` 中的 CSS 變量：

```css
:root {
  --parchment: #f4e8d0;
  --ink: #2c1810;
  --gold: #c9a961;
  /* 修改這些值來改變主題顏色 */
}
```

## 組件說明

### Header 組件
- `title`: 網站標題
- `navItems`: 導航項目數組，每個項目包含 `label`, `url`, `active`

### Footer 組件
- `author`: 作者名稱
- `year`: 年份（默認當前年份）

### ParchmentEffects 組件
- `enableInkTrail`: 是否啟用羽毛筆游標和墨水痕跡
- `enableBackground`: 是否啟用背景裝飾動畫

## 添加新頁面

1. 創建新的組件文件，例如 `src/components/About.jsx`
2. 在 `App.jsx` 中使用路由（需要安裝 react-router-dom）或條件渲染

## 擴展功能

模板提供了基礎結構，您可以：

- 添加更多 React 組件
- 集成路由（react-router-dom）
- 添加狀態管理（Redux, Zustand 等）
- 集成 API 調用
- 添加更多動畫效果

## 注意事項

- 模板使用 React 18
- 所有效果都是可選的，可以根據需要啟用/禁用
- CSS 樣式在 `src/styles/style.css` 中
- 自定義 Hooks 在 `src/hooks/` 目錄中

