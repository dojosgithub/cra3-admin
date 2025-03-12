import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react'; // ✅ Import Picker from @emoji-mart/react
import { useEffect, useRef, useState } from 'react';
// @mui
import { useTheme, hexToRgb, Theme } from '@mui/material/styles';
import {
  SxProps,
  Box,
  IconButton,
  ClickAwayListener,
  Paper,
  GlobalStyles,
} from '@mui/material';
//
import Iconify from '../Iconify';

// ----------------------------------------------------------------------

interface Props {
  disabled?: boolean;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  sx?: SxProps<Theme>;
}

export default function EmojiPicker({ value, setValue, disabled, sx }: Props) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const hexToRgbString = (hex: string) =>
    hexToRgb(hex).replace('rgb(', '').replace(')', '');

  return (
    <>
      <GlobalStyles
        styles={{
          '#root': {
            '--color-border': theme.palette.divider,
            '--rgb-accent': hexToRgbString(theme.palette.primary.main),
            '--rgb-background': hexToRgbString(theme.palette.background.paper),
            '--rgb-color': hexToRgbString(theme.palette.text.secondary),
            '--rgb-input': 'transparent',
          },
        }}
      />

      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <Box sx={{ position: 'relative' }}>
          <IconButton disabled={disabled} size="small" onClick={() => setOpen(!open)}>
            <Iconify icon={'eva:smiling-face-fill'} width={20} height={20} />
          </IconButton>

          {open && (
            <Paper
              sx={{
                bottom: 36,
                position: 'absolute',
                boxShadow: (theme) => theme.shadows[4], // Fixed shadow reference
                ...sx,
              }}
            >
              <Picker
                data={data}
                onEmojiSelect={(emoji: any) => setValue(value + emoji.native)}
              />
            </Paper>
          )}
        </Box>
      </ClickAwayListener>
    </>
  );
}
