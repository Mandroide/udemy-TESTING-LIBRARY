import PropTypes from "prop-types";
import {useOrderDetails} from "../../contexts/OrderDetails.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {AlertBanner} from "../common/AlertBanner.jsx";
import {Button} from "react-bootstrap";

export const OrderConfirmation = ({setOrderPhase}) => {
    const {resetOrder} = useOrderDetails();
    const [orderNumber, setOrderNumber] = useState(null);
    const [error, setError] = useState(false);

    function handleClick() {
        resetOrder();
        setOrderPhase("inProgress");
    }

    useEffect(() => {
        axios.post(`http://localhost:3030/order`)
            .then((response) => {
                setOrderNumber(response.data.orderNumber);
            }).catch((error) => {
            setError(true);
        })
    }, []);

    if (orderNumber) {
        return (
            <div className="order-confirmation">
                <div className="order-confirmation-header">
                    <h2>Thank you!</h2>
                </div>
                <div className="order-confirmation-body">
                    <p>Your order number is {orderNumber}</p>
                </div>
                <div className="order-confirmation-body">
                    <p>as per our terms and conditions, nothing will happen now</p>
                </div>
                <Button className="order-confirmation-button" onClick={handleClick}>
                    Create new order
                </Button>
            </div>
        )
    } else {
        return <div>Loading</div>
    }

    // if (error) {
    //     // @ts-ignore
    //     return <AlertBanner/>;
    // }


}

OrderConfirmation.propTypes = {
    setOrderPhase: PropTypes.func.isRequired,
};