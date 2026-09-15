import React, { useState } from "react";
import IconamoonLink from '~icons/iconamoon/link';
import IconamoonEmail from '~icons/iconamoon/email';
import IcOutlineWhatsapp from '~icons/ic/outline-whatsapp';
import {Dialog} from "shared-utils";
import axios from 'axios';
const Sender = ({client, unit, form}) => {
    const [showDialog, setShowDialog] = useState(0);
    const [sentDialogTitle, setSentDialogTitle] = useState('');
    const [sentDialogMessage, setSentDialogMessage] = useState('');
    const [link, setLink] = useState('');
    const [linkWhatsapp, setLinkWhatsapp] = useState('');
    function handleLinkClick() {
        setShowDialog(1);
    }
    function handleEmailClick() {
        setShowDialog(2);
    }
    function handleWhatsappClick() {
        setShowDialog(3);
    }

    function handleSend(sendMethod){
        const formData = new FormData();
        formData.append('medium', sendMethod);
        formData.append('unit_id', unit.id);
        if(form && form.state.isDirty){
            var values = form.state.values;
            Object.entries(values).forEach(([key, value]) => {
                formData.append("personal_plans['" + key + "']", value);
            });
        }
        axios.post('sender', formData).then(response => {
            setShowDialog(0);
            if(sendMethod === 0){
                const isSafari = /^((?!chrome|android|crios).)*safari/i.test(navigator.userAgent);
                if(isSafari){
                    navigator.clipboard.writeText(response.data);
                    setSentDialogTitle('Copie el enlace y abra WhatsApp para enviar cotización.');
                }
                else{
                    window.open('https://wa.me/52'+client.phone+'?text='+response.data, '_blank');
                    setSentDialogTitle('Whatsapp Enviado');
                    setLink('Si la cotización no se envió favor de revisar los permisos del navegador.');
                }
            }
            if(sendMethod === 1){
                setSentDialogTitle('Email Enviado a:');
                setLink(client.mail);
            }
            if(sendMethod === 2){
                navigator.clipboard.writeText(response.data);
                setSentDialogTitle('Link copiado para:');
                setSentDialogMessage(client.name);
                setLink(response.data);
            }
        });
    }
    return (
        <>
        <div style={{ display: "flex", justifyContent: "center", gap: "6px" }}>
            {client.mail !== undefined && (
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
                onClick: () => handleSend(2),
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
                onClick: () => handleSend(1),
                className: 'btn-success-600'
              }
            ]}
        >
            <h4 className="sender-title">Quieres enviar correo a:</h4>
            <p>{client.name}</p>
            <p>{client.mail}</p>
        </Dialog>
        <Dialog
            isOpen={showDialog == 3}
            onClose={() => setShowDialog(0)}
            actions={[
              { 
                label: 'Enviar', 
                onClick: () => handleSend(0),
                className: 'btn-success-600'
              }
            ]}
        >
            <h4 className="sender-title">Quieres enviar whatsapp a:</h4>
            <p>{client.name}</p>
            <p>{client.phone}</p>
        </Dialog>
        <Dialog
            isOpen={link != '' || sentDialogTitle != '' || sentDialogMessage != ''}
            onClose={() => {setLink(''); setSentDialogTitle(''); setSentDialogMessage('');}}
        >
            {sentDialogTitle != '' && <h4 className="sender-title">{sentDialogTitle}</h4>}
            {sentDialogMessage != '' && <h4 className="sender-title">{sentDialogMessage}</h4>}
            {link != '' && <p>{link}</p>}
        </Dialog>
        <Dialog
            isOpen={linkWhatsapp != '' }
            onClose={() => setLinkWhatsapp('')}
            actions={[
              { 
                label: 'Enviar', 
                onClick: () => handleSend(1),
                className: 'btn-success-600'
              }
            ]}
        >
            <h4 className="sender-title">Copie el enlace y abra WhatsApp para enviar cotización.</h4>
            <p>{linkWhatsapp}</p>
        </Dialog>
        </>
    );
}

export default Sender;