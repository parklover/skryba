/**
 * ServiceLocator

 */
export declare class ServiceLocator {
    private services;
    getService<T>(name: string): T;
    register<T>(name: string, type: T): void;
}
