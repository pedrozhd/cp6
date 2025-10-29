export interface PokemonImage {
small: string;
large: string;
}

export interface PokemonCard {
id: string;
name: string;
images: PokemonImage;
nationalPokedexNumbers?: number[];
types?: string[];
hp?: string;
number?: string;
artist?: string;
rarity?: string;
set?: {
name: string;
series: string;
};
}

export interface ApiResponse {
data: PokemonCard[];
page: number;
pageSize: number;
count: number;
totalCount: number;
}

