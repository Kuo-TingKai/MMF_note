---
layout: default
title: Supplementary Concepts Quick Reference
permalink: /supplement_sheet_en.html
lang: en
---

# Modular Forms and Mock Modular Forms Supplementary Concepts Quick Reference

> 🔙 **Back to:** [Main Quick Reference](mmf_sheet_en.html)

This document provides detailed explanations of secondary but important concepts mentioned in the Main Quick Reference, helping to deepen understanding of the theoretical foundations of modular forms and mock modular forms.

## 📚 Basic Mathematical Concepts

### 1. Holomorphic Functions

**Definition:** In the complex plane, a function $f(z)$ is holomorphic (also called analytic) in a region $D$ if it is differentiable at every point in $D$.

**Equivalent Conditions:**
- Differentiable at every point in $D$
- Satisfies the Cauchy-Riemann equations
- Can be expanded as a power series in $D$

**Importance:** Modular forms must be holomorphic functions on the upper half-plane $\mathcal{H}$, which is one of the fundamental requirements for modular forms.

---

### 2. Modular Transformation

**Definition:** A modular transformation is a fractional linear transformation on the upper half-plane $\mathcal{H}$:

$$\tau \mapsto \frac{a\tau + b}{c\tau + d}$$

where $\begin{pmatrix} a & b \\ c & d \end{pmatrix} \in \text{SL}_2(\mathbb{Z})$.

**Key Properties:**
- Preserves the upper half-plane
- Forms a group action
- Modular forms must have specific transformation properties under these transformations

**Modular Transformation Group:** $\text{SL}_2(\mathbb{Z})$ is the full group of modular transformations, and its subgroups (such as congruence subgroups) define modular forms of different levels.

---

### 3. $\text{SL}_2(\mathbb{Z})$ (Modular Group)

**Definition:** The special linear group $\text{SL}_2(\mathbb{Z})$ is the group of all $2 \times 2$ integer matrices with determinant 1:

$$\text{SL}_2(\mathbb{Z}) = \left\{ \begin{pmatrix} a & b \\ c & d \end{pmatrix} \mid a,b,c,d \in \mathbb{Z}, \, ad - bc = 1 \right\}$$

**Importance:**
- This is the full group of modular transformations
- Modular forms must have modular transformation properties for some subgroup of $\text{SL}_2(\mathbb{Z})$ (such as congruence subgroups)
- Generators: $T = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}$ and $S = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}$

---

### 4. Congruence Subgroups

**Definition:** A congruence subgroup of $\text{SL}_2(\mathbb{Z})$ is a subgroup satisfying certain congruence conditions.

**Common Types:**

#### $\Gamma_0(N)$ (Principal Congruence Subgroup)
$$\Gamma_0(N) = \left\{ \begin{pmatrix} a & b \\ c & d \end{pmatrix} \in \text{SL}_2(\mathbb{Z}) \mid c \equiv 0 \pmod{N} \right\}$$

**Feature:** The lower-left element $c$ must be a multiple of $N$.

#### $\Gamma_1(N)$
$$\Gamma_1(N) = \left\{ \begin{pmatrix} a & b \\ c & d \end{pmatrix} \in \Gamma_0(N) \mid a \equiv d \equiv 1 \pmod{N} \right\}$$

#### $\Gamma(N)$ (Full Congruence Subgroup)
$$\Gamma(N) = \left\{ \begin{pmatrix} a & b \\ c & d \end{pmatrix} \in \text{SL}_2(\mathbb{Z}) \mid a \equiv d \equiv 1, \, b \equiv c \equiv 0 \pmod{N} \right\}$$

**Relationship:** $\Gamma(N) \subset \Gamma_1(N) \subset \Gamma_0(N) \subset \text{SL}_2(\mathbb{Z})$

---

### 5. Cusps

**Definition:** Cusps are boundary points of the upper half-plane $\mathcal{H}$, typically points in $\mathbb{Q} \cup \{i\infty\}$.

