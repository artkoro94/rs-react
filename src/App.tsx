import { useState } from 'react';
import './App.css';
import { Modal } from './components/modal/modal';
import { UncontrolledForm } from './components/forms/uncontrolled-form';

function App() {
  const [isUncontrolledOpen, setIsUncontrolledOpen] =
    useState(false);

  const [isHookFormOpen, setIsHookFormOpen] =
    useState(false);

  return (
    <main className="app">
      <section className="controls">
        <h1>React Forms</h1>

        <div className="actions">
          <button
            type="button"
            onClick={() => setIsUncontrolledOpen(true)}
          >
            Open Uncontrolled Form
          </button>

          <button
            type="button"
            onClick={() => setIsHookFormOpen(true)}
          >
            Open React Hook Form
          </button>
        </div>
      </section>

      <section className="results">
        <h2>Submissions</h2>

        <p>No submissions yet</p>
      </section>

      <Modal
        title="Uncontrolled Form"
        isOpen={isUncontrolledOpen}
        onClose={() => setIsUncontrolledOpen(false)}
      >
        <UncontrolledForm />
      </Modal>

      <Modal
        title="React Hook Form"
        isOpen={isHookFormOpen}
        onClose={() => setIsHookFormOpen(false)}
      >
        <UncontrolledForm />
      </Modal>
    </main>
  );
}

export default App;