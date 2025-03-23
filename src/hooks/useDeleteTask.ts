import { useMutation } from '@tanstack/react-query';
import { tasksApi } from '../data/api/tasks.api';

export function useDeleteTask() {
    const mutation = useMutation({
        mutationFn: async (taskId: string) => await tasksApi.deleteTask(taskId),
    });

    return mutation;
}
