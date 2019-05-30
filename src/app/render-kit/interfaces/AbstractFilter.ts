export abstract class AbstractFilter {
    abstract id: string | number;
    abstract getValue(): object;
};