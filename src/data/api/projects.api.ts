import { ProjectModel } from '../../types/project.type';
import { TaskModel } from '../../types/task.type';
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
            console.log(data);
            const res = await httpClient.post('/projects', data);
            return res;
        } catch (error) {
            console.error(error);
        }
    }

    async getOneProject(id: string) {
        try {
            const res = await httpClient.get<ProjectModel>(`/projects/${id}`);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    }

    async getProjectTasks(projectId: string) {
        try {
            const res = await httpClient.get<TaskModel[]>(
                `/projects/${projectId}/tasks`
            );
            return res.data;
        } catch (error) {
            console.error(error);
        }
    }

    async createProjectTask(projectId: string, data: any) {
        try {
            const res = await httpClient.post(
                `/projects/${projectId}/tasks`,
                data
            );
            return res;
        } catch (error) {
            console.error(error);
        }
    }
}

export const projectsApi = new ProjectsApi();
