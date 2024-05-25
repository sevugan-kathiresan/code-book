import React from 'react';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

const App = () => {
  const ref = useRef<any>();
  const iframe = useRef<any>();
  const [input, setInput] = useState('');
  const [code, setCode] = useState(''); // Result from our esbuild

  //Initializing the esbuild
  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://www.unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    if (!ref.current) {
      return;
    }
    
    //building = transpiling + bundling
    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"', // replacing with string production that is why use of two quotations
        global: 'window', // we need to replace global with winndow if we try to run our code inside browser
      }
    });

    //setCode(result.outputFiles[0].text);
    // By using the reference hook that we created for our iframe we are posting the bundled code as a message
    // arg - '*' represents that any domain with appropriate event listener can listen to this message
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
  };

  const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
         window.addEventListener('message', (event) => {
          eval(event.data);
         }, false)
        </script>
      </body>
    </html>
  `;
  
  return (
    <div>
      <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
      <iframe ref={iframe} sandbox="allow-scripts" srcDoc={html}/>
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
