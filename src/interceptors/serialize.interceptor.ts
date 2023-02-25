import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";
import { ReturnUserDto } from "src/modules/users/dtos/returnUser.dto";

export class SerializeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        /**
         * RUN SOMETHING TO EXECUTE BEFORE THE REQUEST IS HANDELED
         */
        return next.handle().pipe(
            map((data: any) => {
                /**
                * RUN SOMETHING TO EXECUTE BEFORE THE RESPONSE IS SENT
                */
            }),
        )
    }
}