import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/decorators/authorization.decorator';
import { RoleEnum } from 'src/types/enums/role';
import * as jwt from 'jsonwebtoken'
@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si no se especifican roles en el controlador, permite el acceso
    if (!requiredRoles) {
      return true;
    }

    const { headers } = context.switchToHttp().getRequest();
    const token = headers.authorization.replace('Bearer ', '');

    // Decodificamos el JWT para obtener el payload y el rol
    let decoded: { role: number };
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET) as { role: number };
    } catch (error) {
      throw new ForbiddenException('Invalid token');
    }
    decoded
   const hasRole = requiredRoles.includes(decoded.role);

    if (!hasRole) {
      throw new ForbiddenException('You have not the required role');
    }
    return true
  }
}
