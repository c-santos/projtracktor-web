import {
    Dialog,
    Flex,
    TextField,
    Button,
    Text,
    Select,
    Checkbox,
} from '@radix-ui/themes';
import { useState } from 'react';
import { TaskPriority } from './PriorityChip';
import { TaskModel } from '../../types/task.type';
import { useUpdateProjectTask } from '../../hooks/useUpdateProjectTask';
import { queryClient } from '../../data/http.client';

export function EditTaskModal({
    task,
    setModalOpen,
}: {
    task: TaskModel;
    setModalOpen: any;
}) {
    const [taskData, setTaskData] = useState<TaskModel>(task);

    const editTaskMutation = useUpdateProjectTask(task.projectId!, task.id);

    async function handleEdit() {
        await editTaskMutation.mutateAsync({
            name: taskData.name,
            description: taskData.description,
            completed: taskData.completed,
            priority: taskData.priority,
        });
        setModalOpen(false);
        await queryClient.invalidateQueries({
            queryKey: ['projects', task.projectId, 'tasks'],
        });
    }

    function handleClose() {
        setModalOpen(false);
    }

    return (
        <Dialog.Content size={'4'}>
            <Dialog.Title>Edit task</Dialog.Title>
            <Dialog.Description mb={'4'}>
                Edit details of your task.
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
                        value={taskData.name}
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
                        value={taskData.description}
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
                            <Select.Item value={TaskPriority.NONE}>
                                None
                            </Select.Item>
                        </Select.Content>
                    </Select.Root>
                </label>
                <label htmlFor='completed'>
                    <Text as='label' size={'2'}>
                        <Flex gap={'2'}>
                            <Checkbox
                                checked={taskData.completed}
                                onCheckedChange={(checked) =>
                                    setTaskData((prev) => ({
                                        ...prev,
                                        completed: checked as boolean,
                                    }))
                                }
                            />
                            Completed
                        </Flex>
                    </Text>
                </label>
            </Flex>

            <Flex gap='3' mt='4' justify='end'>
                <Button color='gray' variant='outline' onClick={handleClose}>
                    Cancel
                </Button>
                <Button onClick={handleEdit}>Save</Button>
            </Flex>
        </Dialog.Content>
    );
}
