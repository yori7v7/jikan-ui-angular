export interface JikanListResponse<T> {
  data: T[];
}

/** Anime general (top, seasons, search, random) */
export interface JikanAnime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  score: number | null;
  episodes: number | null;
  year: number | null;
  synopsis: string | null;
}

/** Personajes de un anime */
export interface JikanCharacterItem {
  character: {
    mal_id: number;
    name: string;
    images: {
      jpg: {
        image_url: string;
      };
    };
  };
  role: string;
}

export interface JikanCharactersResponse {
  data: JikanCharacterItem[];
}
