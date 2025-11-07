import React from 'react';
import './ModalContainer.css';

const ModalContainer = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  const containerClass = title === 'Settings' ? 'modal-container settings-modal' : 'modal-container';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={containerClass} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalContainer; 
