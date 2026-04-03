import { TrainRecorder } from "@/components/train/TrainRecorder";

export default function TrainPage() {
  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif italic text-muted-foreground">Speech Training</h1>
        <span className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
          Ready
        </span>
      </div>
      <TrainRecorder />
    </div>
  );
}
