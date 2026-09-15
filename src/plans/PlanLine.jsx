import React from "react";

const PlanLine = ({item, price=0, value='', percent}) => {
    return (
        <tr className="plan-line">
            <td className="right">{item.text}:</td>
            <td className="center">{typeof percent === 'number' ? percent+'%' : (item.percent!=0 ? item.percent+'%' : '')}</td>
            <td className="left">{price != 0 ? new Intl.NumberFormat('es-MX', {
                style: 'currency',
                currency: 'MXN',
            }).format(price) : value}</td>
        </tr>
    );
}

export default PlanLine;