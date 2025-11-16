# GitHub Pages 部署指南

## 📋 部署步驟

### 1. 準備文件

確保以下文件已存在：
- ✅ `_config.yml` - Jekyll 配置
- ✅ `index.md` - 首頁
- ✅ `mmf_sheet.md` - 主速查表
- ✅ `supplement_sheet.md` - 補充概念速查表
- ✅ `Gemfile` - Ruby 依賴
- ✅ `_includes/head.html` - MathJax 配置
- ✅ `.gitignore` - Git 忽略文件

### 2. 提交到 GitHub

```bash
git add .
git commit -m "設置 GitHub Pages 文檔網站"
git push origin main
```

### 3. 啟用 GitHub Pages

1. 前往 GitHub 倉庫：`https://github.com/Kuo-TingKai/MMF_note`
2. 點擊 **Settings** 標籤
3. 在左側菜單中找到 **Pages**
4. 在 **Source** 部分：
   - 選擇 **Deploy from a branch**
   - Branch: `main`
   - Folder: `/ (root)`
5. 點擊 **Save**

### 4. 等待部署

- GitHub 會在幾分鐘內自動構建網站
- 構建狀態可以在 **Actions** 標籤中查看
- 部署完成後，網站將在以下網址可用：
  ```
  https://kuo-tingkai.github.io/MMF_note
  ```

## 🔍 驗證部署

1. 訪問網站首頁
2. 檢查數學公式是否正確渲染
3. 測試頁面間的導航連結
4. 確認所有超連結正常工作

## 🛠️ 本地測試

如果想在本地測試網站：

```bash
# 安裝依賴
bundle install

# 啟動本地服務器
bundle exec jekyll serve

# 訪問 http://localhost:4000/MMF_note
```

## 📝 更新文檔

1. 編輯 Markdown 文件
2. 提交更改：
   ```bash
   git add .
   git commit -m "更新文檔內容"
   git push
   ```
3. GitHub Pages 會自動重新構建（通常需要 1-2 分鐘）

## ⚠️ 常見問題

### 數學公式不顯示
- 確保 `_includes/head.html` 文件存在
- 檢查 MathJax CDN 是否可訪問

### 連結無法跳轉
- 確保使用 `.html` 擴展名（不是 `.md`）
- 檢查 `baseurl` 配置是否正確

### 頁面 404 錯誤
- 確認 `permalink` 設置正確
- 檢查文件名和路徑是否匹配

## 🔗 相關資源

- [GitHub Pages 文檔](https://docs.github.com/en/pages)
- [Jekyll 文檔](https://jekyllrb.com/docs/)
- [MathJax 文檔](https://www.mathjax.org/)

