import { useMemo, useState } from 'react';
import { CaretLeft, CaretRight } from 'phosphor-react';

import {
	CalendarActions,
	CalendarBody,
	CalendarContainer,
	CalendarDay,
	CalendarHeader,
	CalendarTitle,
} from './styles';
import { getWeekDays } from '@/utils/get-week-days';
import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { useRouter } from 'next/router';

interface CalendarWeek {
	week: number;
	days: Array<{
		date: dayjs.Dayjs;
		disabled: boolean;
	}>;
}

type CalendarWeeks = CalendarWeek[];

interface BlockedDates {
	blockedWeekDays: number[];
}

interface CalendarProps {
	selectedDate: Date | null;
	onDateSelected: (date: Date) => void;
}

export function Calendar({ onDateSelected, selectedDate }: CalendarProps) {
	const router = useRouter();
	const [currentDate, setCurrentDate] = useState(() => {
		return dayjs().set('date', 1);
	});

	function handlePreviousMoth() {
		const previousMothDate = currentDate.subtract(1, 'month');
		setCurrentDate(previousMothDate);
	}
	function handleNextMoth() {
		const nextMothDate = currentDate.add(1, 'month');
		setCurrentDate(nextMothDate);
	}

	const shortWeekDays = getWeekDays({ short: true });

	const currentMonth = currentDate.format('MMMM');
	const currentYear = currentDate.format('YYYY');

	const username = String(router.query.username);

	const { data: blockedDates } = useQuery<BlockedDates>({
		queryKey: [
			'blocked-dates',
			currentDate.get('year'),
			currentDate.get('month'),
		],
		queryFn: async () => {
			const response = await api.get(`/users/${username}/blocked-dates`, {
				params: {
					year: currentDate.get('year'),
					month: currentDate.get('month'),
				},
			});
			return response.data;
		},
	});

	const calendarWeeks = useMemo(() => {
		if (!blockedDates) {
			return [];
		}
		const daysInsMonthArray = Array.from({
			length: currentDate.daysInMonth(),
		}).map((_, i) => {
			return currentDate.set('date', i + 1);
		});

		const firstWeekDay = currentDate.get('day');

		const previousMounthFillArray = Array.from({ length: firstWeekDay })
			.map((_, i) => {
				return currentDate.subtract(i + 1, 'day');
			})
			.reverse();

		const lastDayInCurrentMonth = currentDate.set(
			'date',
			currentDate.daysInMonth(),
		);

		const lastWeekDay = lastDayInCurrentMonth.get('day');

		const NextMounthFillArray = Array.from({
			length: 7 - (lastWeekDay + 1),
		}).map((_, i) => {
			return lastDayInCurrentMonth.add(i + 1, 'day');
		});
		const calendarDays = [
			...previousMounthFillArray.map((date) => {
				return { date, disabled: true };
			}),
			...daysInsMonthArray.map((date) => {
				return {
					date,
					disabled:
						date.endOf('day').isBefore(new Date()) ||
						blockedDates.blockedWeekDays.includes(date.get('day')),
				};
			}),
			...NextMounthFillArray.map((date) => {
				return { date, disabled: true };
			}),
		];

		const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
			(weeks, _, i, original) => {
				const isNewWeek = i % 7 === 0;
				if (isNewWeek) {
					weeks.push({ week: i / 7 + 1, days: original.slice(i, i + 7) });
				}
				return weeks;
			},
			[],
		);
		return calendarWeeks;
	}, [currentDate, blockedDates]);

	return (
		<CalendarContainer>
			<CalendarHeader>
				<CalendarTitle>
					{currentMonth}, <span>{currentYear}</span>
				</CalendarTitle>
				<CalendarActions>
					<button onClick={handlePreviousMoth} title='Previous month'>
						<CaretLeft />
					</button>
					<button onClick={handleNextMoth} title='Next month'>
						<CaretRight />
					</button>
				</CalendarActions>
			</CalendarHeader>
			<CalendarBody>
				<thead>
					<tr>
						{shortWeekDays.map((weekDay) => (
							<th key={weekDay}>{weekDay}.</th>
						))}
					</tr>
				</thead>
				<tbody>
					{calendarWeeks.map(({ week, days }) => {
						return (
							<tr key={week}>
								{days.map(({ date, disabled }) => {
									return (
										<td key={date.toString()}>
											<CalendarDay
												disabled={disabled}
												onClick={() => onDateSelected(date.toDate())}>
												{date.get('date')}
											</CalendarDay>
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</CalendarBody>
		</CalendarContainer>
	);
}
