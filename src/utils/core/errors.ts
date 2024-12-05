import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import constans from 'src/config/constans';

@Catch()
export class AllExeptionFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    //? verificamos si es una instancia de algun error http
    if (exception instanceof HttpException) {
      const status: any = exception.getStatus();

      const errorBody: any = exception.getResponse();

      //? si el error cuenta con una respuesta especifica lo evaluamos
      if (errorBody && errorBody.errorData) {
        //? si es un error de formato --> creamos una estrctura para facilitar la comprension del error
        if (errorBody.errorData.type == constans.ERROS_TYPES.format) {
          const formatData = [];
          const errorDataFormat = errorBody.errorData.data.constraints;

          for (const key in errorDataFormat) {
            formatData.push(key);
          }

          response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            property: errorBody.errorData.data.property,
            errorData: errorBody.errorData.data.constraints,
            message: errorDataFormat[formatData[0]],
          });
        } else if (errorBody.errorData.type == constans.ERROS_TYPES.db) {
          //? si es un error de db determinamos cual db se esta usando para evaluar como trabajar el error
          console.error(errorBody.errorData.data);
          response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            trackingCode: errorBody.trackingCode,
            data: {
              message: errorBody.errorData.data,
              trackingCode: errorBody.errorData.trackingCode,
            },
            message: 'Error de servicios',
          });
        } else {
          //? por defecto
          response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: exception.message,
          });
        }
      } else {
        response.status(status).json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          message: exception.message,
        });
      }
    } else {
      //! si no es un error atajable o que se tenga en cuenta creamos un error general
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: 'Internal Server Error',
      });
    }
  }
}
