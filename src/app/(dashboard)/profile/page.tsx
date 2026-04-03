import { ProfileDashboard } from "@/components/profile/ProfileDashboard";

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-6 h-full pb-8">
      <div>
        <h1 className="text-3xl font-serif italic text-foreground mb-2">Your Profile</h1>
        <p className="text-muted-foreground text-sm">
          Track your progress, review past sessions, and manage your vocabulary list.
        </p>
      </div>
      
      <ProfileDashboard />
    </div>
  );
}
