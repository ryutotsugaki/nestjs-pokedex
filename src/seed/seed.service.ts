import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Pokemon as PokemonInterface } from './interfaces/Pokemon.inteface';
import { NestAxiosAdapter } from '../common/adapters/http-service.adaper';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';

@Injectable()
export class SeedService {
  constructor(
    private readonly http: NestAxiosAdapter,
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async executeSeed() {

    await this.pokemonModel.deleteMany({});

    const data: PokemonInterface = await this.http.get(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    // console.log(data.results);

    const pokemonsToInsert = [];

    data.results.forEach(({name, url}) =>{

      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      // console.log({name, no});

      pokemonsToInsert.push({name, no});
    });

    await this.pokemonModel.insertMany(pokemonsToInsert);
    return data.results;
  }
}
