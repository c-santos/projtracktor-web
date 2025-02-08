import { useProjects } from '../../hooks/useProjects';
import ProjectCard from '../components/ProjectCard';

export function ProjectsList() {
    const { error, isLoading, isSuccess, data: projects } = useProjects();

    if (isLoading) {
        return <p>Loading...</p>;
    } else if (error) {
        return (
            <>
                <p>error</p>
                <p>{error.stack}</p>
            </>
        );
    }

    if (isSuccess) {
        return (
            <>
                {projects.map((p) => (
                    <ProjectCard {...p}></ProjectCard>
                ))}
            </>
        );
    }

    return null;
}
