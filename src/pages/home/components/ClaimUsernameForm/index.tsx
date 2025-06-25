import { ArrowRight } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { Button, TextInput } from '@ignite-ui/react';

import { Form } from './styles';
import { z } from 'zod';

const claimUsernameFormSchema = z.object({
	username: z.string(),
});

type ClaimUsernameFormSchema = z.infer<typeof claimUsernameFormSchema>;
export function ClaimUsernameForm() {
	const { register, handleSubmit } = useForm<ClaimUsernameFormSchema>();

	async function handleClaimUsername(data: ClaimUsernameFormSchema) {
		console.log(data);
	}
	return (
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
	);
}
