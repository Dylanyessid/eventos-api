// filters/all-exceptions.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, ExecutionContext } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';

@Catch()  // Captura todas las excepciones
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    
    const context = host.switchToHttp();
    // Determinar el código de estado HTTP basado en la excepción
    const status = exception.status || 500;
    const ctx = host.switchToHttp();
  

    // Devolver una respuesta controlada en formato JSON
    response.status(status).json({
      statusCode: status,
      message: exception.message || 'Internal Server Error',
      // Puedes agregar más información útil aquí, como stack trace si es necesario
      error: exception.name || 'UnknownError',
    });
  }
}
