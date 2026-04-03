import { TopNav } from "@/components/shared/TopNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <TopNav />
      <main className="max-w-7xl mx-auto px-8 py-8">{children}</main>
    </div>
  );
}
