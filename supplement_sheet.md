---
layout: default
title: 補充概念速查表
permalink: /supplement_sheet.html
lang: zh
---

# 模形式與模擬模形式補充概念速查表

> 🔙 **返回：** [主速查表](mmf_sheet.html)

本文檔詳細解釋主速查表中提到的次要但重要的概念，幫助深入理解模形式與模擬模形式的理論基礎。

## 📚 基礎數學概念

### 1. 全純函數 (Holomorphic Functions)

**定義：** 在複平面上，函數 $f(z)$ 在區域 $D$ 內全純（也稱為解析），如果它在 $D$ 內每一點都可微。

**等價條件：**
- 在 $D$ 內每一點都可微
- 滿足 Cauchy-Riemann 方程
- 在 $D$ 內可展開為冪級數

**重要性：** 模形式必須是上半複平面 $\mathcal{H}$ 上的全純函數，這是模形式的基本要求之一。

---

### 2. 模變換 (Modular Transformation)

**定義：** 模變換是上半複平面 $\mathcal{H}$ 上的分式線性變換：

$$\tau \mapsto \frac{a\tau + b}{c\tau + d}$$

其中 $\begin{pmatrix} a & b \\ c & d \end{pmatrix} \in \text{SL}_2(\mathbb{Z})$。

**關鍵性質：**
- 保持上半複平面不變
- 形成群作用
- 模形式必須在這些變換下具有特定的變換性質

**模變換群：** $\text{SL}_2(\mathbb{Z})$ 是模變換的完整群，其子群（如同餘子群）定義了不同級別的模形式。

---

### 3. $\text{SL}_2(\mathbb{Z})$ (模群)

**定義：** 特殊線性群 $\text{SL}_2(\mathbb{Z})$ 是所有行列式為 1 的 $2 \times 2$ 整數矩陣組成的群：

$$\text{SL}_2(\mathbb{Z}) = \left\{ \begin{pmatrix} a & b \\ c & d \end{pmatrix} \mid a,b,c,d \in \mathbb{Z}, \, ad - bc = 1 \right\}$$

**重要性：**
- 這是模變換的完整群
- 模形式必須對 $\text{SL}_2(\mathbb{Z})$ 的某個子群（如同餘子群）具有模變換性質
- 生成元：$T = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}$ 和 $S = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}$

---

### 4. 同餘子群 (Congruence Subgroups)

**定義：** $\text{SL}_2(\mathbb{Z})$ 的同餘子群是滿足某些同餘條件的子群。

**常見類型：**

#### $\Gamma_0(N)$ (主同餘子群)
$$\Gamma_0(N) = \left\{ \begin{pmatrix} a & b \\ c & d \end{pmatrix} \in \text{SL}_2(\mathbb{Z}) \mid c \equiv 0 \pmod{N} \right\}$$

**特徵：** 下左元素 $c$ 必須是 $N$ 的倍數。

#### $\Gamma_1(N)$
$$\Gamma_1(N) = \left\{ \begin{pmatrix} a & b \\ c & d \end{pmatrix} \in \Gamma_0(N) \mid a \equiv d \equiv 1 \pmod{N} \right\}$$

#### $\Gamma(N)$ (完全同餘子群)
$$\Gamma(N) = \left\{ \begin{pmatrix} a & b \\ c & d \end{pmatrix} \in \text{SL}_2(\mathbb{Z}) \mid a \equiv d \equiv 1, \, b \equiv c \equiv 0 \pmod{N} \right\}$$

**關係：** $\Gamma(N) \subset \Gamma_1(N) \subset \Gamma_0(N) \subset \text{SL}_2(\mathbb{Z})$

---

### 5. 尖點 (Cusps)

**定義：** 尖點是上半複平面 $\mathcal{H}$ 的邊界點，通常是 $\mathbb{Q} \cup \{i\infty\}$ 中的點。

**幾何意義：**
- 在複分析中，尖點是模群作用下的軌道代表點
- 對於 $\Gamma_0(N)$，尖點對應於有理數 $a/c$（其中 $\gcd(a,c) = 1$，$c \mid N$）和 $i\infty$

