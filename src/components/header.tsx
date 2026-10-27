'use client';
import { useI18n } from '@/components/i18n-provider';
import { LanguageSwitcher } from '@/components/language-switcher';
import Link from '@/components/localized-link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { whatsappHref } from '@/lib/behavior';
import { navigation } from '@/lib/data';
import { stripLocale } from '@/lib/i18n';
import { ArrowUpRight, Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
export function Wordmark() {
  return (
    <span className="wordmark">
      LiniWeb
    </span>
  );
}
export function Header() {
  const { locale, t } = useI18n();
  const path = stripLocale(usePathname());
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <header className={`site-header ${scrolled ? 'solid' : ''}`}>
      <div className="container header-inner">
        <Link
          className="logo-link"
          href="/"
          aria-label={t('LiniWeb home')}
        >
          <Wordmark />
        </Link>
        <nav
          className="desktop-navigation"
          aria-label={t('Main navigation')}
        >
          <ul className="nav-list">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={path === item.href ? 'active' : ''}
                  aria-current={path === item.href ? 'page' : undefined}
                >
                  {t(item.label)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="desktop-header-actions">
          <LanguageSwitcher />
          <a
            href={whatsappHref(locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="header-contact"
          >
            <span>{t('Contact Us')}</span>
          </a>
        </div>
        <div className="mobile-controls">
          <a
            href={whatsappHref(locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-contact"
          >
            <span>{t('Contact')}</span>
          </a>
          <Dialog
            open={open}
            onOpenChange={setOpen}
          >
            <DialogTrigger asChild>
              <button
                className="icon-button"
                aria-label={t('Open navigation menu')}
              >
                <Menu size={24} />
              </button>
            </DialogTrigger>
            <DialogContent className="mobile-menu">
              <DialogTitle>
                <Wordmark />
              </DialogTitle>
              <DialogDescription className="sr-only">
                {t('Explore LiniWeb services, process, and portfolio.')}
              </DialogDescription>
              <LanguageSwitcher onChange={() => setOpen(false)} />
              <nav aria-label={t('Mobile navigation')}>
                {navigation.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={path === item.href ? 'page' : undefined}
                  >
                    <span className="menu-number">0{index + 1}</span>
                    {t(item.label)}
                    <ArrowUpRight size={20} />
                  </Link>
                ))}
                <a
                  href={whatsappHref(locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                >
                  <span className="menu-number">
                    {String(navigation.length + 1).padStart(2, '0')}
                  </span>
                  {t('Contact Us')}
                  <ArrowUpRight size={20} />
                </a>
              </nav>
              <div className="mobile-menu-bottom">
                <span>{t('Surabaya, Indonesia')}</span>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
