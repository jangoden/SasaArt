import { getProjectBySlug, getArtProjects, getFeaturedProjects, getLiteratureProjects } from '../data-service';
import { createClient } from '../supabase/server';

// Mock the server client
jest.mock('../supabase/server', () => ({
  createClient: jest.fn(),
}));

// Mock next/headers
jest.mock('next/headers', () => ({
  cookies: jest.fn(() => ({
    get: jest.fn(),
    set: jest.fn(),
    remove: jest.fn(),
  })),
}));

describe('Data Service', () => {
  let mockSupabaseClient;

  beforeEach(() => {
    // Before each test, we set up a fresh mock for the Supabase client's fluent API
    mockSupabaseClient = {
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      single: jest.fn(),
    };
    // Ensure our mocked createClient returns the mock Supabase client
    (createClient as jest.Mock).mockResolvedValue(mockSupabaseClient);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getProjectBySlug', () => {
    it('should fetch and transform a project by its slug', async () => {
      const mockDbProject = {
        id: '1',
        title: 'Test Project',
        slug: 'test-project',
        image_url: 'test_image.jpg',
        music_url: null,
        content: 'Test content',
      };
      
      // Set the 'single' method to resolve with our mock data
      mockSupabaseClient.single.mockResolvedValue({ data: mockDbProject, error: null });

      const project = await getProjectBySlug('test-project');

      // Check that the Supabase client was called correctly
      expect(mockSupabaseClient.from).toHaveBeenCalledWith('projects');
      expect(mockSupabaseClient.select).toHaveBeenCalledWith('*');
      expect(mockSupabaseClient.eq).toHaveBeenCalledWith('slug', 'test-project');
      
      // Check that the data is transformed correctly
      expect(project).toEqual({
        id: '1',
        title: 'Test Project',
        slug: 'test-project',
        imageUrl: expect.stringContaining('/test_image.jpg'),
        soundcloudUrl: undefined,
        content: 'Test content',
      });
    });

    it('should return null if there is an error fetching the project', async () => {
      // Suppress the expected console.error message
      jest.spyOn(console, 'error').mockImplementation(() => {});

      // Simulate an error from Supabase
      mockSupabaseClient.single.mockResolvedValue({ data: null, error: new Error('DB Error') });

      const project = await getProjectBySlug('test-project');
      
      expect(project).toBeNull();
    });
  });

  describe('getFeaturedProjects', () => {
    it('should fetch and transform a list of featured projects', async () => {
        const mockDbProjects = [
            { id: '1', title: 'Featured 1', slug: 'featured-1', image_url: 'f1.jpg' },
            { id: '2', title: 'Featured 2', slug: 'featured-2', image_url: 'f2.jpg' },
        ];
        
        // The final call in the chain is 'limit'
        mockSupabaseClient.limit.mockResolvedValue({ data: mockDbProjects, error: null });

        const projects = await getFeaturedProjects();

        expect(mockSupabaseClient.from).toHaveBeenCalledWith('projects');
        expect(mockSupabaseClient.select).toHaveBeenCalledWith('*');
        expect(mockSupabaseClient.order).toHaveBeenCalledWith('created_at', { ascending: false });
        expect(mockSupabaseClient.limit).toHaveBeenCalledWith(6);
        expect(projects).toHaveLength(2);
        expect(projects[0].title).toBe('Featured 1');
        expect(projects[1].imageUrl).toContain('f2.jpg');
    });
  });

  describe('getProjectsByCategorySlug', () => {
    it('should fetch and transform projects for a given category slug', async () => {
      const mockCategory = { id: 'cat-123' };
      const mockDbProjects = [
        { id: 'proj-1', title: 'Art Project 1', slug: 'art-1', image_url: 'art1.jpg' },
        { id: 'proj-2', title: 'Art Project 2', slug: 'art-2', image_url: 'art2.jpg' },
      ];

      // Mock the two separate Supabase calls
      mockSupabaseClient.from.mockImplementation((tableName) => {
        if (tableName === 'categories') {
          return {
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockReturnThis(),
            single: jest.fn().mockResolvedValue({ data: mockCategory, error: null }),
          };
        }
        if (tableName === 'projects') {
          return {
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockReturnThis(),
            order: jest.fn().mockResolvedValue({ data: mockDbProjects, error: null }),
          };
        }
        return {
          select: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          order: jest.fn().mockReturnThis(),
          single: jest.fn().mockReturnThis(),
        };
      });

      const projects = await getArtProjects(); // Uses 'getProjectsByCategorySlug' internally with 'art'

      expect(projects).toHaveLength(2);
      expect(projects[0].title).toBe('Art Project 1');
      expect(projects[1].imageUrl).toContain('art2.jpg');
    });

    it('should return an empty array if the category does not exist', async () => {
      // Suppress the expected console.error message
      jest.spyOn(console, 'error').mockImplementation(() => {});

      // Simulate category not found
      mockSupabaseClient.from.mockImplementation((tableName) => {
        if (tableName === 'categories') {
          return {
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockReturnThis(),
            single: jest.fn().mockResolvedValue({ data: null, error: new Error('Not found') }),
          };
        }
        return mockSupabaseClient; // Return the default mock for other tables
      });

      const projects = await getLiteratureProjects();
      expect(projects).toEqual([]);
    });
  });
});
