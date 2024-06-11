import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private jwtService:JwtService,
        private reflector:Reflector
    ){
    }
    //суть фции canActivate когда она возвращает тру доступ разрешен
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try{
            const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY,[
                context.getHandler(),
                context.getClass(),
            ])
            if (!requiredRoles){
                return true
            }
            const req = context.switchToHttp().getRequest() //получаем объект реквеста из контекста
            const authHeader = req.headers.authorization; //объект в котором тип токена и сам токен
            const bearer = authHeader.split(' ')[0] //
            const token = authHeader.split(' ')[1]
            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'Пользователь не авторизован'})
            }
            const user = this.jwtService.verify(token)
            req.user = user
            return user.roles.some(role=>requiredRoles.include(role.value))
        } catch (e){
            throw new UnauthorizedException({message: "Пользователь не авторизован"})
        }
    }

}