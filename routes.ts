/**
 * @type {string[]}
 */
export const publicRoutes: string[] = ["/", "/terms", "/privacy"];

/**
 * @type {string[]}
 */
export const authRoutes: string[] = ["/login", "/signup", "/auth/error"];

/**
 * @type {string}
 * @default /api
 */
export const apiPrefix: string = "/api";

/**
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/dashboard";
