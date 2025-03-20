import {
    Badge,
    Button,
    Card,
    Container,
    Flex,
    Heading,
    ScrollArea,
    Spinner,
    Text,
} from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { projectsApi } from '../../data/api/projects.api';
import { ProjectHero } from '../components/ProjectHero';
import { useProjectTasks } from '../../hooks/useProjectTasks';
import { formatDate } from '../../utils';

export function ProjectPage() {
    const { projectId } = useParams();

    const {
        data: project,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['projects', projectId],
        queryFn: async () => await projectsApi.getOneProject(projectId!),
    });

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return <p>{error.stack}</p>;
    }

    return (
        <Container mt={'3'}>
            <Button asChild variant={'ghost'}>
                <Link to={'/'}>Back to projects</Link>
            </Button>
            <ProjectHero {...project!} />
            <ProjectTasksList projectId={projectId!} />
        </Container>
    );
}

function ProjectTasksList(props: { projectId: string }) {
    const {
        data: tasks,
        isSuccess,
        isLoading,
        error,
    } = useProjectTasks(props.projectId);

    if (isLoading) return <Spinner />;

    if (error)
        return (
            <div>
                <h1>an error occured.</h1>
                <p>{error.stack}</p>
            </div>
        );

    if (isSuccess) {
        return (
            <>
                <Heading size={'4'}>Tasks</Heading>
                <ScrollArea style={{ height: '85vh' }}>
                    <Flex gap={'2'} direction={'column'}></Flex>
                    {tasks?.map((task) => (
                        <Card asChild>
                            <Link to={`/projects/${task.id}`}>
                                <Flex direction={'column'} gap={'2'}>
                                    <Flex justify={'between'}>
                                        <Heading size={'3'}>
                                            {task.name}
                                        </Heading>
                                        <Badge variant='soft' size={'3'}>
                                            {task.priority
                                                ? 'Completed'
                                                : 'In progress'}
                                        </Badge>
                                    </Flex>
                                    <Flex justify={'between'}>
                                        <Text color='gray' size={'2'}>
                                            {task.description}
                                        </Text>
                                        <Text color='gray' size={'2'}>
                                            {formatDate(task.updatedAt)}
                                        </Text>
                                    </Flex>
                                </Flex>
                            </Link>
                        </Card>
                    ))}
                </ScrollArea>
            </>
        );
    }

    return null;
}
