---
layout: bookpage
title: Bezier Curve and Surfaces
permalink: /pages/nurbs/bezier
---

The building blocks of NURBS are Bezier Curves and Surfaces. A BSpline Curve is made by putting together several Bezier curves (and same with surfaces).

A Bezier curve in parameter $$t$$ is defined by the equation

$$
C(t) = \sum_{i=0}^n B_{i,n}(t)P_i 0\le t\le 1
$$

where $$n$$ is the degree of the curve.

The term $$B_{i,n}(t)$$ represents n'th degree Bernstein polynomials given by

$$
B_{i,n}(t) = \frac{n!}{i!(n-i)!} t^i(1-t)^{n-i}
$$

$$P_i$$ are $$n+1$$ control points.
