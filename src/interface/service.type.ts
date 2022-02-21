import ResponseError from '../services/response/ResponseError';

export interface IServiceResponse<T> {
    hasError: boolean;
    response: ResponseError | T
}
