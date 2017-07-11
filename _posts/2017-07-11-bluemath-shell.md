---
layout: post
title: Bluemath Shell
---

Last week I put together a quick [**Shell**](http://www.bluemathsoftware.com/shell/index.html) interface on top of BlueMath. This way new users can try BlueMath in their browser without installing anything. The shell interface is in the form of a Code editor right now. In future it might also include a REPL. You can write standard Typescript code in the code editor and run it. The output is shown in the side window. The output is only textual so far. In future support for plots will be added.

The BlueMath library is available with a pre-defined variable name `bluemath`. This pacakge contains the `NDArray` and the linear algebra module `linalg`. One more pre-defined variable `bmlog` gives a better way to print the NDArray objects. You can also use standard `console.log` if you wish.

The code editor in shell is built using [Monaco Editor](https://microsoft.github.io/monaco-editor/), which is the code editor developed as part of Microsoft's [Visual Studio Code](https://code.visualstudio.com/). It's an excellent library in terms of extendability. I've tried to use it's Autocompletion configuration to prompt symbols from BlueMath library while the user is typing the code. However it's very limited right now and will need some work in future.

The shell comes with a bunch of scripts that demonstrate usage of different APIs in BlueMath.
