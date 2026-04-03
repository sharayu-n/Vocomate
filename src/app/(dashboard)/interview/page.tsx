import { InterviewFlow } from "@/components/interview/InterviewFlow";

export default function InterviewPage() {
  return (
    <div className="flex flex-col gap-6 h-full pb-8">
      <div>
        <h1 className="text-3xl font-serif italic text-foreground mb-2">Mock Interview</h1>
        <p className="text-muted-foreground text-sm flex justify-between">
          <span>Practice answering dynamic questions with an AI interviewer.</span>
          <span className="font-semibold tracking-widest uppercase">Ongoing</span>
        </p>
      </div>
      
      <InterviewFlow />
    </div>
  );
}
