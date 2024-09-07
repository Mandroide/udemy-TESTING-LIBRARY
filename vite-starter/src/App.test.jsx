import {logRoles, render, screen, fireEvent} from "@testing-library/react";
import App from "./App";

test("button click flow", () => {
    // render App
    render(<App/>);
    // logRoles(container)
    // find the button
    const buttonElement = screen.getByRole("button", {name: /blue/i});

    // check initial color
    expect(buttonElement).toHaveClass("red")

    // click the button
    fireEvent.click(buttonElement);

    // check button text
    expect(buttonElement).toHaveTextContent(/red/i)


    // check the button color
    expect(buttonElement).toHaveClass("blue")
    expect(buttonElement).toHaveStyle({"background-color": "rgb(0,0,255)"})
});

// The difference between these tests is the order of event for checkBox and button
test("checkbox flow", () => {
    render(<App/>);
    // find elements
    const buttonElement = screen.getByRole("button", {name: /blue/i});
    const checkboxElement = screen.getByRole("checkbox", {name: /disable button/i});

    // check initial condition
    expect(buttonElement).toBeEnabled();
    expect(checkboxElement).not.toBeChecked();
    expect(buttonElement).not.toHaveClass("gray")

    // click checkbox to disable button
    fireEvent.click(checkboxElement);
    expect(checkboxElement).toBeChecked();
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveClass("gray")

    // Click checkbox again to re-enable button
    fireEvent.click(checkboxElement);
    expect(checkboxElement).not.toBeChecked();
    expect(buttonElement).toBeEnabled();
    expect(buttonElement).toHaveClass("red")

})

test("checkbox flow after button is clicked", () => {
    render(<App/>);
    // find elements
    const buttonElement = screen.getByRole("button", {name: /blue/i});
    const checkboxElement = screen.getByRole("checkbox", {name: /disable button/i});

    // check initial condition
    expect(buttonElement).toBeEnabled();
    expect(checkboxElement).not.toBeChecked();
    expect(buttonElement).not.toHaveClass("gray")

    // click button to check to blue
    fireEvent.click(buttonElement)
    expect(buttonElement).toHaveClass("blue")
    expect(buttonElement).toBeEnabled();

    // click checkbox to disable button
    fireEvent.click(checkboxElement);
    expect(checkboxElement).toBeChecked();
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveClass("gray")

    // click checkbox again to re-enable button
    fireEvent.click(checkboxElement);
    expect(checkboxElement).not.toBeChecked();
    expect(buttonElement).toBeEnabled();
    expect(buttonElement).toHaveClass("blue")

})

// --------------------------------------------------------------------------------------------------------------------
