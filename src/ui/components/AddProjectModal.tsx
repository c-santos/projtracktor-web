import { Dialog, Flex, TextField, Button, Text } from '@radix-ui/themes';
import { useState } from 'react';
import { CreateProjectDto, useAddProject } from '../../hooks/useAddProject';

export function AddProjectModal({
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
        await addProjectMutation.mutateAsync(projectData);
        setIsAddProjectModalOpen(false);
        refetch();
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
