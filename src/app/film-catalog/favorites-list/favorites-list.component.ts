import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../shared/services/services/film.service';
import { MessagesService } from '../../shared/services/messages.service';
import { Subscription } from 'rxjs';

import { Film } from '../../shared/models/film';
import { FilmApiService } from '../../shared/services/services/film.api.service';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.css']
})
export class FavoritesListComponent implements OnInit {
  preload: boolean = true;
  error: string;
  filmsList: Film;
  page: number = 1;
  lastPage: number = 1;

  filmSubscription: Subscription;



  constructor(
    public filmsService: FilmService,
    private messagesService: MessagesService,
    private filmApiService: FilmApiService
  ) { }

  ngOnInit() {
    this.getFilmsFavoritesList();
  }

  getFilmsFavoritesList(page: number = 1): void {
    this.filmApiService.getFavoriteList()
      .subscribe(
        (data: any) => {
          console.log(data);
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
    serverData.results.forEach(film => {
      film.isFavorite = true;
    });
    this.filmsList = serverData.results;
  }

  getNextPage(page: number): void {
    this.getFilmsFavoritesList(page);
  }

  addToFavorite(film: Film): void {
    this.filmsService.addOrRemoveFromFavorite(film);
  }

  isFavoriteListEmpty(list: any) {
    return (list.length) ? false : true;
  }
}
