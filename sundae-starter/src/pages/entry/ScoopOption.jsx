import {Col} from "react-bootstrap";

export function ScoopOption({name, imagePath}) {
    return (
        <Col xs={12} sm={6} md={4} lg={3} style={{textAlign: 'center'}} >
            <img style={{width: "75%"}} className="image" src={`http://localhost:3030/${imagePath}`} alt={`${name} scoop`}/>
        </Col>
    );
}