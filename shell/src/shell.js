

  let W = window.innerWidth-10;
  let H = window.innerHeight-10;
  var editor;
  let containerElem = document.getElementById('container');
  let editorElem = document.getElementById('editor');
  let runtimeElem = document.getElementById('runtime');
  let docholderElem = document.getElementById('docholder');
  let docsCloseElem = document.getElementById('docsclose');
  let exmChoices = document.getElementById('examples-choices');
  let clearElem = document.getElementById('btn-clear');
  let saveElem = document.getElementById('btn-save');

  let preambleTypeDeclaration =
  `
  declare function bmlog(...args:any[]) {}
  `

  // Setup Monaco editor
  require.config({ paths: { 'vs': './ext/monaco-editor/min/vs' }});
  require(['vs/editor/editor.main'], function() {
    editor = monaco.editor.create(editorElem, {
      language: 'typescript',
      lineNumbers : false,
      minimap : {
        enabled : false
      }
    });

    // validation settings
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false
    });

    // compiler options
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES6,
      allowNonTsExtensions: true
    });

    // extra libraries
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      EXTRA_LIBS,'bluemath.d.ts');

    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      preambleTypeDeclaration);

    // Setup example choices
    let exmKeys = Object.keys(BMSHELL_EXAMPLES);
    for(let key of exmKeys) {
      let opt = document.createElement('option');
      opt.textContent = key;
      exmChoices.appendChild(opt);
    }
    exmChoices.onchange = () => {
      let exmCode = BMSHELL_EXAMPLES[exmChoices.value];
      editor.getModel().setValue(exmCode);
    }
    // Populate with first example
    exmChoices.value = exmKeys[0];
    editor.getModel().setValue(BMSHELL_EXAMPLES[exmKeys[0]]);

    // Create IFrame
    ifrm = document.createElement('iframe');
    ifrm.setAttribute('src', './runtime.html');
    runtimeElem.appendChild(ifrm);
    ifrm.style.width = (W-500)+'px';
    ifrm.contentWindow.onload = function () {
      var runbutton = document.querySelector('#btn-run');
      runbutton.classList.remove('btn-disabled');
    }
  });


  // Recreate the runtime iframe and execute the code each time 'Run'
  // is clicked
  var runbutton = document.querySelector('#btn-run');
  runbutton.classList.add('btn-disabled');
  runbutton.onclick = () => {
    if(runbutton.classList.contains('btn-disabled')) {
      return; // done nothing
    }
    let codestring = editor.getModel().getValue();
    let ifrm = runtimeElem.querySelector('iframe');
    ifrm.contentWindow.scopedEval(codestring);
  };

  let docsButton = document.querySelector('#btn-docs');
  docsButton.onclick = () => {
    window.open('http://www.bluemathsoftware.com/docs.html','_blank');
  };

  clearElem.onclick = () => {
    if(confirm('Clear the editor? You will loose any unsaved code')) {
      editor.getModel().setValue('');
    }
  };

  saveElem.onclick = () => {
    var blob = new Blob([editor.getModel().getValue()], {type: "text/plain;charset=utf-8"});
    saveAs(blob, 'bluemath-script.ts');
  };

  containerElem.style.width = W+'px';
  containerElem.style.height = Math.round(0.9*H)+'px';
  editorElem.style.width = '500px';