**重要性：**
- 模形式必須在尖點處表現良好
- 尖點形式要求在尖點處的 $q$-級數展開常數項為零
- 尖點是模形式理論中研究漸近行為的關鍵位置

**例子：**
- 對於 $\text{SL}_2(\mathbb{Z})$，只有一個尖點：$i\infty$
- 對於 $\Gamma_0(N)$，尖點數量與 $N$ 的因數分解有關

---

### 6. 增長條件 (Growth Conditions)

**定義：** 增長條件限制了函數在尖點附近的增長速度。

**模形式的增長條件：**
- 在尖點處，$q$-級數展開的係數必須有界或趨於零
- 這確保了模形式在尖點處的「良好行為」

**調和 Maass 形式的增長條件：**
- 在尖點處的增長被限制在多項式級別
- 這比模形式更寬鬆，允許非全純部分的存在

**重要性：**
- 增長條件確保函數在尖點處不會「爆炸」
- 這是模形式和調和 Maass 形式定義的關鍵組成部分

---

## 🔧 算子與運算

### 7. 雙曲拉普拉斯算子 (Hyperbolic Laplacian)

**記號：** $\Delta_k$

**定義：** 權重 $k$ 的雙曲拉普拉斯算子是作用在上半複平面函數上的微分算子。

**形式：**
$$\Delta_k = -y^2 \left( \frac{\partial^2}{\partial x^2} + \frac{\partial^2}{\partial y^2} \right) + iky \frac{\partial}{\partial x}$$

其中 $\tau = x + iy$，$y > 0$。

**重要性：**
- 調和 Maass 形式必須滿足 $\Delta_k f = 0$（調和性）
- 這是調和 Maass 形式的核心定義條件
- 將模形式的全純條件推廣到更一般的調和條件

**特點：**
- 在模變換下具有特定的變換性質
- 權重 $k$ 決定了算子的具體形式

---

### 8. $\xi$-算子 ($\xi$-Operator)

**記號：** $\xi_{2-k}$

**定義：** $\xi$-算子是一個將非全純函數映射到全純函數的微分算子。

**作用：**
$$\xi_{2-k}(f) = 2iy^{2-k} \overline{\frac{\partial f}{\partial \overline{\tau}}}$$

其中 $\tau = x + iy$，$\overline{\tau} = x - iy$。

**關鍵性質：**
- 將調和 Maass 形式的非全純部分 $f^-$ 映射到尖點形式
- $\xi_{2-k}(f^-) \in S_{2-k}(\Gamma_0(N))$
- 這是定義「陰影」的核心算子

**重要性：**
- 連接非全純部分與真正的模形式（尖點形式）
- 是理解模擬模形式與其陰影關係的關鍵工具

---

## 📐 特殊函數

### 9. 單元 Theta 函數 (Unary Theta Functions)

**定義：** 單元 $\theta$ 函數是形如以下形式的函數：

$$\theta(\tau) = \sum_{n \in \mathbb{Z}} q^{n^2}$$

或更一般的形式：

$$\theta_{a,b}(\tau) = \sum_{n \equiv a \pmod{b}} q^{n^2}$$

其中 $q = e^{2\pi i \tau}$。

**性質：**
- 是權重 $1/2$ 的模形式（或模擬模形式）
- 在 Mock Theta Function 理論中扮演重要角色
- 是某些模擬模形式的陰影

**與 Mock Theta Function 的關係：**
- Mock Theta Function 的陰影是單元 $\theta$ 函數的線性組合
- 這是 Ramanujan 最初研究的模擬 $\theta$ 函數的特徵

**例子：**
- 經典的 $\theta$ 函數：$\theta(\tau) = \sum_{n=-\infty}^{\infty} q^{n^2}$
- 權重 $1/2$ 的模形式

---

### 10. 非平凡 (Nontrivial)

**定義：** 在模擬模形式的定義中，「非平凡」指的是非全純部分 $f^-$ 不恆為零。

