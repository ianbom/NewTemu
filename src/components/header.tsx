'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { ArrowUpRight, ChevronDown, Menu } from 'lucide-react';
import { categories, categorySlug, navigation } from '@/lib/data';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function Wordmark() {
  return (
    <span className="wordmark">
      KIVORA<span className="wordmark-studio">STUDIO</span>
    </span>
  );
}
export function Header() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [navValue, setNavValue] = useState('');
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <header className={`site-header ${scrolled || path.startsWith('/work/') ? 'solid' : ''}`}>
      <div className="container header-inner">
        <Link
          className="logo-link"
          href="/"
          aria-label="KIVORA STUDIO home"
        >
          <Wordmark />
        </Link>
        <NavigationMenu.Root
          className="desktop-navigation"
          aria-label="Main navigation"
          value={navValue}
          onValueChange={setNavValue}
          onMouseLeave={() => setNavValue('')}
        >
          <NavigationMenu.List className="nav-list">
            {navigation.map((item) => (
              <NavigationMenu.Item
                key={item.href}
                value={item.href}
              >
                {item.href === '/work' ? (
                  <>
                    <div className="work-nav">
                      <Link
                        href="/work"
                        onMouseEnter={() => setNavValue('/work')}
                        onClick={() => setNavValue('')}
                        className={path.startsWith('/work') ? 'active' : ''}
                      >
                        Selected Work
                      </Link>
                      <NavigationMenu.Trigger
                        className="dropdown-trigger"
                        aria-label="Open project categories"
                      >
                        <ChevronDown size={12} />
                      </NavigationMenu.Trigger>
                    </div>
                    <NavigationMenu.Content className="nav-dropdown">
                      <Link
                        href="/work"
                        onClick={() => setNavValue('')}
                      >
                        All Projects
                      </Link>
                      {categories.slice(1).map((category) => (
                        <Link
                          key={category}
                          onClick={() => setNavValue('')}
                          href={`/work/category/${categorySlug(category)}`}
                        >
                          {category}
                        </Link>
                      ))}
                    </NavigationMenu.Content>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={path === item.href ? 'active' : ''}
                    aria-current={path === item.href ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                )}
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
        </NavigationMenu.Root>
        <Link
          href="/contact"
          className="button button-outline header-contact"
        >
          Contact Us
        </Link>
        <div className="mobile-controls">
          <Link
            href="/contact"
            className="mobile-contact"
          >
            Contact
          </Link>
          <Dialog
            open={open}
            onOpenChange={setOpen}
          >
            <DialogTrigger asChild>
              <button
                className="icon-button"
                aria-label="Open navigation menu"
              >
                <Menu size={24} />
              </button>
            </DialogTrigger>
            <DialogContent className="mobile-menu">
              <DialogTitle>
                <Wordmark />
              </DialogTitle>
              <DialogDescription className="sr-only">
                Explore KIVORA STUDIO and our work.
              </DialogDescription>
              <nav aria-label="Mobile navigation">
                {navigation.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={path === item.href ? 'page' : undefined}
                  >
                    <span className="menu-number">0{index + 1}</span>
                    {item.label}
                    <ArrowUpRight size={20} />
                  </Link>
                ))}
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                >
                  <span className="menu-number">08</span>Contact Us
                  <ArrowUpRight size={20} />
                </Link>
              </nav>
              <div className="mobile-menu-bottom">
                <span>Surabaya, Indonesia</span>
                <a href="mailto:mail@agency.site">mail@agency.site</a>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
