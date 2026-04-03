"use client";

import { useState, useEffect } from "react";
import { Mic, MicOff, VideoOff, Play, Square, BookOpen, Volume2, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface VocabSuggestion {
  original: string;
  suggestion: string;
  reason: string;
}

const commonWordsObj: Record<string, string> = {
  "good": "excellent, superb, stellar",
  "bad": "poor, subpar, deficient",
  "happy": "ecstatic, thrilled, content",
  "sad": "melancholic, sorrowful, downcast",
  "very": "extremely, highly, exceptionally",
  "smart": "intelligent, astute, brilliant",
  "big": "massive, substantial, colossal",
  "small": "minuscule, compact, modest",
};

export function VocabularyRecorder() {
  const { isRecording, startRecording, stopRecording, transcript, interimTranscript, reset } = useSpeechRecognition();
  const [suggestions, setSuggestions] = useState<VocabSuggestion[]>([]);

  // Simple heuristic for word replacement based on spoken text
  useEffect(() => {
    if (isRecording) {
      const words = (transcript + " " + interimTranscript).toLowerCase().split(/\W+/);
      const newSuggestions: VocabSuggestion[] = [];
      const seen = new Set(suggestions.map(s => s.original));

      for (const word of words) {
        if (commonWordsObj[word] && !seen.has(word)) {
          newSuggestions.push({
            original: word,
            suggestion: commonWordsObj[word].split(", ")[0],
            reason: `Instead of "${word}", try these variants: ${commonWordsObj[word]}`
          });
          seen.add(word);
        }
      }

      if (newSuggestions.length > 0) {
        setSuggestions(prev => [...newSuggestions, ...prev]);
      }
    }
  }, [transcript, interimTranscript, isRecording]);

  const handleToggleRecord = () => {
    if (isRecording) {
      stopRecording();
    } else {
      reset();
      setSuggestions([]);
      startRecording();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[500px]">
      
      {/* Left Panel: Speech Recording */}
      <Card className="flex flex-col overflow-hidden bg-white rounded-3xl border shadow-sm p-6">
        <h3 className="text-[11px] font-bold tracking-widest text-muted-foreground uppercase mb-4">Your Speech</h3>
        
        <p className="text-sm italic text-muted-foreground min-h-[40px] mb-4">
          {(!isRecording && !transcript) ? "Start recording to see your transcript here..." : (transcript + interimTranscript)}
        </p>

        <div className="flex-1 relative bg-[#222120] rounded-2xl overflow-hidden shadow-sm flex flex-col items-center justify-center mb-6 min-h-[220px]">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none" />
          <div className="flex-1 flex items-center justify-center z-0">
             {!isRecording && <VideoOff className="w-16 h-16 text-[#444] opacity-50" />}
          </div>
          
          <div className="absolute bottom-6 w-[80%] z-20">
            <div className="bg-black/40 backdrop-blur-md rounded-xl p-3 flex justify-center border border-white/5 shadow-xl text-white text-sm">
              {isRecording ? "Listening..." : "Start speaking..."}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex justify-center items-center gap-5 mt-auto">
          <button className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-muted bg-white text-muted-foreground transition-all">
            <Mic className="w-4 h-4" />
          </button>

          <button 
            onClick={handleToggleRecord}
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg",
              isRecording ? "bg-black text-white hover:bg-zinc-800" : "bg-primary text-white hover:bg-primary/90"
            )}
          >
            {isRecording ? <Square className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 ml-1 fill-current" />}
          </button>

          <button className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-muted bg-white text-muted-foreground transition-all">
            <VideoOff className="w-4 h-4" />
          </button>
        </div>
      </Card>

      {/* Right Panel: Suggestions */}
      <Card className="flex flex-col overflow-hidden bg-white rounded-3xl border shadow-sm p-6">
        <h3 className="text-[11px] font-bold tracking-widest text-muted-foreground uppercase mb-4">Vocabulary Suggestions</h3>
        
        {suggestions.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center h-full gap-4 text-muted-foreground opacity-60">
            <BookOpen className="w-12 h-12 mb-2" />
            <p className="text-sm max-w-[200px]">No suggestions yet. Try using common words like "good", "very", or "happy".</p>
          </div>
        ) : (
          <ScrollArea className="flex-1 pr-4">
            <div className="flex flex-col gap-4">
              {suggestions.map((s, i) => (
                <div key={i} className="bg-gray-50 border rounded-2xl p-4 flex flex-col gap-2 relative group hover:border-primary/20 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <span className="line-through text-red-400 font-medium">{s.original}</span>
                       <span className="text-primary font-bold">{s.suggestion}</span>
                    </div>
                    <button className="w-6 h-6 rounded-full bg-white border shadow-sm flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">{s.reason}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </Card>

    </div>
  );
}
