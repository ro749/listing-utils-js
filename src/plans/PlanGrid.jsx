import React from "react";
import Plan from "./Plan.jsx";
import { useRecordForm } from "shared-utils";
import Sender from "../sender/Sender.jsx";
const PlanGrid = ({config, client, unit}) => {
    const reset = () => { 
      inputRefs.current.forEach(input => input.reset?.());
    };
    const { form, showSuccessDialog, setShowSuccessDialog } = useRecordForm(config.form, undefined, reset); 
    
    return (
        <>
        {config.plans.map((planRow, rowIndex) => (
            <div key={rowIndex} className="plan-row" style={{ display: "flex", flexDirection: "row", marginBottom: "10px" }}>
                {planRow.map((plan, colIndex) =>(
                    <Plan key={colIndex} plan={plan} price={unit.price} form={form} />
                )
                )}
            </div>
        ))}
        {client && (
            <Sender client={client} unit={unit} form={form}/>
        )}
        </>
    );
}

export default PlanGrid;