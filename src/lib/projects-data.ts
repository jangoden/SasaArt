// This is a placeholder for a more robust data structure.
// In a real application, this would likely come from a CMS or a database.
export const projectsData = {
    art: {
      'Fine Art': {
        'Canvas': [
          { title: 'Abstrak', imageUrl: '/images/art/Fine%20Art/Canvas/Abstrak.webp' },
          { title: 'Flower', imageUrl: '/images/art/Fine%20Art/Canvas/Flower.webp' },
          { title: 'Pink Color', imageUrl: '/images/art/Fine%20Art/Canvas/Pink%20Color.webp' },
        ],
        'Bag': [
          { title: 'Bag 1', imageUrl: '/images/art/Fine%20Art/Bag/1.webp' },
          { title: 'Bag 2', imageUrl: '/images/art/Fine%20Art/Bag/2.webp' },
          { title: 'Bag 3', imageUrl: '/images/art/Fine%20Art/Bag/3.webp' },
        ],
      },
      'Architecture': {
        'Design Building': [{ title: 'Modern Villa', imageId: 'project-arch-1' }],
        'Competition': [{ title: 'City Tower Concept', imageId: 'project-arch-2' }],
        'Student Exchange': [{ title: 'Campus Pavilion', imageId: 'project-arch-3' }],
      }
    },
    music: {
        'Original Songs': {
            'Playlist': [
              { 
                title: 'Lekas Pulih', 
                soundcloudUrl: 'https://soundcloud.com/lunea-arte/lekas-pulih-lunea-arte?si=cf620af30dee4d43a3e52ec66786b22d&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing' 
              },
              {
                title: 'Papa Mengapa Kau Berubah',
                soundcloudUrl: 'https://soundcloud.com/lunea-arte/papa-mengapa-kau-berubah-lunea-arte?si=176c8e2d5c144824bd6de777add45fd7&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing'
              }
            ],
        },
        'Covers': {
            'Playlist': [
              {
                title: 'Cantik (Khitna Cover)',
                soundcloudUrl: 'https://soundcloud.com/lunea-arte/cantik-khitna-cover?si=c15450dad36540cf883db629332c7e55&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing'
              },
              {
                title: 'If U Could See Me Cryin\' In My Room (Cover)',
                soundcloudUrl: 'https://soundcloud.com/lunea-arte/if-u-could-see-me-cryin-in-my-room-cover?si=3e84dc3110fd41e8a0f6b0fe86afe743&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing'
              }
            ]
        },
      'Perform': { 'Live': [{ title: 'Live at The Fillmore', imageId: 'project-music-1' }]},
      'Lyrics': { 'Handwritten': [{ title: 'Handwritten Lyrics', imageId: 'project-music-lyrics-1' }]},
    },
    literature: {
      'Poetry': {
          'Poems': [{ title: 'Whispers of Dawn', imageId: 'project-lit-1' }],
      },
      'Prose': {
        'Life Story': [{ title: 'Autobiographical Excerpt', imageId: 'project-lit-2' }],
        'Fictitious': [{ title: 'The Last City', imageId: 'project-lit-fict-1' }],
      }
    },
};
  
export type Project = {
    title: string;
    imageUrl?: string;
    imageId?: string;
    soundcloudUrl?: string;
};
