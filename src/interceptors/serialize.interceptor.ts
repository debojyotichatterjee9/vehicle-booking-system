import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";


export function Serialize(responseDto: any) {
    return UseInterceptors(new SerializeInterceptor(responseDto));
}

export class SerializeInterceptor implements NestInterceptor {

    constructor(private responseDto: any) {

    }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        /**
         * RUN SOMETHING TO EXECUTE BEFORE THE REQUEST IS HANDELED
         */
        return next.handle().pipe(
            map((data: any) => {
                /**
                * RUN SOMETHING TO EXECUTE BEFORE THE RESPONSE IS SENT
                */
                return plainToClass(this.responseDto, data, {
                    excludeExtraneousValues: true
                });
            }),
        )
    }
}