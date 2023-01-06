import { Box, styled, Text } from '@ignite-ui/react'

export const Form = styled(Box, {
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gap: '$2',
  marginTop: '$4',
  padding: '$4',

  '@media (max-width: 600)': {
    gridTemplateColumns: '1fr',
  },
})

export const FormInputError = styled('div', {
  marginTop: '$2',

  [` > ${Text}`]: {
    color: '$gray400',
  },
})
