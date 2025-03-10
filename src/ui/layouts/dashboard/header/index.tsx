// @mui
import { styled } from '@mui/material/styles'
import { Box, Stack, AppBar, Toolbar, Link } from '@mui/material'
// hooks
// utils
// config
// components
import Logo from '../../../components/Logo'
import Iconify from '../../../components/Iconify'
import { IconButtonAnimate } from '../../../components/animate'
//
import Searchbar from './Searchbar'
import AccountPopover from './AccountPopover'
import LanguagePopover from './LanguagePopover'
import ContactsPopover from './ContactsPopover'
import NotificationsPopover from './NotificationsPopover'
import { HEADER, NAVBAR } from 'src/config'
import cssStyles from 'src/utils/cssStyles'
import useOffSetTop from 'src/hooks/useOffSetTop'
import useResponsive from 'src/hooks/useResponsive'
import DocumentPopover from './DocumentPopover'
import { useRootStore } from 'src/stores'

// ----------------------------------------------------------------------

type RootStyleProps = {
  isCollapse: boolean
  isOffset: boolean
  verticalLayout: boolean
}

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) =>
    prop !== 'isCollapse' && prop !== 'isOffset' && prop !== 'verticalLayout',
})<RootStyleProps>(({ isCollapse, isOffset, verticalLayout, theme }) => ({
  ...cssStyles(theme).bgBlur(),
  boxShadow: 'none',
  height: HEADER.MOBILE_HEIGHT,
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(['width', 'height'], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('lg')]: {
    height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH + 1}px)`,
    ...(isCollapse && {
      width: `calc(100% - ${NAVBAR.DASHBOARD_COLLAPSE_WIDTH}px)`,
    }),
    ...(isOffset && {
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
    }),
    ...(verticalLayout && {
      width: '100%',
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
      backgroundColor: theme.palette.background.default,
    }),
  },
}))

// ----------------------------------------------------------------------

type Props = {
  onOpenSidebar: VoidFunction
  isCollapse?: boolean
  verticalLayout?: boolean
}

export default function DashboardHeader({
  onOpenSidebar,
  isCollapse = false,
  verticalLayout = false,
}: Props) {
  const isOffset =
    useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout

  const isDesktop = useResponsive('up', 'lg')

  const { authStore } = useRootStore()

  return (
    <RootStyle
      isCollapse={isCollapse}
      isOffset={isOffset}
      verticalLayout={verticalLayout}
    >
      <Toolbar
        sx={{
          height: '45px !important',
          minHeight: '45px !important',
          px: { lg: 5 },
        }}
      >
        {isDesktop && verticalLayout && <Logo sx={{ mr: 2.5 }} />}

        {!isDesktop && (
          <IconButtonAnimate
            onClick={onOpenSidebar}
            sx={{ mr: 1, color: 'white' }}
          >
            <Iconify icon="eva:menu-2-fill" color="white" />
          </IconButtonAnimate>
        )}

        {/* <Searchbar /> */}
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1.5 }}
        >
          {authStore.user?.role?.title !== 'SimScorer' ? (
            <DocumentPopover />
          ) : (
            <></>
          )}
          <NotificationsPopover />
          {authStore.user?.role?.title !== 'SimScorer' ? (
            <ContactsPopover />
          ) : (
            <></>
          )}

          <AccountPopover />
        </Stack>
      </Toolbar>
    </RootStyle>
  )
}
