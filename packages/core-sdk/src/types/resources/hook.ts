import {QueryOptions} from "./helpers";

/**
 * Core data model for Hook.
 *
 * @public
 */
export type Hook = {
    id: string
    moduleId: string
    interface: string
    createdAt: string // ISO 8601
};

/**
 * Represents the request structure for retrieving hook details using the `hook.get` method.
 *
 * @public
 */
export type GetHookRequest = {
    hookId: string; // Unique identifier of the license to retrieve.
};

/**
 * Represents the response structure for retrieving hook details using the `hook.get` method.
 *
 * @public
 */
export type GetHookResponse = {
    hook: Hook
};

/**
 * Represents the request structure for retrieving hook details using the `hook.list` method.
 *
 * @public
 */
export type ListHookRequest = {
    moduleId: string
    options?: QueryOptions
};

/**
 * Represents the response structure for retrieving hook details using the `hook.list` method.
 *
 * @public
 */
export type ListHookResponse = {
    hooks: Hook[]
};
