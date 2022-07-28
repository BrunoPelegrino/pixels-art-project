import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente pokémon', () => {
  it('Testa se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const name = screen.getByTestId('pokemon-name');
    expect(name).toHaveTextContent(/pikachu/i);
    const type = screen.getByTestId('pokemon-type');
    expect(type).toHaveTextContent(/electric/i);
    const weight = screen.getByTestId('pokemon-weight');
    expect(weight).toHaveTextContent(/average weight: 6\.0 kg/i);
    const image = screen.getByAltText(/pikachu sprite/i);
    expect(image.src).toContain('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png');
  });
  it('Testa se o card contém um link de navegação para exibir detalhes ', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    expect(details).toBeInTheDocument();
    userEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  it('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const favBtn = screen.getByText(/Pokémon favoritado/i);
    userEvent.click(favBtn);
    const icon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(icon).toHaveAttribute('src', '/star-icon.svg');
  });
});
