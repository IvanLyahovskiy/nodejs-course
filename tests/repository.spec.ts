import { ensureExpectedIsNonNegativeInteger } from "jest-matcher-utils";
import { InMemoryRepository } from "../JS-TS/repository";
import { TodoStatus } from "../JS-TS/types";

type TestEntity = { id: number; title: string; description?: string; createdAt: Date; status: TodoStatus };

describe("InMemoryRepository", () => {
    let repository: InMemoryRepository<TestEntity>;

    beforeEach(() => {
        repository = new InMemoryRepository<TestEntity>();
    });

    describe("add", () => {
        it("should successfully create a new entity", () => {
            let entity: TestEntity = {
                id: 1,
                title: "title",
                description: "something",
                createdAt: new Date(),
                status: TodoStatus.IN_PROGRESS,
            };

            const result = repository.add(entity);
            expect(result).toEqual(entity);
            expect(repository.findById(1)).toEqual(entity);
            expect(repository.findAll()).toHaveLength(1);
        });

        it("should throw an error when adding entity with duplicate id", () => {
            let entity1: TestEntity = {
                id: 1,
                title: "title",
                description: "something",
                createdAt: new Date(),
                status: TodoStatus.IN_PROGRESS,
            };

            let entity2: TestEntity = {
                id: 1,
                title: "title2",
                description: "something2",
                createdAt: new Date(),
                status: TodoStatus.IN_PROGRESS,
            };

            repository.add(entity1);

            expect(() => repository.add(entity2)).toThrow("add: not implemented");
        });
    });

    describe("update", () => {
        it("should successfully update data in the entity by id", () => {
            const createdAt = new Date();

            let entity: TestEntity = {
                id: 1,
                title: "title",
                description: "something",
                createdAt: createdAt,
                status: TodoStatus.IN_PROGRESS,
            };

            let entity2: TestEntity = {
                id: 2,
                title: "title2",
                description: "something2",
                createdAt: createdAt,
                status: TodoStatus.IN_PROGRESS,
            };

            repository.add(entity);
            repository.add(entity2);

            const newData: Partial<TestEntity> = { title: "new title", description: "new description" };

            const updated = repository.update(1, newData);

            expect(updated).toEqual({
                id: 1,
                title: "new title",
                description: "new description",
                createdAt,
                status: TodoStatus.IN_PROGRESS,
            });
            expect(repository.findById(2)).toEqual(entity2);
        });

        it("should throw an error if entity with entered id have not found", () => {
            expect(() => repository.update(5, { title: "title", description: "description" })).toThrow(
                "update: not implemented",
            );
        });
    });

    describe("remove", () => {
        it("should remove entity by id", () => {
            let entity: TestEntity = {
                id: 1,
                title: "title",
                description: "something",
                createdAt: new Date(),
                status: TodoStatus.IN_PROGRESS,
            };

            repository.add(entity);
            repository.remove(1);
            expect(repository.findAll()).toHaveLength(0);
        });

        it("should throw an error if entity with entered id have not found", () => {
            expect(() => repository.remove(5)).toThrow("remove: not implemented");
        });
    });

    describe("findById", () => {
        it("should find entity by id in the reposity", () => {
            let entity: TestEntity = {
                id: 1,
                title: "title",
                description: "something",
                createdAt: new Date(),
                status: TodoStatus.IN_PROGRESS,
            };

            repository.add(entity);

            expect(repository.findById(1)).toEqual(entity);
        });

        it("should throw undefined if there's no entity with entered id", () => {
            let entity: TestEntity = {
                id: 1,
                title: "title",
                description: "something",
                createdAt: new Date(),
                status: TodoStatus.IN_PROGRESS,
            };

            repository.add(entity);

            expect(repository.findById(5)).toEqual(undefined);
        });
    });

    describe("findAll", () => {
        it("should return repository if it is not empty", () => {
            let entity1: TestEntity = {
                id: 1,
                title: "title",
                description: "something",
                createdAt: new Date(),
                status: TodoStatus.IN_PROGRESS,
            };
            let entity2: TestEntity = {
                id: 2,
                title: "title2",
                description: "something",
                createdAt: new Date(),
                status: TodoStatus.IN_PROGRESS,
            };

            repository.add(entity1);
            repository.add(entity2);

            expect(repository.findAll()).toEqual([entity1, entity2]);
        });

        it("should return an empty array if reposity is empty", () => {
            expect(repository.findAll()).toEqual([]);
        });
    });
});
