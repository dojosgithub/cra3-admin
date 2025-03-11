import data from '@emoji-mart/data';
import { Picker } from 'emoji-mart';
import { useEffect, useRef, useState } from 'react';
// @mui
import { useTheme, hexToRgb, Theme } from '@mui/material/styles';
import { SxProps, Box, IconButton, ClickAwayListener, Paper, GlobalStyles } from '@mui/material';
//
import Iconify from '../Iconify';

// ----------------------------------------------------------------------

interface Props {
  disabled?: boolean;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onEmojiSelect?: (emoji: any) => void; // Use `any` or define a custom type for `emoji`
  ref?: React.MutableRefObject<HTMLInputElement>;
  sx?: SxProps<Theme>;
}

export default function EmojiPicker({ value, setValue, disabled, sx, ...other }: Props) {
  const theme = useTheme();

  const emojiRef = useRef<HTMLDivElement>(null); // Use `HTMLDivElement` for the ref
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open && emojiRef.current) {
      // Initialize the Picker
      new Picker({
        data,
        parent: emojiRef.current, // Use `parent` instead of `ref`
        onEmojiSelect: (emoji: any) => {
          setValue(value + emoji.native); // Update the value with the selected emoji
          if (other.onEmojiSelect) {
            other.onEmojiSelect(emoji); // Call the `onEmojiSelect` callback if provided
          }
        },
      });
    }
  }, [open, value, setValue, other]);

  const hexToRgbString = (hex: string) => hexToRgb(hex).replace('rgb(', '').replace(')', '');

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
              ref={emojiRef}
              sx={{
                bottom: 36,
                position: 'absolute',
                boxShadow: (theme) => theme.customShadows.dropdown,
                ...sx,
              }}
            />
          )}
        </Box>
      </ClickAwayListener>
    </>
  );
}