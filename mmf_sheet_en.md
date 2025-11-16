---
layout: default
title: Main Quick Reference
permalink: /mmf_sheet_en.html
lang: en
---

# Modular Forms and Mock Modular Forms Quick Reference

> 💡 **Note:** Key concept terms in this document are hyperlinked. Click to jump to the [Supplementary Concepts Quick Reference](supplement_sheet_en.html) for detailed explanations.

## 📋 Core Concepts Quick Index

| Concept | Symbol/Notation | Key Features |
|---------|----------------|--------------|
| Modular Forms | $f(\tau)$ | [Holomorphic](supplement_sheet_en.html#1-holomorphic-functions), [Modular Transformation](supplement_sheet_en.html#2-modular-transformation), [Cusp](supplement_sheet_en.html#5-cusps) conditions |
| Cusp Forms | $S_k(\Gamma_0(N))$ | Modular Forms + $a_0 = 0$ |
| Harmonic Maass Forms | $f = f^+ + f^-$ | [Modular Transformation](supplement_sheet_en.html#2-modular-transformation) + Harmonicity + [Growth Conditions](supplement_sheet_en.html#6-growth-conditions) |
| Mock Modular Forms | $f^+$ | Holomorphic part of Harmonic Maass Forms |
| Shadow | $\xi_{2-k}(f^-)$ | Cusp Form |
| Nonholomorphic Completion | $F = f^+ + f^-$ | Harmonic Maass Form |

---

## 1. Modular Forms

### Domain
- **Upper Half-Plane:** $\mathcal{H} = \{ \tau \in \mathbb{C} \mid \text{Im}(\tau) > 0 \}$

### Core Conditions
1. **[Holomorphicity](supplement_sheet_en.html#1-holomorphic-functions):** $f(\tau)$ is holomorphic on $\mathcal{H}$
2. **[Modular Transformation Property](supplement_sheet_en.html#2-modular-transformation):** For $M = \begin{pmatrix} a & b \\ c & d \end{pmatrix} \in \Gamma$
   $$f(M\tau) = f\left(\frac{a\tau + b}{c\tau + d}\right) = (c\tau + d)^k f(\tau)$$
3. **[Cusp Condition](supplement_sheet_en.html#5-cusps):** Well-behaved at [cusps](supplement_sheet_en.html#5-cusps)

### Key Parameters
- **[Weight](supplement_sheet_en.html#11-weight):** $k$ (integer or half-integer)
- **[Level](supplement_sheet_en.html#12-level):** $N$ (defines [congruence subgroup](supplement_sheet_en.html#4-congruence-subgroups) $\Gamma_0(N)$)

### [Congruence Subgroups](supplement_sheet_en.html#4-congruence-subgroups)
$$\Gamma_0(N) = \left\{ \begin{pmatrix} a & b \\ c & d \end{pmatrix} \in \text{SL}_2(\mathbb{Z}) \mid c \equiv 0 \pmod{N} \right\}$$

where $\text{SL}_2(\mathbb{Z})$ is the [modular group](supplement_sheet_en.html#3-textsl_2mathbbz-modular-group).

---

## 2. Cusp Forms

### Notation
$S_k(\Gamma_0(N))$

### Definition
Modular Forms + constant term of $q$-series expansion is zero at all [cusps](supplement_sheet_en.html#5-cusps)

### Condition
If $f(\tau) = \sum_{n=0}^{\infty} a_n q^n$, then $a_0 = 0$

---

## 3. $q$-Series Expansion

### Definition
- $q = e^{2\pi i \tau}$, where $\tau \in \mathcal{H}$
- Since $\text{Im}(\tau) > 0$, we have $|q| < 1$

### Expansion Form
$$f(\tau) = \sum_{n=n_0}^{\infty} a_n q^n$$

where $n_0 \geq 0$

---

## 4. Harmonic Maass Forms

### Core Conditions
1. **[Modular Transformation Property](supplement_sheet_en.html#2-modular-transformation):** Similar to modular forms
2. **Harmonicity:** $\Delta_k f = 0$ ([Hyperbolic Laplacian](supplement_sheet_en.html#7-hyperbolic-laplacian))
3. **[Growth Conditions](supplement_sheet_en.html#6-growth-conditions):** Polynomial growth at [cusps](supplement_sheet_en.html#5-cusps)

### Key Decomposition
$$f = f^{+} + f^{-}$$

- $f^{+}$: [Holomorphic](supplement_sheet_en.html#1-holomorphic-functions) part → **Mock Modular Forms**
- $f^{-}$: [Nonholomorphic part](supplement_sheet_en.html#13-nonholomorphic-part) → Determines the "defect"

---

## 5. Mock Modular Forms

### Definition
A mock modular form $f^{+}$ of [weight](supplement_sheet_en.html#11-weight) $k$ is the holomorphic part of a harmonic Maass form $f$, where $f^{-}$ is [nontrivial](supplement_sheet_en.html#10-nontrivial).

### Features
- ✅ [Holomorphic](supplement_sheet_en.html#1-holomorphic-functions)
- ❌ Does not satisfy exact [modular transformation property](supplement_sheet_en.html#2-modular-transformation)
- 🔗 Associated with [nonholomorphic part](supplement_sheet_en.html#13-nonholomorphic-part) $f^{-}$

---

## 6. Shadow

### Definition
The shadow of a mock modular form $f^{+}$ is:
$$\xi_{2-k}(f^-) = -(4\pi)^{k-1} \sum_{n=1}^\infty \overline{c_j} (-n)^{k-1} q^n$$

### Key Properties
- After applying the [$\xi$-operator](supplement_sheet_en.html#8-ξ-operator) $\xi_{2-k}$
- The result is a **true cusp form**
- [Weight](supplement_sheet_en.html#11-weight) is $2-k$
- Belongs to $S_k(\Gamma_0(N))$

---

## 7. Nonholomorphic Completion

### Definition
$$F = f^+ + f^-$$

where $F$ is a harmonic Maass form (also denoted as $\overline{f^+}$ or $f$)

### Importance
- $f^+$ itself is not a modular form
- $F = f^+ + f^-$ has **perfect modular transformation property**
- $F$ is the completion of $f^+$

---

## 8. Mock Theta Function

### Definition
Special subclass of mock modular forms:
- [Weight](supplement_sheet_en.html#11-weight): $1/2$ or $3/2$
- Shadow: Linear combination of [unary theta functions](supplement_sheet_en.html#9-unary-theta-functions)

### History
- First studied by Ramanujan (1920s)
- Zagier's theory incorporated them into the Mock Modular Forms framework

---

## 🔗 Core Relationship Diagram

```
Harmonic Maass Form f
    │
    ├─→ f^+ (Holomorphic part) ──→ Mock Modular Form
    │
    └─→ f^- (Nonholomorphic part) ──→ ξ_{2-k} ──→ Shadow (Cusp Form)
    
f = f^+ + f^- = F (Nonholomorphic Completion)
```

---

## 📝 Relationship Summary

| Relationship | Description |
|--------------|-------------|
| $f^+$ and $f$ | Mock Modular Form is the holomorphic part of Harmonic Maass Form |
| $f$ and $f^+$ | Harmonic Maass Form is the nonholomorphic completion of Mock Modular Form |
| Shadow and $f^-$ | Shadow = $\xi_{2-k}(f^-)$, is a true cusp form |
| $F$ and $f^+$ | $F = f^+ + f^-$ is the completion of $f^+$, with perfect modular transformation property |

---

## 🎯 Quick Memory Points

1. **Modular Forms** = [Holomorphic](supplement_sheet_en.html#1-holomorphic-functions) + [Modular Transformation](supplement_sheet_en.html#2-modular-transformation) + [Cusp](supplement_sheet_en.html#5-cusps) conditions
2. **Cusp Forms** = Modular Forms + constant term is zero
3. **Harmonic Maass Forms** = [Modular Transformation](supplement_sheet_en.html#2-modular-transformation) + Harmonicity + [Growth Conditions](supplement_sheet_en.html#6-growth-conditions)
4. **Mock Modular Forms** = Holomorphic part of Harmonic Maass Forms ($f^+$)
5. **Shadow** = $\xi_{2-k}(f^-)$ = True cusp form (via [$\xi$-operator](supplement_sheet_en.html#8-ξ-operator))
6. **Completion** = $f^+ + f^-$ = Has perfect [modular transformation](supplement_sheet_en.html#2-modular-transformation) property

---

## 📚 Symbol Reference Table

| Symbol | Meaning |
|--------|---------|
| $\mathcal{H}$ | Upper half-plane |
| $\tau$ | Complex variable |
| $q$ | $e^{2\pi i \tau}$ |
| $k$ | [Weight](supplement_sheet_en.html#11-weight) |
| $N$ | [Level](supplement_sheet_en.html#12-level) |
| $\Gamma_0(N)$ | [Congruence subgroup](supplement_sheet_en.html#4-congruence-subgroups) of level $N$ |
| $f^+$ | [Holomorphic](supplement_sheet_en.html#1-holomorphic-functions) part / Mock Modular Form |
| $f^-$ | [Nonholomorphic part](supplement_sheet_en.html#13-nonholomorphic-part) |
| $f$ or $F$ | Harmonic Maass Form / Completion |
| $\xi_{2-k}$ | [$\xi$-operator](supplement_sheet_en.html#8-ξ-operator) |
| $\Delta_k$ | [Hyperbolic Laplacian](supplement_sheet_en.html#7-hyperbolic-laplacian) |
| $S_k(\Gamma_0(N))$ | Space of cusp forms |

