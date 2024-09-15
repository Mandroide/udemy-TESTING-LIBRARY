import React from "react";
import {Button, Form, OverlayTrigger, Popover} from "react-bootstrap";
import PropTypes from "prop-types";

export const SummaryForm = ({setOrderPhase}) => {
    const [tcChecked, setTcChecked] = React.useState(false);

    function handleSubmit(event) {
        event.preventDefault();

        // pass along to the next phase.
        // The next page will handle submitting order from context.
        setOrderPhase("completed");
    }

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
        <Form onSubmit={handleSubmit}>
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

SummaryForm.propTypes = {
    setOrderPhase: PropTypes.func.isRequired,
};