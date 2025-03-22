import { useState } from 'react';
import { useProjectTasks } from '../../hooks/useProjectTasks';
import {
    Button,
    Text,
    Card,
    Dialog,
    Flex,
    Heading,
    Spinner,
    Checkbox,
    Grid,
    Container,
} from '@radix-ui/themes';
import { AddProjectTaskModal } from './AddTaskModal';
import { formatDate } from '../../utils';
import { Link } from 'react-router-dom';
import { PriorityChip } from './PriorityChip';
import { TaskModel } from '../../types/task.type';
import { CheckboxGroupIndicator } from '@radix-ui/themes/components/checkbox-group.primitive';

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
                        <TaskCard key={task.id} task={task} />
                    ))}
                </Dialog.Root>
            </>
        );
    }

    return null;
}

function TaskCard(props: { task: TaskModel }) {
    const { task } = props;

    return (
        <Card key={task.id}>
            <Flex direction={'row'} justify={'between'} align={'stretch'}>
                <Flex direction={'column'} flexGrow={'1'}>
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
                    <Checkbox size={'3'} style={{ cursor: 'pointer' }} />
                </Flex>
            </Flex>
        </Card>
    );
}
