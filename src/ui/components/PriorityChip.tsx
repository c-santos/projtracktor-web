import { Badge } from '@radix-ui/themes';

export enum TaskPriority {
    LOW = 'Low',
    MEDIUM = 'Medium',
    HIGH = 'High',
}

export type PriorityChipProps = {
    priority: TaskPriority | string;
};

export function PriorityChip(props: PriorityChipProps) {
    function color() {
        switch (props.priority) {
            case TaskPriority.LOW:
                return 'blue';
            case TaskPriority.MEDIUM:
                return 'orange';
            case TaskPriority.HIGH:
                return 'red';
            default:
                return 'green';
        }
    }

    function text() {
        switch (props.priority) {
            case TaskPriority.LOW:
                return 'Low';
            case TaskPriority.MEDIUM:
                return 'Medium';
            case TaskPriority.HIGH:
                return 'High';
            default:
                return 'None';
        }
    }

    return (
        <Badge size={'3'} variant='soft' color={color()}>
            {text()}
        </Badge>
    );
}