**Geometric Meaning:**
- In complex analysis, cusps are orbit representatives under the action of the modular group
- For $\Gamma_0(N)$, cusps correspond to rational numbers $a/c$ (where $\gcd(a,c) = 1$, $c \mid N$) and $i\infty$

**Importance:**
- Modular forms must be well-behaved at cusps
- Cusp forms require the constant term of the $q$-series expansion to be zero at cusps
- Cusps are key positions for studying asymptotic behavior in modular form theory

**Examples:**
- For $\text{SL}_2(\mathbb{Z})$, there is only one cusp: $i\infty$
- For $\Gamma_0(N)$, the number of cusps is related to the prime factorization of $N$

---

### 6. Growth Conditions

**Definition:** Growth conditions limit the growth rate of functions near cusps.

**Growth Conditions for Modular Forms:**
- At cusps, the coefficients of the $q$-series expansion must be bounded or tend to zero
- This ensures "good behavior" of modular forms at cusps

**Growth Conditions for Harmonic Maass Forms:**
- Growth at cusps is limited to polynomial level
- This is more lenient than modular forms, allowing the existence of nonholomorphic parts

**Importance:**
- Growth conditions ensure functions do not "explode" at cusps
- This is a key component in the definition of modular forms and harmonic Maass forms

---

## 🔧 Operators and Operations

### 7. Hyperbolic Laplacian

**Notation:** $\Delta_k$

**Definition:** The hyperbolic Laplacian of weight $k$ is a differential operator acting on functions on the upper half-plane.

**Form:**
$$\Delta_k = -y^2 \left( \frac{\partial^2}{\partial x^2} + \frac{\partial^2}{\partial y^2} \right) + iky \frac{\partial}{\partial x}$$

where $\tau = x + iy$, $y > 0$.

**Importance:**
- Harmonic Maass forms must satisfy $\Delta_k f = 0$ (harmonicity)
- This is a core defining condition for harmonic Maass forms
- Generalizes the holomorphic condition of modular forms to a more general harmonic condition

**Features:**
- Has specific transformation properties under modular transformations
- The weight $k$ determines the specific form of the operator

---

### 8. $\xi$-Operator

**Notation:** $\xi_{2-k}$

**Definition:** The $\xi$-operator is a differential operator that maps nonholomorphic functions to holomorphic functions.

**Action:**
$$\xi_{2-k}(f) = 2iy^{2-k} \overline{\frac{\partial f}{\partial \overline{\tau}}}$$

where $\tau = x + iy$, $\overline{\tau} = x - iy$.

**Key Properties:**
- Maps the nonholomorphic part $f^-$ of harmonic Maass forms to cusp forms
- $\xi_{2-k}(f^-) \in S_{2-k}(\Gamma_0(N))$
- This is the core operator defining the "shadow"

**Importance:**
- Connects the nonholomorphic part with true modular forms (cusp forms)
- Key tool for understanding the relationship between mock modular forms and their shadows

---

## 📐 Special Functions

### 9. Unary Theta Functions

**Definition:** Unary $\theta$ functions are functions of the form:

$$\theta(\tau) = \sum_{n \in \mathbb{Z}} q^{n^2}$$

or more generally:

$$\theta_{a,b}(\tau) = \sum_{n \equiv a \pmod{b}} q^{n^2}$$

where $q = e^{2\pi i \tau}$.

**Properties:**
- Are modular forms (or mock modular forms) of weight $1/2$
- Play an important role in Mock Theta Function theory
- Are shadows of certain mock modular forms

**Relationship with Mock Theta Functions:**
- The shadow of Mock Theta Functions is a linear combination of unary $\theta$ functions
- This is a characteristic of the mock $\theta$ functions originally studied by Ramanujan

**Examples:**
- Classical $\theta$ function: $\theta(\tau) = \sum_{n=-\infty}^{\infty} q^{n^2}$
- Modular form of weight $1/2$

---

### 10. Nontrivial

**Definition:** In the definition of mock modular forms, "nontrivial" means that the nonholomorphic part $f^-$ is not identically zero.

