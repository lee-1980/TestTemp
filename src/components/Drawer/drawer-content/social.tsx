import { SvgIcon, Link } from "@material-ui/core";
import { ReactComponent as Twitter } from "../../../assets/icons/twitter.svg";
import { ReactComponent as Discord } from "../../../assets/icons/discord.svg";

export default function Social() {
    return (
        <div className="social-row">
            <Link target="_blank">
                <SvgIcon color="primary" component={Twitter} />
            </Link>

            <Link target="_blank">
                <SvgIcon color="primary" component={Discord} />
            </Link>
        </div>
    );
}
