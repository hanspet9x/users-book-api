export default class ResponseError extends Error {
    message: string;
    status: number;
    constructor(error: Error | string, status: number){
        super(typeof error === 'string' ? error : error.message);
        if(typeof error != 'string') {
            this.stack = error.stack;
            this.name = error.name;
        }
        this.message = typeof error === 'string' ? error : error.message
        this.status = status;
    }
}