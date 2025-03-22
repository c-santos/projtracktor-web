import { useProjects } from '../../hooks/useProjects';
import ProjectCard from '../components/ProjectCard';
import { useState } from 'react';
import {
    Button,
    Dialog,
    Flex,
    Heading,
    ScrollArea,
    Container,
    Spinner,
} from '@radix-ui/themes';
import { AddProjectModal } from './AddProjectModal';

export function ProjectsList() {
    const {
        error,
        isLoading,
        isSuccess,
        data: projects,
        refetch,
    } = useProjects();

    const [isAddProjectModalOpen, setIsAddProjectModalOpen] =
        useState<boolean>(false);

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return (
            <>
                <h1>Oops! An error occured.</h1>
                <p>{error.stack}</p>
            </>
        );
    }

    if (isSuccess) {
        return (
            <Container>
                <Dialog.Root
                    open={isAddProjectModalOpen}
                    onOpenChange={setIsAddProjectModalOpen}
                >
                    <Flex
                        py={'3'}
                        px={'1'}
                        align={'center'}
                        justify={'between'}
                    >
                        <Heading>Projects</Heading>
                        <Dialog.Trigger>
                            <Button variant='outline'>+ Add Project</Button>
                        </Dialog.Trigger>
                        <AddProjectModal
                            refetch={refetch}
                            setIsAddProjectModalOpen={setIsAddProjectModalOpen}
                        />
                    </Flex>
                    <ScrollArea style={{ height: '85vh' }}>
                        <Flex gap={'2'} direction={'column'}>
                            {projects.map((p) => (
                                <ProjectCard {...p} key={p.id}></ProjectCard>
                            ))}
                        </Flex>
                    </ScrollArea>
                </Dialog.Root>
            </Container>
        );
    }

    return null;
}
