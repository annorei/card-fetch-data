import { CommandSet, FilterParams, PagingParams } from 'pip-services3-commons-node';
import { ICommand } from 'pip-services3-commons-node';
import { Command } from 'pip-services3-commons-node';
import { ObjectSchema } from 'pip-services3-commons-node';
import { FilterParamsSchema } from 'pip-services3-commons-node';
import { PagingParamsSchema } from 'pip-services3-commons-node';
import { ArraySchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';
import { Parameters } from 'pip-services3-commons-node';

import { CardDataV1Schema } from '../../src/data/version1/CardDataV1Schema';
import { ICardDataController } from './ICardDataController';

export class CardDataCommandSet extends CommandSet {
    private _controller: ICardDataController;

    constructor(controller: ICardDataController) {
        super();

        this._controller = controller;

        this.addCommand(this.makeGetCardsCommand());
        this.addCommand(this.makeGetCardByIdCommand());
        this.addCommand(this.makeGetCardByNameCommand());
        //this.addCommand(this.makeCalculatePositionCommand());
        this.addCommand(this.makeCreateCardCommand());
        this.addCommand(this.makeUpdateCardCommand());
        this.addCommand(this.makeDeleteCardByIdCommand());
    }

    private makeGetCardsCommand(): ICommand {
        return new Command(
            'get_cards',
            new ObjectSchema(true)
                .withOptionalProperty('filter', new FilterParamsSchema())
                .withOptionalProperty('paging', new PagingParamsSchema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let filter = FilterParams.fromValue(args.get('filter'));
                let paging = PagingParams.fromValue(args.get('paging'));
                this._controller.getCards(correlationId, filter, paging, callback);
            }
        );
    }

    private makeGetCardByIdCommand(): ICommand {
        return new Command(
            'get_card_by_id',
            new ObjectSchema(true)
                .withRequiredProperty('card_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let cardId = args.getAsString('card_id');
                this._controller.getCardById(correlationId, cardId, callback);
            }
        );
    }

    private makeGetCardByNameCommand(): ICommand {
        return new Command(
            'get_card_by_name',
            new ObjectSchema(true)
                .withRequiredProperty('name', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let name = args.getAsString('name');
                this._controller.getCardByName(correlationId, name, callback);
            }
        );
    }

    /*
    private makeCalculatePositionCommand(): ICommand {
        return new Command(
            'calculate_position',
            new ObjectSchema(true)
                .withRequiredProperty('site_id', TypeCode.String)
                .withRequiredProperty('udis', new ArraySchema(TypeCode.String)),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let siteId = args.getAsString('site_id');
                let udis = args.getAsObject('udis');
                this._controller.calculatePosition(correlationId, siteId, udis, callback);
            }
        );
    }
*/
    private makeCreateCardCommand(): ICommand {
        return new Command(
            'create_card',
            new ObjectSchema(true)
                .withRequiredProperty('card', new CardDataV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let card = args.getAsObject('card');
                this._controller.createCard(correlationId, card, callback);
            }
        );
    }   

    private makeUpdateCardCommand(): ICommand {
        return new Command(
            'update_card',
            new ObjectSchema(true)
                .withRequiredProperty('card', new CardDataV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let card = args.getAsObject('card');
                this._controller.updateCard(correlationId, card, callback);
            }
        );
    }   
    
    private makeDeleteCardByIdCommand(): ICommand {
        return new Command(
            'delete_card_by_id',
            new ObjectSchema(true)
                .withRequiredProperty('card_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let cardId = args.getAsString('card_id');
                this._controller.deleteCardById(correlationId, cardId, callback);
            }
        );
    }

}