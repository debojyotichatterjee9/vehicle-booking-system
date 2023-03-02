import { NestInterceptor, ExecutionContext, CallHandler, Injectable } from "@nestjs/common";
import { UsersService } from "../users.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private userService: UsersService) { }

    async intercept(context: ExecutionContext, handler: CallHandler) {
        const request = context.switchToHttp().getRequest();
        const { user_id } = request.session || {};
        if(user_id) {
            const userInfo = await this.userService.findUserDetail(user_id);
            request.current_user = userInfo;
        }
        return handler.handle();
    }
}