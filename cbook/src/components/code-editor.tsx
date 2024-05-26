import { useRef } from "react";
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
/*EditorDidMount - type definition interface not a function*/
import prettier from 'prettier';
import parser from 'prettier/parser-babel'; // parser for JS

interface CodeEditorProps {
    initialValue: string;
    onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
    const editorRef = useRef<any>();

    const onEditorDidMount : EditorDidMount = (getValue, monacoEditor) => {
        editorRef.current = monacoEditor;
        monacoEditor.onDidChangeModelContent(() => {
            onChange(getValue())
        });

        monacoEditor.getModel()?.updateOptions({ tabSize: 2});
    };

    const onFormatClick = () => {
        //get the current code from the editor
        const unformatted = editorRef.current.getModel().getValue();

        //format the code
        const formatted = prettier.format(unformatted, {
            parser: 'babel',
            plugins: [parser],
            useTabs: false,
            semi: true,
            singleQuote: true
        });

        //set the formatted code back in to the editor
        editorRef.current.setValue(formatted);
    }

    return (
        <div>
            <button onClick={onFormatClick}>Format</button>
            <MonacoEditor
                editorDidMount={onEditorDidMount}
                value={initialValue}
                language="javascript" 
                theme="dark" 
                height="500px"
                options = {{
                    wordWrap: 'on',
                    minimap: { enabled: false},
                    showUnused: false,
                    folding: false,
                    lineNumbersMinChars: 3,
                    fontSize: 16,
                    scrollBeyondLastLine: false,
                    automaticLayout: true
                }}
            />;
        </div>
    );
};

export default CodeEditor;