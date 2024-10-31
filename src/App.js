import { useEffect, useState } from "react";
import "./App.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
const types = {
  VARIABLE_DECLARATIONS: "VariableDeclaration",
  FUNTION_DECLARATION: "FunctionDeclaration",
};
function App() {
  const [lines, setLines] = useState([]);
  const onChangeTextarea = (e) => {
    const text = e.target.value;
    const textSplitted = text.split("\n");
    try {
      const linesClonded = [...lines];
      textSplitted.forEach((lineCode, lineIndex) => {
        const lineFound = lines.find((l) => l.lineNumber === lineIndex + 1);
        if (lineFound) {
          const newLine = { ...lineFound };
          newLine.code = lineCode;
          linesClonded[lineIndex] = newLine;
        }
      });

      setLines(linesClonded);
      const parsed = window.esprima.parse(text);
      console.log("parsed", JSON.parse(JSON.stringify(parsed)));
      parsed.body.forEach((el) => {
        if (el.type === types.VARIABLE_DECLARATIONS) {
          el.declarations.forEach((dec) => {
            const decString = `${el.kind}${dec.id}=${dec.value}`;
          });
        }
      });
    } catch (e) {
      console.log(e.toString(), e.message);
    }
  };
  function createLines() {
    const linesTemp = [];
    for (let i = 0; i < 11; i++) {
      linesTemp.push({
        lineNumber: i + 1,
      });
    }
    return linesTemp;
  }
  useEffect(() => {
    setLines(createLines());
  }, [setLines]);

  return (
    <div className="App" style={{ marginTop: "0px" }}>
      <header className="App-header">
        <h1>Code Editor</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <textarea
            style={{
              margin: 0,
              padding: "5px",
              border: 0,
              width: "500px",
              height: "250px",
              maxWidth: "500px",
              maxheight: "250px",
              background: "darkGrey",
            }}
            onChange={onChangeTextarea}
          />
          <div
            style={{
              width: "500px",
              height: "250px",
              background: "darkGrey",
              padding: "5px",
            }}
          >
            <div className="lines">
              {lines.map((l) => (
                <div className="line" key={l.lineNumber}>
                  <div className="line-number">{l.lineNumber}.</div>
                  <div className="line-code">{l.code}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
