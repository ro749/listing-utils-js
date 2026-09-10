import React, {useState} from "react";
import EditableLine from "./EditableLine.jsx";
import { Input, MoneyInput } from "shared-utils";

const EditableMonths = ({form, item, price}) => {
    const [mensuality, setMensuality] = useState(0);
    function handleValueChange(value) {
        setMensuality(value / form.getFieldValue('fill_months_' + item.line.id));
    }

    function handleMonthsChange(value) {
        setMensuality(form.getFieldValue('fill_' + item.line.id) / value);
    }
    return (
        <>
            <EditableLine form={form} item={item.line} price={price} onChange={handleValueChange} />
            <tr className="plan-line">
                <td className="right">{item.months_line.text}:</td>
                <td className="center"></td>
                <td className="left">
                    <form.Field
                        name={'fill_months_' + item.line.id}
                        children={(field) =>{ 
                            return(
                            <Input 
                                field={field} 
                                value={field.state.value}
                                onChange={handleMonthsChange}
                                type="number"
                            />
                        )}}
                    />
                </td>
            </tr>
            <tr className="plan-line">
                <td className="right">{item.mensuality_line.text}:</td>
                <td className="center"></td>
                <td className="left">
                    <MoneyInput 
                        value={mensuality}
                    />
                </td>
            </tr>
        </>
    );
}

export default EditableMonths;