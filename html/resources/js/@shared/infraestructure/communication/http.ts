export interface Http<T> {
    index: () => Promise<{
        resourceName?: string;
        items: T[]
    }>;
    store: (body: any) => Promise<T>;
    remove: (id: string) => Promise<T>;
    update: (id: string, body: any) => Promise<T>;
}
