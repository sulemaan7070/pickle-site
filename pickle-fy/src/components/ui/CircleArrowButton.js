'use client';

import { IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

/**
 * Round outlined arrow button used by the carousels.
 *  direction: "prev" | "next"
 *  size: width/height in px (Material UI responsive object also works)
 */
export default function CircleArrowButton({ direction, label, onClick, size = 40 }) {
  const Icon = direction === 'prev' ? ChevronLeftIcon : ChevronRightIcon;

  return (
    <IconButton
      aria-label={label}
      onClick={onClick}
      sx={{
        width: size,
        height: size,
        bgcolor: 'rgba(255,255,255,.92)',
        color: 'primary.main',
        border: '2px solid',
        borderColor: 'primary.main',
        '&:hover, &:focus-visible': { bgcolor: 'primary.main', color: '#fff' },
      }}
    >
      <Icon fontSize="small" />
    </IconButton>
  );
}
