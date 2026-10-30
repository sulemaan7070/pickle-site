'use client';

import { Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { NAV_LINKS } from '@/data/site';
import Logo from './Logo';

/** The slide-in menu that the hamburger button opens on phones and small tablets. */
export default function MobileMenu({ open, onClose }) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: 'min(300px, 85vw)', bgcolor: '#fbf6e9' } }}>
      <div className="flex items-center justify-between px-4 py-3">
        <Logo className="h-9" />
        <IconButton aria-label="Close menu" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <Divider />

      <List>
        {NAV_LINKS.map((link) => (
          <ListItem key={link.label} disablePadding>
            <ListItemButton component="a" href={link.href} onClick={onClose}>
              <ListItemText primary={link.label} primaryTypographyProps={{ fontWeight: 600, fontSize: 18 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <div className="px-4 pt-2">
        <Button
          href="#star"
          fullWidth
          size="large"
          variant="contained"
          color="secondary"
          disableElevation
          onClick={onClose}
          sx={{ borderRadius: 99 }}
        >
          Shop now
        </Button>
      </div>
    </Drawer>
  );
}
