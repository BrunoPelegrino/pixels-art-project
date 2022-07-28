import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('Testa o componetne NotFound', () => {
  it('testa se contém, um heading h2 "Page requested not found 😭"', () => {
    renderWithRouter(<NotFound />);
    const heading = screen.getByText(/Page requested not found/i);

    expect(heading).toBeInTheDocument();
  });
  it('Testa se a página contém a imagem do pikachu triste', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getByRole('img',
      { name: /pikachu crying because the page requested was not found/i });
    expect(img.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
