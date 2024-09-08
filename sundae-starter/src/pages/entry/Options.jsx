import React, {useEffect} from "react";
import axios from "axios";
import {ScoopOption} from "./ScoopOption.jsx";
import {Row} from "react-bootstrap";
import {ToppingOption} from "./ToppingOption.jsx";
import {AlertBanner} from "../common/AlertBanner.jsx";

export function Options({optionType}) {
    const [items, setItems] = React.useState([]);
    const [error, setError] = React.useState(false);
    useEffect(() => {
        axios.get(`http://localhost:3030/${optionType}`)
            .then((response) => setItems(response.data))
            .catch(() => setError(true));
    }, [optionType]);

    if (error) return <AlertBanner/>;

    const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;

    const optionItems = items.map((item) => (
        <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath}/>
    ));

    return <Row>{optionItems}</Row>
}