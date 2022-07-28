import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente App ', () => {
  it('Testa se o topo da aplicação contém um conjunto fixo de links de navegação',
    () => {
      renderWithRouter(<App />);
      const home = screen.getByRole('link', { name: /home/i });
      const about = screen.getByRole('link', { name: /about/i });
      const favoritePokemons = screen.getByRole('link', { name: /favorite Pokémons/i });

      expect(home).toBeInTheDocument();
      expect(about).toBeInTheDocument();
      expect(favoritePokemons).toBeInTheDocument();
    });
  it('testa se a aplicação é redirecionada para a página inicial ao clicar no link Home',
    () => {
      const { history } = renderWithRouter(<App />);

      const homeLink = screen.getByRole('link', { name: /home/i });
      expect(homeLink).toBeInTheDocument();
      userEvent.click(homeLink);
      const { pathname } = history.location;
      expect(pathname).toBe('/');
    });
  it('testa se a aplicação é redirecionada para a página about ao clicar no link about',
    () => {
      const { history } = renderWithRouter(<App />);

      const aboutLink = screen.getByRole('link', { name: /about/i });
      expect(aboutLink).toBeInTheDocument();
      userEvent.click(aboutLink);
      const { pathname } = history.location;
      expect(pathname).toBe('/about');
    });
  it('testa se a aplicação é redirecionada para a página Pokémons Favoritados',
    () => {
      const { history } = renderWithRouter(<App />);

      const favPokemonsLink = screen.getByRole('link', { name: /favorite Pokémons/i });
      expect(favPokemonsLink).toBeInTheDocument();
      userEvent.click(favPokemonsLink);
      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });
  it('Testa se a aplicação é redirecionada para a página Not Found caso URL desconhecida',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/ddjj');
      const notFoundLink = screen.getByText(/page requested not found/i);
      expect(notFoundLink).toBeInTheDocument();
    });
});
