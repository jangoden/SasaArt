import { render, screen } from '@testing-library/react';
import { SocialLinks } from '../social-links';

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Instagram: () => <svg data-testid="instagram-icon" />,
  Mail: () => <svg data-testid="mail-icon" />,
  Linkedin: () => <svg data-testid="linkedin-icon" />,
  Music: () => <svg data-testid="music-icon" />,
  Youtube: () => <svg data-testid="youtube-icon" />,
}));

describe('SocialLinks', () => {
  it('should render all social links with correct hrefs', () => {
    render(<SocialLinks />);

    const instagramLink = screen.getByRole('link', { name: /instagram/i });
    expect(instagramLink).toBeInTheDocument();
    expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com/elfebrianti');

    const emailLink = screen.getByRole('link', { name: /email/i });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:artelunea@gmail.com');

    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/elsa-febrianti-564454199?utm_source=share_via&utm_content=profile&utm_medium=member_android'
    );

    const soundcloudLink = screen.getByRole('link', { name: /soundcloud/i });
    expect(soundcloudLink).toBeInTheDocument();
    expect(soundcloudLink).toHaveAttribute('href', 'https://on.soundcloud.com/2i1SvqUroyYQh9kOVN');

    const youtubeLink = screen.getByRole('link', { name: /youtube/i });
    expect(youtubeLink).toBeInTheDocument();
    expect(youtubeLink).toHaveAttribute('href', 'https://www.youtube.com/@luneaarte');
  });

  it('should render all social icons', () => {
    render(<SocialLinks />);

    expect(screen.getByTestId('instagram-icon')).toBeInTheDocument();
    expect(screen.getByTestId('mail-icon')).toBeInTheDocument();
    expect(screen.getByTestId('linkedin-icon')).toBeInTheDocument();
    expect(screen.getByTestId('music-icon')).toBeInTheDocument();
    expect(screen.getByTestId('youtube-icon')).toBeInTheDocument();
  });
});
