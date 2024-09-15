import {render, screen} from "../../test-utils/testing-library-utils";
import {Options} from "../entry/Options.jsx";
import userEvent from "@testing-library/user-event";


test("displays image for each scoop option from server", async () => {
    render(<Options optionType="scoops"/>);

    // find images
    const scoopImages = await screen.findAllByRole("img", {name: /scoop$/i});
    expect(scoopImages).toHaveLength(2);

    // confirm alt text of images
    const altText = scoopImages.map(elem => elem.getAttribute("alt"));
    expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
})

test("displays image for each topping option from server", async () => {
    render(<Options optionType="toppings"/>);

    // find images
    const toppingImages = await screen.findAllByRole("img", {name: /topping$/i});
    expect(toppingImages).toHaveLength(3);

    // confirm alt text of images
    const altText = toppingImages.map(elem => elem.getAttribute("alt"));
    expect(altText).toEqual(["Cherries topping", "M&Ms topping", "Hot fudge topping"]);
})

test("do not update total if scoop count is invalid", async () => {
    const user = userEvent.setup();
    render(<Options optionType="scoops"/>);

    const chocolateInput = await screen.findByRole("spinbutton", {name: /Chocolate/i});
    expect(chocolateInput.value).toBe("0")

    const scoopsTotal = await screen.findByText("Scoops total: $0.00");
    expect(scoopsTotal).toBeInTheDocument();

    await user.clear(chocolateInput);
    await user.type(chocolateInput, "-1");
    expect(scoopsTotal).toHaveTextContent("$0.00");

    await user.clear(chocolateInput);
    await user.type(chocolateInput, "0.5");
    expect(scoopsTotal).toHaveTextContent("$0.00");

    await user.clear(chocolateInput);
    await user.type(chocolateInput, "11");
    expect(scoopsTotal).toHaveTextContent("$0.00");

    await user.clear(chocolateInput);
    await user.type(chocolateInput, "1");
    expect(scoopsTotal).toHaveTextContent("$2.00");
})