import sharp from 'sharp';

const cover = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#08090b" />
  <g font-family="Arial, sans-serif" font-weight="400">
    <text x="80" y="120" fill="#c7b59a" font-size="28" letter-spacing="3">
      LiniWeb
    </text>
    <g fill="#f5f3ef" font-size="64">
      <text x="80" y="290">Jasa Pembuatan Website</text>
      <text x="80" y="380">untuk Kebutuhan Bisnis Anda.</text>
    </g>
    <path d="M80 470h1040" stroke="#2c2f33" />
    <text x="80" y="530" fill="#a5a7ab" font-size="20">
      WEBSITE. E-COMMERCE. APLIKASI WEB.
    </text>
  </g>
</svg>`;

await sharp(Buffer.from(cover))
  .jpeg({ quality: 90 })
  .toFile('public/images/social-cover.jpg');
