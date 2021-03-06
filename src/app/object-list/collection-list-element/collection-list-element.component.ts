import { Component, Input } from '@angular/core';
import { Collection } from "../../core/shared/collection.model";

@Component({
    selector: 'ds-collection-list-element',
    styleUrls: ['./collection-list-element.component.css'],
    templateUrl: './collection-list-element.component.html'
})
export class CollectionListElementComponent {

    @Input() collection: Collection;

    data: any = {};

    constructor() {
        this.universalInit();
    }

    universalInit() {

    }

}
