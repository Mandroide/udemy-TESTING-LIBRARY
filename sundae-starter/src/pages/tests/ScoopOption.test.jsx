import {render, screen} from "../../test-utils/testing-library-utils.jsx";
import {ScoopOption} from "../entry/ScoopOption.jsx";
import userEvent from "@testing-library/user-event";

test("input turns red for invalid scoop count", async function() {
    render(<ScoopOption name="Test" imagePath="image_test" />);
    const user = userEvent.setup();

    const testInput = screen.getByRole("spinbutton", {name: "Test"});

    await user.clear(testInput);
    await user.type(testInput, "-1");
    expect(testInput).toHaveClass("is-invalid");

    await user.clear(testInput);
    await user.type(testInput, "1.5");
    expect(testInput).toHaveClass("is-invalid");

    await user.clear(testInput);
    await user.type(testInput, "11");
    expect(testInput).toHaveClass("is-invalid");

    await user.clear(testInput);
    await user.type(testInput, "2");
    expect(testInput).not.toHaveClass("is-invalid");
})