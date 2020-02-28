export class PricesV1 {
    public usd: number;
    public usd_foil: number;
    public tix: number; 

    constructor(usd: number, usd_foil: number, tix: number) {
        this.usd = usd;
        this.usd_foil = usd_foil;
        this.tix = tix;
    }
}