**Importance:**
- If $f^- = 0$, then $f^+$ is a true modular form
- Only when $f^- \neq 0$ is $f^+$ a "mock" modular form
- Nontriviality ensures the distinction between mock modular forms and true modular forms

**Intuitive Understanding:**
- Nontrivial means there exists a "defect" that prevents $f^+$ from being a modular form on its own
- This defect is embodied by $f^-$ and transformed into a shadow via the $\xi$-operator

---

## 🔍 Advanced Concepts

### 11. Weight

**Notation:** $k$

**Definition:** Weight is a parameter that determines how modular forms (or mock modular forms) transform under modular transformations.

**Types:**
- **Integer Weight:** $k \in \mathbb{Z}$ (most common)
- **Half-Integer Weight:** $k \in \frac{1}{2} + \mathbb{Z}$ (appears in Mock Theta Functions)

**Role:**
- In the modular transformation formula: $f(M\tau) = (c\tau + d)^k f(\tau)$
- Weight determines the exponent of $(c\tau + d)$ in the transformation formula
- Spaces of modular forms of different weights are usually disjoint

**Importance:**
- Weight is a fundamental parameter for classifying modular forms
- Together with Level $N$, completely determines the type of modular form

---

### 12. Level

**Notation:** $N$

**Definition:** Level is a positive integer that defines the congruence subgroup $\Gamma_0(N)$.

**Role:**
- Determines the congruence subgroup to which modular forms belong
- Together with weight $k$, completely determines the type of modular form
- Affects the number and positions of cusps

**Importance:**
- Level and weight are fundamental classification parameters for modular forms
- The $N$ in the notation $M_k(\Gamma_0(N))$ and $S_k(\Gamma_0(N))$ is the Level

---

### 13. Nonholomorphic Part

**Notation:** $f^-$

**Definition:** The nonholomorphic part of a harmonic Maass form $f$ is the part of $f$ that does not satisfy the holomorphic condition.

**Properties:**
- $f = f^+ + f^-$, where $f^+$ is holomorphic and $f^-$ is nonholomorphic
- $f^-$ usually depends on $\overline{\tau}$ (conjugate of $\tau$)
- After applying the $\xi$-operator, the information of $f^-$ is transformed into a shadow

**Importance:**
- The existence of the nonholomorphic part is a key distinction between mock modular forms and true modular forms
- It "records" the "defect" that prevents mock modular forms from being true modular forms

---

## 📊 Concept Relationship Diagram

```
Basic Concepts
    │
    ├─→ Holomorphic Functions ──→ Basic requirement for modular forms
    │
    ├─→ SL_2(Z) ──→ Modular transformation group
    │       │
    │       └─→ Congruence Subgroups ──→ Define modular forms of different levels
    │
    ├─→ Modular Transformation ──→ Transformation property of modular forms
    │
    └─→ Cusps ──→ Boundary behavior of modular forms

Operators
    │
    ├─→ Hyperbolic Laplacian ──→ Harmonicity of harmonic Maass forms
    │
    └─→ ξ-operator ──→ Transforms nonholomorphic part into shadow

Special Functions
    │
    └─→ Unary Theta Functions ──→ Shadow of Mock Theta Functions
```

---

## 🎯 Quick Reference

| Concept | Key Points |
|---------|------------|
| Holomorphic | Complex function is differentiable, basic requirement for modular forms |
| Modular Transformation | Fractional linear transformation, transformation property of modular forms |
| SL_2(Z) | Full group of modular transformations |
| Congruence Subgroups | Subgroups of SL_2(Z), define different levels |
| Cusps | Boundary points of upper half-plane, study asymptotic behavior |
| Growth Conditions | Limit growth rate of functions at cusps |
| Hyperbolic Laplacian | Harmonicity condition for harmonic Maass forms |
| ξ-operator | Transforms nonholomorphic part into shadow |
| Unary Theta Functions | Shadow of Mock Theta Functions |
| Nontrivial | Nonholomorphic part is not zero |
| Weight | Determines exponent in modular transformation formula |
| Level | Parameter defining congruence subgroups |

