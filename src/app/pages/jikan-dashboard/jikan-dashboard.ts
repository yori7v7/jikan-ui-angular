import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { JikanService } from '../../services/jikan.service';
import { JikanAnime, JikanCharacterItem } from '../../models/jikan.models';

type ViewMode = 'top' | 'season' | 'search' | 'characters';

@Component({
  selector: 'app-jikan-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './jikan-dashboard.html',
  styleUrl: './jikan-dashboard.css',
})
export class JikanDashboardComponent implements OnInit {
  mode: ViewMode = 'top';

  animes: JikanAnime[] = [];
  characters: JikanCharacterItem[] = [];

  loading = false;
  errorMsg = '';

  // ✅ Inputs VACÍOS al entrar (para que se vea el placeholder)
  query: string = '';
  animeId: number | null = null;

  // ✅ Ejemplos por defecto (se usan si el user no escribe nada)
  private readonly defaultQuery = 'one piece';
  private readonly defaultAnimeId = 20;

  constructor(private jikan: JikanService) {}

  ngOnInit(): void {
    // Por defecto cargamos algo útil (Top Anime)
    this.loadTop();
  }

  private setMode(m: ViewMode) {
    this.mode = m;
    this.errorMsg = '';
  }

  // Diego: Top Anime
  loadTop(): void {
    this.setMode('top');
    this.loading = true;

    this.jikan.getTopAnime(12).subscribe({
      next: (res) => {
        this.animes = res.data;
        this.characters = [];
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Error al cargar TOP ANIME (Jikan).';
        this.loading = false;
      },
    });
  }

  // Héctor: Season Now
  loadSeasonNow(): void {
    this.setMode('season');
    this.loading = true;

    this.jikan.getSeasonNow(12).subscribe({
      next: (res) => {
        this.animes = res.data;
        this.characters = [];
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Error al cargar SEASON NOW (Jikan).';
        this.loading = false;
      },
    });
  }

  // Denisse: Search
  // ✅ Si está vacío usa defaultQuery, PERO sin llenar el input automáticamente
  search(): void {
    const q = (this.query ?? '').trim() || this.defaultQuery;

    this.setMode('search');
    this.loading = true;

    this.jikan.searchAnime(q, 12).subscribe({
      next: (res) => {
        this.animes = res.data;
        this.characters = [];
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Error al buscar ANIME (Jikan).';
        this.loading = false;
      },
    });
  }

  // Beto: Characters
  // ✅ Si está vacío usa defaultAnimeId, PERO sin llenar el input automáticamente
  loadCharacters(): void {
    const id = Number(this.animeId) || this.defaultAnimeId;

    this.setMode('characters');
    this.loading = true;

    this.jikan.getAnimeCharacters(id).subscribe({
      next: (res) => {
        this.characters = res.data;
        this.animes = [];
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Error al cargar PERSONAJES (Jikan).';
        this.loading = false;
      },
    });
  }
}
