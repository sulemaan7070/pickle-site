'use client';

import { Button, Divider, Typography } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { INSTAGRAM_URL } from '@/data/site';
import { WHATSAPP_CHAT_URL } from '@/lib/whatsapp';

const outlinedLight = {
  color: '#fff',
  borderColor: 'rgba(255,255,255,.5)',
  borderRadius: 99,
  px: 2.5,
  '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,.1)' },
};

/** Dark green footer with the Instagram and WhatsApp links. */
export default function Footer() {
  return (
    <footer className="bg-[#273E10] px-[6vw] py-10">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: 26 }}>Pickle-Fy</Typography>
          <Typography sx={{ color: 'rgba(255,255,255,.8)' }}>Real Flavours. Local Roots.</Typography>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Button href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" variant="outlined" startIcon={<InstagramIcon />} sx={outlinedLight}>
            Instagram
          </Button>
          <Button href={WHATSAPP_CHAT_URL} target="_blank" rel="noopener noreferrer" variant="outlined" startIcon={<WhatsAppIcon />} sx={outlinedLight}>
            WhatsApp
          </Button>
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-[1400px]">
        <Divider sx={{ borderColor: 'rgba(255,255,255,.2)', mb: 2 }} />
        <Typography sx={{ color: 'rgba(255,255,255,.7)', fontSize: 14, textAlign: { xs: 'center', sm: 'left' } }}>
          © {new Date().getFullYear()} Pickle-Fy. All rights reserved.
        </Typography>
      </div>
    </footer>
  );
}
