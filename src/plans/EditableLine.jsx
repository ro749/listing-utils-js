import React, { useState, useRef, useEffect } from "react";
import { PercentInput } from "shared-utils";
import { MoneyInput } from "shared-utils";
const EditableLine = ({ref, form, item, price=0, onChange}) => {
    const [percent, setPercent] = useState(0);
    const editedValue = useRef(true);
    useEffect(() => {
        if(editedValue.current){
            const newPercent = form.getFieldValue('fill_' + item.id) / price * 100;
            setPercent(newPercent);
        }
        else{
            const newMoney = price * percent / 100;
            form.setFieldValue('fill_' + item.id, newMoney);
        }
    }, [price]);

    function onChangePercent(val) {
        editedValue.current = false;
        setPercent(val);
        const moneyValue = price * val / 100;
        
        form.setFieldValue('fill_' + item.id, moneyValue);
        if(onChange){
            onChange(moneyValue);
        }
    }
    function onChangeMoney(val) {
        editedValue.current = true;
        setPercent(val / price * 100);
        if(onChange){
            onChange(val);
        }
        
    }
    return (
        <tr className="plan-line">
            <td className="right">{item.text}:</td>
            <td className="center">
                <PercentInput form={form} name={item.name} value={percent} onChange={onChangePercent} />
            </td>
            <td className="left">
                <form.Field
                    name={'fill_' + item.id}
                    children={(field) =>{ 
                        return(
                        <MoneyInput 
                            id={'fill_' + item.id}
                            field={field} 
                            value={field.state.value}
                            onChange={onChangeMoney} 
                        />
                    )}}
                />
            </td>
        </tr>
    );
}

export default EditableLine;