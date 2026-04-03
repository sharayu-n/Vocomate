import { VocabularyRecorder } from "@/components/vocabulary/VocabularyRecorder";
import { Sparkles } from "lucide-react";

export default function VocabularyPage() {
  return (
    <div className="flex flex-col gap-6 h-full pb-8">
      <div>
        <h1 className="text-3xl font-serif italic text-foreground mb-2">Vocabulary Lab</h1>
        <p className="text-muted-foreground text-sm">
          Speak naturally and we'll suggest more sophisticated alternatives for common words.
        </p>
      </div>
      
      <VocabularyRecorder />

      <div className="mt-4 bg-primary text-primary-foreground rounded-2xl p-6 shadow-md flex items-center gap-6">
        <div className="flex items-center gap-3 w-1/4">
          <Sparkles className="w-5 h-5 opacity-80" />
          <h3 className="font-semibold text-lg">Word of the Day</h3>
        </div>
        <div className="w-3/4 flex flex-col">
          <div className="flex items-baseline gap-3 mb-1">
            <span className="text-2xl font-bold">Eloquence</span>
            <span className="text-primary-foreground/70 italic text-sm">(noun)</span>
          </div>
          <p className="text-primary-foreground/90 text-sm">Fluent or persuasive speaking or writing.</p>
        </div>
      </div>
    </div>
  );
}
