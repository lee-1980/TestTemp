import { configureStore } from "@reduxjs/toolkit";

import accountReducer from "./slices/account-slice";
import appReducer from "./slices/app-slice";
import pendingTransactionsReducer from "./slices/pending-txns-slice";
import messagesReducer from "./slices/messages-slice";
import nftsReducer from "./slices/nfts-slice";

const store = configureStore({
    reducer: {
        account: accountReducer,
        app: appReducer,
        pendingTransactions: pendingTransactionsReducer,
        messages: messagesReducer,
        nfts: nftsReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
