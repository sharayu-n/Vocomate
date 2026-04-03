"use client";

import { useState } from "react";
import { Mic, Square, Play, CheckCircle2, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

type Step = "setup" | "interview" | "results";

const MOCK_QUESTIONS = [
  "Tell me about a time you had to make a difficult decision.",
  "How do you handle conflict in a team setting?",
  "Describe a project you are most proud of."
];

export function InterviewFlow() {
  const [step, setStep] = useState<Step>("setup");
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<{question: string, answer: string, score: number}[]>([]);
  
  const { isRecording, startRecording, stopRecording, transcript, interimTranscript, reset } = useSpeechRecognition();

  const handleStart = () => {
    setStep("interview");
    setCurrentQuestionIdx(0);
    setAnswers([]);
    reset();
  };

  const handleNextQuestion = () => {
    if (isRecording) stopRecording();
    
    // Save current answer
    const currentAns = transcript + interimTranscript || "No answer provided.";
    setAnswers(prev => [
      ...prev, 
      { 
        question: MOCK_QUESTIONS[currentQuestionIdx], 
        answer: currentAns, 
        score: Math.floor(Math.random() * 30) + 70 
      }
    ]);

    reset();

    if (currentQuestionIdx < MOCK_QUESTIONS.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      setStep("results");
    }
  };

  const handleToggleRecord = () => {
    if (isRecording) {
      stopRecording();
    } else {
      reset();
      startRecording();
    }
  };

  if (step === "setup") {
    return (
      <Card className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border shadow-sm min-h-[500px]">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
           <Mic className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Ready for your Mock Interview?</h2>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          You'll be asked a series of behavioral questions. Take your time, speak clearly, and try to use the STAR method.
        </p>
        <button 
          onClick={handleStart}
          className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors shadow-lg"
        >
          Start Interview
        </button>
      </Card>
    );
  }

  if (step === "results") {
    const avgScore = Math.round(answers.reduce((acc, curr) => acc + curr.score, 0) / answers.length);
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-8 flex flex-col items-center justify-center bg-white rounded-3xl border shadow-sm row-span-2">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Interview Complete</h2>
          <p className="text-muted-foreground text-center mb-8">Great job! Here is your overall performance.</p>
          
          <div className="w-48 h-48 rounded-full border-[12px] border-primary flex items-center justify-center mb-4">
             <span className="text-5xl font-bold">{avgScore}</span>
          </div>
          <span className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">Overall Score</span>
        </Card>
        
        <div className="md:col-span-2 flex flex-col gap-4">
          <h3 className="font-semibold text-lg">Question Feedback</h3>
          {answers.map((ans, i) => (
            <Card key={i} className="p-6 bg-white rounded-2xl border shadow-sm flex flex-col gap-3">
              <div className="flex justify-between items-start gap-4">
                <p className="font-medium">Q{i + 1}: {ans.question}</p>
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold shrink-0">
                  Score: {ans.score}
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-sm text-foreground/80 border">
                {ans.answer}
              </div>
              <div className="mt-2 text-sm text-green-700 bg-green-50 p-3 rounded-xl">
                 <span className="font-semibold block mb-1">Improved Answer Snippet:</span>
                 "Rather than focusing on the conflict, I would frame it around the common goal we both shared..."
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Card className="flex flex-col bg-white rounded-3xl border shadow-sm min-h-[500px] overflow-hidden">
       {/* Top question area */}
       <div className="bg-gray-50 border-b px-8 py-10 flex flex-col items-center justify-center text-center relative">
          <span className="absolute top-6 left-8 text-sm font-bold tracking-widest text-muted-foreground uppercase">
             Question {currentQuestionIdx + 1} of {MOCK_QUESTIONS.length}
          </span>
          <h2 className="text-2xl font-serif text-foreground max-w-2xl mt-4">
            "{MOCK_QUESTIONS[currentQuestionIdx]}"
          </h2>
       </div>

       {/* Middle recording area */}
       <div className="flex-1 p-8 flex flex-col items-center justify-center relative">
          <p className="text-lg italic text-muted-foreground mb-12 min-h-[60px] max-w-2xl text-center">
            {(!isRecording && !transcript) ? "Tap the record button to answer..." : (transcript + interimTranscript)}
          </p>
          
          {/* Action Controls */}
          <div className="flex justify-center items-center gap-6 mt-auto pb-4">
            <button className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-muted bg-white text-muted-foreground transition-all">
              <Mic className="w-5 h-5" />
            </button>

            <button 
              onClick={handleToggleRecord}
              className={cn(
                "w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-lg text-white",
                isRecording ? "bg-black hover:bg-zinc-800" : "bg-primary hover:bg-primary/90"
              )}
            >
              {isRecording ? <Square className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 ml-1 fill-current" />}
            </button>

            <button 
              onClick={handleNextQuestion}
              className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-red-100 bg-white text-primary transition-all hover:bg-red-50 hover:border-red-200"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
       </div>
    </Card>
  );
}
