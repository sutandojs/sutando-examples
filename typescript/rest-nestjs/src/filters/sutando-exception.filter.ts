import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { ModelNotFoundError } from 'sutando';

@Catch(ModelNotFoundError)
export class SutandoExceptionFilter implements ExceptionFilter {
  catch(exception: ModelNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = 500; // 默认状态码为500

    if (exception instanceof ModelNotFoundError) {
      status = 404; // 如果是ModelNotFoundError，设置状态码为404
    }

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exception.message || 'Internal server error',
      });
  }
}