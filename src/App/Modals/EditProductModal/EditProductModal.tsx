import { omit } from "lodash";
import styled from "styled-components";

import React, { FC, useId } from "react";
import { useTranslation } from "react-i18next";

import { useFormik } from "formik";

import { toFormikValidationSchema } from "zod-formik-adapter";

import { productsApi } from "@store/apis/products.api";

import { getTextFieldProps } from "@utils/helpers/getTextFieldProps.helper";
import { useDynamicFields } from "@utils/hooks/useDynamicFields.hook";
import { ModalButtonsContainer } from "@utils/styles/ModalButtonsConatiner.styled";
import { ModalForm } from "@utils/styles/ModalForm.styled";
import { CreateProductDtoSchema } from "@utils/typings/schemas/products/products.schemas";
import { Product, UpdateProductDto } from "@utils/typings/types/products/products.types";

import Button from "@components/Button";
import TextField from "@components/TextField";
import { H5Typography, H6Typography } from "@components/Typography";

import { Modal } from "../Modal/Modal";
import { ModalHookReturns } from "../modal.types";

const StyledModalForm = styled(ModalForm)`
    padding-bottom: 8px;
`;

type EditProductModalProps = {
    modalHook: ModalHookReturns;
    product: Product;
};

const EditProductModal: FC<EditProductModalProps> = ({ modalHook, product }) => {
    const { t } = useTranslation();
    const formId = useId();
    const [updateProduct, { isLoading }] = productsApi.useUpdateProductMutation();

    const { id, name, amount, pricePerUnit, weightPerUnit, length, width, height, shelfId, properties } = product;

    const initialValues: UpdateProductDto = {
        id,
        name,
        amount,
        pricePerUnit,
        weightPerUnit,
        length,
        width,
        height,
        shelfId,
        properties
    };

    const formikHook = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            await updateProduct(values).unwrap();
            modalHook.closeModal();
        },
        onReset: () => {
            modalHook.closeModal();
        }
    });

    const { dynamicFields, renderTextFields, renderAddButton } = useDynamicFields(formikHook, "properties");

    const textFields = Object.keys(omit(initialValues, ["id", "shelfId", "properties"])).map((field) => (
        <TextField
            key={field}
            fullWidth
            {...getTextFieldProps({
                t,
                formikHook,
                field
            })}
        />
    ));

    return (
        <Modal {...modalHook.modalProps}>
            <H5Typography>{t("modal.editProduct.title")}</H5Typography>

            <StyledModalForm id={formId} onSubmit={formikHook.handleSubmit} onReset={formikHook.handleReset}>
                {textFields}

                {!!dynamicFields.length && <H6Typography>{t("general.additionalParameters")}</H6Typography>}

                {renderTextFields()}
                {renderAddButton()}
            </StyledModalForm>

            <ModalButtonsContainer>
                <Button variant="outlined" form={formId} type="reset">
                    {t("general.cancel")}
                </Button>
                <Button isLoading={isLoading} form={formId} type="submit">
                    {t("general.confirm")}
                </Button>
            </ModalButtonsContainer>
        </Modal>
    );
};

export default EditProductModal;

const validationSchema = toFormikValidationSchema(CreateProductDtoSchema);