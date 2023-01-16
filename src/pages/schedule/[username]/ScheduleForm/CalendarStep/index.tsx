import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Calendar from '../../../../../components/Calendar'
import { api } from '../../../../../lib/axios'
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'

interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}

const CalendarStep = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const isDateSelected = !!selectedDate
  const weekDay = selectedDate?.toLocaleString('pt-BR', { weekday: 'long' })
  const describeDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : ''

  const router = useRouter()
  const { username } = router.query

  const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null

  const { data: availability } = useQuery<Availability>(
    ['availability', selectedDateWithoutTime],
    async () => {
      const response = await api.get(`/users/${username}/availability`, {
        params: {
          date: selectedDateWithoutTime,
        },
      })

      return response.data
    },

    {
      enabled: !!selectedDate,
    },
  )

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />
      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay} <span>{describeDate}</span>
          </TimePickerHeader>
          <TimePickerList>
            {availability?.possibleTimes.map((hour) => (
              <TimePickerItem
                key={hour}
                disabled={!availability.availableTimes.includes(hour)}
              >
                {String(hour).padStart(2, '0')}:00
              </TimePickerItem>
            ))}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}

export default CalendarStep
