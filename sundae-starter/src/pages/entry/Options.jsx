import React, {useEffect} from "react";
import axios from "axios";
import {ScoopOption} from "./ScoopOption.jsx";
import {Row} from "react-bootstrap";

export function Options({optionType}) {
    const [items, setItems] = React.useState([]);
    useEffect(() => {
        axios.get(`http://localhost:3030/${optionType}`)
            .then((response) => setItems(response.data))
            .catch((error) => console.log(error));
    }, [optionType]);

    // TODO: replace `null` with ToppingOption when available
    const ItemComponent = optionType === "scoops" ? ScoopOption : null;

    const optionItems = items.map((item) => (
        <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath}/>
    ));

    return <Row>{optionItems}</Row>
}