import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ArrowRight } from 'phosphor-react';
import { Button, Text, TextInput } from '@ignite-ui/react';

import { Form, FormAnnotation } from './styles';

const claimUsernameFormSchema = z.object({
	username: z
		.string()
		.min(3, { message: ' o usuário precisa ter pelo menos 3 letras!' })
		.regex(/^([a-z\\-]+)$/i, {
			message: 'O usuário pode ter apenas letras e hífen!',
		})
		.transform((username) => username.toLowerCase()),
});

type ClaimUsernameFormSchema = z.infer<typeof claimUsernameFormSchema>;
export function ClaimUsernameForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ClaimUsernameFormSchema>({
		resolver: zodResolver(claimUsernameFormSchema),
	});

	async function handleClaimUsername(data: ClaimUsernameFormSchema) {
		console.log(data);
	}
	return (
		<>
			<Form as='form' onSubmit={handleSubmit(handleClaimUsername)}>
				<TextInput
					size='sm'
					prefix='ignite.com/'
					placeholder={'seu-usuario'}
					{...register('username')}
				/>
				<Button size='sm' type='submit'>
					Reservar
					<ArrowRight />
				</Button>
			</Form>
			<FormAnnotation>
				<Text size='sm'>
					{errors.username
						? errors.username.message
						: 'Digite o nome do usuário desejado!'}
				</Text>
			</FormAnnotation>
		</>
	);
}
