import {QueryOptionsFilterOperator, QueryOptionsOperator, QueryOptionsSortOrder} from "../../enums/QueryOptions";

/**
 * Core data model for TxOptions.
 *
 * @public
 */
export type QueryOptions = {
    filter: {
        operands: Operand[][]
        operator?: QueryOptionsFilterOperator[] // AND or OR, default: AND
    }
    pagination?: {
        offset?: number  // starting from 0
        limit?: number
    }
    sort: [
        {
            sortBy: string
            order: QueryOptionsSortOrder,  // ASC or DESC
        },
    ]
};

export type  Operand = {
    operator: QueryOptionsOperator, // i.e eq, lt, gt, neq
    filterBy: string,
    value: unknown,
}

/**
 * Core data model for TxOptions.
 *
 * @public
 */
export type TxOptions = {
    waitForTransaction?: boolean
};
