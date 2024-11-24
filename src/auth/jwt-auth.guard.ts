import { ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { AuthGuard } from "@nestjs/passport";
import { ROLES_KEY } from "src/decorators/authorization.decorator";
import { RoleEnum } from "src/types/enums/role";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){

    constructor(private reflector: Reflector){
        super()
    }
    
    
    async canActivate(context: ExecutionContext): Promise<boolean>  {
      const skipJwtValidation = this.reflector.get<boolean>('skipJwtValidation', context.getHandler());
        if (skipJwtValidation) {
          return true; // Si tiene el decorador, saltar la validación JWT
        }
        const isAuthenticated = await super.canActivate(context);
        if(!isAuthenticated)  throw new UnauthorizedException('No autorizado: Token no válido o expirado');
        const {headers} = context.switchToHttp().getRequest();
         // const token = headers.authorization.replace('Bearer ', '')
          //const decoded = jwt.verify(token, process.env.JWT_SECRET) as {role:number}
          // Verifica si el usuario tiene al menos uno de los roles requeridos
          /*if (!decoded) {
            throw new UnauthorizedException('Invalid token');
          }*/
          
        return true
    }
}