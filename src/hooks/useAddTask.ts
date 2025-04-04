import { useMutation } from '@tanstack/react-query';
import { projectsApi } from '../data/api/projects.api';
import { TaskPriority } from '../ui/components/PriorityChip';

export type CreateProjectTaskDto = {
    projectId: string;
    name: string;
    description: string;
    priority: TaskPriority;
    completed: boolean;
};

export function useAddTask() {
    const mutation = useMutation({
        mutationFn: async (data: CreateProjectTaskDto) => {
            const { projectId, ...taskData } = data;
            const response = await projectsApi.createProjectTask(
                projectId,
                taskData,
            );

            return response;
        },
    });

    return mutation;
}
