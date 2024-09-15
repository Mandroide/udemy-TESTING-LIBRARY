import {render, screen} from "@testing-library/react";
import App from "../App.jsx";
import userEvent from "@testing-library/user-event";

test("order phases for happy path order with scoops and toppings", async () => {
    // render app
    render(<App/>);
    const user = userEvent.setup();

    // add ice cream scoops and toppings
    const vanillaInput = await screen.findByRole("spinbutton", {name: "Vanilla"});
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");

    const chocolateInput = await screen.findByRole("spinbutton", {name: "Chocolate"});
    await user.clear(chocolateInput);
    await user.type(chocolateInput, "2");

    const cherriesCheckbox = await screen.findByRole("checkbox", {name: /Cherries/i});
    await user.click(cherriesCheckbox);

    // finds and click order button summary button
    const orderSummaryButton = screen.getByRole("button", {name: /order sundae/i});
    await user.click(orderSummaryButton);

    // check summary information based on order
    const summaryHeading = screen.getByRole("heading", {name: "Order Summary"});
    expect(summaryHeading).toBeInTheDocument();

    const scoopsHeading = screen.getByRole("heading", {name: "Scoops: $6.00"});
    expect(scoopsHeading).toBeInTheDocument();

    const toppingsHeading = screen.getByRole("heading", {name: "Toppings: $1.50"});
    expect(toppingsHeading).toBeInTheDocument();

    // check summary option items
    const optionItems = screen.getAllByRole("listitem");
    const optionItemsText = optionItems.map((item) => item.textContent);
    expect(optionItemsText).toEqual(["1 Vanilla", "2 Chocolate", "Cherries"]);


    // accept terms and conditions and click button to confirm order
    const tcCheckbox = screen.getByRole("checkbox", {name: /terms and conditions/i});
    await user.click(tcCheckbox);

    const confirmOrderButton = screen.getByRole("button", {name: /Confirm Order/i});
    await user.click(confirmOrderButton);

    // Expect "loading" to show
    const loading = screen.getByText(/loading/i);
    expect(loading).toBeInTheDocument();

    // check confirmation page text
    // this one is async because there is a POST request to the server in between summary and confirmation pages
    const thankYouHeader = await screen.findByRole("heading", {name: /thank you/i});
    expect(thankYouHeader).toBeInTheDocument();

    const notLoading = screen.queryByText("loading");
    expect(notLoading).not.toBeInTheDocument();

    // confirm order number on confirmation page
    const orderNumber = screen.getByText(/order number/i);
    expect(orderNumber).toBeInTheDocument();

    // click "new order" button on confirmation page
    const newOrderButton = screen.getByRole("button", {name: /new order/i});
    await user.click(newOrderButton);

    // check that scoops and toppings subtotals have been reset
    const scoopsTotal = await screen.findByText("Scoops total: $0.00");
    expect(scoopsTotal).toBeInTheDocument();
    const toppingsTotal = screen.getByText("Toppings total: $0.00");
    expect(toppingsTotal).toBeInTheDocument();


    // do we need to await anything to avoid test errors?
    // const b = document.getElementById("root")
    // screen.debug(b)

})

test("Toppings header is not on summary page if no toppings ordered", async () => {
    const user = userEvent.setup();
    render(<App/>)

    // add ice cream scoops and toppings
    const vanillaInput = await screen.findByRole("spinbutton", {name: "Vanilla"});
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");

    const chocolateInput = await screen.findByRole("spinbutton", {name: "Chocolate"});
    await user.clear(chocolateInput);
    await user.type(chocolateInput, "2");

    // finds and click order button summary button
    const orderSummaryButton = screen.getByRole("button", {name: /order sundae/i});
    await user.click(orderSummaryButton);

    // check summary information based on order
    const summaryHeading = screen.getByRole("heading", {name: "Order Summary"});
    expect(summaryHeading).toBeInTheDocument();

    const scoopsHeading = screen.getByRole("heading", {name: "Scoops: $6.00"});
    expect(scoopsHeading).toBeInTheDocument();

    const toppingsHeading = screen.queryByRole("heading", {name: /toppings/i});
    expect(toppingsHeading).not.toBeInTheDocument();

    // check summary option items
    const optionItems = screen.getAllByRole("listitem");
    const optionItemsText = optionItems.map((item) => item.textContent);
    expect(optionItemsText).toEqual(["1 Vanilla", "2 Chocolate"]);
})

test("Toppings header is not on summary page if toppings ordered, then removed", async () => {
    const user = userEvent.setup();
    render(<App/>)

    // add ice cream scoops and toppings
    const vanillaInput = await screen.findByRole("spinbutton", {name: "Vanilla"});
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");

    // Add topping
    const cherriesTopping = await screen.findByRole("checkbox", {name: /Cherries/i});
    await user.click(cherriesTopping);
    expect(cherriesTopping).toBeChecked();

    const toppingsTotal = screen.getByText("Toppings total: $", {exact: false});
    expect(toppingsTotal).toHaveTextContent("1.50");

    // Remove the topping
    await user.click(cherriesTopping);
    expect(cherriesTopping).not.toBeChecked();
    expect(toppingsTotal).toHaveTextContent("0.00");

    // finds and click order button summary button
    const orderSummaryButton = screen.getByRole("button", {name: /order sundae/i});
    await user.click(orderSummaryButton);


    const scoopsHeading = screen.getByRole("heading", {name: "Scoops: $2.00"});
    expect(scoopsHeading).toBeInTheDocument();

    const toppingsHeading = screen.queryByRole("heading", {name: /toppings/i});
    expect(toppingsHeading).not.toBeInTheDocument();
})