**重要性：**
- 如果 $f^- = 0$，則 $f^+$ 就是真正的模形式
- 只有當 $f^- \neq 0$ 時，$f^+$ 才是「模擬」模形式
- 非平凡性確保了模擬模形式與真正模形式的區別

**直觀理解：**
- 非平凡意味著存在「缺陷」，使得 $f^+$ 無法單獨成為模形式
- 這個缺陷由 $f^-$ 體現，並通過 $\xi$-算子轉化為陰影

---

## 🔍 進階概念

### 11. 權重 (Weight)

**記號：** $k$

**定義：** 權重是決定模形式（或模擬模形式）在模變換下如何變換的參數。

**類型：**
- **整數權重：** $k \in \mathbb{Z}$（最常見）
- **半整數權重：** $k \in \frac{1}{2} + \mathbb{Z}$（出現在 Mock Theta Function 中）

**作用：**
- 在模變換公式中：$f(M\tau) = (c\tau + d)^k f(\tau)$
- 權重決定了變換公式中 $(c\tau + d)$ 的指數
- 不同權重的模形式空間通常不相交

**重要性：**
- 權重是分類模形式的基本參數
- 與 Level $N$ 一起，完全確定模形式的類型

---

### 12. Level (級別)

**記號：** $N$

**定義：** Level 是定義同餘子群 $\Gamma_0(N)$ 的正整數。

**作用：**
- 確定模形式所屬的同餘子群
- 與權重 $k$ 一起，完全確定模形式的類型
- 影響尖點的數量和位置

**重要性：**
- Level 和權重是模形式的基本分類參數
- 記號 $M_k(\Gamma_0(N))$ 和 $S_k(\Gamma_0(N))$ 中的 $N$ 就是 Level

---

### 13. 非全純部分 (Nonholomorphic Part)

**記號：** $f^-$

**定義：** 調和 Maass 形式 $f$ 的非全純部分是 $f$ 中不滿足全純條件的部分。

**性質：**
- $f = f^+ + f^-$，其中 $f^+$ 全純，$f^-$ 非全純
- $f^-$ 通常依賴於 $\overline{\tau}$（$\tau$ 的共軛）
- 通過 $\xi$-算子作用後，$f^-$ 的信息轉化為陰影

**重要性：**
- 非全純部分的存在是模擬模形式與真正模形式的關鍵區別
- 它「記錄」了模擬模形式無法成為真正模形式的「缺陷」

---

## 📊 概念關係圖

```
基礎概念
    │
    ├─→ 全純函數 ──→ 模形式的基礎要求
    │
    ├─→ SL_2(Z) ──→ 模變換群
    │       │
    │       └─→ 同餘子群 ──→ 定義不同級別的模形式
    │
    ├─→ 模變換 ──→ 模形式的變換性質
    │
    └─→ 尖點 ──→ 模形式的邊界行為

算子
    │
    ├─→ 雙曲拉普拉斯算子 ──→ 調和 Maass 形式的調和性
    │
    └─→ ξ-算子 ──→ 將非全純部分轉化為陰影

特殊函數
    │
    └─→ 單元 Theta 函數 ──→ Mock Theta Function 的陰影
```

---

## 🎯 快速參考

| 概念 | 關鍵點 |
|------|--------|
| 全純 | 複函數可微，模形式的基本要求 |
| 模變換 | 分式線性變換，模形式的變換性質 |
| SL_2(Z) | 模變換的完整群 |
| 同餘子群 | SL_2(Z) 的子群，定義不同級別 |
| 尖點 | 上半複平面的邊界點，研究漸近行為 |
| 增長條件 | 限制函數在尖點處的增長速度 |
| 雙曲拉普拉斯算子 | 調和 Maass 形式的調和性條件 |
| ξ-算子 | 將非全純部分轉化為陰影 |
| 單元 Theta 函數 | Mock Theta Function 的陰影 |
| 非平凡 | 非全純部分不為零 |
| 權重 | 決定模變換公式中的指數 |
| Level | 定義同餘子群的參數 |

