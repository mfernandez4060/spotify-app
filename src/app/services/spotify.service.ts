import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SpotifyService {

  token: any;
  tokenResponse: any;
  contentHeaders = new Headers();
  
  constructor(private http: HttpClient) {
    this.contentHeaders.append('Accept', 'application/json');
    this.contentHeaders.append('Content-Type', 'application/json');
    
  }

  getQuery(query: string) {

    let params = new HttpParams();
    const url = `/api/v1/proxy?urlRequest=${btoa(query)}`;

    return this.http.get(url);
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases?limit=50').pipe(map(data => data['albums'].items));
  }

  getArtistas(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`).pipe(map(data => data['artists'].items));
  }

  getArtista(id: string) {
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`).pipe(map(data => data['tracks']));
  }
}
