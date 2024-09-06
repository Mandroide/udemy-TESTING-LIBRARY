import "./App.css"
import React from "react";
function App() {
    const [buttonColor, setButtonColor] = React.useState("red")
    const nextColor = buttonColor === "red" ? "blue" : "red"
    const [disabled, setDisabled] = React.useState(false)


    return (
        <div>
            <button disabled={disabled} className={buttonColor} onClick={() => setButtonColor(nextColor)}>Change to {nextColor}</button>
            <br/>
            <input onChange={e => setDisabled(e.target.checked)} type="checkbox" id="disable-button-checkbox" defaultChecked={disabled}/>
            <label htmlFor="disable-button-checkbox">Disable button</label>
        </div>
    );
}

export default App;
