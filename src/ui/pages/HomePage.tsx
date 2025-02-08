import { Button, Container, Flex, Heading } from '@radix-ui/themes';
import { ProjectsList } from '../components/ProjectsList';

function HomePage() {
    return (
        <Container>
            <Flex direction={'column'} gap={'2'}>
                <Flex py={'4'} align={'center'} justify={'between'}>
                    <Heading as='h1' size={'8'}>
                        Projects
                    </Heading>
                    <Button variant='outline'>+ Add Project</Button>
                </Flex>
                <ProjectsList />
            </Flex>
        </Container>
    );
}

export default HomePage;
