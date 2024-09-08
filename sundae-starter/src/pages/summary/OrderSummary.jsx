import {SummaryForm} from "./SummaryForm.jsx";
import {useOrderDetails} from "../../contexts/OrderDetails.jsx";
import {formatCurrency} from "../../utilities/index.js";

export const OrderSummary = (props) => {

    const {totals, optionCounts} = useOrderDetails()
    const scoopArray = Object.entries(optionCounts.scoops) // [["chocolate", 2], ["vanilla", 1]]
    const scoopList = scoopArray.map(([key, value]) => (
        <li key={key}>
            {value} {key}
        </li>
    ));

    const toppingsArray = Object.keys(optionCounts.toppings) // ["A", "B"]
    const toppingList = toppingsArray.map(key => <li key={key}>{key}</li>);

    return (
        <div>
            <h1>OrderSummary</h1>
            <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
            <ul>{scoopList}</ul>
            <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
            <ul>{toppingList}</ul>
            <SummaryForm/>
        </div>
    );
}