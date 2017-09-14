---
layout: bookpage
title: 
permalink: /pages/nurbs/funalgo
---

Fundamental algorithms of BSpline Curves and Surfaces

Knot Insertion
---
A BSpline curve defined by

$$
C^w(u) = \sum_{i=0}^n B_{i,n}(u)P^w_i 
$$

over a knot vector $$ U = {u_0,...,u_m} $$

We insert a knot $$\overline{u}$$ in $$U$$ to form a new knot vector $$\overline{U}$$ given by

$$\overline{U} = \{ \overline{u}_0=u_0,...,\overline{u}_k=u_k,\overline{u}_{k+1}=\overline{u}, \overline{u}_{k+2}=u_{k+1}, ..., \overline{u}_{m+1}=u_m\}$$

* Applications

  - Evaluating points and derivatives on curves and surfaces
  - Subdividing curves and surfaces. A BSpline curve of degree $$p$$ can be 
    subdivided into two BSpline curves at parameter $$\overline{u}$$ by inserting a
    knot $$\overline{u}$$ $$p$$-times in the knot vector. Similarly a BSpline surface
    with degrees $$p$$ and $$q$$ in $$u$$ and $$v$$ directions resp., can be subdivided
    into four BSpline surfaces by inserting $$\overline{u}$$ $$p$$-times and
    $$\overline{v}$$ $$q$$-times.
  - Adding control points for flexibility in interactive manipulation

Knot Refinement
---
Knot refinement algorithm inserts many knots at once in the knot vector. It can be achieved by
multiple invocations of knot insertion, however there are more efficient algorithms to do knot
refinement.

* Applications

  - Decomposition of BSpline curves and surfaces into their constituent Bezier polynomial
  pieces. The Bezier control points of the pieces are obtained by inserting each interior
  knot until it has multiplicity equal to the degree of the curve.
  - Merging two or more knot vectors to obtain a set of curves that are defined on one common 
  knot vector.
  - Obtaining polygonal approximations to BSpline curves (and polyhedral approximations to
  BSpline surfaces). Refining a knot vector of a curve brings the control polygon of the
  curve closer to the actual curve and it eventually converges to the curve (and same with surfaces).


Knot removal
---

Degree Elevation
---

Degree Reduction
---


