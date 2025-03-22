import { Button, Container, Spinner } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { projectsApi } from '../../data/api/projects.api';
import { ProjectHero } from '../components/ProjectHero';
import { ProjectTasksList } from '../components/ProjectTasksList';

export function ProjectPage() {
    const { projectId } = useParams();

    const {
        data: project,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['projects', projectId],
        queryFn: async () => await projectsApi.getOneProject(projectId!),
    });

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return <p>{error.stack}</p>;
    }

    return (
        <Container mt={'3'}>
            <Button asChild variant={'ghost'}>
                <Link to={'/'}>Back to projects</Link>
            </Button>
            <ProjectHero {...project!} />
            <ProjectTasksList projectId={projectId!} />
        </Container>
    );
}
