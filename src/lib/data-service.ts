/**
 * @file This file acts as a data service layer for fetching data from Supabase.
 * It uses the server-side Supabase client to interact with the database.
 */
import { createClient } from './supabase/server';
import { projectsData } from './projects-data'; // Keep for featured projects for now
import { Project } from './projects-data';

// Helper function to group projects by a specific key (e.g., category or subcategory name)
function groupBy(array: any[], key: string) {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, {});
}

export async function getArtProjects() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('projects')
    .select(
      `
      *,
      subcategories ( name ),
      categories ( name )
    `
    )
    .eq('categories.slug', 'art');
  
  if (error) {
    console.error('Error fetching art projects:', error);
    return {};
  }

  // The component for the Art page expects data grouped by subcategory
  // e.g., { "Canvas": [...], "Bag": [...] }
  return groupBy(data.filter(p => p.subcategories), 'subcategories.name');
}

export async function getArchitectureProjects() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('projects')
      .select(
        `
        *,
        subcategories ( name ),
        categories ( name )
      `
      )
      .eq('categories.slug', 'architecture');
    
    if (error) {
      console.error('Error fetching architecture projects:', error);
      return [];
    }
    return data || [];
}

export async function getMusicProjects() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('projects')
      .select(
        `
        *,
        subcategories ( name ),
        categories ( name )
      `
      )
      .eq('categories.slug', 'music');
    
    if (error) {
      console.error('Error fetching music projects:', error);
      return {};
    }
  
    // The component for the Music page expects data grouped by subcategory
    return groupBy(data.filter(p => p.subcategories), 'subcategories.name');
}

export async function getLiteratureProjects() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('projects')
      .select(
        `
        *,
        subcategories ( name ),
        categories ( name )
      `
      )
      .eq('categories.slug', 'literature');
    
    if (error) {
      console.error('Error fetching literature projects:', error);
      return {};
    }

    // The component for the Literature page expects data grouped by subcategory
    // e.g. { "Poetry": [...], "Prose": [...] }
    const groupedBySubCat = groupBy(data.filter(p => p.subcategories), 'subcategories.name');

    // The component expects Prose to contain multiple sub-types, so we manually group them
    // This logic might need to be adjusted based on how subcategories are defined in the DB
    const proseProjects = [...(groupedBySubCat['Life Story'] || []), ...(groupedBySubCat['Fictitious'] || [])];
    
    return {
        'Poetry': groupedBySubCat['Poetry'] || [],
        'Prose': proseProjects,
    };
}

// For now, featured projects still come from the local file.
// A proper implementation would involve a 'featured' flag in the 'projects' table.
export function getFeaturedProjects(): Project[] {
    return [
        { title: 'Abstrak', imageUrl: '/images/art/Fine%20Art/Canvas/Abstrak.webp' },
        { 
            title: 'Lekas Pulih', 
            soundcloudUrl: 'https://soundcloud.com/lunea-arte/lekas-pulih-lunea-arte?si=cf620af30dee4d43a3e52ec66786b22d&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing' 
        },
        { title: 'Whispers of Dawn', imageId: 'project-lit-1' },
        { title: 'Modern Villa', imageId: 'project-arch-1' },
    ];
}