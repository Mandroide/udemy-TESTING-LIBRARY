import {Col, Form, Row} from "react-bootstrap";
import {useOrderDetails} from "../../contexts/OrderDetails.jsx";
import PropTypes from "prop-types";
import {useState} from "react";

export function ScoopOption({name, imagePath}) {
    const { updateItemCount } = useOrderDetails();
    const [invalidColor, setInvalidColor] = useState(false);
    const handleChange = (e) => {
        const value = e.target.value;
        // Check if can be converted to number
        if (value % 1 === 0 && value >= 0 && value <= 10) {
            // disable red color
            updateItemCount(name, parseInt(value), "scoops");
            setInvalidColor(false);
        } else {
            setInvalidColor(true);
        }
    }


    return (
        <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
            <img
                style={{ width: "75%" }}
                src={`http://localhost:3030/${imagePath}`}
                alt={`${name} scoop`}
            />
            <Form.Group
                controlId={`${name.toLowerCase()}-count`}
                as={Row}
                style={{ marginTop: "10px" }}
            >
                <Form.Label column xs="6" style={{ textAlign: "right" }}>
                    {name}
                </Form.Label>
                <Col xs="5" style={{ textAlign: "left" }}>
                    <Form.Control
                        isInvalid={invalidColor}
                        type="number"
                        defaultValue={0}
                        onChange={handleChange}
                    />
                </Col>
            </Form.Group>
        </Col>
    );
}

ScoopOption.propTypes = {
    name: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
};