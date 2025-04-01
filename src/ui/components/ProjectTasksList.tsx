import { useState } from 'react';
import { useProjectTasks } from '../../hooks/useProjectTasks';
import {
    Button,
    Dialog,
    Flex,
    Heading,
    Separator,
    Spinner,
    Text,
} from '@radix-ui/themes';
import { AddProjectTaskModal } from './AddTaskModal';
import { TaskCard } from './TaskCard';

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
                    {tasks
                        ?.filter((tasks) => !tasks.completed)
                        .map((task) => <TaskCard key={task.id} task={task} />)}
                    <Flex justify={'center'} gap={'4'} my={'5'}>
                        <Separator size={'4'} my={'2'} />
                        <Text size={'2'} color='gray'>
                            Completed
                        </Text>
                        <Separator size={'4'} my={'2'} />
                    </Flex>
                    {tasks
                        ?.filter((tasks) => tasks.completed)
                        .map((task) => <TaskCard key={task.id} task={task} />)}
                </Dialog.Root>
            </>
        );
    }

    return null;
}
