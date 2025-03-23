import { useCallback, useState } from "react";
import { TaskModel } from "../../types/task.type";
import { UpdateProjectTaskDto, useUpdateProjectTask } from "../../hooks/useUpdateProjectTask";
import { queryClient } from "../../data/http.client";
import { Card, Checkbox, Flex, Heading, Text } from "@radix-ui/themes";
import { PriorityChip } from "./PriorityChip";
import { formatDate } from "../../utils";

export function TaskCard(props: { task: TaskModel }) {
    const { task } = props;
    const [checkbox, setCheckbox] = useState<boolean>(task.completed);

    const mutation = useUpdateProjectTask(task.projectId!, task.id);

    const markAsCompleted = useCallback(
        async function () {
            setCheckbox(!checkbox);

            await mutation.mutateAsync({
                completed: !task.completed,
            } as UpdateProjectTaskDto);

            // Trigger a refetch
            await queryClient.invalidateQueries({
                queryKey: ['projects', task.projectId],
            });
        },
        [task.completed],
    );

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
                    <Checkbox
                        size={'3'}
                        style={{ cursor: 'pointer' }}
                        onCheckedChange={markAsCompleted}
                        checked={checkbox}
                    />
                </Flex>
            </Flex>
        </Card>
    );
}
