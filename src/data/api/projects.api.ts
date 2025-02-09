import { ProjectModel } from '../../types/project.type';
import { httpClient } from '../http.client';

class ProjectsApi {
    async getProjects() {
        try {
            const res = await httpClient.get<ProjectModel[]>('/projects');
            return res.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async createProject(data: any) {
        try {
            console.log(data)
            const res = await httpClient.post('/projects', data)
            return res
        } catch (error) {
            console.error(error)
        }
    }
}

export const projectsApi = new ProjectsApi()
