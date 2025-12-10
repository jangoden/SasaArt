import React from "react";

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function PageLayout({ title, subtitle, children }: PageLayoutProps) {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-white drop-shadow-lg">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-white/80 mt-2">{subtitle}</p>
        )}
      </section>
      <section className="p-4 md:p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg">
        {children}
      </section>
    </div>
  );
}