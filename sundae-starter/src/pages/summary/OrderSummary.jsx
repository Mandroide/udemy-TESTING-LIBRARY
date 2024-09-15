import {SummaryForm} from "./SummaryForm.jsx";
import {useOrderDetails} from "../../contexts/OrderDetails.jsx";
import {formatCurrency} from "../../utilities/index.js";
import PropTypes from "prop-types";

export const OrderSummary = ({setOrderPhase}) => {

    const {totals, optionCounts} = useOrderDetails()
    const scoopArray = Object.entries(optionCounts.scoops) // [["chocolate", 2], ["vanilla", 1]]
    const scoopList = scoopArray.map(([key, value]) => (
        <li key={key}>
            {value} {key}
        </li>
    ));

    // only display toppings if the toppings total is nonzero
    const hasToppings = totals.toppings > 0;
    let toppingsDisplay = null;

    if (hasToppings) {
        const toppingsArray = Object.keys(optionCounts.toppings) // ["A", "B"]
        const toppingList = toppingsArray.map(key => <li key={key}>{key}</li>);
        toppingsDisplay = (
            <>
                <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
                <ul>{toppingList}</ul>
            </>
        )
    }


    return (
        <div>
            <h1>Order Summary</h1>
            <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
            <ul>{scoopList}</ul>
            {toppingsDisplay}
            <SummaryForm setOrderPhase={setOrderPhase}/>
        </div>
    );
}

OrderSummary.propTypes = {
    setOrderPhase: PropTypes.func.isRequired,
};