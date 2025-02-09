import { useMutation } from '@tanstack/react-query';
import { projectsApi } from '../data/api/projects.api';

export interface CreateProjectDto {
    name: string;
    description: string;
}

export function useAddProject() {
    const mutation = useMutation({
        mutationFn: async (data: CreateProjectDto) => {
            const response = await projectsApi.createProject(data);

            return response;
        },
    });

    return mutation;
}
