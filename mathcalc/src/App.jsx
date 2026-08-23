import {useState, useRef, useEffect} from "react"; 
import "./App.css";
import Switch from "./Switch";
import { ThemeProvider, useTheme } from "./ThemeContext";

function MathCalc() { 
  const inputRef = useRef(0); 
  const resultRef = useRef(0); 
  const [result, setResult] = useState(0); 
  const { theme } = useTheme();
 
  function plus(e) { 
    e.preventDefault(); 
    setResult((result) => result + Number(inputRef.current.value)); 
  }; 
 
  function subtract(e) { 
    e.preventDefault(); 
    setResult((result) => result - Number(inputRef.current.value)); 
  };
 
  function multiply(e) { 
    e.preventDefault(); 
    setResult((result) => result * Number(inputRef.current.value)); 
  }; 
 
  function divide(e) { 
    e.preventDefault(); 
    setResult((result) => result / Number(inputRef.current.value)); 
  };
 
  function resetInput(e) { 
    e.preventDefault(); 
    inputRef.current.value = 0;
  }; 
 
  function resetResult(e) { 
    e.preventDefault(); 
    setResult(0);
  }; 

  useEffect(() => {
    document.body.style.background = theme === "light" ? "white" : "black";
  }, [theme]);
 
  return ( 
    <div className="App"> 
      <div> 
        <h1 
          style={{
            color: theme === "light" ? "black" : "white",
          }}
          >
          Simplest Working Calculator
        </h1> 
        <Switch/>
      </div> 
      <form> 
        <p id="result" 
          style={{
            color: theme === "light" ? "black" : "white",
          }}>
          {result}
        </p> 
        <input
          id="input"
          pattern="[0-9]" 
          ref={inputRef} 
          type="number" 
          placeholder="Type a number" 
        /> 
        <button onClick={plus}>Add</button> 
        <button onClick={subtract}>Subtract</button> 
        <button onClick={multiply}>Multiply</button> 
        <button onClick={divide}>Divide</button> 
        <button onClick={resetInput}>Reset Input</button> 
        <button onClick={resetResult}>Reset Result</button> 
      </form> 
    </div> 
  ); 
} 

function App() {
  return (
      <ThemeProvider>
        <MathCalc/>
      </ThemeProvider>
  );
}
 
export default App; 
