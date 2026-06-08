import { useState } from 'react';
import './App.css';
import { Modal } from './components/modal/modal';
import { UncontrolledForm } from './components/forms/uncontrolled-form';
import { ReactHookForm } from './components/forms/react-hook-form';
import { useFormStore } from './store/form-store';

function App() {
  const [isUncontrolledOpen, setIsUncontrolledOpen] =
    useState(false);

  const [isHookFormOpen, setIsHookFormOpen] =
    useState(false);

    const submissions = useFormStore(
  (state) => state.submissions
);

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

  {submissions.length === 0 ? (
    <p>No submissions yet</p>
  ) : (
    <ul>
      {submissions.map((submission) => (
<li key={submission.id}>
  {submission.image && (
    <img
      src={submission.image}
      alt={submission.name}
      width={100}
    />
  )}

  <div>
    <strong>{submission.name}</strong>
  </div>

  <div>{submission.email}</div>

  <div>{submission.country}</div>
</li>
      ))}
    </ul>
  )}
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
        <ReactHookForm
          onSuccess={() => {
    setIsHookFormOpen(false);
  }}
        />
      </Modal>
    </main>
  );
}

export default App;