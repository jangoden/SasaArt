import { render, screen } from '@testing-library/react';
import { ProfileCard } from '../profile-card';

// Mock the Avatar component to simplify testing
jest.mock('@/components/ui/avatar', () => ({
  Avatar: ({ children, ...props }) => <div {...props}>{children}</div>,
  AvatarImage: ({ alt, ...props }) => <img alt={alt} {...props} />,
  AvatarFallback: ({ children, ...props }) => <div {...props}>{children}</div>,
}));

describe('ProfileCard', () => {
  it('should render the profile name, title, and image', () => {
    render(<ProfileCard />);

    // Check for the name
    const nameElement = screen.getByRole('heading', { name: /lunea arte/i });
    expect(nameElement).toBeInTheDocument();

    // Check for the title/description
    const descriptionElement = screen.getByText(/artist, musician, writer/i);
    expect(descriptionElement).toBeInTheDocument();

    // Check for the profile image
    const imageElement = screen.getByRole('img', { name: /profile picture/i });
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', '/images/foto-profil.webp');
  });
});
