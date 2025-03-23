import { useCallback, useState } from 'react';
import { TaskModel } from '../../types/task.type';
import {
    UpdateProjectTaskDto,
    useUpdateProjectTask,
} from '../../hooks/useUpdateProjectTask';
import { queryClient } from '../../data/http.client';
import {
    Card,
    Checkbox,
    ContextMenu,
    Dialog,
    Flex,
    Heading,
    Text,
} from '@radix-ui/themes';
import { PriorityChip } from './PriorityChip';
import { formatDate } from '../../utils';
import { useDeleteTask } from '../../hooks/useDeleteTask';
import { EditTaskModal } from './EditTaskModal';

type TaskCardProps = {
    task: TaskModel;
};

export function TaskCard(props: TaskCardProps) {
    const { task } = props;
    const [checkbox, setCheckbox] = useState<boolean>(task.completed);
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

    const mutation = useUpdateProjectTask(task.projectId!, task.id);
    const deleteMutation = useDeleteTask();

    const markAsCompleted = useCallback(
        async function () {
            setCheckbox(!checkbox);

            await mutation.mutateAsync({
                completed: !task.completed,
            } as UpdateProjectTaskDto);

            // Trigger a refetch
            await queryClient.invalidateQueries({
                queryKey: ['projects', task.projectId, 'tasks'],
            });
        },
        [task.completed],
    );

    const handleDeleteTask = async () => {
        await deleteMutation.mutateAsync(task.id);

        // Trigger a refetch
        await queryClient.invalidateQueries({
            queryKey: ['projects', task.projectId, 'tasks'],
        });
    };

    return (
        <Dialog.Root open={editModalOpen} onOpenChange={setEditModalOpen}>
            <ContextMenu.Root>
                <ContextMenu.Trigger>
                    <Card key={task.id}>
                        <Flex
                            direction={'row'}
                            justify={'between'}
                            align={'stretch'}
                        >
                            <Flex
                                direction={'column'}
                                flexGrow={'1'}
                                onClick={() => setEditModalOpen(true)}
                                style={{ cursor: 'pointer' }}
                            >
                                <Flex direction={'row'} justify={'between'}>
                                    <Heading size={'3'}>{task.name}</Heading>
                                    <PriorityChip priority={task.priority!} />
                                </Flex>

                                <Flex direction={'row'} justify={'between'}>
                                    <Text color='gray' size={'2'}>
                                        {task.description}
                                    </Text>
                                    <Text color='gray' size={'2'}>
                                        {formatDate(task.updatedAt)}
                                    </Text>
                                </Flex>
                            </Flex>
                            <Flex
                                direction={'row'}
                                justify={'between'}
                                align={'center'}
                                mx={'2'}
                                px={'2'}
                            >
                                <Checkbox
                                    size={'3'}
                                    style={{ cursor: 'pointer' }}
                                    onCheckedChange={markAsCompleted}
                                    checked={checkbox}
                                />
                            </Flex>
                        </Flex>
                    </Card>
                </ContextMenu.Trigger>
                <EditTaskModal task={task} setModalOpen={setEditModalOpen} />
                <ContextMenu.Content size={'2'}>
                    <ContextMenu.Item shortcut='E'>Edit</ContextMenu.Item>
                    <ContextMenu.Item
                        shortcut='D'
                        color='red'
                        onClick={handleDeleteTask}
                    >
                        Delete
                    </ContextMenu.Item>
                </ContextMenu.Content>
            </ContextMenu.Root>
        </Dialog.Root>
    );
}
