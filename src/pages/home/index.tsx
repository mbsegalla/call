import { Heading, Text } from '@ignite-ui/react'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import previewImage from '../../assets/preview.png'
import ClaimUsernameForm from './components/ClaimUsernameForm'
import { Container, Hero, Preview } from './styles'

const Home = () => {
  return (
    <>
      <NextSeo
        title="Agendamento descomplicado"
        description="Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre."
      />
      <Container>
        <Hero>
          <Heading as="h1" size="4xl">
            Agendamento descomplicado
          </Heading>
          <Text size="xl">
            Conecte seu calendário e permita que as pessoas marquem agendamentos
            no seu tempo livre.
          </Text>
          <ClaimUsernameForm />
        </Hero>
        <Preview>
          <Image
            src={previewImage}
            height={400}
            quality={100}
            priority
            alt="Preview"
          />
        </Preview>
      </Container>
    </>
  )
}

export default Home
