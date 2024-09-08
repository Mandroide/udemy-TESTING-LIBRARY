import {OrderEntry} from "../entry/OrderEntry.jsx";
import {server} from "../../mocks/server.js";
import {http, HttpResponse} from "msw";
import {render, screen} from "../../test-utils/testing-library-utils";

test("handles error for scoops and topping routes", async () => {
    server.resetHandlers(
        http.get("http://localhost:3030/scoops", () => new HttpResponse(null, {status: 500})),
        http.get("http://localhost:3030/toppings", () => new HttpResponse(null, {status: 500})))
    render(<OrderEntry/>);
    const alerts = await screen.findAllByRole("alert");

    expect(alerts).toHaveLength(2);


})