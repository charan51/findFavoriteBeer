import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ListBeerService } from '../list-beer.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  beerID: number,
  list: any[]
}
@Component({
  selector: 'app-search-beer',
  templateUrl: './search-beer.component.html',
  styleUrls: ['./search-beer.component.css']
})

export class SearchBeerComponent implements OnInit {
  public beerList: any = [];
  name: string = '';
  beerID: number = 0;
  username = sessionStorage.getItem('user');
  findBeer = new FormGroup({
    fermentationType: new FormControl('Wyeast', [
      Validators.required
    ]),
    bitterness: new FormControl(64, [
      Validators.required
    ]),
    food: new FormControl('spicy', [
      Validators.required
    ])
  })
  constructor(private beer: ListBeerService, public dialog: MatDialog) { }
  ngOnInit(): void {
  }
  formatLabel(value: number) {
    return value;
  }
  openDialog(id: number): void {
    this.beerID = id;
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '300px',
      data: { beerID: this.beerID, list: this.beerList },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.beerList = dialogRef.componentInstance.beerlistChange;
    });
  }
  onSearch() {
    if (this.findBeer.invalid) {
      return;
    }
    this.beer.findBeerType(this.findBeer.value).subscribe(res => {
      const responseData: any = res;
      const getFavorite = sessionStorage.getItem('fav') ? JSON.parse(sessionStorage.getItem('fav') || '[]') : [];
      const getIDS = Object.keys(getFavorite);
      const dataWithFavorites = responseData.map(item => {
        if (getIDS.includes(item.id.toString())) {
          return { ...item, fav: true }
        } else {
          return item;
        }
      })
      this.beerList = dataWithFavorites;
    });

  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog.html',
})
export class DialogOverviewExampleDialog {
  storedData = JSON.parse(sessionStorage.getItem('fav') || '{}');
  getCurrentBeer = this.storedData[this.data.beerID] ? this.storedData[this.data.beerID]['beerAdditional'] : {};
  beerlistChange = [];
  drinkBefore = this.getCurrentBeer['drinkBefore'] ? this.getCurrentBeer['drinkBefore'] : '';
  drinkNote = this.getCurrentBeer['drinkNote'] ? this.getCurrentBeer['drinkNote'] : '';
  drinkwhere = this.getCurrentBeer['drinkwhere'] ? this.getCurrentBeer['drinkwhere'] : '';
  drinkdate = this.getCurrentBeer['drinkdate'] ? this.getCurrentBeer['drinkdate'] : '';
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  addFav(beerID, beerList: any) {
    const id: number = beerID;
    let list = beerList;
    const getFavorites = JSON.parse(sessionStorage.getItem('fav') || '{}');
    getFavorites[id] = {
      beerAdditional: {
        drinkBefore: this.drinkBefore,
        drinkNote: this.drinkNote,
        drinkwhere: this.drinkwhere,
        drinkdate: this.drinkdate
      }
    }
    const dataWithFavorites = list.map(item => {
      if (item.id === id) {
        return { ...item, fav: true }
      } else {
        return item;
      }
    })
    this.beerlistChange = dataWithFavorites;
    sessionStorage.setItem('fav', JSON.stringify(getFavorites));

  }
  removeFav(beerID, beerList: any) {
    const id = beerID;
    let list = beerList;
    const getFavorites = JSON.parse(sessionStorage.getItem('fav') || '{}');
    const ids = Object.keys(getFavorites);
    const checkID = ids.includes(id.toString());
    if (checkID) {
      const dataWithFavorites = list.map(item => {
        if (item.id === id) {
          return { ...item, fav: false }
        } else {
          return item;
        }
      })
      this.beerlistChange = dataWithFavorites;
      delete getFavorites[id];
      sessionStorage.setItem('fav', JSON.stringify(getFavorites));
    }
  }
}