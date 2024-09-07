import React from "react";
import {Button, Form} from "react-bootstrap";

export const SummaryForm = () => {
    const [tcChecked, setTcChecked] = React.useState(false);
    const checkboxLabel = (
        <span>
            I agree to <span style={{color: "blue"}}>Terms and Conditions</span>
        </span>
    )
    return (
        <Form>
            <Form.Group controlId="terms-and-conditions">
                <Form.Check type="checkbox" checked={tcChecked} onChange={event => setTcChecked(event.target.checked)}
                            label={checkboxLabel}/>

            </Form.Group>
            <Button variant="primary" type="submit" disabled={!tcChecked}>
                Confirm order
            </Button>
        </Form>

    );
}