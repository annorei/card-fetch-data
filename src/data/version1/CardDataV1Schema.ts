import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';

export class CardDataV1Schema extends ObjectSchema {
    
    public constructor()
    {
        super();

        this.withOptionalProperty('last_updated'), TypeCode.Long;
        this.withRequiredProperty('id', TypeCode.String);
        this.withOptionalProperty('oracle_id', TypeCode.String);
        this.withRequiredProperty('name', TypeCode.String);
        this.withOptionalProperty('printed_name', TypeCode.String);
        this.withOptionalProperty('lang', TypeCode.String);
        this.withOptionalProperty('scryfall_uri', TypeCode.String);
        this.withOptionalProperty('image_uris', TypeCode.Object);
        this.withOptionalProperty('mana_cost', TypeCode.String);
        this.withRequiredProperty('cmc', TypeCode.Float);
        this.withRequiredProperty('type_line', TypeCode.String);
        this.withOptionalProperty('printed_type_line', TypeCode.String);
        this.withOptionalProperty('oracle_text', TypeCode.String);
        this.withOptionalProperty('printed_text', TypeCode.String);
        
        this.withOptionalProperty('loyalty', TypeCode.Float);
        this.withOptionalProperty('power', TypeCode.Float);
        this.withOptionalProperty('toughness', TypeCode.Float);

        this.withOptionalProperty('colors', TypeCode.Array);
        this.withOptionalProperty('color_identity', TypeCode.Array);
        this.withOptionalProperty('legalities', TypeCode.Object);

        
        this.withOptionalProperty('set_code', TypeCode.String);
        this.withOptionalProperty('set_name', TypeCode.String);
        this.withOptionalProperty('rulings_uri', TypeCode.String);
        this.withOptionalProperty('rarity', TypeCode.String);
        this.withOptionalProperty('prices', TypeCode.Object);
        this.withOptionalProperty('custom_tags', TypeCode.Array);
    }
}