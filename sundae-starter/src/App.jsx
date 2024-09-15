import {Container} from "react-bootstrap";
import {OrderEntry} from "./pages/entry/OrderEntry";
import {OrderDetailsProvider} from "./contexts/OrderDetails";
import React from "react";
import {OrderSummary} from "./pages/summary/OrderSummary.jsx";
import {OrderConfirmation} from "./pages/confirmation/OrderConfirmation.jsx";

function App() {
    const [orderPhase, setOrderPhase] = React.useState("inProgress");
    let Component = OrderEntry;

    switch (orderPhase) {
        case "inProgress":
            Component = OrderEntry;
            break;
        case "review":
            Component = OrderSummary;
            break;
        case "completed":
            Component = OrderConfirmation;
            break;
        default:
    }

    return (
        <Container>
            <OrderDetailsProvider>
                {<Component setOrderPhase={setOrderPhase}/>}
            </OrderDetailsProvider>
        </Container>
    );
}

export default App;
