import React, { useState, useEffect } from "react";
import PlanLine from "./PlanLine.jsx";
import MonthsLine from "./MonthsLine.jsx";
import EditableLine from "./EditableLine.jsx";
import EditableMonths from "./EditableMonths.jsx";
import { useSelector } from '@tanstack/react-form';
import FillWithRestLine from "./FillWithRestLine.jsx";
import Sender from "../sender/Sender.jsx";
const PlanGrid = ({ plan, price, form, client, personalLines, debug }) => {
    var initPrice = price;
    var intiFinalPrice = 0;
    var values = null;
    var fields = [];
    if(plan.is_personalized){
        values = useSelector(form.store, (state) => state.values);
    }
    var newFinalPriceBase = 0;
    function setNewFinalPrice(newFinalPrice) {
        newFinalPriceBase += newFinalPrice;
    }

    useEffect(() => {
        var newFinalPrice = newFinalPriceBase;
        for (let i = 0; i < fields.length; i++) {
            newFinalPrice += parseFloat(values[fields[i]]);
        }
        setFinalPrice(newFinalPrice);
    }, [values]);
    plan.top_lines.forEach((item) => {
        if (item.type === 'discount') {
            initPrice = price - price*item.percent/100;
            intiFinalPrice = price - price*item.percent/100;
        }
    });
    plan.lines.forEach((item) => {
        if(plan.is_personalized ){
            if(item.type === 'personalized-fillable'){
                fields.push('fill_'+item.id);
            }
            else if(item.type === 'personalized-months'){
                fields.push('fill_'+item.line.id);
            }
            
        }
    })
    const [realPrice, setRealPrice] = useState(initPrice);
    const [finalPrice, setFinalPrice] = useState(intiFinalPrice);
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
                                    return <MonthsLine key={itemIndex} item={item} price={realPrice*item.line.percent/100} />;
                                case 'personalized-discount':
                                    return <EditableLine key={itemIndex} form={form} item={item} price={price} onChange={discountChanged}/>;
                                case 'personalized-fillable':
                                    return <EditableLine key={itemIndex} form={form} item={item} price={realPrice} />;
                                case 'personalized-months':
                                    return <EditableMonths key={itemIndex} form={form} item={item} price={realPrice}/>;
                                case 'fill-with-rest':
                                    return <FillWithRestLine key={itemIndex} form={form} item={item} price={realPrice} values={values} fields={fields} getPrice={setNewFinalPrice} />;
                                default:
                                    const Component = personalLines[item.type];
                                    return Component ? 
                                    <Component 
                                        key={itemIndex} 
                                        form={form} 
                                        item={item} 
                                        price={realPrice} 
                                        values={values} 
                                        fields={fields} 
                                        getPrice={setNewFinalPrice}
                                    />
                                     : null;
                            }
                        }
                    )}
                    {plan.bottom_lines.map((item, itemIndex) => 
                        {
                            switch (item.type) {
                                case 'line':
                                    return <PlanLine key={itemIndex} item={item} price={finalPrice} newPrice={finalPrice} />;
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