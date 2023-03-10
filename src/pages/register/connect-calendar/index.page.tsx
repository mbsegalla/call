import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { ArrowRight, Check } from 'phosphor-react'
import { signIn, useSession } from 'next-auth/react'
import { Container, Header } from '../styles'
import { useRouter } from 'next/router'
import { AuthError, ConnectBox, ConnectItem } from './styles'
import { NextSeo } from 'next-seo'

const ConnectCalendar = () => {
  const router = useRouter()
  const hasAuthError = !!router.query.error

  const session = useSession()
  const isSignedIn = session.status === 'authenticated'

  const handleSignIn = async () => {
    await signIn('google')
  }

  const goToPage = () => {
    router.push('/register/time-intervals')
  }

  return (
    <>
      <NextSeo
        title="Conecte sua agenda"
        description="Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre."
        noindex
      />
      <Container>
        <Header>
          <Heading as="strong">Conect sua agenda!</Heading>
          <Text>
            Conect o seu calendário para verificar automaticamente as horas
            ocupadas e os novos eventos à medida em que são agendados.
          </Text>
          <MultiStep size={4} currentStep={2} />
        </Header>
        <ConnectBox>
          <ConnectItem>
            <Text>Google Calendar</Text>
            {isSignedIn ? (
              <Button size="sm" disabled>
                Conectado
                <Check />
              </Button>
            ) : (
              <Button variant="secondary" size="sm" onClick={handleSignIn}>
                Conectar
                <ArrowRight />
              </Button>
            )}
          </ConnectItem>
          {hasAuthError && (
            <AuthError size="sm">
              Falha ao se conectar ao Google, verifique se você habilitou as
              permissões de acesso ao Google Calendar.
            </AuthError>
          )}
          <Button onClick={goToPage} type="submit" disabled={!isSignedIn}>
            Próximo passo
            <ArrowRight />
          </Button>
        </ConnectBox>
      </Container>
    </>
  )
}

export default ConnectCalendar
