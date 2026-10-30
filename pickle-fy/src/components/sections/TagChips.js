'use client';

import { Chip } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import { ChiliIcon, SproutIcon } from '@/components/ui/icons';

const TAGS = [
  { label: 'Flavorful', Icon: ChiliIcon },
  { label: 'Traditional', Icon: SproutIcon },
  { label: 'No Palm Oil', Icon: BlockIcon },
];

/** The orange outlined tags shown on every product card. */
export default function TagChips() {
  return (
    <div className="mb-3 flex flex-wrap justify-center gap-2">
      {TAGS.map(({ label, Icon }) => (
        <Chip
          key={label}
          label={label}
          variant="outlined"
          icon={<Icon />}
          sx={{
            height: 32,
            fontSize: 13,
            fontWeight: 700,
            color: '#E79114',
            borderColor: '#E79114',
            borderWidth: 2,
            bgcolor: 'transparent',
            '& .MuiChip-icon': { color: '#E79114' },
          }}
        />
      ))}
    </div>
  );
}
