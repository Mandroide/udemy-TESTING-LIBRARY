import {render, screen} from "@testing-library/react";
import {SummaryForm} from "../summary/SummaryForm.jsx";
import userEvent from "@testing-library/user-event";

test("checkbox initial conditions", () => {
    render(<SummaryForm setOrderPhase={null} />);
    const checkbox = screen.getByRole("checkbox", {name: /terms and conditions/i});
    expect(checkbox).not.toBeChecked();
    const confirmButton = screen.getByRole("button", {name: /confirm order/i});
    expect(confirmButton).toBeDisabled();
})

test("checkbox disables button on first click and enables on second click", async () => {
    const user = userEvent.setup()
    render(<SummaryForm setOrderPhase={null} />);
    const checkboxTermsAndConditions = screen.getByRole("checkbox", {name: /terms and conditions/i});
    const confirmButton = screen.getByRole("button", {name: /confirm order/i});

    await user.click(checkboxTermsAndConditions);
    expect(checkboxTermsAndConditions).toBeChecked();
    expect(confirmButton).toBeEnabled();

    await user.click(checkboxTermsAndConditions);
    expect(checkboxTermsAndConditions).not.toBeChecked();
    expect(confirmButton).toBeDisabled();
});

test("popover responds to hover", async () => {
    const user = userEvent.setup()
    render(<SummaryForm setOrderPhase={null}/>);

    // popover starts out hidden
    let popover = screen.queryByText(/no ice cream will actually be delivered/i)
    expect(popover).not.toBeInTheDocument();

    // popover appears on mouseover of checkbox label
    const checkboxTermsAndConditions = screen.getByText(/terms and conditions/i);
    await user.hover(checkboxTermsAndConditions);
    popover = screen.getByText(/no ice cream will actually be delivered/i);
    expect(popover).toBeInTheDocument();

    // popover disappears when we mouse out
    await user.unhover(checkboxTermsAndConditions);
    expect(popover).not.toBeInTheDocument();
})