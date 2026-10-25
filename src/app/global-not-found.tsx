import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Halaman Tidak Ditemukan | TemuWeb',
  description: 'Halaman yang Anda cari tidak ditemukan. Kembali ke beranda TemuWeb.',
};
import './globals.css';

export default function GlobalNotFound() {
  return (
    <html lang="id">
      <body>
        <main className="not-found container">
          <p className="eyebrow">TemuWeb / 404</p>
          <h1>Halaman tidak ditemukan.</h1>
          <p>Silakan kembali ke beranda untuk mengenal layanan pembuatan website kami.</p>
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
