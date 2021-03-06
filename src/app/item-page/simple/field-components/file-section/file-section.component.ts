import { Component, Input, OnInit } from '@angular/core';
import { Bitstream } from "../../../../core/shared/bitstream.model";
import { Item } from "../../../../core/shared/item.model";
import { Observable } from "rxjs";

/**
 * This component renders the file section of the item
 * inside a 'ds-metadata-field-wrapper' component.
 */

@Component({
  selector: 'ds-item-page-file-section',
  templateUrl: './file-section.component.html'
})
export class FileSectionComponent implements OnInit {

  @Input() item: Item;

  label : string = "item.page.files";

  separator: string = "<br/>";

  files: Observable<Bitstream[]>;

  constructor() {
    this.universalInit();
  }

  universalInit() {
  }

  ngOnInit(): void {
    this.initialize();
  }

  initialize(): void {
    this.files = this.item.getFiles();
  }

}
