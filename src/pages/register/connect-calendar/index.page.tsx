import { signIn, useSession } from 'next-auth/react';
import { Button, Heading, MultiStep, Text } from '@ignite-ui/react';
import { ArrowRight, Check } from 'phosphor-react';

import { Container, Header } from '../styles';
import { AuthError, ConnectBox, ConnectItem } from './styles';
import { useRouter } from 'next/router';

export default function ConnectCalendar() {
	const session = useSession();
	const router = useRouter();

	const isSignedIn = session.status === 'authenticated';

	const hasAuthError = !!router.query.error;

	async function handleConnectCalendar() {
		await signIn('google');
	}

	async function handleNavigateToNextStep() {
		await router.push(`/register/time-intervals`);
	}

	return (
		<Container>
			<Header>
				<Heading as='strong'>Conecte sua agenda!</Heading>
				<Text>
					Conecte o seu calendário para verificar automaticamente as horas
					ocupadas e os novos eventos à medida em que são agendados.
				</Text>
				<MultiStep size={4} currentStep={2} />
			</Header>
			<ConnectBox>
				<ConnectItem>
					<Text>Google Calendar</Text>
					{!isSignedIn ? (
						<Button
							variant='secondary'
							size='sm'
							onClick={handleConnectCalendar}>
							Conectar
							<ArrowRight />
						</Button>
					) : (
						<Button size='sm' disabled>
							Conectado
							<Check />
						</Button>
					)}
				</ConnectItem>
				{hasAuthError && (
					<AuthError size='sm'>
						Falha ao se conectar ao Google, verifique se você habilitou as
						permissões de acesso ao Google Calendar
					</AuthError>
				)}
				<Button
					type='submit'
					disabled={!isSignedIn}
					onClick={handleNavigateToNextStep}>
					Próxima passo
					<ArrowRight />
				</Button>
			</ConnectBox>
		</Container>
	);
}
