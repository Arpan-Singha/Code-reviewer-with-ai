import { useState, useEffect } from 'react';
import 'prismjs/themes/prism-tomorrow.css';
import prism from 'prismjs';
import Editor from 'react-simple-code-editor';
import axios from 'axios';
import Markdown from 'react-markdown';
import './App.css';

// Import the languages you want to support
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-markup'; // for HTML



function App() {
  const [code, setCode] = useState(`function sum() {\n  return 1 + 1\n}`);
  const [review, setReview] = useState('');
  const [language, setLanguage] = useState('javascript');

  
  useEffect(() => {
    prism.highlightAll();
  }, []);

 
 
 
  function detectLanguage(code) {
    if (code.includes('<') && code.includes('>')) return 'markup';
    if (code.includes('def ') || code.includes('import ')) return 'python';
    if (code.includes('const ') || code.includes('function')) return 'javascript';
    return 'javascript';
  }

 
 
  async function reviewCode() {
    const response = await axios.post('http://localhost:3000/ai/get-review', { code });
    setReview(response.data);
  }

 
 
  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              
              onValueChange={(code) => {
                setCode(code);
                setLanguage(detectLanguage(code));
              }}
              
              
              highlight={(code) =>
                prism.highlight(code, prism.languages[language] || prism.languages.javascript, language)
              }
             
             
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                border: '1px solid #3b4048',
                borderRadius: '4px',
                height: '100%',
                width: '100%',
                overflow: 'auto',
              }}
            />
          </div>
          <div onClick={reviewCode} className="review">review</div>
        </div>
        <div className="right">
          <Markdown>{review}</Markdown>
        </div>
      </main>
    </>
  );
}

export default App;
