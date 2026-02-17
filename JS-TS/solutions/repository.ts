export class InMemoryRepository<T extends { id: number }> {
    private items: T[] = [];

    add(entity: T): T {
        const exists = this.items.some(item => item.id === entity.id);
        if (exists) {
            throw new Error("add: not implemented");
        }

        this.items = [...this.items, entity];
        return entity;
    }

    update(id: number, patch: Partial<T>): T {
        let updatedItem: T | null = null;
        this.items = this.items.map(item => {
            if (item.id === id) {
                updatedItem = { ...item, ...patch };
                return updatedItem;
            }
            return item;
        });

        if (!updatedItem) {
            throw new Error("update: not implemented");
        }

        return updatedItem;
    }

    remove(id: number): void {
        const exists = this.items.some(item => item.id === id);
        if (!exists) {
            throw new Error("remove: not implemented");
        }

        this.items = this.items.filter(item => item.id !== id);
    }

    findById(id: number): T | undefined {
        return this.items.find(item => item.id === id);
    }

    findAll(): T[] {
        return [...this.items];
    }
}
