import { useState } from 'react';
import { useProjectTasks } from '../../hooks/useProjectTasks';
import {
    Button,
    Text,
    Card,
    Dialog,
    Flex,
    Heading,
    ScrollArea,
    Spinner,
} from '@radix-ui/themes';
import { AddProjectTaskModal } from './AddTaskModal';
import { formatDate } from '../../utils';
import { Link } from 'react-router-dom';
import { PriorityChip } from './PriorityChip';

export function ProjectTasksList(props: { projectId: string }) {
    const {
        data: tasks,
        isSuccess,
        isLoading,
        error,
        refetch,
    } = useProjectTasks(props.projectId);

    const [addTaskModalOpen, setAddTaskModalOpen] = useState<boolean>(false);

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
                <Dialog.Root
                    open={addTaskModalOpen}
                    onOpenChange={setAddTaskModalOpen}
                >
                    <Flex
                        py={'3'}
                        px={'1'}
                        align={'center'}
                        justify={'between'}
                    >
                        <Heading size={'4'}>Tasks</Heading>
                        <Dialog.Trigger>
                            <Button variant='outline'>+ Add Task</Button>
                        </Dialog.Trigger>
                        <AddProjectTaskModal
                            projectId={props.projectId}
                            setModalOpen={setAddTaskModalOpen}
                            refetch={refetch}
                        />
                    </Flex>
                    <Flex gap={'2'} direction={'column'}></Flex>
                    {tasks?.map((task) => (
                        <Card asChild key={task.id}>
                            <Link to={`/projects/${task.id}`}>
                                <Flex direction={'column'} gap={'2'}>
                                    <Flex justify={'between'}>
                                        <Heading size={'3'}>
                                            {task.name}
                                        </Heading>
                                        <PriorityChip
                                            priority={task.priority!}
                                        />
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
                </Dialog.Root>
            </>
        );
    }

    return null;
}
