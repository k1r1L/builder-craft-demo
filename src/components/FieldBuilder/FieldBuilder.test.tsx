import { expect, test, describe } from "vitest";
import userEvent from "@testing-library/user-event";
import FieldBuilder from "./FieldBuilder";
import { render, screen } from "../../test/test-utils";

describe("FieldBuilder", () => {
   test("shows error on label required.", async () => {
    // Arrange
    render(<FieldBuilder />);
    const labelInput = await screen.findByLabelText(/label/i);

    // Act
    await userEvent.type(labelInput, "Sales Region");
    await userEvent.clear(labelInput);
    // blur to trigger validate
    labelInput.blur();

    // Assert
    expect(await screen.findByText(/Label is required./i)).toBeInTheDocument();
   });
   test("shows error on duplicate choices", async () => {
     // Arrange
     render(<FieldBuilder />);
     const choicesInput = await screen.findByLabelText(/choices/i);
     
     // Act
     await userEvent.clear(choicesInput);
     await userEvent.type(choicesInput, "A{enter}A");
     // blur to trigger validate
     choicesInput.blur();

     // Assert
     expect(await screen.findByText(/Duplicate choices/i)).toBeInTheDocument();
   });
});

