import {
    Button,
    Container,
    Dialog,
    Flex,
    Heading,
    TextField,
    Text,
} from '@radix-ui/themes';
import { ProjectsList } from '../components/ProjectsList';
import { projectsApi } from '../../data/api/projects.api';
import { useState } from 'react';

function HomePage() {
    return (
        <Container>
            <Dialog.Root>
                <Flex direction={'column'} gap={'2'}>
                    <Flex
                        py={'4'}
                        px={'1'}
                        align={'center'}
                        justify={'between'}
                    >
                        <Heading as='h1' size={'8'}>
                            Projects
                        </Heading>
                        <Dialog.Trigger>
                            <Button variant='outline'>+ Add Project</Button>
                        </Dialog.Trigger>
                    </Flex>
                    <ProjectsList />
                </Flex>
                <AddProjectModal />
            </Dialog.Root>
        </Container>
    );
}

function AddProjectModal() {
    const [projectData, setProjectData] = useState<{
        name: string;
        description: string;
    }>({ name: '', description: '' });

    async function handleSubmit() {
        const response = await projectsApi.createProject(projectData);
        console.log(response);
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
                <Dialog.Close>
                    <Button variant='soft' color='gray'>
                        Cancel
                    </Button>
                </Dialog.Close>
                <Dialog.Close>
                    <Button onClick={handleSubmit}>Save</Button>
                </Dialog.Close>
            </Flex>
        </Dialog.Content>
    );
}

export default HomePage;
