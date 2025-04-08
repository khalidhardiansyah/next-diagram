import "@testing-library/jest-dom";
import { screen, render, cleanup } from "@testing-library/react";
import GenerateButton from "@/components/generate-button";
import DownloadButton from "@/components/download-button";

afterEach(cleanup);
describe("Buttons Test", () => {
  it("should render generate button", () => {
    render(<GenerateButton />);
    const button = screen.getByText("Hasilkan diagram");
    expect(button).toBeInTheDocument();
  });

  it("should show download button", () => {
    render(<DownloadButton handleDownload={jest.fn()} />);
    const button = screen.getByText("download");
    expect(button).toBeInTheDocument();
  });
});
