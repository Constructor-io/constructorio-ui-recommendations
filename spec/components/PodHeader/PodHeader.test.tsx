import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PodHeader } from '../../../src/components/PodHeader/PodHeader';

describe('PodHeader', () => {
  it('renders pod header text', () => {
    render(<PodHeader podHeader='Bestsellers' />);
    expect(screen.getByText('Bestsellers')).toBeInTheDocument();
  });

  it('renders pod subheader when provided', () => {
    render(<PodHeader podHeader='Bestsellers' podSubheader='Top selling products' />);
    expect(screen.getByText('Bestsellers')).toBeInTheDocument();
    expect(screen.getByText('Top selling products')).toBeInTheDocument();
  });

  it('does not render subheader when not provided', () => {
    const { container } = render(<PodHeader podHeader='Bestsellers' />);
    expect(container.querySelector('.cio-pod-subtitle')).not.toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    const { container } = render(<PodHeader podHeader='Bestsellers' podSubheader='Top products' />);

    expect(container.querySelector('.cio-pod-header')).toBeInTheDocument();
    expect(container.querySelector('.cio-pod-title')).toBeInTheDocument();
    expect(container.querySelector('.cio-pod-subtitle')).toBeInTheDocument();
  });

  it('supports render props pattern', () => {
    render(
      <PodHeader podHeader='Bestsellers' podSubheader='Top products'>
        {({ podHeader, podSubheader }) => (
          <div>
            <h1>{podHeader}</h1>
            <p>{podSubheader}</p>
          </div>
        )}
      </PodHeader>,
    );

    expect(screen.getByText('Bestsellers')).toBeInTheDocument();
    expect(screen.getByText('Bestsellers').tagName).toBe('H1');
    expect(screen.getByText('Top products')).toBeInTheDocument();
    expect(screen.getByText('Top products').tagName).toBe('P');
  });

  it('supports component override', () => {
    render(
      <PodHeader
        podHeader='Bestsellers'
        componentOverrides={{
          reactNode: <div className='custom-header'>Custom Header Content</div>,
        }}
      />,
    );

    expect(screen.getByText('Custom Header Content')).toBeInTheDocument();
    expect(screen.queryByText('Bestsellers')).not.toBeInTheDocument();
  });
});
