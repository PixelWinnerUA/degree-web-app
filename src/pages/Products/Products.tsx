import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import styled from "styled-components/macro";

import { Box, Pagination as MuiPagination } from "@mui/material";

import ProductCard from "@pages/Products/components/ProductCard";

import { productsApi } from "@store/apis/products.api";

import { PAGE_PATH, ITEMS_PER_PAGE_OPTIONS } from "@utils/constants/common.constants";
import { usePagination } from "@utils/hooks/usePagination.hook";
import { CardsContainerStyled } from "@utils/styles/Cards.styled";
import { Request } from "@utils/typings/enums/common.enums";

import BackButton from "@components/BackButton";
import Button from "@components/Button";
import NoDataMessage from "@components/NoDataMessage";
import SearchField from "@components/SearchField";
import { SelfCenterLoader } from "@components/SelfCenterLoader";
import ToolBar from "@components/ToolBar";

import CreateProductModal from "../../App/Modals/CreateProductModal/CreateProductModal";
import { useModal } from "../../App/Modals/Modal/useModal.hook";
import ItemsPerPageSelect from "@components/ItemsPerPageSelect";

const Pagination = styled(MuiPagination)`
    margin: 0 auto;
    padding: 4px;
`;

const LeftContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
`;

const RightContainer = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: end;
    flex-wrap: wrap;
    gap: 8px;

    @media (max-width: 768px) {
        flex-direction: column-reverse;
    }
`;

const Products = () => {
    const modalHook = useModal();
    const navigate = useNavigate();
    const { shelfId = "", name } = useParams();
    const { t } = useTranslation();
    const { itemsPerPage, page, handleChangePage, handleChangeItemsPerPage } = usePagination({ itemsPerPageOptions: ITEMS_PER_PAGE_OPTIONS });
    const { data, isFetching, isError, refetch } = productsApi.useGetProductsQuery({ shelfId: +shelfId, page, limit: itemsPerPage, name }, { skip: !shelfId });

    const handleChange = useCallback(
        (newName: string) => {
            navigate(`${PAGE_PATH.products.main}/${shelfId}/${newName}`);
        },
        [navigate]
    );

    const leftPartToolBar = useMemo(
        () => (
            <LeftContainer>
                <SearchField
                    labelTranslationKey={"routes.productsSearch"}
                    requestType={Request.QUERY}
                    refetch={refetch}
                    onChange={handleChange}
                    initialValue={name}
                />
                <ItemsPerPageSelect titleTranslationKey="general.productsPerPage" itemsPerPageOptions={ITEMS_PER_PAGE_OPTIONS} itemsPerPage={itemsPerPage}
                                    handleChangeItemsPerPage={handleChangeItemsPerPage} />
            </LeftContainer>
        ),
        [itemsPerPage]
    );

    const rightPartToolBar = useMemo(
        () => (
            <RightContainer>
                <BackButton />
                <Button size="small" onClick={modalHook.openModal}>
                    {t("general.addProduct")}
                </Button>
            </RightContainer>
        ),
        []
    );

    if (!data?.products?.length && !isFetching) {
        return (
            <>
                <ToolBar leftPart={leftPartToolBar} rightPart={rightPartToolBar} />
                <NoDataMessage />;
                <CreateProductModal modalHook={modalHook} shelfId={+shelfId} />
            </>
        );
    }

    const products = data?.products.map((product) => <ProductCard key={product.id} {...product} />);

    return (
        <>
            <ToolBar leftPart={leftPartToolBar} rightPart={rightPartToolBar} />
            {isFetching ? <SelfCenterLoader isLoading={isFetching} isError={isError} /> : <CardsContainerStyled>{products}</CardsContainerStyled>}
            <Pagination count={data?.totalPages} onChange={handleChangePage} />
            <CreateProductModal modalHook={modalHook} shelfId={+shelfId} />
        </>
    );
};

export default Products;
