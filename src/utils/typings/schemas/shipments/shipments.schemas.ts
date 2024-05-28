import { z } from "zod";
import { DateStringSchema, EmailSchema, NameSchema, PhoneNumberSchema, StringSchema } from "@utils/typings/schemas/common.schemas";
import { getTranslatedValidationMessage } from "@utils/helpers/getTranslatedMessage.helper";
import { ExtendedSearchProductSchema } from "@utils/typings/schemas/products/products.schemas";

export const ShipmentSchema = z.object({
    id: z.number(),
    name: NameSchema,
    surname: NameSchema,
    patronymic: NameSchema,
    email: EmailSchema,
    address: StringSchema,
    phoneNumber: PhoneNumberSchema,
    createdAt: DateStringSchema,
    updatedAt: DateStringSchema
});

const ShipmentProductsSchema = z.array(z.object({ productId: z.number(), amount: z.number().min(1, getTranslatedValidationMessage("invalidAmount")) }));

export const CustomerFormSchema = z.object({
    name: NameSchema,
    surname: NameSchema,
    patronymic: NameSchema,
    email: EmailSchema,
    phoneNumber: PhoneNumberSchema,
    address: StringSchema
});


export const CreateShipmentDtoSchema = z.object({
    products: ShipmentProductsSchema
}).merge(CustomerFormSchema);

export const ShippedProductSchema = z.lazy(() => (z.object({ shippedAmount: z.number().min(1, getTranslatedValidationMessage("invalidAmount")) })
    .merge(ExtendedSearchProductSchema)).refine(data => data.shippedAmount <= data.amount, {
    message: getTranslatedValidationMessage("shippedAmountExceedsAvailableAmount"),
    path: ["shippedAmount"]
}));

export const CreateShipmentFormSchema = z.object({ products: z.array(ShippedProductSchema) }).merge(CustomerFormSchema);