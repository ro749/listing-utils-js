import React from "react";
import PlanLine from "./PlanLine.jsx";
const FillWithRestLine = ({item, price=0, values, fields, getPrice}) => {
    console.log('FillWithRestLine');
    var newFinalPrice = 0;
    var percent = 0;
    for (let i = 0; i < fields.length; i++) {
        newFinalPrice += parseFloat(values[fields[i]]);
    }
    newFinalPrice = price-newFinalPrice;
    getPrice(newFinalPrice);
    percent = newFinalPrice/price*100;
    return (
        <PlanLine item={item} percent={percent} price={newFinalPrice}  />
    );
}

export default FillWithRestLine;