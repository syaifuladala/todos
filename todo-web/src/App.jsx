import './App.css';
import React, { useState } from 'react';
import NavbarComponent from './components/NavbarComponent';
import ModalComponent from './components/ModalComponent';
import { Container, Button } from 'reactstrap';

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Container>

        <h1 className='mb-3'>My Todo List</h1>
        <p className="read-the-docs">
          A Todo list application is an organizing tool that helps you see and complete all of your daily tasks. It is a list of things to do.
        </p>
        <Button className='mb-3 btn btn-primary' onClick={openModal}>
          + New Todo
        </Button>

        <NavbarComponent />

      </Container>

      <ModalComponent isOpen={modalOpen} toggleModal={closeModal} isCreate={true} />
    </>
  );
}

export default App;