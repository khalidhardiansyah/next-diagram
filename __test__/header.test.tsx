import GenerateHeader from "@/components/generate-header";
import "@testing-library/jest-dom";
import { screen, render, cleanup } from "@testing-library/react";
afterEach(cleanup);
it("should show header", () => {
  render(<GenerateHeader />);
  const h1 = screen.getByRole("heading", { level: 1 });
  expect(h1).toBeInTheDocument();
});
