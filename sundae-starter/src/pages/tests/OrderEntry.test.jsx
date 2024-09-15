import {OrderEntry} from "../entry/OrderEntry.jsx";
import {server} from "../../mocks/server.js";
import {http, HttpResponse} from "msw";
import {render, screen} from "../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";

test("handles error for scoops and topping routes", async () => {
    server.resetHandlers(
        http.get("http://localhost:3030/scoops", () => new HttpResponse(null, {status: 500})),
        http.get("http://localhost:3030/toppings", () => new HttpResponse(null, {status: 500})))
    render(<OrderEntry setOrderPhase={null}/>);
    const alerts = await screen.findAllByRole("alert");

    expect(alerts).toHaveLength(2);


})

test("disable order button if there are no scoops ordered", async () => {
    const user = userEvent.setup();
    const {container} = render(<OrderEntry setOrderPhase={vi.fn()}/>);
    const orderButton = screen.getByRole("button", {name: /order/i});
    // expect(orderButton).toBeDisabled();

    const vanillaInput = await screen.findByRole("spinbutton", {name: /vanilla/i});

    await user.clear(vanillaInput)
    await user.type(vanillaInput, "1");
    expect(orderButton).toBeEnabled();

    await user.clear(vanillaInput)
    await user.type(vanillaInput, "0");
    expect(orderButton).toBeDisabled();

})