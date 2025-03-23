import {
    Dialog,
    Flex,
    TextField,
    Button,
    Text,
    Select,
} from '@radix-ui/themes';
import { useState } from 'react';
import { CreateProjectTaskDto, useAddTask } from '../../hooks/useAddTask';
import { TaskPriority } from './PriorityChip';

export function AddProjectTaskModal({
    projectId,
    setModalOpen,
    refetch,
}: {
    projectId: string,
    setModalOpen: any;
    refetch: any;
}) {

    const [taskData, setTaskData] = useState<CreateProjectTaskDto>({
        projectId: projectId!,
        name: '',
        description: '',
        priority: TaskPriority.LOW,
        completed: false,
    });

    const addTaskMutation = useAddTask();

    async function handleSubmit() {
        await addTaskMutation.mutateAsync(taskData);
        setModalOpen(false);
        refetch();
    }

    return (
        <Dialog.Content size={'4'}>
            <Dialog.Title>Add task</Dialog.Title>
            <Dialog.Description mb={'4'}>
                Enter details below for your new task.
            </Dialog.Description>
            <Flex direction='column' gap='3'>
                <label htmlFor='name'>
                    <Text as='div' size='3' mb='1' weight='bold'>
                        Name
                    </Text>
                    <TextField.Root
                        placeholder='What to do?'
                        size={'3'}
                        id='name'
                        autoComplete='off'
                        onChange={(e) =>
                            setTaskData((prev) => ({
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
                            setTaskData((prev) => ({
                                ...prev,
                                description: e.currentTarget.value as string,
                            }))
                        }
                    />
                </label>
                <label htmlFor='priority'>
                    <Text as='div' size='3' mb='1' weight='bold'>
                        Priority
                    </Text>
                    <Select.Root
                        defaultValue='low'
                        value={taskData.priority}
                        onValueChange={(value) =>
                            setTaskData((prev) => ({
                                ...prev,
                                priority: value as TaskPriority,
                            }))
                        }
                    >
                        <Select.Trigger />
                        <Select.Content>
                            <Select.Item value={TaskPriority.HIGH}>
                                High
                            </Select.Item>
                            <Select.Item value={TaskPriority.MEDIUM}>
                                Medium
                            </Select.Item>
                            <Select.Item value={TaskPriority.LOW}>
                                Low
                            </Select.Item>
                        </Select.Content>
                    </Select.Root>
                </label>
            </Flex>

            <Flex gap='3' mt='4' justify='end'>
                <Button
                    color='gray'
                    variant='outline'
                    onClick={() => setModalOpen(false)}
                >
                    Cancel
                </Button>
                <Button onClick={handleSubmit}>Save</Button>
            </Flex>
        </Dialog.Content>
    );
}
