import { useQuery } from "@tanstack/react-query";
import { projectsApi } from "../data/api/projects.api";

export function useProjects() {
    const query = useQuery({
        queryKey: ['projects'],
        queryFn: async () => await projectsApi.getProjects()
    })

    return query
}
