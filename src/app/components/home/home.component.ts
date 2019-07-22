import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  nuevasCanciones: any[] = [];
  loading: boolean;
  error: boolean;
  errorstr: string;

  constructor(private spotify: SpotifyService) {
    this.loading = true;
    this.error = false;

  }

  ngOnInit() {
    this.spotify.getNewReleases().
      subscribe((data: any) => {
        this.nuevasCanciones = data;
        this.loading = false;
      }, (error) => {
        this.errorstr = error.error.error.message;
        this.loading = true;
      });
  }
}
