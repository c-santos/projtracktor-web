import { ProjectModel } from "../../types/project.type"
import { StatusChip } from "./StatusChip"
import './ProjectCard.css'

export type ProjectCardProps = ProjectModel

export default function ProjectCard({
    name,
    description,
    completed,
    createdAt,
    updatedAt
}: ProjectCardProps) {
    return (
        <div className="project-card-container">
            <div className="project-card-heading">
                <div className="heading-left">
                    <strong id="title">{name}</strong>
                    <span id="desc">{description}</span>
                </div>
                <div className="heading-right">
                    <StatusChip completed={completed} />
                </div>
            </div>
            <div className="footer">
                <span>Last updated at: {updatedAt}</span>
                <br />
                <span>Created at: {createdAt}</span>
            </div>
        </div>
    )
}

