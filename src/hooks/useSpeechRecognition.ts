"use client";

import { useState, useEffect, useCallback } from "react";

export function useSpeechRecognition() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recog = new SpeechRecognition();
        recog.continuous = true;
        recog.interimResults = true;
        recog.lang = "en-US";

        recog.onresult = (event: any) => {
          let currentInterim = "";
          let currentFinal = "";

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              currentFinal += event.results[i][0].transcript + " ";
            } else {
              currentInterim += event.results[i][0].transcript;
            }
          }

          setTranscript((prev) => prev + currentFinal);
          setInterimTranscript(currentInterim);
        };

        recog.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
        };

        setRecognition(recog);
      } else {
        console.warn("SpeechRecognition API not supported. Use fallback.");
      }
    }
  }, []);

  const startRecording = useCallback(() => {
    if (recognition) {
      setTranscript("");
      setInterimTranscript("");
      recognition.start();
      setIsRecording(true);
    } else {
      // Mock recording fallback for unsupported browsers
      setIsRecording(true);
      setInterval(() => {
        setInterimTranscript("This is a simulated transcript since Web Speech API is not supported in this browser...");
      }, 1000);
    }
  }, [recognition]);

  const stopRecording = useCallback(() => {
    if (recognition) {
      recognition.stop();
    }
    setIsRecording(false);
  }, [recognition]);

  const reset = useCallback(() => {
    setTranscript("");
    setInterimTranscript("");
  }, []);

  return { isRecording, startRecording, stopRecording, transcript, interimTranscript, reset };
}
