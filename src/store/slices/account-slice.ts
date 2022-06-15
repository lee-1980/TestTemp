import { BigNumber, ethers } from "ethers";
import { getAddresses } from "../../constants";
import { ClaimContract } from "../../abi";
import { setAll } from "../../helpers";

import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { fetchNft, clearNfts } from "./nfts-slice";
import { Networks } from "../../constants/blockchain";
import { RootState } from "../store";
import axios from "axios";

interface IGetBalances {
    address: string;
    networkID: Networks;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
}
interface IAccountBalances {
    balances: {
        avax: string;
        reward: string;
    };
}

export const getBalances = createAsyncThunk("account/getBalances", async ({ address, networkID, provider }: IGetBalances, { dispatch }): Promise<IAccountBalances> => {
    const addresses = getAddresses(networkID);
    const avaxBalance = await provider.getBalance(address);
    const claimContract = new ethers.Contract(addresses.CLAIM_ADDRESS, ClaimContract, provider);
    const reward = await claimContract.rewards(address);

    return {
        balances: {
            avax: ethers.utils.formatEther(avaxBalance),
            reward: ethers.utils.formatUnits(reward),
        },
    };
});

interface ILoadAccountDetails {
    address: string;
    networkID: Networks;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
}

interface IUserAccountDetails {
    balances: {
        reward: string;
    };
}

export const loadAccountDetails = createAsyncThunk("account/loadAccountDetails", async ({ networkID, provider, address }: ILoadAccountDetails, { dispatch }): Promise<IUserAccountDetails> => {
    
    const addresses = getAddresses(networkID);
    const claimContract = new ethers.Contract(addresses.CLAIM_ADDRESS, ClaimContract, provider);
    const reward = await claimContract.rewards(address);

    console.log(ethers.utils.formatUnits(reward));

    return {
        balances: {
            reward: ethers.utils.formatUnits(reward),
        },
    };
});

export interface IAccountSlice {
    loading: boolean;
    balances: {
        avax: string;
        reward: string;
    };
}

const initialState: IAccountSlice = {
    loading: true,
    balances: { avax: "", reward: "", },
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        fetchAccountSuccess(state, action) {
            setAll(state, action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loadAccountDetails.pending, state => {
                state.loading = true;
            })
            .addCase(loadAccountDetails.fulfilled, (state, action) => {
                setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(loadAccountDetails.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            })
            .addCase(getBalances.pending, state => {
                state.loading = true;
            })
            .addCase(getBalances.fulfilled, (state, action) => {
                setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(getBalances.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            })
    },
});

export default accountSlice.reducer;

export const { fetchAccountSuccess } = accountSlice.actions;

const baseInfo = (state: RootState) => state.account;

export const getAccountState = createSelector(baseInfo, account => account);
