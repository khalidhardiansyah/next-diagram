import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { screen, render, cleanup } from "@testing-library/react";
import GenerateForm from "@/components/generate-form";

afterEach(cleanup);
describe("Testing Form", () => {
  it("show error label when textarea is null", async () => {
    const submit = jest.fn();
    const selected = jest.fn();
    const user = userEvent;
    selected.mockReturnValue(() => "Class Diagram");
    render(<GenerateForm selected={selected} error onsubmit={submit} />);
    const btnSubmit = screen.getByText("Hasilkan diagram");
    const errorLabel = screen.getByText("Deskripsi kasus tidak boleh kosong");
    await user.click(btnSubmit);
    expect(errorLabel).toBeInTheDocument();
  });
});
