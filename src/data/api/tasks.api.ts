import { httpClient } from '../http.client';

class TasksApi {
    async deleteTask(taskId: string) {
        try {
            const res = await httpClient.delete(`/tasks/${taskId}`);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    }
}

export const tasksApi = new TasksApi();
