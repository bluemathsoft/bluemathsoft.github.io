---
layout: post
title: Why CAD software is different from other 3D Modeling software?
keywords: CAD, 3D Modeling, 3DS Max, Blender, Modo, SolidWorks, NX, AutoCAD, Rhino 3D, CATIA
category: 1_CAD
---

A lot of developers who have programming experience in 3D technologies mainly come from gaming/entertainment industry. They tend to think of CAD software as just another kind of 3D modeling software. Therefore they are shocked to learn the licensing fees they have to pay for CAD Geometry Kernels and libraries to read/write CAD files.

These are some typical questions I've heard

* How's SolidWorks different from 3DS Max?
* I can create a NURBS surface in Maya, why I need to pay 10 times more for SolidWorks then?
* Why can't I export to FBX from SolidWorks/Rhino?
* Why can't I design a Car in Modo, with its beautiful subdivision surfaces? Why do I need CATIA for that?
* I could create beautiful smooth edges with a bevel, what are fillets good for?

This post will explain what makes CAD software so different.

Let me first categorise all these 3D modeling software tools into two major categories.

* CAD
  - Solid Modeling CAD software like SolidWorks, Siemens NX, CATIA, Autodesk Inventor, Rhino 3D, PT Creo, FreeCAD and so on.
  - File formats DWG(AutoCAD), SLDPRT/SLDASM(SolidWorks), STEP, IGES
  - Kernel libraries - Parasolid, ACIS, OpenCASCADE

* Entertainment 3D
  - 3D Modeling software like 3DS Max, SoftImage, Maya, Cinema 4D, Blender, Modo and others
  - Game Engines like Unreal, Unity, Crysis, and so one
  - File formats FBX, OBJ, STL, Collada

The fundamental difference between these two categories of software is *How 3D geometry is represented*

**In CAD applications 3D geometry is represented by precise mathematical equations, while in entertainment 3D it is approximated by Polygons**

In both categories of software the 3D rendering result is the same, however the major difference lies in how the model is represented in the software and how it's saved in a persistent file format.

A cylinder created in 3DS Max is a shape made up of 32 rectangular side polygons, 32 top and 32 bottom triangular polygons. (It could be 64 or any other number that you choose at the time of creation). Depending upon the use case, such cylinder might look perfectly smooth, even though it's only an approximation of a perfect cylinder. A cylinder created in SolidWorks however, is defined by its radius, height and its position in coordinate system. That's how it will be stored in the software and then encoded in the sldprt/STEP file. Only when the user needs to see it or the model is to be fed to a 3D printer or CNC machine, is the cylinder converted to polygons. This conversion to polygons (known as tessellation) happens at a resolution that's sufficient to represent the cylinder smoothly in the application at hand. For instance, it could be tessellated with 32 side polygons as in 3DS Max, if that's sufficient to render a smooth round surface of the cylinder side. But it could also be tessellated with a lot more polygons if the cylinder is physically too big and the model is to be 3D printed.

<img src="/img/cylinder-comparision.png"/>


Why are CAD libraries so expensive?
---
The difference in internal geometry representation leads to very different algorithms to manipulate the models. Two main areas where this makes difference is *Adaptive tessellation* and *Surface-Surface intersections*.



Why are CAD file formats so difficult to read/write?
---
The difficulty in reading CAD file formats is not technical in nature. The CAD industry has evolved with dominant proprietary products, which have had vested interest in restricting general access to the data encoded in their files. Therefore you need to license special libraries to read these files. Fortunately there are open file formats like STEP and IGES, but they are not practical in all use cases.

