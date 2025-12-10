import { Sidebar } from "@/components/layout/sidebar";
import { MobileHeader } from "@/components/layout/mobile-header";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[url('/images/background.png')] bg-cover bg-fixed bg-center text-white">
        <div className="relative flex h-screen overflow-hidden">
          {/* Always-visible sidebar for large screens */}
          <div className="hidden lg:block fixed top-0 left-0 z-40 h-full">
            <Sidebar />
          </div>

          {/* Main content */}
          <div className="flex-1 lg:ml-80 flex flex-col">
            <MobileHeader />
            <main className="flex-1 p-4 md:p-8 overflow-y-auto">{children}</main>
          </div>
        </div>
    </div>
  );
}
