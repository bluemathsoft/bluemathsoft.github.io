---
layout: bookpage
permalink: /pages/topology/basic
title: Topology Basics 
---

The geometry is useful to describe curves and surfaces that define the boundary of a solid. However in order to fully define the solid in 3D Euclidean space $$E^3$$ we need Topology. Intuitively speaking a closed (or water-tight) solid will divide the space into two distinct regions - *Inside* and *Outside*. The boundary of the solid defines where this division occurs. The boundary is defined by Faces. Multiple adjascent faces join each other and define edges. Multiple adjascent edges join each other and define vertices. In order to develop algorithms to implement this, one needs rigouraous mathematical treatment. The following are the notes on the theory that goes behind topology module of BlueMath.

$$E^3$$ 3-dimensional Euclidean space

$$E^2$$ 2-dimensional Euclidean space

A **Solid** is a *bounded*, *closed* subset of $$E^3$$

A **Regular Solid** is defined as regularization $$r(A)$$ of a point set $$A$$.

$$r(A) = c(i(A))$$

where $$c()$$ is *closure* and $$i()$$ is *interior* of A.

A *bounded* *regular* set is termed **r-set**

A **2-manifold** $$M$$ is a topological space where every point has a neighborhood topologically equivalent to an open disk of $$E^2$$

A **Plane Model** is a planar directed graph with a finite number of vertices (*v*), edges (*e*) and faces (*f*) bounded by edges and vertices.

The invariance theorem states that for a Plane Model, the sum $$v-e+f$$ is a constant independent of the manner in which the Plane Model is composed. This constant is called the **Euler characteristic** of the Plane Model.

The <b>Euler-Poincar&eacute;</b> formula is written as

$$ v-e+f=2(s-h)-b $$

where $$s$$ is the number of connected surfaces or **Shell**, $$h$$ is the **genus** of the surface and $$b$$ are number of boundary components.

We use Boundary Models to define Solids. We use **Winged-Edge Data Structure** to implement them.

Such implementation of a boundary model has to manipulate the Plane Model of the Surface boundary in a manner such that it always obeys the *Euler characteristic*.

This is achieved by a manipulating such Plane Model through a set of carefully defined operations, first introduced by Baumgart. These are called [Euler Operators](/pages/topology/eulerops).
