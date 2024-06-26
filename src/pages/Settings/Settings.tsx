import React from "react";
import { useTranslation } from "react-i18next";

import styled from "styled-components/macro";

import { Box, Divider as MuiDivider, Paper } from "@mui/material";

import LanguageSelect from "@pages/Settings/components/LanguageSelect";
import ThemeSwitch from "@pages/Settings/components/ThemeSwitch";

import BackButton from "@components/BackButton";
import { H5Typography } from "@components/Typography";
import ChangePasswordForm from "@pages/Settings/components/ChangePasswordForm";
import { useAppSelector } from "@store/store.hooks";
import { selectIsAuthenticated } from "@store/slices/auth/auth.selectors";

const Container = styled(Paper)`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
    margin: 16px;
    padding: 16px;
`;

const Divider = styled(MuiDivider)`
    width: 100%;
`;

const Title = styled(Box)`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    gap: 16px;
`;

const Settings = () => {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const { t } = useTranslation();

    return (
        <Container variant="elevation">
            <Title>
                <H5Typography>{t("general.settings")}</H5Typography>
                <BackButton />
            </Title>

            <Divider />

            <ThemeSwitch />

            <LanguageSelect />

            <Divider />

            {isAuthenticated && <ChangePasswordForm />}
        </Container>
    );
};

export default Settings;
