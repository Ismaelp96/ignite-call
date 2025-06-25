import Image from 'next/image';
import { Heading, Text } from '@ignite-ui/react';

import { Container, Hero, Preview } from './styles';
import previewImage from '../../assets/app-preview.png';
import { ClaimUsernameForm } from './components/ClaimUsernameForm';

export default function HomePage() {
	return (
		<Container>
			<Hero>
				<Heading size='4xl'>Agendamento descomplicado</Heading>
				<Text size='xl'>
					Conecte seu calendário e permita que as pessoas marquem agendamentos
					no seu tempo livre.
				</Text>
				<ClaimUsernameForm />
			</Hero>
			<Preview>
				<Image
					src={previewImage}
					width={827}
					height={442}
					alt='Calendário simbolizando aplicação em funcionamento'
					quality={100}
					priority
				/>
			</Preview>
		</Container>
	);
}
