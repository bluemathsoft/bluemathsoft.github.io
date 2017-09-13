---
layout: post
title: How to read STEP file?
category: 1_CAD
---

STEP is the most widely used open file format in CAD industry. Almost all CAD modeling software have an ability to import or export the parts of the model in STEP format.

If you are writing a software tool to analyze a CAD model, it's a good idea to read it as a STEP file and then use the relevant API to query the model.

What is STEP format?
===
It is an ISO standard (10303-21). The file is in ASCII format and defined with a schema. The schema itself is another ISO standard for Data Modeling language, EXPRESS (ISO 10303-11).

How can I read a STEP file?
===
There are a few ways of doing this depending upon how advanced your programming skills are OR how much money you want to pay in licensing fees.

* Geometry kernel libraries

Typically a geometry kernel library has facilities to read and write STEP files. A free and open source solution is available in the form of OpenCASCADE geometry kernel. The [STEPControl package](https://www.opencascade.com/doc/occt-6.9.1/refman/html/toolkit_tkstep.html) offers easy to use API for reading and writing STEP files.

* Data Exchange libraries - HOOPS

A commercial option is available in the form of HOOPS Exchange library from TechSoft 3D. It's a recommeded solution if you project required reading/writing other proprietary CAD file formats besides STEP.

* stepcode

If you want very low level access to STEP file, so that your program can read the raw file and directly handle parts of it; then you want to look at the [stepcode](https://github.com/stepcode/stepcode) library.

It provides EXPRESS schemas for the STEP file format along with a tool that generates C++ or Python code from these schema files.
