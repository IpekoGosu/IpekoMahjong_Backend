import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus,
    HttpException,
} from '@nestjs/common';
import { CommonError } from '@src/common/error/common.error';
import { CommonErrorResponse } from '@src/common/response/common.response';
import dayjs from 'dayjs';
import { Request, Response } from 'express';

@Catch(CommonError)
export class CommonErrorFilter implements ExceptionFilter {
    catch(exception: CommonError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = HttpStatus.INTERNAL_SERVER_ERROR;

        const data = {
            statusCode: status,
            timestamp: dayjs().toISOString(),
            path: request.url,
            error: exception.status,
            message: exception.message,
        };

        response.status(status).json(new CommonErrorResponse(data));
    }
}

interface ExceptionResponse {
    message: string | string[];
    [key: string]: any;
}

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse() as ExceptionResponse;

        const data = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            error: 'HTTP_ERROR',
            message: exceptionResponse['message'] || exception.message,
        };

        response.status(status).json(new CommonErrorResponse(data));
    }
}
