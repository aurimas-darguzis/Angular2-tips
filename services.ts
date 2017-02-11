import { Instrument } from '../shared/instrument';

export class BandInstrumentService {
  private instruments: Instrument[] = [];
  
  getInstruments() {
    return this.instruments;
  }
  
  addInstruments(item: Instrument[]) {
  // Push multiple items in one code line
    Array.prototype.push.apply(this.instruments);
    
    /**************************************************
      Apply this push method available on each array 
      object to all the items I specify in arguments.
                *****************************
      Use the default push method available on array 
      prototype to apply them on all items and pass
      to this method and push them individually on
      this.items property of the instrument-list 
      services.
     **************************************************/
  }
}

/********************* InstrumentListComponent ***************************/
import { Component, OnInit } from '@angular/core';
import { Instrument } from '../shared/instrument';

@Component({
  selector: 'ad-instrument-list',
  templateUrl: './instrument-list.component.html';
})
 export class InstrumentListComponent implements OnInit {
  instruments: Instrument[];
 
 constructor(private instrmServc: BandInstrumentService) {}
 
 ngOnInit() {
    this.instruments = this.instrmServ.getInstruments();
  }
 }

/********************* InstrumentPlayersComponent ***************************/
import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';

@Component({
  selector: 'ad-player-detail',
  templateUrl: './player-detail.component.html'
})
export class InstrumentPlayersComponent implements OnInit {
  @Input() selectedInstrument: Instrument;

  constructor(private bss: BandInstrumentService) { }

  ngOnInit() {
  }

  onAddToShoppingList() {
    this.bss.addItems(this.selectedInstrument.player);
  }

}

