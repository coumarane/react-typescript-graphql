import { DataProxy } from 'apollo-cache';
import ApolloClient, { ApolloError, MutationOptions, OperationVariables } from 'apollo-client';
import { FetchResult } from 'apollo-link';
import { DocumentNode, GraphQLError } from 'graphql';
import { Omit } from './utils';
export declare type MutationUpdaterFn<TData = Record<string, any>> = (proxy: DataProxy, mutationResult: FetchResult<TData>) => void;
export interface BaseMutationHookOptions<TData, TVariables> extends Omit<MutationOptions<TData, TVariables>, 'mutation' | 'update'> {
    update?: MutationUpdaterFn<TData>;
    rethrow?: boolean;
}
export interface MutationHookOptions<TData, TVariables, TCache = object> extends BaseMutationHookOptions<TData, TVariables> {
    client?: ApolloClient<TCache>;
}
export declare type MutationFn<TData, TVariables> = (options?: BaseMutationHookOptions<TData, TVariables>) => Promise<FetchResult<TData>>;
export interface ExecutionResult<T = Record<string, any>> {
    data?: T;
    extensions?: Record<string, any>;
    errors?: GraphQLError[];
}
export interface MutationResult<TData> {
    called: boolean;
    data?: TData;
    error?: ApolloError;
    hasError: boolean;
    loading: boolean;
}
export declare function useMutation<TData, TVariables = OperationVariables>(mutation: DocumentNode, baseOptions?: MutationHookOptions<TData, TVariables>): [MutationFn<TData, TVariables>, MutationResult<TData>];
