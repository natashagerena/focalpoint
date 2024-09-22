import React from 'react';

interface ConfirmRemoveModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirmRemove: () => void;
}
const ConfirmRemoveModal: React.FC<ConfirmRemoveModalProps> = ({ isOpen, onClose, onConfirmRemove }) => {
  if (!isOpen) return null;

  return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="titulo">Deletar tarefa</h2>
                <p>Tem certeza que você deseja deletar essa tarefa?</p>
                <button onClick={onClose} className="cancelar">Cancelar</button>
                <button onClick={onConfirmRemove} className="deletar">Deletar</button>
            </div>
        </div>
    );
};

export default ConfirmRemoveModal;
