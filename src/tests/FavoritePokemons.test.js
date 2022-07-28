import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../pages';

const pokemonMock = [{
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://pwo-wiki.info/images/4/47/Viridian_Forest.gif',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://pwo-wiki.info/images/5/5b/Pp.gif',
    },
  ],
  summary: 'This intelligent Pokémon roasts hard berries with electricity to make'
  + 'them tender enough to eat.',
}];

describe('Testa o componente FavoritePokemons', () => {
  it(`Testa se é exibida a mensagem No favorite pokemon 
  found caso nao haja favoritos`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    const favorite = screen.getByText(/no favorite pokemon found/i);
    expect(favorite).toBeInTheDocument();
  });
  it('Test se são exibidos os cards dos pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemonMock } />);
    const pikachuImg = screen.getByRole('img', { name: /pikachu sprite/i });
    const name = screen.getByText(/pikachu/i);

    expect(pikachuImg).toBeInTheDocument();
    expect(name).toBeInTheDocument();
  });
});
