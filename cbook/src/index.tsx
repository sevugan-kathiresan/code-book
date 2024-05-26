import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import CodeEditor from './components/code-editor';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import Preview from './components/preview';
import bundle from './bundler';
import './index.css';

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };
  
  return (
    <div>
      <div className='heading'>Enter Your Javascript code Below</div>
      <CodeEditor 
        initialValue=''
        onChange={(value) => setInput(value)}
      />
      <div>
        <button className='orange-button' onClick={onClick}>Submit</button>
      </div>
      <Preview code={code}/>
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
