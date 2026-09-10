import React from "react";
import PlanLine from "./PlanLine.jsx";

const MonthsLine = ({item, price}) => {
    return (
        <>
            <PlanLine item={item.line} price={price*item.line.percent/100} />
            <PlanLine item={item.months_line} value={item.months_line.amount} />
            <PlanLine item={item.mensuality_line} price={price*item.line.percent/100/item.months_line.amount} />
        </>
    );
}

export default MonthsLine;