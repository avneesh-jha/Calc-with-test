import { useState } from "react";
import { sum, substract, multiply, divide } from "../utils/math-function";
const OPERATORS = ["+", "-", "x", "/"];
export function Calculator({ defaultA, defaultB, defaultOperator }) {
  const [inputValueA, setInputValueA] = useState(
    !defaultA || isNaN(defaultA) ? 0 : Number(defaultA)
  );

  const [inputValueB, setInputValueB] = useState(
    !defaultB || isNaN(defaultB) ? 0 : Number(defaultB)
  );

  const [operator, setOperator] = useState(
    OPERATORS.includes(defaultOperator) ? defaultOperator : "+"
  );

  const valueA = inputValueA || 0;
  const valueB = inputValueB || 0;

  function getResult() {
    switch (operator) {
      case "+":
        return sum(valueA, valueB);
      case "-":
        return substract(valueA, valueB);
      case "x":
        return multiply(valueA, valueB);
      case "/":
        try {
          return divideSafely(valueA, valueB);
        } catch (e) {
          alert("not divisible by 0");
        }

      default:
        return "No operator provided";
    }
  }

  function divideSafely(a, b) {
    try {
      return divide(a, b);
    } catch (err) {
      return err.message;
    }
  }
  const renderInputA = () => {
    return (
      <input
        data-testid="inputA"
        value={inputValueA}
        type="number"
        onChange={(e) =>
          setInputValueA(
            e.target.value ? Number.parseFloat(e.target.value) : ""
          )
        }
      />
    );
  };

  const renderInputB = () => {
    return (
      <input
        data-testid="inputB"
        value={inputValueB}
        type="number"
        onChange={(e) =>
          setInputValueB(
            e.target.value ? Number.parseFloat(e.target.value) : ""
          )
        }
      />
    );
  };

  const renderSelectBox = () => {
    return (
      <div>
        <select
          data-testid="operator"
          value={operator}
          className="form-select"
          onChange={(e) => setOperator(e.target.value)}
        >
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="x">x</option>
          <option value="/">/</option>
        </select>
      </div>
    );
  };
  return (
    <>
      <h1 style={{ marginBottom: 40 }}>Calculator</h1>
      {renderInputA()}
      {renderSelectBox()}
      {renderInputB()}
      <h2 style={{ marginTop: 20 }}>Result</h2>
      <span data-testid="result">{getResult()}</span>
    </>
  );
}
