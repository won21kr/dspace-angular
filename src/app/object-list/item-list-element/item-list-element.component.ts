import { Component, Input } from '@angular/core';
import { Item } from "../../core/shared/item.model";

@Component({
    selector: 'ds-item-list-element',
    styleUrls: ['./item-list-element.component.css'],
    templateUrl: './item-list-element.component.html'
})
export class ItemListElementComponent {
    @Input() item: Item;

    data: any = {};

    constructor() {
        this.universalInit();
    }

    universalInit() {

    }

}
