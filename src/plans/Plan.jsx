import React, { useState } from "react";
import PlanLine from "./PlanLine.jsx";
import MonthsLine from "./MonthsLine.jsx";
import EditableLine from "./EditableLine.jsx";
import EditableMonths from "./EditableMonths.jsx";
import { useSelector } from '@tanstack/react-form';
import Sender from "../sender/Sender.jsx";
const PlanGrid = ({ plan, price, form, client }) => {
    var initPrice = price;
    plan.top_lines.forEach((item) => {
        if (item.type === 'discount') {
            initPrice = price - price*item.percent/100;
        }
    })
    const [realPrice, setRealPrice] = useState(initPrice);
    function discountChanged(newDiscount) {
        setRealPrice(price - newDiscount);
    }
    return (  
        <>
        <div className="plan-div">
            <h3 className="plan-title">{plan.title}</h3>
            <table className="table">
                <tbody>
                    {plan.top_lines.map((item, itemIndex) => 
                        {
                            switch (item.type) {
                                case 'line':
                                    return <PlanLine key={itemIndex} item={item} price={price}/>;
                                case 'discount':
                                    return <PlanLine key={itemIndex} item={item} price={price*item.percent/100} />;
                                default:
                                    return null;
                            }
                        }
                    )}
                    {plan.lines.map((item, itemIndex) => 
                        {
                            switch (item.type) {
                                case 'fillable':
                                    return <PlanLine key={itemIndex} item={item} price={realPrice*item.percent/100} />;
                                case 'months':
                                    return <MonthsLine key={itemIndex} item={item} price={realPrice} />;
                                case 'personalized-discount':
                                    return <EditableLine key={itemIndex} form={form} item={item} price={price} onChange={discountChanged}/>;
                                case 'personalized-fillable':
                                    return <EditableLine key={itemIndex} form={form} item={item} price={realPrice} />;
                                case 'personalized-months':
                                    return <EditableMonths key={itemIndex} form={form} item={item} price={realPrice} />;
                                default:
                                    return null;
                            }
                        }
                    )}
                    {plan.bottom_lines.map((item, itemIndex) => 
                        {
                            switch (item.type) {
                                case 'line':
                                    return <PlanLine key={itemIndex} item={item} price={realPrice} />;
                                default:
                                    return null;
                            }
                        }
                    )}
                </tbody>
            </table>
        </div>
        {client !== undefined && (
            <Sender client={client}/>
        )}
        
        </>
    );
};

export default PlanGrid;