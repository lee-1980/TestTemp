import { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Zoom } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { trim, prettifySeconds } from "../../helpers";
import "./minting.scss";
import { useWeb3Context } from "../../hooks";
import { IPendingTxn, isPendingTxn, txnButtonText } from "../../store/slices/pending-txns-slice";
import { IReduxState } from "../../store/slices/state.interface";
import { messages } from "../../constants/messages";
import classnames from "classnames";
import { warning } from "../../store/slices/messages-slice";
import { changeMint, ITrait } from "src/store/slices/mint-thunk";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }),
);

function Minting() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { provider, address, connect, chainID, checkWrongNetwork } = useWeb3Context();

    const [amount, setAmount] = useState("");
    
    const pendingTransactions = useSelector<IReduxState, IPendingTxn[]>(state => {
        return state.pendingTransactions;
    });

    const reward = useSelector<IReduxState, string>(state => {
        return state.account.balances && state.account.balances.reward;
    });

    const onClaim = async () => {
        if (await checkWrongNetwork()) return;
        await dispatch(changeMint({ address, amount, provider, networkID: chainID }));
    };

    return (
        <>
            <div className="presale-view">
                <Zoom in={true}>
                    <div className="presale-card">
                        <Grid className="presale-card-grid" container direction="column" spacing={2}>
                            <Grid item>
                                <div className="presale-card-header">
                                    <p className="presale-card-header-title" style={{fontSize: "30px"}}>CLAIM YOUR REWARD</p>
                                </div>
                                <div className="presale-card-header">
                                    <p className="presale-card-header-title" style={{opacity: "0.5"}}>YOUR REWARD: {reward}</p>
                                </div>
                                <br />  

                                <div className="presale-card-header" style={{display: "flex", justifyContent: "center"}}>
                                    <TextField onChange={(e) => setAmount(e.target.value)} id="outlined-basic" label="" variant="outlined" style={{background:"#ffffff33", border: "1px solid #ffffff33", margin: "auto", width: "300px"}} />
                                </div>                        
                                
                                <Grid container>
                                    <Grid item xs={12} sm={3}></Grid>
                                    <Grid item xs={12} sm={6}>
                                    {!address && (
                                        <div className="mint-button" onClick={connect}>
                                            <p>CONNECT WALLET</p>
                                        </div>
                                    )}
                                    {address && (
                                        <div
                                            className="mint-button"
                                            onClick={() => {
                                                if (isPendingTxn(pendingTransactions, "claiming")) return;
                                                onClaim();
                                            }}
                                        >
                                            <p>{txnButtonText(pendingTransactions, "claiming", "Claim")}</p>
                                        </div>
                                    )}
                                    </Grid>
                                </Grid>                                                         
                            </Grid>
                        </Grid>
                    </div>
                </Zoom>
            </div>
        </>
    );
}

export default Minting;
