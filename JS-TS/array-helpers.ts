export function mapArray<T, R>(source: readonly T[], mapper: (item: T, index: number) => R): R[] {
    if (source === null || source === undefined) {
        throw new Error("mapArray is not implemented");
    }

    const mappedArr: R[] = [];
    let index = 0;

    for (const item of source) {
        mappedArr.push(mapper(item, index++));
    }

    return mappedArr;
}

export function filterArray<T>(source: readonly T[], predicate: (item: T, index: number) => boolean): T[] {
    if (source === null || source === undefined) {
        throw new Error("filterArray is not implemented");
    }

    const filteredArr: T[] = [];
    let index = 0;

    for (const item of source) {
        if (predicate(item, index++)) {
            filteredArr.push(item);
        }
    }

    return filteredArr;
}

export function reduceArray<T, R>(source: readonly T[], reducer: (acc: R, item: T, index: number) => R, initial: R): R {
    if (source === null || source === undefined) {
        throw new Error("reduceArray is not implemented");
    }

    let acc = initial;
    let index = 0;

    for (const item of source) {
        acc = reducer(acc, item, index++);
    }

    return acc;
}

export function partition<T>(source: readonly T[], predicate: (item: T) => boolean): [T[], T[]] {
    if (source === null || source === undefined) {
        throw new Error("partition is not implemented");
    }

    const pass: T[] = [];
    const fail: T[] = [];

    for (const item of source) {
        if (predicate(item)) {
            pass.push(item);
        } else {
            fail.push(item);
        }
    }

    return [pass, fail];
}

export function groupBy<T, K extends PropertyKey>(source: readonly T[], keySelector: (item: T) => K): Record<K, T[]> {
    if (source === null || source === undefined) {
        throw new Error("groupBy: not implemented");
    }

    const groups = {} as Record<K, T[]>;

    for (const item of source) {
        const key = keySelector(item);

        if (!groups[key]) {
            groups[key] = [];
        }

        groups[key].push(item);
    }

    return groups;
}
