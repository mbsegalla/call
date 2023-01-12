import { Avatar, Heading, Text } from '@ignite-ui/react'
import { GetStaticProps } from 'next'
import { prisma } from '../../../lib/prisma'
import { Container, UserHeader } from './styles'

interface ScheduleProps {
  user: {
    name: string
    bio: string
    avatarUrl: string
  }
}

export const Schedule = ({ user }: ScheduleProps) => {
  return (
    <Container>
      <UserHeader>
        <Avatar src={user.avatarUrl} alt="" />
        <Heading>{user.name}</Heading>
        <Text>{user.bio}</Text>
      </UserHeader>
    </Container>
  )
}

export default Schedule

export const getStaticPaths = async () => {
  return {
    paths: [],
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = String(params?.username)

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user: {
        name: user.name,
        bio: user.bio,
        avatarUrl: user.avatar_url,
      },
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}
