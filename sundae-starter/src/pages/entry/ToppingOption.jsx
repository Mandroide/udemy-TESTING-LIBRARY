import {Col, Form, Row} from "react-bootstrap";
import {useOrderDetails} from "../../contexts/OrderDetails.jsx";

export function ToppingOption({name, imagePath}) {
    const {updateItemCount} = useOrderDetails();
    const handleChange = (e) =>
        updateItemCount(name, e.target.checked ? 1 : 0, "toppings");

    return (
        <Col xs={6} sm={4} md={3} lg={2} style={{textAlign: 'center'}}>
            <img style={{width: "75%"}} className="image" src={`http://localhost:3030/${imagePath}`}
                 alt={`${name} topping`}/>
            <Form.Group controlId={`${name}-topping-checkbox`}>
                <Form.Check type="checkbox" onChange={handleChange} label={name}></Form.Check>
            </Form.Group>
        </Col>
    );
}