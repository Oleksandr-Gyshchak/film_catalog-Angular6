import { Component, OnInit, ViewChild } from '@angular/core';

import { Subscription, throwError } from 'rxjs';
import { Film } from '../../shared/models/film';
import { FilmService } from '../../shared/services/services/film.service';
import { FavoriteServer } from '../../shared/models/favoriteServer';
import { MessagesService } from '../../shared/services/messages.service';

@Component({
  selector: 'app-films',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css']
})

export class FilmsListComponent implements OnInit {
  preload: boolean = true;
  error: string;

  filmsList: Film;
  page: number = 1;
  lastPage: number = 1;

  filmSubscription: Subscription;



  constructor(
    public filmsService: FilmService,
    private messagesService: MessagesService
  ) { }

  ngOnInit() {
    this.getFilmsList();
  }

  getFilmsList(page: number = 1): void {
    this.filmsService.getFilmList(page).subscribe(
      (data: any) => {
        this.saveData(data);
        this.preload = false;
      },
      err => {
        console.log('error', err);
      });
  }

  saveData(serverData: any): void {
    this.page = serverData.page;
    this.lastPage = serverData.total_pages;
    this.filmsList = serverData.results;
  }

  getNextPage(page: number): void {
    this.getFilmsList(page);
  }

  addToFavorite(film: Film): void {
    this.filmsService.addOrRemoveFromFavorite(film);
  }

}
