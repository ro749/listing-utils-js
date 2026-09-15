import React from "react";
import PlanLine from "./PlanLine.jsx";
const FinalLine = ({item, price=0, value='', plan, form}) => {
    var total_price = 0;
    plan.lines.forEach((item) => {
        if (item.type === 'fillable') {
            total_price += item.percent * price / 100;
        }
    })
    return (
        <PlanLine item={item} price={price} value={value} />
    );
}

export default FinalLine;