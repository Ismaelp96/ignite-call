import { Calendar } from '@/components/Calendar';
import {
	Container,
	TimePicker,
	TimePickerHeader,
	TimePickerItem,
	TimePickerList,
} from './styles';

export function CalendarStep() {
	const isDateSelected = true;
	return (
		<Container isTimePickerOpen={isDateSelected}>
			<Calendar />
			{isDateSelected && (
				<TimePicker>
					<TimePickerHeader>
						Terça-feira, <span>20 de setembro</span>
					</TimePickerHeader>
					<TimePickerList>
						<TimePickerItem>08:00h</TimePickerItem>
						<TimePickerItem>09:00h</TimePickerItem>
						<TimePickerItem>10:00h</TimePickerItem>
						<TimePickerItem>11:00h</TimePickerItem>
						<TimePickerItem>12:00h</TimePickerItem>
						<TimePickerItem>13:00h</TimePickerItem>
						<TimePickerItem>14:00h</TimePickerItem>
						<TimePickerItem>15:00h</TimePickerItem>
						<TimePickerItem>16:00h</TimePickerItem>
						<TimePickerItem>17:00h</TimePickerItem>
						<TimePickerItem>18:00h</TimePickerItem>
					</TimePickerList>
				</TimePicker>
			)}
		</Container>
	);
}
