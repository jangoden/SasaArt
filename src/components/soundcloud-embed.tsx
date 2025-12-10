"use client";

import React from 'react';

interface SoundcloudEmbedProps {
  url: string;
  width?: string;
  height?: string;
}

export function SoundcloudEmbed({ url, width = '100%', height = '100%' }: SoundcloudEmbedProps) {
  const embedUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;

  return (
    <iframe
      width={width}
      height={height}
      src={embedUrl}
      allow="autoplay"
      frameBorder="0"
      scrolling="no"
    />
  );
}
