import { BaseModel } from "./base.interface";

export interface ProjectModel extends BaseModel {
    name: string;
    description: string;
    completed: boolean;
}
