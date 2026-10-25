import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Halaman Tidak Ditemukan | KIVORA STUDIO',
  description: 'Halaman yang Anda cari tidak ditemukan. Kembali ke beranda KIVORA STUDIO.',
};
import './globals.css';

export default function GlobalNotFound() {
  return (
    <html lang="id">
      <body>
        <main className="not-found container">
          <p className="eyebrow">KIVORA STUDIO / 404</p>
          <h1>Halaman tidak ditemukan.</h1>
          <p>Silakan kembali ke beranda untuk menjelajahi karya kami.</p>
          <Link
            className="button button-light"
            href="/id"
          >
            Kembali ke Beranda
          </Link>
        </main>
      </body>
    </html>
  );
}
