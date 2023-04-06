import React, { useRef, useEffect } from 'react';
import './Modal.css'

const Modal = ({ isOpen, onClose, children, title }) => {
    const modalRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) onClose();
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [modalRef, onClose]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal" ref={modalRef}>
                <div className="modalHeading">{title}</div>
                <button className="closeModal" onClick={onClose}>x</button>
                <div className="modalContent">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
