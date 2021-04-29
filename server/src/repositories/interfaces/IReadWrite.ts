interface IReadWrite<T> {
    findAll(): Promise<T[] | undefined>;
    findOneById(id: string): Promise<T | undefined>;
    create(item: T): Promise<T | undefined>;
    update(id: string, item: T): Promise<boolean>;
    delete(id: string): Promise<boolean>;
}

export default IReadWrite;