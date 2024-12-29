import './StatusChip.css'

type StatusChipProps = {
    completed: boolean;
}

export function StatusChip({ completed }: StatusChipProps) {
    return (
        <div className='chip-bg' data-completed={completed}>
            {completed ? <strong>Done</strong> : <strong>Ongoing</strong>}
        </div>
    )
}

