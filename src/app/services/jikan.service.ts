import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  JikanAnime,
  JikanCharactersResponse,
  JikanListResponse,
} from '../models/jikan.models';

@Injectable({
  providedIn: 'root',
})
export class JikanService {
  private base = environment.apiBase;

  constructor(private http: HttpClient) {}

  // Integrante 1: TOP ANIME
  getTopAnime(limit: number = 12): Observable<JikanListResponse<JikanAnime>> {
    const params = new HttpParams().set('limit', limit);
    return this.http.get<JikanListResponse<JikanAnime>>(
      `${this.base}/top/anime`,
      { params },
    );
  }

  // Integrante 2: SEASON NOW (anime en emisión)
  getSeasonNow(limit: number = 12): Observable<JikanListResponse<JikanAnime>> {
    const params = new HttpParams().set('limit', limit);
    return this.http.get<JikanListResponse<JikanAnime>>(
      `${this.base}/seasons/now`,
      { params },
    );
  }

  // Integrante 3: SEARCH ANIME por texto
  searchAnime(
    query: string,
    limit: number = 12,
  ): Observable<JikanListResponse<JikanAnime>> {
    const params = new HttpParams().set('q', query).set('limit', limit);
    return this.http.get<JikanListResponse<JikanAnime>>(`${this.base}/anime`, {
      params,
    });
  }

  // Integrante 4: CHARACTERS de un anime por ID (ej: Naruto=20)
  getAnimeCharacters(animeId: number): Observable<JikanCharactersResponse> {
    return this.http.get<JikanCharactersResponse>(
      `${this.base}/anime/${animeId}/characters`,
    );
  }
}
