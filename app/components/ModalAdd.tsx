import { useState, useEffect, useRef } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddTask: (task: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onAddTask }) => {
    const [task, setTask] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    // Focar no input quando o modal for aberto
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Adiciona a tarefa e fecha o modal
    const handleAddTask = () => {
        if (task.trim()) {
            onAddTask(task);
            setTask('');
            onClose();
        }
    };

    // Captura a tecla "Enter" e adiciona a tarefa
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleAddTask();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="titulo">Nova tarefa</h2>
                <form action="">
                    <label htmlFor="tarefa">Título</label>
                    <input type="text"
                        value={task}
                        ref={inputRef}
                        onChange={(e) => setTask(e.target.value)}
                        onKeyPress={handleKeyPress} 
                        placeholder="Digite" />
                    <button onClick={onClose} className="cancelar">Cancelar</button>
                    <button onClick={handleAddTask}>Adicionar</button>
                </form>
            </div>
        </div>
    );
};

export default Modal;