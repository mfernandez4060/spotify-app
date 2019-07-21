import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SpotifyService {

  token: any;
  tokenResponse: any;

  constructor(private http: HttpClient) {

  }

  getQuery(query: string) {
    const url = `/v1/${query}`;
    // tslint:disable-next-line: max-line-length
    const headers = new HttpHeaders({ Authorization: `'Bearer ${this.token}'` });

    return this.http.get(url, { headers });
  }

  getToken() {
    const url = `/api/v1/token`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    // tslint:disable-next-line: max-line-length
    this.http.post(url, {
      "clientId": "d1a906b1affc4b2d9bdc90816cb62e6e",
      "clientSecret": "65dcfded90be471a94655bd08347e312"
    }, httpOptions).subscribe((data: any) => {
      this.tokenResponse = data;
      this.token = data.accessToken;
    });

    return this.token;
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
