import { Schema } from 'mongoose';
let Mixed = Schema.Types.Mixed;

export let CardDataMongoDBSchema = function(collection?: string) {
    collection = collection || 'CardData';

    let schema = new Schema(
        {
            _id: { type: String },
            last_updated: { type: Number }, //timestamp
            oracle_id: { type: String, required: false },
            name: {type: String },
            printed_name: {type: String, required: false },
            lang: {type: String, required: false}, //languagesv1
            scryfall_uri: {type: String, required: false},
            image_uris: { type: Mixed, required: false },
        
            mana_cost: {type: String, required: false},
            cmc: {type: Number},
            type_line: {type: String},
            printed_type_line: {type: String, required: false},
            oracle_text: {type: String, required: false},
            printed_text: {type: String, required: false},
            loyalty: {type: Number, required: false},
            power: {type: Number, required: false},
            toughness: {type: Number, required: false},
            colors: {type: Array, required: false},
            color_identity: {type: Array, required: false},
            legalities: { type: Mixed, required: false },
    
            set_code: {type: String, required: false},
            set_name: {type: String, required: false},
            rulings_uri: {type: String, required: false},
            rarity: {type: String, required: false},
            prices: {type: String, required: false},
            custom_tags: {type: Array, required: false}
        },
        {
            collection: collection,
            autiIndex: true
        }
    );

    schema.set('toJSON', {
        transform: function(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });

    return schema;
}