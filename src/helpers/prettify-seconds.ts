export const prettifySeconds = (seconds?: number, resolution?: string) => {
    if (seconds !== 0 && !seconds) {
        return "";
    }

    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    if (resolution === "day") {
        return d + (d == 1 ? " day" : " days");
    }

    const dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days ") : "";
    const hDisplay = h > 0 ? h + (h == 1 ? " Hour, " : " Hours ") : "";
    const mDisplay = m > 0 ? m + (m == 1 ? " Min" : " Mins ") : "";
    const sDisplay = s > 9 ? s + " s" : "0" + s + " s";

    return dDisplay + hDisplay + mDisplay + sDisplay;
};
