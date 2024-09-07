import "./App.css"
import React from "react";
import {kebabCaseToTitleCase} from "./helpers.js";

function App() {
    const [buttonColor, setButtonColor] = React.useState("medium-violet-red")
    const nextColorClass = buttonColor === "medium-violet-red" ? "midnight-blue" : "medium-violet-red"
    const [disabled, setDisabled] = React.useState(false)
    const className = disabled ? "gray" : buttonColor


    return (
        <div>
            <button disabled={disabled} className={className} onClick={() => setButtonColor(nextColorClass)}>Change
                to {kebabCaseToTitleCase(nextColorClass)}</button>
            <br/>
            <input onChange={e => setDisabled(e.target.checked)} type="checkbox" id="disable-button-checkbox"
                   defaultChecked={disabled}/>
            <label htmlFor="disable-button-checkbox">Disable button</label>
        </div>
    );
}

export default App;
