import Calendar from '../../../../../components/Calendar'
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'

const CalendarStep = () => {
  const isDateSelected = true

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar />
      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            terça-feira <span>12 de maio</span>
          </TimePickerHeader>
          <TimePickerList>
            <TimePickerItem>09:00</TimePickerItem>
            <TimePickerItem>09:00</TimePickerItem>
            <TimePickerItem>09:00</TimePickerItem>
            <TimePickerItem>09:00</TimePickerItem>
            <TimePickerItem>09:00</TimePickerItem>
            <TimePickerItem>09:00</TimePickerItem>
            <TimePickerItem>09:00</TimePickerItem>
            <TimePickerItem>09:00</TimePickerItem>
            <TimePickerItem>09:00</TimePickerItem>
            <TimePickerItem>09:00</TimePickerItem>
            <TimePickerItem>09:00</TimePickerItem>
            <TimePickerItem>09:00</TimePickerItem>
            <TimePickerItem>09:00</TimePickerItem>
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}

export default CalendarStep
