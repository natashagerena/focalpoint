'use client';

import Image from "next/image";
import { useState, useEffect } from 'react';
import ModalAdd from './components/ModalAdd';
import ModalRemove from './components/ModalRemove';


interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenRemove, setIsModalOpenRemove] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  // Obter a data atual
  const today = new Date();

  // Formatar a data (opcional, aqui no formato dia/mês/ano)
  const formattedDate = today.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });


  // Carregar as tarefas do localStorage
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Atualizar o localStorage quando as tarefas mudarem
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (task: string) => {
    const newTask: Task = { id: Date.now(), text: task, completed: false };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleDeleteTask = () => {
    if (taskToDelete !== null) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskToDelete));
      setTaskToDelete(null);
      setIsModalOpenRemove(false);
    }
  };

  const handleToggleComplete = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const openRemoveModal = (taskId: number) => {
    setTaskToDelete(taskId);
    setIsModalOpenRemove(true);
  };

  return (
    <>
      <header>
        <Image
          className="logo"
          src="/images/logo.png"
          alt="Next.js logo"
          width={150}
          height={36}
          priority
        />
        <h1 className="tituloPrincipal">Bem-vindo de Volta, Visitante</h1>
        <span className="data">{formattedDate}</span>
      </header>

      <main>
        <div className="card">
          <h6 className="top">
          {tasks.length === 0 ? (
            <>Adicione suas tarefas para começar!</>
          ) : (
            <>Suas tarefas de hoje</>
          )}
          </h6>
          <ul className="itensAtivos">
            {tasks
              .filter((task) => !task.completed)
              .map((task) => (
                <li key={task.id}>
                  <span className="check" onClick={() => handleToggleComplete(task.id)}></span>
                  <span className="remove" onClick={() => openRemoveModal(task.id)}></span>
                  <span className="texto">{task.text}</span>
                </li>
              ))}
          </ul>

          {tasks.filter((task) => task.completed).length > 0 && (
          <>
            <h6 className="top">Tarefas finalizadas</h6>
            <ul className="itensFinalizados">
              {tasks
                .filter((task) => task.completed)
                .map((task) => (
                  <li className="checked" key={task.id}>
                    <span className="check" onClick={() => handleToggleComplete(task.id)}></span>
                    <span className="remove" onClick={() => openRemoveModal(task.id)}></span>
                    <span className="texto">{task.text}</span>
                  </li>
                ))}
            </ul>
          </>
          )}
        </div>
        <button className="addTarefa" onClick={() => setIsModalOpen(true)}>Adicionar Tarefa</button>
      </main>

      {/* Modais */}
      <ModalAdd
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={handleAddTask}
      />

      <ModalRemove
        isOpen={isModalOpenRemove}
        onClose={() => setIsModalOpenRemove(false)}
        onConfirmRemove={handleDeleteTask}
      />
    </>
  );
}
