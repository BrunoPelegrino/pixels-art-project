import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente Pokedex', () => {
  it('Testa se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const encountered = screen.getByRole('heading',
      { name: /encountered pokémons/i }, { level: 2 });

    expect(encountered).toBeInTheDocument();
  });
  it('Testa se é exibido o pŕoximo pokémon quando o botão próxio é clicado', () => {
    renderWithRouter(<App />);
    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextPokemon).toBeInTheDocument();

    const firstPokemon = screen.getByText(/pikachu/i);
    expect(firstPokemon).toBeInTheDocument();

    userEvent.click(nextPokemon);
    const secondPokemon = screen.getByText(/charmander/i);
    expect(secondPokemon).toBeInTheDocument();
  });
  it('É mostrado um pokémon por vez', () => {
    renderWithRouter(<App />);
    const onceAtTime = screen.queryAllByTestId('pokemon-name');
    expect(onceAtTime.length).toBe(1);
  });
  it('Testa se a pokedex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const seven = 7;
    const filterButtons = screen.queryAllByTestId('pokemon-type-button');
    const buttonPokemon = screen.getByRole('button', { name: /psychic/i });
    const resetButton = screen.getByRole('button', { name: /all/i });
    expect(resetButton).toBeInTheDocument();
    expect(filterButtons).toHaveLength(seven);
    expect(buttonPokemon).toBeInTheDocument();
  });
  it('Testa se a pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const resetButton = screen.getByRole('button', { name: /all/i });
    const firstPokemon = screen.getByText(/pikachu/i);
    expect(resetButton).toBeInTheDocument();
    userEvent.click(resetButton);
    expect(firstPokemon).toBeInTheDocument();
  });
});
