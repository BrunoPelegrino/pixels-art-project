import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('testa o componente About', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const pokedexInfo = screen
      .getByText(
        /This application simulates a Pokédex, a digital encyclopedia containing all Po/i,
      );
    const pokedexInfo2 = screen
      .getByText(
        /One can filter Pokémons by type, and see more details for each one of them/i,
      );

    expect(pokedexInfo).toBeInTheDocument();
    expect(pokedexInfo2).toBeInTheDocument();
  });
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const headingel = screen.getByRole('heading', { level: 2 });

    expect(headingel).toHaveTextContent('About Pokédex');
  });
  // teste de imagem => https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
  it('Testa se a página contém a imagem de uma Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const img = screen.getByRole('img');
    expect(img.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
