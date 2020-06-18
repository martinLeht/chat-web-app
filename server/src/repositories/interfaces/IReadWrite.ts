export interface IReadWrite<T> {
    findAll(item: T): Promise<T[] | undefined>;
    findOneById(id: number): Promise<T | undefined>;
    create(item: T): Promise<boolean>;
    update(id: number, item: T): Promise<boolean>;
    delete(id: number): Promise<boolean>;
}