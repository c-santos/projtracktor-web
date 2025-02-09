import {
    Box,
    Button,
    Container,
    DataList,
    Flex,
    Heading,
    Spinner,
    Text,
} from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { projectsApi } from '../../data/api/projects.api';

export function ProjectPage() {
    const { projectId } = useParams();

    const {
        data: project,
        isLoading,
        error,
        isSuccess,
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

    if (isSuccess) {
        return (
            <Container mt={'3'}>
                <Button asChild variant={'ghost'}>
                    <Link to={'/'}>Back to projects</Link>
                </Button>
                <Flex gap={'5'} direction={'column'}>
                    <Flex
                        justify={'center'}
                        direction={'column'}
                        align={'center'}
                    >
                        <Heading size={'8'}>{project?.name}</Heading>
                        <Text>{project?.description}</Text>
                    </Flex>
                    <Flex
                        justify={'center'}
                        direction={'column'}
                        align={'center'}
                    >
                        <Box>
                            <DataList.Root>
                                <DataList.Item>
                                    <DataList.Label>ID</DataList.Label>
                                    <DataList.Value>
                                        {project?.id}
                                    </DataList.Value>
                                </DataList.Item>

                                <DataList.Item>
                                    <DataList.Label>Created at</DataList.Label>
                                    <DataList.Value>
                                        {project?.createdAt}
                                    </DataList.Value>
                                </DataList.Item>

                                <DataList.Item>
                                    <DataList.Label>Last edited</DataList.Label>
                                    <DataList.Value>
                                        {project?.updatedAt}
                                    </DataList.Value>
                                </DataList.Item>
                            </DataList.Root>
                        </Box>
                    </Flex>
                </Flex>
            </Container>
        );
    }
}

function ProjectMetaData() {}
