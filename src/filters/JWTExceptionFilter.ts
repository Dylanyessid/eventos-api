import { ExceptionFilter, Catch, UnauthorizedException, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

@Catch(UnauthorizedException)
export class JwtExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const status = exception.getStatus();

    // Aquí puedes personalizar el mensaje del error
    response.status(status).json({
      statusCode: status,
      message: 'Invalid or expired token',
      error: 'Unauthorized',
    });
  }
}
