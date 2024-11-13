import { ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import * as jwt from 'jsonwebtoken'
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { ROLES_KEY } from "src/decorators/authorization.decorator";
import { RoleEnum } from "src/types/enums/role";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){

    constructor(private reflector: Reflector){
        super()
    }
    
    canActivate(context: ExecutionContext): boolean  {
        const isAuthenticated = super.canActivate(context);
        if(!isAuthenticated) return false
        const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
          ]);
      
          // Si no se especifican roles en el controlador, permite el acceso
          if (!requiredRoles) {
            return true;
          }
      
          const {headers} = context.switchToHttp().getRequest();
          const token = headers.authorization.replace('Bearer ', '')
          const decoded = jwt.decode(token) as {role:number}
          // Verifica si el usuario tiene al menos uno de los roles requeridos
          if (!decoded) {
            throw new ForbiddenException('Invalid token');
          }
          const hasRole = requiredRoles.includes(decoded.role);

          if (!hasRole) {
            throw new ForbiddenException('No tienes el rol requerido');
          }
        return true
    }
}