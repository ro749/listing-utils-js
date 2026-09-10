import React, { useState } from "react";
import IconamoonLink from '~icons/iconamoon/link';
import IconamoonEmail from '~icons/iconamoon/email';
import IcOutlineWhatsapp from '~icons/ic/outline-whatsapp';
import {Dialog} from "shared-utils";
import axios from 'axios';
const Sender = ({client, unit, form}) => {
    const [showDialog, setShowDialog] = useState(0);
    const [dialogMessage, setDialogMessage] = useState('');
    function handleLinkClick() {
        setShowDialog(3);
    }
    function handleEmailClick() {
        setShowDialog(2);
    }
    function handleWhatsappClick() {
        setShowDialog(1);
    }

    function handleSend(sendMethod){
        console.log(axios.defaults.headers.common['X-CSRF-TOKEN']);
        const formData = new FormData();
        formData.append('medium', sendMethod);
        formData.append('unit_id', unit.id);
        if(form && form.state.isDirty){
            var values = form.state.values;
            Object.entries(values).forEach(([key, value]) => {
                formData.append("personal_plans['" + key + "']", value);
            });
        }
        axios.post('sender', formData);
    }
    return (
        <>
        <div style={{ display: "flex", justifyContent: "center", gap: "6px" }}>
            {client.email !== undefined && (
                <button className="btn btn-light send-btn" onClick={handleEmailClick}>
                    <IconamoonEmail />
                    <span>Correo</span>
                </button>
            )}
            {client.phone !== undefined && (
                <button className="btn btn-light send-btn" onClick={handleWhatsappClick}>
                    <IcOutlineWhatsapp />
                    <span>Whatsapp</span>
                </button>
            )}
            <button className="btn btn-light send-btn" onClick={handleLinkClick}>
                <IconamoonLink />
                <span>Link</span>
            </button>
        </div>
        <Dialog
            isOpen={showDialog === 1}
            onClose={() => setShowDialog(0)}
            actions={[
              { 
                label: 'Enviar', 
                onClick: () => handleSend(1),
                className: 'btn-success-600'
              }
            ]}
        >
            <h4 className="sender-title">Quieres el link para:</h4>
            <p>{client.name}</p>
        </Dialog>
        <Dialog
            isOpen={showDialog === 2}
            onClose={() => setShowDialog(0)}
            actions={[
              { 
                label: 'Enviar', 
                onClick: () => handleSend(2),
                className: 'btn-success-600'
              }
            ]}
        >
            <h4 className="sender-title">Quieres enviar correo a:</h4>
            <p>{client.name}</p>
            <p>{client.email}</p>
        </Dialog>
        <Dialog
            isOpen={showDialog == 3}
            onClose={() => setShowDialog(0)}
            actions={[
              { 
                label: 'Enviar', 
                onClick: () => handleSend(3),
                className: 'btn-success-600'
              }
            ]}
        >
            <h4 className="sender-title">Quieres enviar whatsapp a:</h4>
            <p>{client.name}</p>
            <p>{client.phone}</p>
        </Dialog>
        
        </>
    );
}

export default Sender;