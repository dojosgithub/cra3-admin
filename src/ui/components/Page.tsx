import { forwardRef, ReactNode } from 'react';
// @mui
import { Box, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  children: ReactNode;
  meta?: ReactNode;
  title: string;
}
const Page = forwardRef<HTMLDivElement, Props>(({ children, title = '', meta, ...other }, ref) => (
  <>
    <title>{`${title} | Minimal-UI`}</title>
    {meta}

    <Box ref={ref} {...other}>
      {children}
    </Box>
  </>
));

export default Page;
