import { Box, styled, Text } from '@ignite-ui/react'

export const Container = styled(Box, {
  margin: '$6 auto 0',
  padding: 0,
  display: 'grid',
  maxWidth: '100%',
  position: 'relative',

  variants: {
    isTimePickerOpen: {
      true: {
        gridTemplateColumns: '1fr 280px',

        '@media (max-width: 900px)': {
          gridTemplateColumns: '1fr',
        },
      },
      false: {
        width: 540,
        gridTemplateColumns: '1fr',
      },
    },
  },
})

export const TimePicker = styled('div', {
  position: 'absolute',
  top: 0,
  right: 0,
  width: 280,
  bottom: 0,
  borderLeft: '1px solid $gray600',
  padding: '$6 $6 0',
  overflowY: 'scroll',
})

export const TimePickerHeader = styled(Text, {
  fontWeight: '$medium',

  span: {
    color: '$gray200',
  },
})

export const TimePickerList = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  marginTop: '$3',
  gap: '$2',

  '@media (min-width: 900px)': {
    gridTemplateColumns: '2fr',
  },
})

export const TimePickerItem = styled('button', {
  border: 0,
  padding: '$2 0',
  cursor: 'pointer',
  lineHeight: '$base',
  fontSize: '$sm',
  backgroundColor: '$gray600',
  borderRadius: '$sm',
  color: '$gray100',

  '&:last-child': {
    marginBottom: '$6',
  },

  '&:disabled': {
    backgroundColor: 'none',
    cursor: 'default',
    opacity: 0.4,
  },

  '&:not(:disabled):hover': {
    backgroundColor: '$gray500',
  },

  '&focus': {
    boxShadow: '0 0 0 2px $colors$gray100',
  },
})
