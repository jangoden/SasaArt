import { render, screen, fireEvent, within } from '@testing-library/react';
import { LiteratureGrid } from '../literature-grid';
import { Project } from '@/lib/data-service';

// Mock the Dialog component to simplify testing. We will just check if the content is rendered.
jest.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children }) => <div>{children}</div>,
  DialogTrigger: ({ children }) => children,
  DialogContent: ({ children }) => <div data-testid="dialog-content">{children}</div>,
  DialogHeader: ({ children }) => <div>{children}</div>,
  DialogTitle: ({ children }) => <h2>{children}</h2>,
}));

// Mock the Button component
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'First Post',
    slug: 'first-post',
    content: 'Full content of the first post.',
  },
  {
    id: '2',
    title: 'Second Post',
    slug: 'second-post',
    content: 'Full content of the second post.',
  },
];

describe('LiteratureGrid', () => {
  it('should render a message when there are no projects', () => {
    render(<LiteratureGrid projects={[]} />);
    expect(screen.getByText(/no projects in this category yet/i)).toBeInTheDocument();
  });

  it('should render a grid of project cards', () => {
    render(<LiteratureGrid projects={mockProjects} />);
    
    expect(screen.getByText('First Post')).toBeInTheDocument();
    expect(screen.getByText('Second Post')).toBeInTheDocument();

    // Check for the content (it's too short to be truncated in this test)
    expect(screen.getByText(/full content of the first post./i)).toBeInTheDocument();
    
    // Check for "Read More" buttons
    const readMoreButtons = screen.getAllByRole('button', { name: /read more/i });
    expect(readMoreButtons).toHaveLength(2);
  });

  it('should open a dialog with the full content when "Read More" is clicked', () => {
    render(<LiteratureGrid projects={mockProjects} />);

    // Find the "Read More" button for the first project
    const firstReadMoreButton = screen.getAllByRole('button', { name: /read more/i })[0];
    fireEvent.click(firstReadMoreButton);

    const dialog = screen.getByTestId('dialog-content');

    // The title in the dialog should be the full title
    const dialogTitle = within(dialog).getByRole('heading', { name: 'First Post' });
    expect(dialogTitle).toBeInTheDocument();

    // The full content should be present within the dialog
    expect(within(dialog).getByText('Full content of the first post.')).toBeInTheDocument();
  });
});
