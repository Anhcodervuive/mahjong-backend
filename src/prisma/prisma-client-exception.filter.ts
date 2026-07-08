import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Check if it is a Prisma foreign key constraint error
    if (exception && exception.code === 'P2003') {
      const message = 'Cannot delete this item because it is associated with existing data (e.g., Bookings).';
      response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: message,
        error: 'Bad Request',
      });
      return;
    }

    // For all other exceptions, let the default NestJS filter handle them if we can,
    // or just return 500 if we caught it globally. Actually, since this is a global filter
    // intercepting EVERYTHING because of @Catch(), we should only handle Prisma errors and rethrow others.
    // Wait, if it's a standard HttpException (like 404 Not Found), we must preserve it.
    
    if (exception && typeof exception.getStatus === 'function') {
      const status = exception.getStatus();
      const res = exception.getResponse();
      response.status(status).json(res);
      return;
    }

    // Default 500
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception?.message || 'Internal server error',
    });
  }
}
