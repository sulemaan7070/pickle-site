'use client';

import { useState } from 'react';
import { AppBar, Button, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NAV_LINKS } from '@/data/site';
import CartButton from '@/components/cart/CartButton';
import Logo from './Logo';
import MobileMenu from './MobileMenu';

/**
 * Sticky top bar.
 *  - wide screens: logo, links, "Shop now" and the cart
 *  - phones/tablets: logo, cart and a hamburger that opens <MobileMenu />
 */
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        color="transparent"
        sx={{ bgcolor: 'rgba(251,246,233,.92)', backdropFilter: 'blur(8px)', color: 'primary.main' }}
      >
        <Toolbar disableGutters sx={{ px: { xs: '5vw', md: '6vw' }, minHeight: { xs: 64, md: 76 } }}>
          <Logo className="h-10 md:h-12" />
          <div className="flex-1" />

          {/* Desktop links (hidden below 900px) */}
          <div className="hidden items-center gap-2 md:flex">
            {NAV_LINKS.map((link) => (
              <Button key={link.label} href={link.href} sx={{ fontWeight: 600, fontSize: 16 }}>
                {link.label}
              </Button>
            ))}
            <Button href="#star" variant="contained" color="secondary" disableElevation sx={{ borderRadius: 99, px: 3 }}>
              Shop now
            </Button>
          </div>

          <CartButton />

          {/* Hamburger (hidden from 900px up) */}
          <IconButton
            color="inherit"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            sx={{ display: { xs: 'inline-flex', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
