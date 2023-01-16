import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const username = req.query.username as string
  const { year, month } = req.query

  if (!year || !month) {
    return res.status(400).json({ message: 'Year or month not specified.' })
  }

  const user = await prisma.user.findUnique({
    where: { username },
  })

  if (!user) {
    return res.status(400).json({ message: 'User not found' })
  }

  const availableWeekDays = await prisma.userTimeInterval.findMany({
    select: {
      week_day: true,
    },
    where: {
      user_id: user.id,
    },
  })

  const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter((weekDay) => {
    return !availableWeekDays.some(
      (availableWeekDay) => availableWeekDay.week_day === weekDay,
    )
  })

  const blockedDatesRaw: Array<{ date: number }> = await prisma.$queryRaw`
    SELECT 
      EXTRACT(DAY FROM schedulings.date) AS date,
      COUNT(schedulings.date) AS amount,
      ((user_time_intervals.time_end_in_minutes - user_time_intervals.time_start_in_minutes) / 60) AS size

    FROM schedulings 

    LEFT JOIN user_time_intervals
      ON user_time_intervals.week_day= WEEKDAY(DATE_ADD(schedulings.date, INTERVAL 1 DAY))

    WHERE schedulings.user_id = ${user.id}
      AND DATE_FORMAT(schedulings.date, '%Y-%m') = ${`${year}-${month}`}

    GROUP BY EXTRACT(DAY FROM schedulings.date),
    ((user_time_intervals.time_end_in_minutes - user_time_intervals.time_start_in_minutes) / 60)

    HAVING amount >= size
  `

  const blockedDates = blockedDatesRaw.map((blockedDate) => blockedDate.date)

  return res.json({ blockedWeekDays, blockedDates })
}
