import { useMutation } from '@tanstack/react-query';
import { projectsApi } from '../data/api/projects.api';
import { TaskPriority } from '../ui/components/PriorityChip';

export type UpdateProjectTaskDto = {
    projectId: string;
    taskId: string;
    name?: string;
    description?: string;
    completed?: boolean;
    priority?: TaskPriority;
};

export function useUpdateProjectTask(projectId: string, taskId: string) {
    const mutation = useMutation({
        mutationKey: ['projects', projectId, 'task', taskId],
        mutationFn: async (data: UpdateProjectTaskDto) => {
            return await projectsApi.updateProjectTask(projectId, taskId, data);
        },
    });

    return mutation;
}
