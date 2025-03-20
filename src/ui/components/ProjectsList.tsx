import { useProjects } from '../../hooks/useProjects';
import ProjectCard from '../components/ProjectCard';
import { useState } from 'react';
import { CreateProjectDto, useAddProject } from '../../hooks/useAddProject';
import {
    Button,
    Dialog,
    Flex,
    TextField,
    Text,
    Heading,
    ScrollArea,
    Container,
    Spinner,
} from '@radix-ui/themes';

export function ProjectsList() {
    const {
        error,
        isLoading,
        isSuccess,
        data: projects,
        refetch,
    } = useProjects();

    const [isAddProjectModalOpen, setIsAddProjectModalOpen] =
        useState<boolean>(false);

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return (
            <>
                <h1>Oops! An error occured.</h1>
                <p>{error.stack}</p>
            </>
        );
    }

    if (isSuccess) {
        return (
            <Container>
                <Dialog.Root
                    open={isAddProjectModalOpen}
                    onOpenChange={setIsAddProjectModalOpen}
                >
                    <Flex
                        py={'3'}
                        px={'1'}
                        align={'center'}
                        justify={'between'}
                    >
                        <Heading>Projects</Heading>
                        <Dialog.Trigger>
                            <Button variant='outline'>+ Add Project</Button>
                        </Dialog.Trigger>
                        <AddProjectModal
                            refetch={refetch}
                            setIsAddProjectModalOpen={setIsAddProjectModalOpen}
                        />
                    </Flex>
                    <ScrollArea style={{ height: '85vh' }}>
                        <Flex gap={'2'} direction={'column'}>
                            {projects.map((p) => (
                                <ProjectCard {...p} key={p.id}></ProjectCard>
                            ))}
                        </Flex>
                    </ScrollArea>
                </Dialog.Root>
            </Container>
        );
    }

    return null;
}

function AddProjectModal({
    setIsAddProjectModalOpen,
    refetch,
}: {
    setIsAddProjectModalOpen: any;
    refetch: any;
}) {
    const [projectData, setProjectData] = useState<CreateProjectDto>({
        name: '',
        description: '',
    });
    const addProjectMutation = useAddProject();

    async function handleSubmit() {
        addProjectMutation.mutateAsync(projectData).then(() => {
            setIsAddProjectModalOpen(false);
            refetch();
        });
    }

    return (
        <Dialog.Content size={'4'}>
            <Dialog.Title>Add project</Dialog.Title>
            <Dialog.Description mb={'4'}>
                Enter details below for your new project.
            </Dialog.Description>
            <Flex direction='column' gap='3'>
                <label htmlFor='name'>
                    <Text as='div' size='3' mb='1' weight='bold'>
                        Name
                    </Text>
                    <TextField.Root
                        placeholder="What's your project called?"
                        size={'3'}
                        id='name'
                        autoComplete='off'
                        onChange={(e) =>
                            setProjectData((prev) => ({
                                ...prev,
                                name: e.currentTarget.value as string,
                            }))
                        }
                    />
                </label>
                <label htmlFor='description'>
                    <Text as='div' size='3' mb='1' weight='bold'>
                        Description
                    </Text>
                    <TextField.Root
                        placeholder='Give me a short and sweet description'
                        size={'3'}
                        id='description'
                        autoComplete='off'
                        onChange={(e) =>
                            setProjectData((prev) => ({
                                ...prev,
                                description: e.currentTarget.value as string,
                            }))
                        }
                    />
                </label>
            </Flex>

            <Flex gap='3' mt='4' justify='end'>
                <Button
                    color='gray'
                    variant='outline'
                    onClick={() => setIsAddProjectModalOpen(false)}
                >
                    Cancel
                </Button>
                <Button onClick={handleSubmit}>Save</Button>
            </Flex>
        </Dialog.Content>
    );
}
