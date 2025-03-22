import { useState } from 'react';
import { useProjectTasks } from '../../hooks/useProjectTasks';
import {
    Badge,
    Button,
    Text,
    Card,
    Dialog,
    Flex,
    Heading,
    ScrollArea,
    Spinner,
} from '@radix-ui/themes';
import { AddTaskModal } from './AddTaskModal';
import { formatDate } from '../../utils';
import { Link } from 'react-router-dom';

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
                        <AddTaskModal
                            setModalOpen={setAddTaskModalOpen}
                            refetch={refetch}
                        />
                    </Flex>
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
                </Dialog.Root>
            </>
        );
    }

    return null;
}
