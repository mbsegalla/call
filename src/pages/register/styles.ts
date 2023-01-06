import { Box, Heading, styled, Text } from '@ignite-ui/react'

export const Container = styled('main', {
  maxWidth: 572,
  margin: '$20 auto $4',
  padding: '0 $4',
})

export const Header = styled('div', {
  padding: '0 $6',

  [` > ${Heading}`]: {
    lineHeight: '$base',
  },

  [` > ${Text}`]: {
    color: '$gray200',
    marginBottom: '$6',
  },
})

export const Form = styled(Box, {
  display: 'flex',
  marginTop: '$6',
  flexDirection: 'column',
  gap: '$4',

  lable: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },
})

export const FormInputError = styled(Text, {
  color: '#f75a68',
})
