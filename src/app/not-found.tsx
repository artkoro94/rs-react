import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="app">
      <section className="page-card">
        <h1>404</h1>

        <p>Page was not found.</p>

        <Link className="button" href="/">
          Back to app
        </Link>
      </section>
    </main>
  );
}