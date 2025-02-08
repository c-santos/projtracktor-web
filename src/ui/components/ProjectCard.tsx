import { ProjectModel } from '../../types/project.type';
import { formatDate } from '../../utils';
import { Badge, Card, Flex, Heading, Text } from '@radix-ui/themes';
import { Link } from 'react-router-dom';

export type ProjectCardProps = ProjectModel;

export default function ProjectCard({
    name,
    description,
    completed,
    updatedAt,
}: ProjectCardProps) {
    return (
        <Card asChild>
            <Link to={'/'}>
                <Flex direction={'column'} gap={'2'}>
                    <Flex justify={'between'}>
                        <Heading>{name}</Heading>
                        <Badge variant='soft' size={'3'}>
                            {completed ? 'Completed' : 'In progress'}
                        </Badge>
                    </Flex>
                    <Flex justify={'between'}>
                        <Text color='gray'>{description}</Text>
                        <Text color='gray'>{formatDate(updatedAt)}</Text>
                    </Flex>
                </Flex>
            </Link>
        </Card>
    );
}
