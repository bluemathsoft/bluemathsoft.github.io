
import * as bluemath from 'bluemath'

(<any>window).bluemath = bluemath;

(<any>window).console = {
  log : function(...args:any[]) {
    let msg:string = args.map(a => new String(a)).join('');
    let el = document.createElement('p');
    el.textContent = msg;
    document.body.appendChild(el);
  },
  error : function(...args:any[]) {
    let msg:string = args.map(a => new String(a)).join('');
    let el = document.createElement('p');
    el.style.color = '#ff0000';
    el.textContent = msg;
    document.body.appendChild(el);
  },
  assert : function(condition) {
    if(!condition) {
      throw new Error("Assertion failed");
    }
  },
  clear : function () {
    let children = document.body.children;
    for(let i=children.length-1; i>=0; i--) { children[i].remove(); }
  }
};

(<any>window).bmlog = function (...args:any[]) {
  let s = '';
  for(let arg of args) {
    s += arg.toString().replace(/\n/g,'<br/>').replace(/\s/g,'&nbsp;');
  }
  let el = document.createElement('p');
  el.innerHTML = s;
  document.body.appendChild(el);
};

(<any>window).scopedEval = function (codestr) {
  try {
    console.clear();
    eval(codestr);
  } catch(e) {
    console.error(e.toString());
  }
}

// interface PlotSpec {
//   x : number[];
//   y : number[];
// };

// (<any>window).bmplot = function (name:string, spec:PlotSpec) {
//   console.assert(spec.x && Array.isArray(spec.x));
//   console.assert(spec.y && Array.isArray(spec.y));
//   let pelem = document.createElement('div');
//   pelem.setAttribute('id','plot-'+name);
//   pelem.setAttribute('class','plot');
//   Plotly.plot(pelem, [{
//     x: spec.x,
//     y: spec.y
//   }], {
//     margin: { t: 0 }
//   });
//   document.body.appendChild(pelem);
// };