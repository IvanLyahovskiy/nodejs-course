import { Todo, TodoStatus } from "./types";

export function toggleAll(state: Todo[], completed: boolean): Todo[] {
    const globalStatus = completed ? TodoStatus.COMPLETED : TodoStatus.IN_PROGRESS;

    return state.map(item => ({ ...item, status: globalStatus }));
}

export function clearCompleted(state: Todo[]): Todo[] {
    return state.filter(item => item.status !== TodoStatus.COMPLETED);
}

export function countByStatus(state: Todo[], status: TodoStatus): number {
    return state.reduce((acc, cur) => {
        if (cur.status === status) {
            return acc + 1;
        }
        return acc;
    }, 0);
}
