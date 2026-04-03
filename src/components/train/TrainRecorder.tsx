"use client";

import { useState, useEffect } from "react";
import { Mic, MicOff, VideoOff, Play, Pause, Square } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { cn } from "@/lib/utils";

export function TrainRecorder() {
  const { isRecording, startRecording, stopRecording, transcript, interimTranscript, reset } = useSpeechRecognition();
  
  const [clarity, setClarity] = useState<number | null>(null);
  const [pace, setPace] = useState<number | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [messages, setMessages] = useState([
    { role: "coach", text: "Hi! I'm your speech coach. Start recording and I'll give you real-time feedback on clarity, pace, and delivery." }
  ]);

  const [micEnabled, setMicEnabled] = useState(false);

  // Simulated live analysis of transcript
  useEffect(() => {
    if (isRecording && (transcript.length > 20 || interimTranscript.length > 20)) {
      // Very basic mock logic for live score updates
      const wordCount = (transcript + interimTranscript).split(" ").length;
      
      if (wordCount % 5 === 0) {
        setClarity(Math.floor(Math.random() * 20) + 80);
        setPace(Math.floor(Math.random() * 30) + 70);
        setConfidence(Math.floor(Math.random() * 25) + 75);
      }

      if (wordCount === 15) {
        setMessages(prev => [...prev, { role: "coach", text: "Good start! Keep your pace steady." }]);
      }
      if (wordCount === 40) {
        setMessages(prev => [...prev, { role: "coach", text: "Your clarity is excellent right now." }]);
      }
    }
  }, [transcript, interimTranscript, isRecording]);

  const handleToggleRecord = () => {
    if (isRecording) {
      stopRecording();
      // Normally here we would save session and redirect to results
      setMessages(prev => [...prev, { role: "coach", text: "Session finished. Processing your results..." }]);
    } else {
      reset();
      setClarity(null);
      setPace(null);
      setConfidence(null);
      setMessages([{ role: "coach", text: "Recording... Speak naturally." }]);
      startRecording();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
      
      {/* Left Main Area: Video & Controls */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        <div className="relative flex-1 bg-[#222120] rounded-3xl overflow-hidden shadow-sm flex flex-col items-center justify-center p-6">
          
          {/* Main Visual */}
          <div className="flex-1 flex items-center justify-center">
            {!isRecording && <VideoOff className="w-24 h-24 text-[#444] opacity-50" />}
          </div>

          {/* Bottom Overlay with Real-time metrics */}
          <div className="w-full max-w-2xl bg-black/40 backdrop-blur-md rounded-2xl p-4 flex flex-col gap-4 border border-white/5 shadow-xl">
            <div className="text-center font-medium text-white/90 text-lg min-h-7">
              {isRecording ? (interimTranscript || "Listening...") : "Start speaking..."}
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white/10 rounded-xl p-3 flex flex-col items-center">
                <span className="text-[10px] font-bold text-white/50 tracking-wider uppercase mb-1">Clarity</span>
                <span className="text-2xl font-semibold text-white">{clarity ? clarity : "—"}</span>
              </div>
              <div className="bg-white/10 rounded-xl p-3 flex flex-col items-center">
                <span className="text-[10px] font-bold text-white/50 tracking-wider uppercase mb-1">Pace</span>
                <span className="text-2xl font-semibold text-white">{pace ? pace : "—"}</span>
              </div>
              <div className="bg-white/10 rounded-xl p-3 flex flex-col items-center">
                <span className="text-[10px] font-bold text-white/50 tracking-wider uppercase mb-1">Confidence</span>
                <span className="text-2xl font-semibold text-white">{confidence ? confidence : "—"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex justify-center items-center gap-6 pb-4">
          <button 
            onClick={() => setMicEnabled(!micEnabled)}
            className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-red-100 bg-white text-primary transition-all hover:bg-red-50"
          >
            {micEnabled ? <Mic className="w-5 h-5 text-primary" /> : <MicOff className="w-5 h-5" />}
          </button>

          <button 
            onClick={handleToggleRecord}
            className={cn(
              "w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-lg",
              isRecording ? "bg-black text-white hover:bg-zinc-800" : "bg-primary text-white hover:bg-primary/90"
            )}
          >
            {isRecording ? <Square className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 ml-1 fill-current" />}
          </button>

          <button className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-red-100 bg-white text-primary transition-all hover:bg-red-50">
            <VideoOff className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Right AI Coach Panel */}
      <div className="flex flex-col gap-4">
        <Card className="flex-1 flex flex-col overflow-hidden bg-white rounded-3xl border shadow-sm">
          <div className="px-6 py-5 border-b flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
              <Mic className="w-4 h-4" />
            </div>
            <h2 className="font-semibold text-foreground">AI Coach</h2>
          </div>
          
          <div className="flex-1 p-6 flex flex-col gap-4 overflow-y-auto bg-gray-50/50">
            {messages.map((msg, i) => (
              <div key={i} className="bg-gray-100/80 rounded-2xl rounded-tl-sm p-4 text-sm text-foreground leading-relaxed shadow-sm">
                {msg.text}
              </div>
            ))}
            {!isRecording && (
              <div className="bg-red-50/80 text-primary border border-red-100 rounded-xl p-4 text-sm flex gap-3 shadow-sm">
                <Mic className="w-5 h-5 shrink-0 mt-0.5" />
                <p>Speak for at least 30 seconds for best results.</p>
              </div>
            )}
          </div>
        </Card>
      </div>

    </div>
  );
}
