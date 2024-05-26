import { useEffect, useRef } from "react";

interface PreviewProps {
    code: string
}

const html = `
<html>
  <head></head>
  <body>
    <div id="root"></div>
    <script>
     window.addEventListener('message', (event) => {
      try {
        eval(event.data);
      } catch (err) {
        const root = document.querySelector('#root');
        root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
        console.error(err);
      }
     }, false)
    </script>
  </body>
</html>
`;


const Preview: React.FC<PreviewProps> = ({ code }) => {
    const iframe = useRef<any>();

    useEffect(() => {
        // Resetting the iframe before bundling the next set of code to prevent any DOM manipulation
        iframe.current.srcdoc = html;
        //setCode(result.outputFiles[0].text);
        // By using the reference hook that we created for our iframe we are posting the bundled code as a message
        // arg - '*' represents that any domain with appropriate event listener can listen to this message
        setTimeout(() => iframe.current.contentWindow.postMessage(code,'*'), 1500)
    }, [code]);

    return(
        <iframe title="preview" ref={iframe} sandbox="allow-scripts" srcDoc={html}/>
    );
};

export default Preview;