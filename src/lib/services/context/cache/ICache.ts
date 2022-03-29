
export interface ICache {
    set(key: string, data: any): void,
    get(key: string): any | null,
    remove(key: string): void
    setTestData(key: string): void;
}

