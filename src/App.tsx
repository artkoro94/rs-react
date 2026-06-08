import './App.css';

function App() {
  return (
    <main className="app">
      <section className="controls">
        <h1>React Forms</h1>

        <div className="actions">
          <button type="button">Open Uncontrolled Form</button>

          <button type="button">Open React Hook Form</button>
        </div>
      </section>

      <section className="results">
        <h2>Submissions</h2>

        <p>No submissions yet</p>
      </section>
    </main>
  );
}

export default App;