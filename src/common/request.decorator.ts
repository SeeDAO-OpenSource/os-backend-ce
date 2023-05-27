import { Type, applyDecorators } from "@nestjs/common";
import { ApiExtraModels, ApiResponse, getSchemaPath } from "@nestjs/swagger";
import { PagedResult } from "./page.dto";

export const ApiPagedResultResponse = <TModel extends Type<any>>(
    model: TModel,
) => {
    return applyDecorators(
        ApiResponse({
            status: 200,
            schema: {
                title: `PaginatedResponseOf${model.name}`,
                allOf: [
                    { $ref: getSchemaPath(PagedResult) },
                    {
                        properties: {
                            items: {
                                type: 'array',
                                items: { $ref: getSchemaPath(model) },
                            },
                        },
                    },
                ],
            },
        }),
        ApiExtraModels(PagedResult, model)
    );
};