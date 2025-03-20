import { Flex, Heading, Section, Text, Box, DataList } from '@radix-ui/themes';
import { ProjectModel } from '../../types/project.type';

type ProjectHeroProps = ProjectModel;

export function ProjectHero(props: ProjectHeroProps) {
    return (
        <div>
            <Section>
                <Flex gap={'5'} direction={'column'}>
                    <Flex
                        justify={'center'}
                        direction={'column'}
                        align={'center'}
                    >
                        <Heading size={'8'}>{props.name}</Heading>
                        <Text>{props.description}</Text>
                    </Flex>
                    <Flex
                        justify={'center'}
                        direction={'column'}
                        align={'center'}
                    >
                        <Box>
                            <DataList.Root>
                                <DataList.Item>
                                    <DataList.Label>ID</DataList.Label>
                                    <DataList.Value>{props?.id}</DataList.Value>
                                </DataList.Item>

                                <DataList.Item>
                                    <DataList.Label>Created at</DataList.Label>
                                    <DataList.Value>
                                        {props?.createdAt}
                                    </DataList.Value>
                                </DataList.Item>

                                <DataList.Item>
                                    <DataList.Label>Last edited</DataList.Label>
                                    <DataList.Value>
                                        {props?.updatedAt}
                                    </DataList.Value>
                                </DataList.Item>
                            </DataList.Root>
                        </Box>
                    </Flex>
                </Flex>
            </Section>
        </div>
    );
}
