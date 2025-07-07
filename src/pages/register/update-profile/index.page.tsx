import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button, Heading, MultiStep, Text, TextArea } from '@ignite-ui/react';
import { ArrowRight } from 'phosphor-react';
import { Container, Header } from '../styles';
import { FormAnnotation, ProfileBox } from './styles';
import { useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { buildNextAuthOptions } from '@/pages/api/auth/[...nextauth].api';

const updateProfileFormSchema = z.object({
	bio: z.string().min(10),
});

type UpdateProfileFormData = z.infer<typeof updateProfileFormSchema>;

export default function updateProfile() {
	const session = useSession();

	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<UpdateProfileFormData>({
		resolver: zodResolver(updateProfileFormSchema),
	});

	async function handleUpdateProfile(data: UpdateProfileFormData) {}
	return (
		<Container>
			<Header>
				<Heading as='strong'>Bem-vindo ao Ignite Call!</Heading>
				<Text>
					Precisamos de algumas informações para criar seu perfil! Ah, você pode
					editar essas informações depois.
				</Text>
				<MultiStep size={4} currentStep={1} />
			</Header>
			<ProfileBox as='form' onSubmit={handleSubmit(handleUpdateProfile)}>
				<label>
					<Text size='sm'>Foto de perfil</Text>
				</label>

				<label>
					<Text size='sm'>Sobre você</Text>
					<TextArea {...register('bio')} />
					<FormAnnotation size='sm'>
						Fale um pouco sobre você. Isto será exibido em sua página pessoal
					</FormAnnotation>
				</label>

				<Button type='submit'>
					{isSubmitting ? 'Cadastrando...' : 'Finalizar'}
					<ArrowRight />
				</Button>
			</ProfileBox>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const session = await getServerSession(
		req,
		res,
		buildNextAuthOptions(req, res),
	);
	return {
		props: {
			session,
		},
	};
};
