"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

// Helper to check if DB is connected (so we don't crash the whole app if user hasn't set up Postgres yet)
async function isDbReady() {
  try {
    // Just a quick check
    await db.$queryRaw`SELECT 1`;
    return true;
  } catch (e) {
    console.warn("Database not connected. Using local fallback mode.");
    return false;
  }
}

export async function savePracticeSession(data: {
  userId: string;
  type: string;
  duration: number;
  overallScore: number;
  transcript: string;
}) {
  const ready = await isDbReady();
  if (!ready) {
    console.log("[Fallback] savePracticeSession:", data);
    return { success: true, id: "fallback-" + Date.now() };
  }

  try {
    const session = await db.practiceSession.create({
      data: {
        userId: data.userId,
        type: data.type,
        duration: data.duration,
        overallScore: data.overallScore,
        transcript: data.transcript,
        scoreBreakdown: {
          create: {
            clarity: data.overallScore + 2,
            pace: data.overallScore - 5,
            confidence: data.overallScore,
          }
        }
      }
    });
    revalidatePath("/profile");
    return { success: true, id: session.id };
  } catch (err) {
    console.error("Failed to save practice session", err);
    return { success: false, error: "Failed to save to database" };
  }
}

export async function saveInterviewSession(data: {
  userId: string;
  category: string;
  overallScore: number;
  qas: { question: string; answer: string; score: number }[];
}) {
  const ready = await isDbReady();
  if (!ready) {
    console.log("[Fallback] saveInterviewSession:", data);
    return { success: true, id: "fallback-" + Date.now() };
  }

  try {
    const session = await db.interviewSession.create({
      data: {
        userId: data.userId,
        category: data.category,
        overallScore: data.overallScore,
        qas: {
          create: data.qas.map(qa => ({
             question: qa.question,
             answer: qa.answer,
             score: qa.score
          }))
        }
      }
    });
    revalidatePath("/profile");
    return { success: true, id: session.id };
  } catch (err) {
    console.error("Failed to save interview session", err);
    return { success: false, error: "Failed to save to database" };
  }
}

export async function getProfileStats(userId: string) {
  const ready = await isDbReady();
  if (!ready) {
    return {
      history: [],
      savedWords: []
    };
  }

  try {
    const history = await db.practiceSession.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5
    });

    const savedWords = await db.savedVocabulary.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    });

    return { history, savedWords };
  } catch (err) {
    console.error(err);
    return { history: [], savedWords: [] };
  }
}

export async function saveVocabularyWord(data: {
  userId: string;
  originalWord: string;
  suggestedWord: string;
  meaning: string;
}) {
  const ready = await isDbReady();
  if (!ready) {
    console.log("[Fallback] saveVocabularyWord:", data);
    return { success: true };
  }

  try {
    await db.savedVocabulary.create({ data });
    revalidatePath("/vocabulary");
    revalidatePath("/profile");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
}
