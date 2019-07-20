import { SpotifyService } from './../../services/spotify.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent {
  artista: any = {}
  topTracks: any[] = [];
  loading: boolean;
  constructor(private router: ActivatedRoute, private spotifyService: SpotifyService) {

    this.router.params.subscribe(params => {
      this.loading = true;
      let id: string = params['id'];

      this.getArtista(id);
      this.getTopTrack(id);
    });
  }

  getArtista(id: string) {
    this.spotifyService.getArtista(id).subscribe(artista => {
      console.log(artista);
      this.artista = artista;
      this.loading = false;
    });
  }

  getTopTrack(id: string) {
    this.spotifyService.getTopTracks(id).subscribe(topTracks => {
      console.log(topTracks);
      this.topTracks = topTracks;
    });
  }

}
