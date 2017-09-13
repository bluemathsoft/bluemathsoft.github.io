---
layout: post
title: Why CAD is different from other 3D Modeling software?
keywords: CAD, 3D Modeling, 3DS Max, Blender, Modo, SolidWorks, NX, AutoCAD, Rhino 3D, CATIA
category: 1_CAD
---

A lot of developers who have programming experience in 3D technologies mainly come from gaming/entertainment industry. They tend to think of CAD as just another kind of 3D modeling software. Therefore they are shocked to learn the licensing fees they have to pay for CAD Geometry Kernels and libraries to read/write CAD files.

These are some typical questions I've heard

* How's SolidWorks different from 3DS Max?
* I can create a NURBS surface in Maya, why I need to pay 10 times more for SolidWorks then?
* Why can't I use FBX file format for my CAD models?
* Why can't I design a Car in Modo, with its beautiful subdivision surfaces? Why do I need CATIA for that?
* I could create beautiful smooth edges with a bevel, what are fillets good for?

This post will explain what makes CAD software so different.

Let me first divide all these 3D modeling software tools into two major categories.

* CAD
  - Solid Modeling CAD software like SolidWorks, Siemens NX, SolidEdge, CATIA, Autodesk Inventor, Rhino 3D, PT Creo, FreeCAD and so on.
  - File formats DWG(AutoCAD), SLDPRT/SLDASM(SolidWorks), STEP, IGES
  - Kernel libraries - Parasolid, ACIS, OpenCASCADE

* Entertainment 3D
  - 3D Modeling software for games, animation movies, etc. like 3DS Max, SoftImage, Maya, Cinema 4D, Blender, Modo and others
  - Game Engines like Unreal, Unity, Crysis, and so one
  - Scene Graph libraries like Three.js, Panda3D
  - File formats FBX, OBJ, STL, Collada

The fundamental difference between these two categories of software is "How 3D geometry is represented?"

<div class="well">
In CAD applications 3D geometry is represented by precise <b>mathematical equations</b>, while in entertainment 3D it is approximated by <b>Polygons</b>
</div>

In both categories of software the 3D rendering result is the same, however the major difference lies in how the model is represented in the software and how it's saved in a persistent file format.

When you create a cylinder in SolidWorks and in 3DS Max, it may look equally smooth in both of them.

<img src="/img/cylinder-comparision.png"/>

A cylinder created in 3DS Max is a shape made up of 32 rectangular side polygons, 32 top and 32 bottom triangular polygons. Its curved surface looks smooth because of Gouraud Shading.

A cylinder created in SolidWorks however is defined as a cylinder of given radius and height and it's automatically converted to necessary number of polygons required to make the curved surface smooth for given purpose. If the purpose is viewing, then it could be represented with 32 strips, but if the purpose is 3D printing then it might be represented by more number of polygons depending upon the physical units of the cylinder.

Thus the polygonization (or tessellation) in CAD is called Adaptive.


Why are CAD libraries so expensive?
---
The difference in internal geometry representation leads to very different algorithms to manipulate the models. Two main areas where this makes difference is *Adaptive tessellation* and *Surface-Surface intersections*.



Why are CAD file formats so difficult to read/write?
---
The difficulty in reading CAD file formats is not technical in nature. The CAD industry has evolved with dominant proprietary products, which have had vested interest in restricting general access to the data encoded in their files. Therefore you need to license special libraries to read these files. Fortunately there are open file formats like STEP and IGES, but they are not practical in all use cases.

