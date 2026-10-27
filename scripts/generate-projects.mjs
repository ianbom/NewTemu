import { mkdirSync, writeFileSync } from 'node:fs';
import { getTranslator } from '../src/lib/i18n.ts';
mkdirSync('public/images/projects', { recursive: true });
mkdirSync('public/images/projects/id', { recursive: true });

function localizeSvg(svg) {
  const t = getTranslator('id');
  return svg
    .replace(
      /(<title>)([^<]*)(<\/title>)/g,
      (_, start, title, end) =>
        `${start}${title.replace('original interface concept', 'konsep antarmuka orisinal')}${end}`,
    )
    .replace(/<text\b([^>]*)>([^<]*)<\/text>/g, (_, attributes, value) => {
      const original = value.replaceAll('&amp;', '&').replaceAll('&lt;', '<');
      const translated = original.includes(' / ')
        ? original
            .split(' / ')
            .map((part) => t(part))
            .join(' / ')
        : t(original);
      const resized =
        translated.length > original.length
          ? attributes.replace(
              /font-size="([\d.]+)"/,
              (_match, size) =>
                `font-size="${Math.max(9, Math.round((Number(size) * original.length) / translated.length))}"`,
            )
          : attributes;
      return `<text${resized}>${translated.replaceAll('&', '&amp;').replaceAll('<', '&lt;')}</text>`;
    });
}
const projects = [
  ['auren', 'AUREN', 'commerce', '#d8c6aa', '#ebe5db', 'Everyday, considered.'],
  ['norden', 'NORDEN', 'dashboard', '#a2b5a6', '#e9ece7', 'Your workspace, in focus.'],
  ['lumio', 'lumio', 'health', '#a8c5dc', '#eff5f8', 'A little more care.'],
  ['kaldo', 'KALDO', 'editorial', '#b49b7d', '#e5dfd4', 'Somewhere to slow down.'],
  ['forma', 'FORMA', 'editorial', '#9b9e9d', '#e8e7e3', 'Built on a different perspective.'],
  ['sora', 'sora', 'dashboard', '#deb887', '#f2eade', 'Make space for learning.'],
  ['mori', 'mori', 'commerce', '#a5b59b', '#edf0e5', 'Rituals, not routines.'],
  ['velo', 'velo', 'health', '#c1cd83', '#f0f0e7', 'A better way to get there.'],
  ['atlas', 'ATLAS', 'dashboard', '#b1aed5', '#eeecf4', 'Good work starts here.'],
  ['objet', 'OBJET', 'commerce', '#99968d', '#ece9e3', 'Objects. With character.'],
  ['vesper', 'VESPER', 'editorial', '#8f555c', '#efe5e4', 'A different kind of dialogue.'],
  ['circa', 'circa', 'health', '#cfac84', '#f1e9df', 'Your everyday, understood.'],
];
const text = (positionX, positionY, value, size = 18, fill = '#242927', extra = '') =>
  `<text x="${positionX}" y="${positionY}" ${extra.includes('font-family=') ? '' : 'font-family="Arial,Helvetica,sans-serif"'} font-size="${size}" fill="${fill}" ${extra}>${String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;')}</text>`;
