import { render, screen } from "@testing-library/react";
import Home from "../../pages";

const productMock = {
  productId: "1",
  amount: '80',
};

describe("Home page", () => {
  it("render correctly", () => {
    render(<Home product={productMock} />);
  });

  expect(screen.getByText("")).toBeInTheDocument();
});
