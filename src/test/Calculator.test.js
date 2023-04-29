const { render, screen } = require("@testing-library/react");
const { Calculator } = require("components/Calculator");

describe("<Calculator/>", () => {
  it(" calculator has to be rendered", () => {
    render(<Calculator />);
    const textElement = screen.getByText("Calculator");
    expect(textElement.textContent).toBe("Calculator");
  });
  it(" test bu header h1", () => {
    render(<Calculator />);
    const titleElement = screen.getAllByRole("heading"); //const titleElement = screen.getByRole("heading",{level:1});

    expect(titleElement[0].textContent).toBe("Calculator");
    expect(titleElement[1].textContent).toBe("Result");
  });
});
