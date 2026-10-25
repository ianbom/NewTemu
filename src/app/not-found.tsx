import Link from 'next/link';
export default function NotFound() {
  return (
    <section className="not-found container">
      <p className="eyebrow">404 / A different direction</p>
      <h1>This page is out of frame.</h1>
      <p>Let&apos;s get you back to the work.</p>
      <Link
        className="button button-light"
        href="/work"
      >
        Explore Our Work
      </Link>
    </section>
  );
}
