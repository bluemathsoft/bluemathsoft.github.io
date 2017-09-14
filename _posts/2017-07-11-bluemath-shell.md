---
layout: post
title: Bluemath Shell
category: 2_BlueMath Updates
---

Last week I put together a quick [**Shell**](http://www.bluemathsoftware.com/shell/index.html) interface on top of BlueMath. This way new users can try BlueMath in their browser without installing anything. The shell interface is in the form of a Code editor right now. In future it might also include a REPL. You can write standard Typescript code in the code editor and run it. The output is shown in the side window. The output is only textual so far. In future support for plots will be added.

The BlueMath library is available with a pre-defined variable name `bluemath`. This pacakge contains the `NDArray` and the linear algebra module `linalg`. One more pre-defined variable `bmlog` gives a better way to print the NDArray objects. You can also use standard `console.log` if you wish.

The code editor in shell is built using [Monaco Editor](https://microsoft.github.io/monaco-editor/), which is the code editor developed as part of Microsoft's [Visual Studio Code](https://code.visualstudio.com/). It's an excellent library in terms of extendability. I've tried to use it's Autocompletion configuration to prompt symbols from BlueMath library while the user is typing the code. However it's very limited right now and will need some work in future.

The shell comes with a bunch of scripts that demonstrate usage of different APIs in BlueMath.

Big picture
---

The Shell interface demonstrates some excellent opportunities. It will allow creation of SageMath or Jupyter notebook like interfaces right in browser, without any server side components. The math kernel will run the browser. Thus allowing it to be usable offline. Also it will make it cheaper for the service provider because there won't be any server infrastructure needed. I strongly believe that this is the next evolutionary step in the world of Web Apps.

With the introduction of WebGL and WebSockets about 7 years ago, the browsers became ready to run apps that previously used to run only on desktops - 3D games, CAD tools, etc. But they were only the front ends of the application. The core libraries of the application were written in legacy native code which required a server side infrastructure to run. This created opportunities for app makers to create cloud applications with subscription models. The cloud applications offered unprecedented ease of access to the users - they could use the app from any device and continue working across devices - but they also created tight locking to the service providers.

The next wave of web apps will change this landscape again. With WebAssembly, the legacy code can now be compiled to run in the browser, thus removing any need for creating expensive server stacks.
