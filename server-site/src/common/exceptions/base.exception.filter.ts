/*
 * @Author: 芮超
 * @Date: 2023-06-18
 * @Description: 捕获基础异常
 */

import { FastifyReply, FastifyRequest } from 'fastify';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  ServiceUnavailableException,
  Inject,
} from '@nestjs/common';

//默认捕获所有异常
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const message = new ServiceUnavailableException().getResponse();
    console.log('标准异常', message);
    //是否直接打印异常信息
    // request.log.error(exception);
    // this.logger.error(message.toString());
    // 非 HTTP 标准异常的处理。
    response.status(HttpStatus.SERVICE_UNAVAILABLE).send({
      statusCode: HttpStatus.SERVICE_UNAVAILABLE,
      timestamp: new Date().toLocaleString(),
      path: request.url,
      method: request.method,
      details: message,
    });
  }
}
