const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { JSDOM, VirtualConsole } = require('jsdom');

function mockContext(canvas) {
  const gradient = () => ({ addColorStop() {} });
  return new Proxy({
    canvas, globalAlpha: 1, measureText: text => ({ width: String(text).length * 7 }),
    createLinearGradient: gradient, createRadialGradient: gradient,
    getImageData: () => ({ data: new Uint8ClampedArray(4) }),
    getLineDash: () => [], getTransform: () => ({ a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 })
  }, { get: (target, key) => key in target ? target[key] : () => {} });
}

function loadGame({ createCanvas, Path2D, sourceRoot } = {}) {
  const root = sourceRoot || path.resolve(__dirname, '..');
  const messages = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('jsdomError', error => messages.push(error.message));
  const dom = new JSDOM(fs.readFileSync(path.join(root, 'index.html'), 'utf8'), {
    url: 'http://localhost:8080', runScripts: 'outside-only', pretendToBeVisual: true, virtualConsole
  });
  const w = dom.window;
  w.requestAnimationFrame = () => 0;
  w.cancelAnimationFrame = () => {};
  w.setTimeout = () => 0;
  w.setInterval = () => 0;
  w.clearTimeout = () => {};
  w.clearInterval = () => {};
  w.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {}, addListener() {} });
  w.HTMLMediaElement.prototype.play = () => Promise.resolve();
  w.HTMLMediaElement.prototype.pause = () => {};
  w.HTMLMediaElement.prototype.load = () => {};
  w.HTMLMediaElement.prototype.canPlayType = () => '';
  w.Audio = function(src) { const el=w.document.createElement('audio'); if(src) el.src=src; return el; };
  if (Path2D) w.Path2D = Path2D;
  const canvases = new Map();
  w.HTMLCanvasElement.prototype.getContext = function() {
    let entry = canvases.get(this);
    if (!entry) {
      const canvas = createCanvas ? createCanvas(this.width || 300, this.height || 150) : this;
      const native = createCanvas ? canvas.getContext('2d') : null;
      const context = native ? new Proxy(native, {
        get(target,key) {
          if (key === 'drawImage') return (image,...args) => target.drawImage(canvases.get(image)?.canvas || image,...args);
          const value=target[key]; return typeof value === 'function' ? value.bind(target) : value;
        },
        set(target,key,value) { target[key]=value;return true; }
      }) : mockContext(canvas);
      entry = { canvas, context };
      canvases.set(this, entry);
    }
    if (createCanvas && (entry.canvas.width !== this.width || entry.canvas.height !== this.height)) {
      entry.canvas.width = this.width; entry.canvas.height = this.height;
    }
    return entry.context;
  };
  const context = dom.getInternalVMContext();
  // Read script order from the actual page so missing/reordered art scripts fail here too.
  for (const script of w.document.querySelectorAll('script[src]')) {
    const src = script.getAttribute('src').split('?')[0];
    if (!/^https?:/.test(src) && fs.existsSync(path.join(root,src))) {
      vm.runInContext(fs.readFileSync(path.join(root,src),'utf8'),context,{filename:src});
    }
  }
  return {
    run: code => vm.runInContext(code,context), window:w, dom, messages,
    canvas: el => canvases.get(el)?.canvas,
    close: () => dom.window.close()
  };
}
module.exports = { loadGame };
