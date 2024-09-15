import {OrderConfirmation} from "../confirmation/OrderConfirmation.jsx";
import {server} from "../../mocks/server.js";
import {http, HttpResponse} from "msw";
import {render, screen} from "../../test-utils/testing-library-utils";

test("show alert for error when submitting order", async () => {
    server.resetHandlers(
        http.post("http://localhost:3030/order", () => new HttpResponse(null, {status: 500})))
    render(<OrderConfirmation setOrderPhase={vi.fn}/>);
    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("An unexpected error ocurred. Please try again later.");
})