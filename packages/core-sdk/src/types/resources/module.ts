import {Hook} from "./hook";
import {QueryOptions} from "./helpers";

/**
 * Core data model for Module.
 *
 * @public
 */
export type Module = {
    id: string
    ipOrgId: string
    interface: string
    preHooks: Hook[]
    postHooks: Hook[]
    createdAt: string // ISO 8601
};

/**
 * Represents the request structure for retrieving module details using the `module.get` method.
 *
 * @public
 */
export type GetModuleRequest = {
    moduleId: string; // Unique identifier of the license to retrieve.
};

/**
 * Represents the response structure for retrieving module details using the `module.get` method.
 *
 * @public
 */
export type GetModuleResponse = {
    module: Module
};

/**
 * Represents the request structure for retrieving module details using the `module.list` method.
 *
 * @public
 */
export type ListModuleRequest = {
    ipOrgId: string
    options?: QueryOptions
};

/**
 * Represents the response structure for retrieving module details using the `module.list` method.
 *
 * @public
 */
export type ListModuleResponse = {
    modules: Module[]
};
