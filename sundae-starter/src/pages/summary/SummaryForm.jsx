import React from "react";
import {Button, Form, OverlayTrigger, Popover} from "react-bootstrap";

export const SummaryForm = () => {
    const [tcChecked, setTcChecked] = React.useState(false);

    const popover = (
        <Popover id="popover-basic">
            <Popover.Body>No ice cream will actually be delivered</Popover.Body>
        </Popover>
    );

    const checkboxLabel = (
        <span>
            I agree to
            <OverlayTrigger placement="right" overlay={popover}>
                <span style={{color: "blue"}}> Terms and Conditions</span>
            </OverlayTrigger>
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