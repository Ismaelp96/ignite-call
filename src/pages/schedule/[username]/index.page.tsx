import { Avatar, Heading, Text } from '@ignite-ui/react';
import { Container, UserHeader } from './styles';
import { GetStaticPaths, GetStaticProps } from 'next';
import prisma from '@/lib/prisma';
import { ScheduleForm } from './ScheduleForm';

interface scheduleProps {
	user: {
		name: string;
		bio: string;
		avatarUrl: string;
	};
}

export default function Schedule({ user }: scheduleProps) {
	return (
		<Container>
			<UserHeader>
				<Avatar src={user.avatarUrl} />
				<Heading>{user.name}</Heading>
				<Text size='sm'>{user.bio}</Text>
			</UserHeader>
			<ScheduleForm />
		</Container>
	);
}

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const username = String(params?.username);

	const user = await prisma.user.findUnique({
		where: {
			username,
		},
	});
	if (!user) {
		return {
			notFound: true,
		};
	}
	return {
		props: {
			user: {
				name: user.name,
				bio: user.bio,
				avatarUrl: user.avatar_url,
			},
		},
		revalidate: 60 * 60 * 24, //1 day
	};
};
