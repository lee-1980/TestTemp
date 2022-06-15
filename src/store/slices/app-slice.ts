import { ethers } from "ethers";
import { getAddresses } from "../../constants";
import { NftContract } from "../../abi";
import { setAll } from "../../helpers";
import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { JsonRpcProvider } from "@ethersproject/providers";
import { getTokenPrice } from "../../helpers";
import { RootState } from "../store";
import { BigNumber } from "ethers";

var utils = require("ethers").utils;

interface ILoadAppDetails {
    networkID: number;
    provider: JsonRpcProvider;
}

export const loadAppDetails = createAsyncThunk(
    "app/loadAppDetails",
    //@ts-ignore
    async ({ networkID, provider }: ILoadAppDetails) => {
        // const mimPrice = getTokenPrice("MIM");
        const addresses = getAddresses(networkID);

        // const currentBlock = await provider.getBlockNumber();
        // const currentBlockTime = (await provider.getBlock(currentBlock)).timestamp;
        const avatarNftContract = new ethers.Contract(addresses.NFT_ADDRESS, NftContract, provider);

        const totalSupply = 0;
        const baseUri = "";

        return {
            totalSupply,
            baseUri,
        };
    },
);

const initialState = {
    loading: true,
};

export interface IAppSlice {
    loading: boolean;
    networkID: number;
    totalSupply: number;
    baseUri: string;
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        fetchAppSuccess(state, action) {
            setAll(state, action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loadAppDetails.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loadAppDetails.fulfilled, (state, action) => {
                setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(loadAppDetails.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            });
    },
});

const baseInfo = (state: RootState) => state.app;

export default appSlice.reducer;

export const { fetchAppSuccess } = appSlice.actions;

export const getAppState = createSelector(baseInfo, app => app);
