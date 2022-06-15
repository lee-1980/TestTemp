import { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import Social from "./social";
import StakeIcon from "../../../assets/icons/stake.svg";
import BondIcon from "../../../assets/icons/bond.svg";
import DashboardIcon from "../../../assets/icons/dashboard.svg";
import PresaleIcon from "../../../assets/icons/presale.svg";
import SaleIcone from "../../../assets/icons/sale.png";
import { trim, shorten } from "../../../helpers";
import { useAddress } from "../../../hooks";
import { Link } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import "./drawer-content.scss";
import DocsIcon from "../../../assets/icons/stake.svg";
import GlobeIcon from "../../../assets/icons/wonderglobe.svg";
import classnames from "classnames";

function NavContent() {
  const [isActive] = useState();
  const address = useAddress();

  const checkPage = useCallback((location: any, page: string): boolean => {
    const currentPath = location.pathname.replace("/", "");
    if (currentPath.indexOf("dashboard") >= 0 && page === "dashboard") {
      return true;
    }
    if (currentPath.indexOf("stake") >= 0 && page === "stake") {
      return true;
    }
    if (currentPath.indexOf("mints") >= 0 && page === "mints") {
      return true;
    }
    if (currentPath.indexOf("calculator") >= 0 && page === "calculator") {
      return true;
    }
    return false;
  }, []);

  return (
    <div className="dapp-sidebar">
      <div className="branding-header">

        {address && (
          <div className="wallet-link">
            <Link
              href={`https://cchain.explorer.avax.network/address/${address}`}
              target="_blank"
            >
              <p>{shorten(address)}</p>
            </Link>
          </div>
        )}
      </div>

      <div className="dapp-menu-links">
        <div className="dapp-nav">
          <Link
            component={NavLink}
            to="/presale"
            isActive={(match: any, location: any) => {
              return checkPage(location, "presale");
            }}
            className={classnames("button-dapp-menu", { active: isActive })}
          >
            <div className="dapp-menu-item">
              <img alt="" src={GlobeIcon} />
              <p className="bolder">Presale</p>
            </div>
          </Link>
          
          <Link
            component={NavLink}
            to="/dashboard"
            isActive={(match: any, location: any) => {
              return checkPage(location, "dashboard");
            }}
            className={classnames("button-dapp-menu", { active: isActive })}
          >
            <div className="dapp-menu-item">
              <img alt="" src={DashboardIcon} />
              <p>Dashboard</p>
            </div>
          </Link>

          <Link
            component={NavLink}
            to="/stake"
            isActive={(match: any, location: any) => {
              return checkPage(location, "stake");
            }}
            className={classnames("button-dapp-menu", { active: isActive })}
          >
            <div className="dapp-menu-item">
              <img alt="" src={StakeIcon} />
              <p>Stake</p>
            </div>
          </Link>

          <Link
            component={NavLink}
            id="bond-nav"
            to="/bond"
            isActive={(match: any, location: any) => {
              return checkPage(location, "mints");
            }}
            className={classnames("button-dapp-menu", { active: isActive })}
          >
            <div className="dapp-menu-item">
              <img alt="" src={BondIcon} />
              <p>Bond</p>
            </div>
          </Link>

          <Link
            component={NavLink}
            to="/docs"
            isActive={(match: any, location: any) => {
              return checkPage(location, "calculator");
            }}
            className={classnames("button-dapp-menu", { active: isActive })}
          >
            <div className="dapp-menu-item">
              <img alt="" src={DocsIcon} />
              <p>Docs</p>
            </div>
          </Link>
        </div>
      </div>
      {/* <div className="dapp-menu-doc-link">
        <Link href="https://athenadao.gitbook.io/athenadao/" target="_blank">
          <img alt="" src={DocsIcon} />
          <p>Docs</p>
        </Link>
        <Link href="https://legacy.athenadao.money/" target="_blank">
          <p>Legacy website</p>
        </Link>
      </div> */}
      <Social />
    </div>
  );
}

export default NavContent;
