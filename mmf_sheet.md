---
layout: default
title: 主速查表
permalink: /mmf_sheet.html
---

# 模形式與模擬模形式概念速查表

> 💡 **提示：** 本文檔中的關鍵概念名詞已加上超連結，點擊可跳轉至 [補充概念速查表](supplement_sheet.html) 查看詳細解釋。

## 📋 核心概念快速索引

| 概念 | 符號/記號 | 關鍵特徵 |
|------|----------|---------|
| 模形式 | $f(\tau)$ | [全純](supplement_sheet.html#1-全純函數-holomorphic-functions)、[模變換](supplement_sheet.html#2-模變換-modular-transformation)、[尖點](supplement_sheet.html#5-尖點-cusps)條件 |
| 尖點形式 | $S_k(\Gamma_0(N))$ | 模形式 + $a_0 = 0$ |
| 調和 Maass 形式 | $f = f^+ + f^-$ | [模變換](supplement_sheet.html#2-模變換-modular-transformation) + 調和性 + [增長條件](supplement_sheet.html#6-增長條件-growth-conditions) |
| 模擬模形式 | $f^+$ | 調和 Maass 形式的全純部分 |
| 陰影 | $\xi_{2-k}(f^-)$ | 尖點形式 |
| 非全純補全 | $F = f^+ + f^-$ | 調和 Maass 形式 |

---

## 1. 模形式 (Modular Forms)

### 定義域
- **上半複平面：** $\mathcal{H} = \{ \tau \in \mathbb{C} \mid \text{Im}(\tau) > 0 \}$

### 核心條件
1. **[全純性](supplement_sheet.html#1-全純函數-holomorphic-functions)：** $f(\tau)$ 在 $\mathcal{H}$ 上全純
2. **[模變換屬性](supplement_sheet.html#2-模變換-modular-transformation)：** 對於 $M = \begin{pmatrix} a & b \\ c & d \end{pmatrix} \in \Gamma$
   $$f(M\tau) = f\left(\frac{a\tau + b}{c\tau + d}\right) = (c\tau + d)^k f(\tau)$$
3. **[尖點條件](supplement_sheet.html#5-尖點-cusps)：** 在[尖點](supplement_sheet.html#5-尖點-cusps)處表現良好

### 關鍵參數
- **[權重](supplement_sheet.html#11-權重-weight)：** $k$ (整數或半整數)
- **[Level](supplement_sheet.html#12-level-級別)：** $N$ (定義[同餘子群](supplement_sheet.html#4-同餘子群-congruence-subgroups) $\Gamma_0(N)$)

### [同餘子群](supplement_sheet.html#4-同餘子群-congruence-subgroups)
$$\Gamma_0(N) = \left\{ \begin{pmatrix} a & b \\ c & d \end{pmatrix} \in \text{SL}_2(\mathbb{Z}) \mid c \equiv 0 \pmod{N} \right\}$$

其中 $\text{SL}_2(\mathbb{Z})$ 是[模群](supplement_sheet.html#3-textsl_2mathbbz-模群)。

---

## 2. 尖點形式 (Cusp Forms)

### 記號
$S_k(\Gamma_0(N))$

### 定義
模形式 + 在所有[尖點](supplement_sheet.html#5-尖點-cusps)處 $q$-級數展開的常數項為零

### 條件
如果 $f(\tau) = \sum_{n=0}^{\infty} a_n q^n$，則 $a_0 = 0$

---

## 3. $q$-級數展開

### 定義
- $q = e^{2\pi i \tau}$，其中 $\tau \in \mathcal{H}$
- 由於 $\text{Im}(\tau) > 0$，所以 $|q| < 1$

### 展開形式
$$f(\tau) = \sum_{n=n_0}^{\infty} a_n q^n$$

其中 $n_0 \geq 0$

---

## 4. 調和 Maass 形式 (Harmonic Maass Forms)

### 核心條件
1. **[模變換屬性](supplement_sheet.html#2-模變換-modular-transformation)：** 與模形式類似
2. **調和性：** $\Delta_k f = 0$ ([雙曲拉普拉斯算子](supplement_sheet.html#7-雙曲拉普拉斯算子-hyperbolic-laplacian))
3. **[增長條件](supplement_sheet.html#6-增長條件-growth-conditions)：** 在[尖點](supplement_sheet.html#5-尖點-cusps)處多項式級別增長

### 關鍵分解
$$f = f^{+} + f^{-}$$

- $f^{+}$：[全純](supplement_sheet.html#1-全純函數-holomorphic-functions)部分 → **模擬模形式**
- $f^{-}$：[非全純部分](supplement_sheet.html#13-非全純部分-nonholomorphic-part) → 決定「缺陷」

---

## 5. 模擬模形式 (Mock Modular Forms)

### 定義
[權重](supplement_sheet.html#11-權重-weight) $k$ 的模擬模形式 $f^{+}$ 是調和 Maass 形式 $f$ 的全純部分，其中 $f^{-}$ [非平凡](supplement_sheet.html#10-非平凡-nontrivial)。

### 特徵
- ✅ [全純](supplement_sheet.html#1-全純函數-holomorphic-functions)
- ❌ 不滿足精確的[模變換性質](supplement_sheet.html#2-模變換-modular-transformation)
- 🔗 與[非全純部分](supplement_sheet.html#13-非全純部分-nonholomorphic-part) $f^{-}$ 相關聯

---

## 6. 陰影 (Shadow)

### 定義
模擬模形式 $f^{+}$ 的陰影是：
$$\xi_{2-k}(f^-) = -(4\pi)^{k-1} \sum_{n=1}^\infty \overline{c_j} (-n)^{k-1} q^n$$

### 關鍵性質
- 經過 [$\xi$-算子](supplement_sheet.html#8-ξ-算子-ξ-operator) $\xi_{2-k}$ 作用後
- 結果是**真正的尖點形式**
- [權重](supplement_sheet.html#11-權重-weight)為 $2-k$
- 屬於 $S_k(\Gamma_0(N))$

---

## 7. 非全純補全 (Nonholomorphic Completion)

### 定義
$$F = f^+ + f^-$$

其中 $F$ 是調和 Maass 形式（也記作 $\overline{f^+}$ 或 $f$）

### 重要性
- $f^+$ 本身不是模形式
- $F = f^+ + f^-$ 具有**完美的模變換屬性**
- $F$ 是 $f^+$ 的補全 (completion)

---

## 8. Mock Theta Function (模擬 $\theta$ 函數)

### 定義
模擬模形式的特殊子類：
- [權重](supplement_sheet.html#11-權重-weight)：$1/2$ 或 $3/2$
- 陰影：[單元 $\theta$ 函數](supplement_sheet.html#9-單元-theta-函數-unary-theta-functions)的線性組合

### 歷史
- Ramanujan (1920 年代) 最早研究
- Zagier 理論將其納入 Mock Modular Forms 框架

---

## 🔗 核心關係圖

```
調和 Maass 形式 f
    │
    ├─→ f^+ (全純部分) ──→ 模擬模形式
    │
    └─→ f^- (非全純部分) ──→ ξ_{2-k} ──→ 陰影 (尖點形式)
    
f = f^+ + f^- = F (非全純補全)
```

---

## 📝 關係總結

| 關係 | 說明 |
|------|------|
| $f^+$ 與 $f$ | Mock Modular Form 是 Harmonic Maass Form 的全純部分 |
| $f$ 與 $f^+$ | Harmonic Maass Form 是 Mock Modular Form 的非全純補全 |
| Shadow 與 $f^-$ | Shadow = $\xi_{2-k}(f^-)$，是真正的尖點形式 |
| $F$ 與 $f^+$ | $F = f^+ + f^-$ 是 $f^+$ 的補全，具有完美模變換性質 |

---

## 🎯 快速記憶要點

1. **模形式** = [全純](supplement_sheet.html#1-全純函數-holomorphic-functions) + [模變換](supplement_sheet.html#2-模變換-modular-transformation) + [尖點](supplement_sheet.html#5-尖點-cusps)條件
2. **尖點形式** = 模形式 + 常數項為零
3. **調和 Maass 形式** = [模變換](supplement_sheet.html#2-模變換-modular-transformation) + 調和性 + [增長條件](supplement_sheet.html#6-增長條件-growth-conditions)
4. **模擬模形式** = 調和 Maass 形式的[全純](supplement_sheet.html#1-全純函數-holomorphic-functions)部分（$f^+$）
5. **陰影** = $\xi_{2-k}(f^-)$ = 真正的尖點形式（通過 [$\xi$-算子](supplement_sheet.html#8-ξ-算子-ξ-operator)）
6. **補全** = $f^+ + f^-$ = 具有完美[模變換](supplement_sheet.html#2-模變換-modular-transformation)性質

---

## 📚 符號對照表

| 符號 | 意義 |
|------|------|
| $\mathcal{H}$ | 上半複平面 |
| $\tau$ | 複變數 |
| $q$ | $e^{2\pi i \tau}$ |
| $k$ | [權重](supplement_sheet.html#11-權重-weight) (weight) |
| $N$ | [Level](supplement_sheet.html#12-level-級別) |
| $\Gamma_0(N)$ | Level $N$ 的[同餘子群](supplement_sheet.html#4-同餘子群-congruence-subgroups) |
| $f^+$ | [全純](supplement_sheet.html#1-全純函數-holomorphic-functions)部分 / 模擬模形式 |
| $f^-$ | [非全純部分](supplement_sheet.html#13-非全純部分-nonholomorphic-part) |
| $f$ 或 $F$ | 調和 Maass 形式 / 補全 |
| $\xi_{2-k}$ | [$\xi$-算子](supplement_sheet.html#8-ξ-算子-ξ-operator) |
| $\Delta_k$ | [雙曲拉普拉斯算子](supplement_sheet.html#7-雙曲拉普拉斯算子-hyperbolic-laplacian) |
| $S_k(\Gamma_0(N))$ | 尖點形式空間 |

