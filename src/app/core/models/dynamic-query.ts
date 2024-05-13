export interface DynamicQuery {
    sort?: {
        field: string;
        dir: 'asc' | 'desc'
    }[];
    filter?: {
        field: string;
        operator: 'eq' | 'neq' | 'lt' | 'lte' | 'gt' | 'gte' | 'isnull' | 'isnotnull' | 'startswith' | 'endswith' | 'contains' | 'doesntcontain';
        value: string;
    };
}