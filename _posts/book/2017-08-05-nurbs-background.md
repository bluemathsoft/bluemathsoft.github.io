---
layout: bookpage
permalink: /book/nurbs/background.html
title: NURBS background
---

A CAD application requires a way to describe geometry of objects in 2D and 3D space. Moreover a CAD application requires a precise way to do so, as opposed to an approximate way. A precise way to define geometry is by means of mathematical equations that describes exact position of every point on the curve or surface. An approximate way would be to define the curve or surface as a list of line segments or a group of triangular polygons, respectively, that match the actual geometry as closely as possible given the needs of the application. The approximate way is what is used in computer graphics industry (visual effects, games, etc.) where the objects are artistic artifacts, rather than manufacturable entities.

The precise definition of geometry encodes the shape of the object in terms of mathematical equation. This is the form in which the geometry data is stored in a CAD document. It is only converted to approximate form for the purposes of rendering, manufacturing or analysis in mechanical simulations. The process of converting the exact form to approximate form is called *Tessellation* and it's performed with a precision parameter that's suitable for the purpose at hand.

There are many ways to precisely define geometry, i.e. curves and surfaces. One can define curves and surfaces using implicit or explicit equations.

For example,
Here are equations of some common curves and surfaces in *implicit* or *explicit* form

$$ y = mx + b $$ (Line)

$$ (x-a)^2 + (y-b)^2 = r^2 $$ (Circle)

$$ x + 2y - 3z + 1 = 0 $$ (Plane)

$$ x^2 + y^2 + z^2 - 16 = 0 $$ (Sphere)


These equations indeed give a precise definition of the geometry of the object. All kinds of shapes could theoretically have a mathematical equation in this form. However it would be very complicated to define it. There is no generic way to find such equations for all shapes, therefore it makes them unsuitable as a way to define geometry in a computer program.

A more suitable form is *Parametric equations*

In this form a curve or surface is defined as a function of an independent parameter. Here are parametric equations of a line and a circle.

Line 

$$ x = a_0+a_1*t $$ <br> $$ y = b_0+b_1*t $$

Circle

$$ x = a+r*cos\theta $$ <br> $$ y = b+r*sin\theta $$

The $$t$$ and $$\theta$$ are independent parameters in above equations.

The parametric form has the advantage over implicit form when we want to calculate the $$(x,y,z)$$ coordinates of the geometry quickly. This is what is required for the tessellation purposes. Therefore it's the prefered form in representing geometry in CAD applications.

However we could use more generic form of parametric equations to write our geometry kernel for CAD applications. That's where *NURBS* come into picture.

**NURBS** stand for **N**on-**U**niform **R**ational **B**-**S**splines

