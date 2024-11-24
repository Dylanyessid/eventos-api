
import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import {PassportStrategy} from "@nestjs/passport"
import { JwtPayload } from "jsonwebtoken"
import { ExtractJwt, Strategy } from "passport-jwt"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly configService: ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET')
        })
    }

    async validate(payload:JwtPayload){
        const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
        
        if (payload.exp < currentTime) {
          throw new ForbiddenException('Token has expired');
        }
        return{userId: payload.id}
    }
}