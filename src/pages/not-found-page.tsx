import { Link } from 'react-router';

export const NotFoundPage = () => {
  return (
    <main className="app">
      <section className="page-card">
        <h1>404</h1>

        <p>Page was not found.</p>

        <Link className="button" to="/?page=1">
          Back to app
        </Link>
      </section>
    </main>
  );
};