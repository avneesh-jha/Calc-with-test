const { render, screen, getByTestId } = require("@testing-library/react");
const { Calculator } = require("components/Calculator");

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
});
