import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="app">
      <section className="page-card">
        <h1>About</h1>

        <p>
          This app was created by @artkoro94 as part of the RS School React
          course.
        </p>

        <a
          className="button"
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
        >
          RS School React Course
        </a>

        <Link className="header__link" href="/">
          Back to app
        </Link>
      </section>
    </main>
  );
}