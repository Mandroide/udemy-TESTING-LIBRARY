import {Options} from "./Options.jsx";
import {formatCurrency} from "../../utilities/index.js";
import {useOrderDetails} from "../../contexts/OrderDetails.jsx";
import PropTypes from 'prop-types';
import {Button} from "react-bootstrap";

export function OrderEntry({setOrderPhase}) {
    const {totals} = useOrderDetails();

    // disable order button if there aren't any scoops in order
    const orderDisabled = totals.scoops === 0;

    return (
        <div>
            <h1>Design Your Sundae!</h1>
            <Options optionType="scoops"/>
            <Options optionType="toppings"/>
            <h2>Grand total: {formatCurrency(totals["toppings"] + totals["scoops"])}</h2>
            <Button disabled={orderDisabled} type="button" onClick={() => setOrderPhase("review")}>Order Sundae!</Button>
        </div>
    )
}

OrderEntry.propTypes = {
    setOrderPhase: PropTypes.func.isRequired,
};