import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const page = '/pokemons/25';

describe('Testa o componente PokemonDetails', () => {
  it('Testa se as informações do pokémon selecionado são mostradas na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push(page);
    const name = screen.getByRole('heading', { name: /pikachu details/i });
    expect(name).toBeInTheDocument();
    const details = screen.queryByRole('link', { name: /more details/i });
    expect(details).not.toBeInTheDocument();
    const heading = screen.getByRole('heading', { name: /summary/i }, { level: 2 });
    expect(heading).toBeInTheDocument();
    const resume = screen.getByText(/this intelligent pokémon roasts hard berries with/i);
    expect(resume).toBeInTheDocument();
  });
  it('Testa se existe na página os mapas contendo as localizações do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(page);
    const heading2 = screen.getByRole('heading', { name: /game locations of pikachu/i });
    expect(heading2).toBeInTheDocument();
    const locations = screen.getAllByAltText(/pikachu location/i);
    expect(locations).toHaveLength(2);
    const locationName = screen.getByText(/kanto viridian forest/i);
    expect(locationName).toBeInTheDocument();
    const mapImage = screen.getAllByAltText(/pikachu location/i);
    expect(mapImage[0].src).toBe('https://pwo-wiki.info/images/4/47/Viridian_Forest.gif');
  });
  it('Testa se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    history.push(page);
    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);
    const checked = screen.getByDisplayValue(/on/i);
    expect(checked).toBeInTheDocument();
  });
});
