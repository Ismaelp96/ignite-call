import { Button, Text, TextArea, TextInput } from '@ignite-ui/react';
import { ConfirmForm, FormActions, FormError, FormHeader } from './styles';
import { CalendarBlank, Clock } from 'phosphor-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';

const confirmFormSchema = z.object({
	name: z
		.string()
		.min(3, { message: 'O nome precisa de no mínio 3 caracteres' }),
	email: z.string().email({ message: 'Digite um e-mail válido' }),
	observations: z.string().nullable(),
});

type ConfirmFormSchemaData = z.infer<typeof confirmFormSchema>;

interface ConfirmStepProps {
	schedulingDate: Date;
	onCancelConfirmation: () => void;
}

export function ConfirmStep({
	schedulingDate,
	onCancelConfirmation,
}: ConfirmStepProps) {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm<ConfirmFormSchemaData>({
		resolver: zodResolver(confirmFormSchema),
	});
	function handleConfirmScheduling(data: ConfirmFormSchemaData) {}
	const descibedDate = dayjs(schedulingDate).format('DD[ de ] MMMM[ de ] YYYY');
	const describedTime = dayjs(schedulingDate).format('HH:mm[h]');
	return (
		<ConfirmForm as='form' onSubmit={handleSubmit(handleConfirmScheduling)}>
			<FormHeader>
				<Text>
					<CalendarBlank />
					{descibedDate}
				</Text>
				<Text>
					<Clock />
					{describedTime}
				</Text>
			</FormHeader>
			<label>
				<Text size='sm'>Nome Completo</Text>
				<TextInput placeholder='Seu nome' {...register('name')} />
				{errors.name && <FormError size='sm'>{errors.name.message}</FormError>}
			</label>
			<label>
				<Text size='sm'>Endereço de e-mail</Text>
				<TextInput
					type='email'
					placeholder='johndoe@example.com'
					{...register('email')}
				/>
				{errors.name && <FormError size='sm'>{errors.name.message}</FormError>}
			</label>
			<label>
				<Text size='sm'>Observações</Text>
				<TextArea {...register('observations')} />
			</label>
			<FormActions>
				<Button type='button' variant='tertiary' onClick={onCancelConfirmation}>
					Cancelar
				</Button>
				<Button type='submit' disabled={isSubmitting}>
					{isSubmitting ? 'Confirmando...' : 'Confirmar'}
				</Button>
			</FormActions>
		</ConfirmForm>
	);
}