for (const [slug, name, type, accent, paper, headline] of projects) {
  for (let variant = 0; variant < 3; variant++) {
    let content = `<rect width="1440" height="1080" fill="${variant === 2 ? accent : '#1b1e22'}"/><ellipse cx="720" cy="970" rx="580" ry="42" fill="#000" opacity=".17"/><rect x="125" y="134" width="1190" height="800" rx="18" fill="#080a0c"/><rect x="137" y="146" width="1166" height="776" rx="10" fill="${paper}"/><path d="M137 185h1166" stroke="#aaa" stroke-opacity=".25"/><circle cx="157" cy="166" r="4" fill="#8a8c89"/><circle cx="172" cy="166" r="4" fill="#8a8c89"/><circle cx="187" cy="166" r="4" fill="#8a8c89"/><rect x="530" y="154" width="380" height="23" rx="5" fill="#000" opacity=".045"/>${text(650, 170, `${slug}.studio`, 11, '#757972')}`;
    if (type === 'dashboard') {
      content += `<rect x="137" y="186" width="210" height="736" fill="#202724"/>${text(165, 238, name, 24, '#f1f0e8', 'font-weight="bold"')}${['Overview', 'Projects', 'Analytics', 'Messages', 'Team', 'Settings'].map((item, index) => `${index === variant ? `<rect x="151" y="${281 + index * 52}" width="181" height="39" rx="5" fill="${accent}"/>` : ''}${text(180, 307 + index * 52, item, 15, index === variant ? '#202724' : '#a9b3ac')}`).join('')}${text(165, 862, 'YOUR SPACE TO FOCUS', 10, '#a9b3ac')}${text(386, 242, variant ? 'Project insights' : 'Overview', 28)}${text(386, 278, headline, 16, '#7d827d')}`;
      content += [0, 1, 2]
        .map(
          (index) =>
            `<rect x="${385 + index * 290}" y="318" width="265" height="120" rx="8" fill="#fff"/>${text(408 + index * 290, 350, ['Active projects', 'Tasks completed', 'Team activity'][index], 14, '#7e827c')}${text(408 + index * 290, 403, ['12', '84', '+18%'][index], 36)}<circle cx="${610 + index * 290}" cy="385" r="15" fill="${accent}" opacity=".5"/>`,
        )
        .join('');
      content += `<rect x="385" y="468" width="555" height="285" rx="8" fill="#fff"/>${text(410, 507, 'Activity overview', 18)}${[0, 1, 2, 3].map((index) => `<path d="M413 ${550 + index * 48}h500" stroke="#eee"/>`).join('')}<path d="M418 688L480 650L540 669L605 590L670 610L735 550L800 580L900 535" fill="none" stroke="${accent}" stroke-width="5"/><path d="M418 688L480 650L540 669L605 590L670 610L735 550L800 580L900 535V720H418Z" fill="${accent}" opacity=".16"/><rect x="965" y="468" width="265" height="285" rx="8" fill="#fff"/>${text(990, 507, 'This week', 18)}<circle cx="1095" cy="620" r="67" fill="none" stroke="${paper}" stroke-width="20"/><circle cx="1095" cy="620" r="67" fill="none" stroke="${accent}" stroke-width="20" stroke-dasharray="285 440" transform="rotate(-90 1095 620)"/>${text(1060, 630, '76%', 28)}<rect x="385" y="778" width="845" height="100" rx="8" fill="#fff"/>${text(410, 817, 'Everything in its right place.', 18)}${text(410, 848, 'A shared view of what matters today.', 14, '#7e827c')}`;
    } else if (type === 'commerce') {
      content += `${text(186, 246, name, 30, '#262b27', 'letter-spacing="5"')}${text(890, 244, 'Shop     Our story     Journal', 15)}${text(1190, 244, 'Bag (0)', 14)}<path d="M182 275h1074" stroke="#252b25" stroke-opacity=".2"/>${text(190, 335, variant ? 'THE CONSIDERED COLLECTION' : 'A STUDY IN EVERYDAY LIVING', 11, '#686f62', 'letter-spacing="3"')}${text(190, 435, headline.split(',')[0].split('.')[0], 62, '#282d26', 'font-family="Georgia,serif"')}${text(190, 505, headline.includes(',') ? headline.split(',')[1] : 'Beautifully simple.', 52, '#282d26', 'font-family="Georgia,serif"')}${text(192, 563, 'Fewer things. Better chosen. Made for the everyday.', 16, '#747b6d')}<rect x="192" y="605" width="170" height="46" fill="#2b342a"/>${text(220, 634, 'View collection', 14, '#fff')}<rect x="748" y="304" width="507" height="476" fill="${accent}"/><circle cx="1000" cy="544" r="175" fill="${paper}" opacity=".35"/><ellipse cx="1003" cy="711" rx="115" ry="18" fill="#000" opacity=".12"/><rect x="933" y="439" width="139" height="250" rx="30" fill="${slug === 'mori' ? '#e7e7cf' : slug === 'objet' ? '#444741' : '#a07752'}"/><rect x="951" y="397" width="103" height="70" rx="8" fill="#30372c"/><rect x="943" y="529" width="119" height="104" fill="${paper}"/>${text(966, 570, name, 19)}${text(963, 595, 'ESSENTIAL / 01', 10)}<path d="M185 814h1070" stroke="#999" stroke-opacity=".3"/>${text(192, 852, 'CONSIDERED DESIGN', 11, '#747b6d', 'letter-spacing="2"')}${text(620, 852, 'MADE FOR EVERY DAY', 11, '#747b6d', 'letter-spacing="2"')}${text(1075, 852, 'LESS, BUT BETTER', 11, '#747b6d', 'letter-spacing="2"')}`;
    } else if (type === 'editorial') {
      content += `<rect x="137" y="186" width="1166" height="736" fill="#252d2a"/>${text(187, 245, name, 32, paper, 'letter-spacing="6"')}${text(888, 242, 'Our story     Explore     Get in touch', 14, paper)}<rect x="620" y="285" width="635" height="583" fill="${accent}"/><path d="M730 868V478Q930 230 1130 478V868" fill="${paper}"/><path d="M790 868V535Q930 339 1070 535V868" fill="#414a42"/><path d="M837 868V580Q930 426 1023 580V868" fill="${accent}"/><path d="M620 800h635M620 825h635M620 850h635" stroke="#202820" stroke-opacity=".25"/><circle cx="1163" cy="367" r="39" fill="${paper}" opacity=".7"/>${text(187, 390, variant ? 'A NEW PERSPECTIVE' : 'INDEPENDENT IN SPIRIT', 11, accent, 'letter-spacing="3"')}${text(187, 480, headline.split(' ').slice(0, 2).join(' '), 66, paper, 'font-family="Georgia,serif"')}${text(187, 555, headline.split(' ').slice(2).join(' '), 58, paper, 'font-family="Georgia,serif"')}${text(190, 625, 'Thoughtfully composed. Quietly different.', 16, '#c2c7be')}<rect x="188" y="675" width="185" height="48" fill="${paper}"/>${text(215, 705, variant ? 'Discover the details' : 'Explore the experience', 13)}${text(187, 860, '01 / A DIFFERENT POINT OF VIEW', 10, '#c2c7be', 'letter-spacing="2"')}`;
    } else {
      content += `${text(190, 250, name, 38, '#263c4b', 'font-weight="bold"')}${text(850, 242, 'How it works     About     Get in touch', 14)}<rect x="1175" y="217" width="89" height="38" rx="19" fill="${accent}"/>${text(1193, 241, 'Sign in', 13)}<circle cx="1016" cy="584" r="254" fill="${accent}" opacity=".5"/>${text(194, 385, 'DESIGNED AROUND YOU', 11, '#657a83', 'letter-spacing="3"')}${text(190, 472, headline.split(' ').slice(0, 3).join(' '), 60, '#263c4b')}${text(190, 544, headline.split(' ').slice(3).join(' ') || 'Simply, thoughtfully.', 54, '#263c4b')}${text(194, 602, 'More clarity. A little less complexity.', 17, '#6f828b')}<rect x="192" y="648" width="178" height="48" rx="24" fill="#263c4b"/>${text(222, 678, 'Find your next step', 14, '#fff')}<rect x="894" y="309" width="271" height="527" rx="35" fill="#25323a"/><rect x="904" y="320" width="251" height="505" rx="27" fill="#fff"/><rect x="980" y="328" width="100" height="18" rx="9" fill="#25323a"/>${text(925, 396, 'Good morning, Alex', 16, '#263c4b')}${text(925, 426, 'Your day, at a glance.', 12, '#7a8a91')}<rect x="924" y="452" width="210" height="128" rx="16" fill="${accent}"/>${text(943, 483, slug === 'lumio' ? 'Your next appointment' : 'Your next step', 12)}${text(942, 524, slug === 'lumio' ? 'Thursday, 10:30' : 'A clearer everyday', 19)}${text(942, 553, 'All the details, in one place.', 11)}${[0, 1, 2].map((index) => `<rect x="924" y="${606 + index * 56}" width="210" height="45" rx="8" fill="${paper}"/><circle cx="946" cy="${628 + index * 56}" r="10" fill="${accent}"/>${text(967, 633 + index * 56, ['Overview', 'Your activity', 'Upcoming'][index], 12)}`).join('')}`;
    }
    if (variant === 0 && ['objet', 'mori'].includes(slug)) {
      content += `<rect x="748" y="304" width="507" height="476" fill="${accent}"/><circle cx="1000" cy="544" r="175" fill="${paper}" opacity=".35"/>`;
      content +=
        slug === 'objet'
          ? `<rect x="966" y="329" width="74" height="398" rx="22" fill="#3d423b"/><circle cx="1003" cy="530" r="103" fill="#c0b59d"/><circle cx="1003" cy="530" r="89" fill="#242b26"/>${Array.from({ length: 12 }, (_, index) => `<path d="M1003 454v10" stroke="#c0b59d" stroke-width="3" transform="rotate(${index * 30} 1003 530)"/>`).join('')}<path d="M1003 476v54l42 23" stroke="#e2d7c1" stroke-width="4" fill="none"/><circle cx="1003" cy="530" r="5" fill="#e2d7c1"/>${text(974, 580, 'OBJET', 12, paper)}`
          : `<ellipse cx="1005" cy="720" rx="100" ry="15" fill="#000" opacity=".1"/><path d="M930 380h150l-15 291H945z" fill="#e5e7cf"/><rect x="945" y="671" width="120" height="33" rx="5" fill="#67795a"/>${text(975, 501, 'mori', 33, '#495b3e')}${text(963, 552, 'DAILY CARE', 11, '#495b3e', 'letter-spacing="2"')}${text(973, 585, '01 / RESET', 10, '#495b3e')}`;
    }
    if (variant === 0 && slug === 'atlas') {
      content += `<rect x="385" y="468" width="845" height="410" fill="${paper}"/>${['In progress', 'In review', 'Ready to ship'].map((label, index) => `<rect x="${385 + index * 290}" y="468" width="265" height="410" rx="8" fill="#ffffff88"/>${text(403 + index * 290, 505, label, 16)}${['Website experience', 'Product interface', 'Design system'].map((task, taskIndex) => `<rect x="${400 + index * 290}" y="${533 + taskIndex * 106}" width="235" height="89" rx="6" fill="#fff"/>${text(415 + index * 290, 561 + taskIndex * 106, task, 14)}${text(415 + index * 290, 592 + taskIndex * 106, 'DESIGN / DEVELOPMENT', 9, '#8a849b')}<circle cx="${609 + index * 290}" cy="${591 + taskIndex * 106}" r="10" fill="${accent}"/>`).join('')}`).join('')}`;
    }
    if (variant === 0 && slug === 'sora')
      content = content
        .replaceAll('Active projects', 'Courses in progress')
        .replaceAll('Tasks completed', 'Lessons completed')
        .replaceAll('Team activity', 'Study this week')
        .replaceAll('Activity overview', 'Your learning journey')
        .replaceAll('Projects</text>', 'My courses</text>')
        .replaceAll('Analytics</text>', 'Progress</text>');
    if (variant === 0 && ['forma', 'vesper'].includes(slug)) {
      content += `<rect x="620" y="285" width="635" height="583" fill="${accent}"/>`;
      content +=
        slug === 'forma'
          ? `<path d="M698 770V433l400-80v417z" fill="#d4d4ce"/><path d="M810 770V529l365-59v300z" fill="#555d56"/><path d="M880 770V578l230-36v228z" fill="#858d81"/><path d="M620 800h635M620 825h635" stroke="#434943" stroke-opacity=".3"/>`
          : `<circle cx="1040" cy="550" r="165" fill="#cfaa9a"/><rect x="690" y="370" width="340" height="390" fill="#3b2930"/>${text(725, 450, 'NEW', 63, paper)}${text(725, 527, 'WAYS', 63, paper)}${text(725, 604, 'OF', 63, paper)}${text(725, 681, 'SEEING.', 63, paper)}${text(1060, 808, 'ART / CULTURE', 12, paper, 'letter-spacing="2"')}`;
    }
    if (variant === 0 && slug === 'velo')
      content += `<rect x="924" y="452" width="210" height="295" rx="12" fill="#e8edd7"/><path d="M950 460v280M1000 460v280M1050 460v280M1100 460v280M930 490h200M930 550h200M930 610h200M930 670h200M930 730h200" stroke="#d2dcb8" stroke-width="10"/><path d="M955 693v-82h91v-114h48" fill="none" stroke="#657841" stroke-width="7"/><circle cx="955" cy="693" r="10" fill="#263c4b"/><circle cx="1094" cy="497" r="10" fill="#263c4b"/><rect x="937" y="762" width="185" height="35" rx="8" fill="#263c4b"/>${text(975, 785, '18 min / 4.2 km', 12, paper)}`;
    if (variant === 0 && slug === 'circa')
      content += `<rect x="924" y="452" width="210" height="128" rx="16" fill="${accent}"/>${text(943, 483, 'Your balance', 12)}${text(942, 529, '$4,280.00', 28)}${text(943, 555, 'A clear view of your everyday.', 10)}`;
    if (variant === 1) {
      content += `<rect x="137" y="186" width="1166" height="736" fill="${paper}"/>${text(190, 250, name, 30)}${text(190, 345, 'A closer look.', 56)}${text(190, 392, 'A considered system, from the overview to the smallest detail.', 18, '#777e76')}<rect x="190" y="445" width="482" height="380" rx="10" fill="${accent}"/><circle cx="430" cy="630" r="120" fill="${paper}" opacity=".45"/>${type === 'commerce' ? `<rect x="374" y="540" width="110" height="220" rx="22" fill="#404d3c"/><rect x="387" y="510" width="84" height="55" rx="7" fill="#252d25"/><rect x="384" y="617" width="90" height="80" fill="${paper}"/>${text(395, 654, name, 17)}` : `<path d="M280 700L350 625L410 651L480 555L560 580" fill="none" stroke="#344c3b" stroke-width="8"/>${text(320, 560, 'A new perspective', 25)}`}<rect x="714" y="445" width="527" height="90" rx="6" fill="#ffffff66"/>${text(740, 480, '01 / Thoughtful structure', 20)}${text(740, 510, 'Clear information, exactly where it belongs.', 14, '#737b70')}<rect x="714" y="560" width="527" height="90" rx="6" fill="#ffffff66"/>${text(740, 596, '02 / A coherent visual language', 20)}${text(740, 625, 'One system. Considered in every context.', 14, '#737b70')}<rect x="714" y="675" width="527" height="150" rx="6" fill="#27352a"/>${text(740, 720, 'Every detail has a purpose.', 25, paper)}${text(740, 763, 'DESIGN SYSTEM / INTERFACE EXPLORATION', 11, accent, 'letter-spacing="2"')}`;
    }
    if (variant === 2) {
      content = `<rect width="1440" height="1080" fill="${accent}"/><g transform="translate(-55 -25) scale(.94)">${content}</g><rect x="1040" y="368" width="270" height="542" rx="36" fill="#111917"/><rect x="1050" y="380" width="250" height="516" rx="28" fill="${paper}"/><rect x="1125" y="389" width="100" height="18" rx="9" fill="#111917"/>${text(1073, 456, name, 24)}${text(1073, 503, 'A fresh perspective.', 19)}<rect x="1070" y="530" width="210" height="190" rx="10" fill="${accent}"/><circle cx="1175" cy="624" r="61" fill="${paper}" opacity=".7"/>${type === 'commerce' ? `<rect x="1150" y="570" width="50" height="110" rx="8" fill="#384b37"/><rect x="1155" y="558" width="40" height="23" rx="5" fill="#202d21"/>` : `<path d="M1095 659L1137 614L1170 632L1208 582L1250 599" fill="none" stroke="#384b37" stroke-width="5"/>`}${text(1073, 762, 'Considered on every screen.', 14)}<rect x="1073" y="792" width="204" height="43" rx="5" fill="#27352a"/>${text(1121, 819, 'Explore the details', 12, paper)}`;
    }
    content += `${text(145, 1003, `${name.toUpperCase()} / ${['DIGITAL EXPERIENCE', 'INTERFACE STUDY', 'RESPONSIVE SYSTEM'][variant]}`, 13, variant === 2 ? '#242927' : '#a5a7ab', 'letter-spacing="3"')}${text(1115, 1003, 'LiniWeb', 12, variant === 2 ? '#242927' : '#a5a7ab', 'letter-spacing="2"')}`;
    const filename = `${slug}${variant ? `-${variant}` : ''}.svg`;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="1080" viewBox="0 0 1440 1080"><title>${name} original interface concept</title>${content}</svg>`;
    writeFileSync(`public/images/projects/${filename}`, svg);
    writeFileSync(`public/images/projects/id/${filename}`, localizeSvg(svg));
  }
}
