import { useQuery } from '@tanstack/react-query';
import { projectsApi } from '../data/api/projects.api';

export function useProjectTasks(projectId: string) {
    const query = useQuery({
        queryKey: ['projects', projectId, 'tasks'],
        queryFn: async ({ queryKey }) =>
            await projectsApi.getProjectTasks(queryKey[1]),
    });

    return query;
}
