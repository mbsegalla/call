import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { AxiosError } from 'axios'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { ArrowRight } from 'phosphor-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '../../lib/axios'
import { Container, Form, FormInputError, Header } from './styles'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O nome de usuário deve ter no mínimo 3 caracteres' })
    .max(20, { message: 'O nome de usuário deve ter no máximo 20 caracteres' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O nome de usuário deve conter apenas letras e hífens',
    })
    .transform((value) => value.toLowerCase()),
  name: z
    .string()
    .min(3, { message: 'O nome deve ter no mínimo 3 caracteres' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

const Register = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const router = useRouter()

  useEffect(() => {
    const username = router.query.username as string
    if (username) {
      setValue('username', username)
    }
  }, [router.query.username, setValue])

  const handleRegister = async (data: RegisterFormData) => {
    try {
      await api.post('/users', {
        username: data.username,
        name: data.name,
      })
      await router.push('/register/connect-calendar')
    } catch (error) {
      if (error instanceof AxiosError && error?.response?.data?.message) {
        alert(error.response.data.message)
        return
      }
      console.log(error)
    }
  }

  return (
    <>
      <NextSeo
        title="Bem vindo ao Ignite Call!"
        description="Precisamos de algumas informações para criar seu perfil! Ah, você pode editar essas informações depois."
        noindex
      />
      <Container>
        <Header>
          <Heading as="strong">Bem vindo ao Ignite Call!</Heading>
          <Text>
            Precisamos de algumas informações para criar seu perfil! Ah, você
            pode editar essas informações depois.
          </Text>
          <MultiStep size={4} currentStep={1} />
        </Header>
        <Form as="form" onSubmit={handleSubmit(handleRegister)}>
          <label>
            <Text size="sm">Nome de usuário</Text>
            <TextInput placeholder="Usuário" {...register('username')} />
            {errors.username && (
              <FormInputError size="sm">
                {errors.username.message}
              </FormInputError>
            )}
          </label>

          <label>
            <Text size="sm">Nome completo</Text>
            <TextInput placeholder="Nome" {...register('name')} />
            {errors.name && (
              <FormInputError size="sm">{errors.name.message}</FormInputError>
            )}
          </label>

          <Button type="submit" disabled={isSubmitting}>
            Próximo passo
            <ArrowRight />
          </Button>
        </Form>
      </Container>
    </>
  )
}

export default Register
