import { Button, Text, TextArea, TextInput } from '@ignite-ui/react';
import { ConfirmForm, FormActions, FormError, FormHeader } from './styles';
import { CalendarBlank, Clock } from 'phosphor-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const confirmFormSchema = z.object({
	name: z
		.string()
		.min(3, { message: 'O nome precisa de no mínio 3 caracteres' }),
	email: z.string().email({ message: 'Digite um e-mail válido' }),
	observations: z.string().nullable(),
});

type ConfirmFormSchemaData = z.infer<typeof confirmFormSchema>;

export function ConfirmStep() {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm<ConfirmFormSchemaData>({
		resolver: zodResolver(confirmFormSchema),
	});
	function handleConfirmScheduling(data: ConfirmFormSchemaData) {
		console.log(data);
	}
	return (
		<ConfirmForm as='form' onSubmit={handleSubmit(handleConfirmScheduling)}>
			<FormHeader>
				<Text>
					<CalendarBlank />
					22 de Setembro de 2022
				</Text>
				<Text>
					<Clock />
					18:00h
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
				<Button type='button' variant='tertiary'>
					Cancelar
				</Button>
				<Button type='submit' disabled={isSubmitting}>
					{isSubmitting ? 'Confirmando...' : 'Confirmar'}
				</Button>
			</FormActions>
		</ConfirmForm>
	);
}
