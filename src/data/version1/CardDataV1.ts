import { IStringIdentifiable } from 'pip-services3-commons-node';
import { ImageURIsV1 } from './ImageURIsV1';
import { LegalitiesV1 } from './LegalitiesV1';
import { PricesV1 } from './PricesV1';

export class CardDataV1 implements IStringIdentifiable {

    public last_updated: number; //timestamp
    public id: string;
    public oracle_id?: string;
    public name: string;
    public printed_name?: string;
    public lang?: string; //languagesv1
    public scryfall_uri?: string;
    public image_uris?: ImageURIsV1;
        
    public mana_cost?: string;
    public cmc: number;
    public type_line: string;
    public printed_type_line?: string;
    public oracle_text?: string;
    public printed_text?: string;
    public loyalty?: number;
    public power?: number;
    public toughness?: number;
    public colors?: string[];
    public color_identity?: string[];
    public legalities?: LegalitiesV1;
    
    public set_code?: string;
    public set_name?: string;
    public rulings_uri?: string;
    public rarity?: string;
    public prices?: PricesV1;
    public custom_tags?: string[];
}