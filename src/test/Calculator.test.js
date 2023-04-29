import { fireEvent, render, screen } from "@testing-library/react";
const { Calculator } = require("components/Calculator");

const { getValueA, getValueB, getResult, getOperator } = getCalculator();

describe("<Calculator/>", () => {
  beforeEach(() => {
    render(<Calculator />);
  });
  it(" calculator has to be rendered", () => {
    const textElement = screen.getByText("Calculator");
    expect(textElement.textContent).toBe("Calculator");
  });
  it(" test with header h1", () => {
    const titleElement = screen.getAllByRole("heading"); //const titleElement = screen.getByRole("heading",{level:1});

    expect(titleElement[0].textContent).toBe("Calculator");
    expect(titleElement[1].textContent).toBe("Result");
  });

  it("check the deafult behaviour and values", () => {
    const inputValueA = screen.getByTestId("inputA").value;
    const inputValueB = screen.getByTestId("inputB").value;
    const operator = screen.getByTestId("operator").value;
    const result = screen.getByTestId("result").textContent;
    expect(inputValueA).toBe("0");
    expect(inputValueB).toBe("0");
    expect(operator).toBe("+");
    expect(result).toBe("0");
  });
});

describe("test with default value in calc component", () => {
  it("check the deafult behaviour and values", () => {
    render(<Calculator defaultA={10} defaultB={"10"} />);
    const inputValueA = screen.getByTestId("inputA").value;
    const inputValueB = screen.getByTestId("inputB").value;
    const operator = screen.getByTestId("operator").value;
    const result = screen.getByTestId("result").textContent;
    expect(inputValueA).toBe("10");
    expect(inputValueB).toBe("10");
    expect(operator).toBe("+");
    expect(result).toBe("20");
  });
  it("calculates correctly when the user updates an input", () => {
    render(<Calculator defaultA={12} defaultB={"10"} defaultOperator={"x"} />);
    fireEvent.change(screen.getByTestId("inputA"), { target: { value: "3" } });
    expect(getResult()).toBe("30");
    fireEvent.change(screen.getByTestId("inputB"), { target: { value: "3" } });
    expect(getResult()).toBe("9");
    fireEvent.change(screen.getByTestId("operator"), {
      target: { value: "-" },
    });
    expect(getResult()).toBe("0");
  });
  it("displays an error when we divide by 0", () => {
    render(<Calculator defaultA={1} defaultB={"0"} defaultOperator={"/"} />);
    expect(getResult()).toBe("not divisible by zero");
  });
  it("Display a message when no operator is provided", () => {
    render(<Calculator defaultA={1} defaultB={"0"} defaultOperator={"/"} />);
    fireEvent.change(screen.getByTestId("operator"), {
      target: { value: "!" },
    });
    expect(getResult()).toBe("No operator provided");
  });

  it("returns 0 when the inputs are empty", () => {
    render(<Calculator defaultA={1} defaultB={"0"} defaultOperator={"x"} />);
    fireEvent.change(screen.getByTestId("inputA"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByTestId("inputB"), {
      target: { value: "" },
    });
    expect(getResult()).toBe("0");
  });
});

function getCalculator() {
  return {
    getValueA: () => screen.getByTestId("inputA").value,
    getValueB: () => screen.getByTestId("inputB").value,
    getOperator: () => screen.getByTestId("operator").value,
    getResult: () => screen.getByTestId("result").textContent,
  };
}
