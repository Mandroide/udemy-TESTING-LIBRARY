import {render, screen} from "../../test-utils/testing-library-utils";
import {Options} from "../entry/Options.jsx";
import userEvent from "@testing-library/user-event";

test("Update scoop subtotal when scoop changes", async () => {
    const user = userEvent.setup();
    render(<Options optionType="scoops"/>);

    // make sure total starts out at $0.00
    const scoopsSubtotal = screen.getByText("Scoops total: $", {exact: false});
    expect(scoopsSubtotal).toHaveTextContent("0.00");

    // update vanilla scoops to 1, and check subtotal
    const vanillaInput = await screen.findByRole("spinbutton", {name: "Vanilla"});

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    expect(scoopsSubtotal).toHaveTextContent("2.00");

    // update chocolate scoops to 2, and check subtotal
    const chocolateInput = await screen.findByRole("spinbutton", {name: "Chocolate"});
    await user.clear(chocolateInput);
    await user.type(chocolateInput, "2")

    expect(scoopsSubtotal).toHaveTextContent("6.00");

})

test("Update topping subtotal when toppings changes", async () => {
    const user = userEvent.setup();
    render(<Options optionType="toppings"/>);

    // make sure total starts out at $0.00
    const toppingsSubtotal = screen.getByText("Toppings total: $", {exact: false});
    expect(toppingsSubtotal).toHaveTextContent("0.00");

    // check initial condition of cherries
    const cherryInput = await screen.findByRole("checkbox", {name: /Cherries/i});
    expect(cherryInput).not.toBeChecked()

    // add cherries topping and check subtotal
    await user.click(cherryInput);
    expect(cherryInput).toBeChecked()
    expect(toppingsSubtotal).toHaveTextContent("1.50");

    // check initial condition of hot fudge
    const hotFudgeInput = await screen.findByRole("checkbox", {name: /Hot fudge/i});
    expect(hotFudgeInput).not.toBeChecked()

    // add hot fudge topping and check subtotal
    await user.click(hotFudgeInput);
    expect(hotFudgeInput).toBeChecked()
    expect(toppingsSubtotal).toHaveTextContent("3.00");

    // remove cherries topping and check subtotal
    await user.click(cherryInput);
    expect(cherryInput).not.toBeChecked()
    expect(toppingsSubtotal).toHaveTextContent("1.50");

})