"use client";

import { Card } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Mic, Star } from "lucide-react";

const chartData = [
  { date: 'Mon', clarity: 75, pace: 80, confidence: 70 },
  { date: 'Tue', clarity: 82, pace: 75, confidence: 78 },
  { date: 'Wed', clarity: 85, pace: 82, confidence: 80 },
  { date: 'Thu', clarity: 80, pace: 78, confidence: 85 },
  { date: 'Fri', clarity: 90, pace: 85, confidence: 88 },
  { date: 'Sat', clarity: 92, pace: 88, confidence: 90 },
];

const historyData = [
  { id: 1, type: "Speech", duration: "2m 15s", score: 88, date: "Today" },
  { id: 2, type: "Interview", duration: "12m 40s", score: 82, date: "Yesterday" },
  { id: 3, type: "Speech", duration: "5m 20s", score: 90, date: "Oct 12" },
];

export function ProfileDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 flex flex-col gap-6">
        <Card className="p-6 bg-white rounded-3xl border shadow-sm">
           <h3 className="text-lg font-semibold mb-6">Performance Trends</h3>
           <div className="h-[300px] w-full">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorClarity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dx={-10} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                  />
                  <Area type="monotone" dataKey="clarity" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorClarity)" />
                </AreaChart>
             </ResponsiveContainer>
           </div>
        </Card>

        <Card className="p-6 bg-white rounded-3xl border shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
             <h3 className="text-lg font-semibold">Recent Sessions</h3>
             <button className="text-sm font-medium text-primary hover:underline">View All</button>
          </div>
          
          <div className="flex flex-col gap-3">
             {historyData.map(session => (
               <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border hover:border-primary/20 transition-colors">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                        {session.type === "Speech" ? <Mic className="w-4 h-4 text-primary" /> : <Star className="w-4 h-4 text-amber-500" />}
                     </div>
                     <div>
                        <p className="font-semibold">{session.type} Practice</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                           <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {session.date}</span>
                           <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {session.duration}</span>
                        </div>
                     </div>
                  </div>
                  <div className="flex flex-col items-end">
                     <span className="text-2xl font-bold">{session.score}</span>
                     <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Score</span>
                  </div>
               </div>
             ))}
          </div>
        </Card>
      </div>

      <div className="flex flex-col gap-6">
        <Card className="p-6 bg-primary text-primary-foreground rounded-3xl shadow-md border-none flex flex-col items-center justify-center text-center">
           <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl">🔥</span>
           </div>
           <h3 className="text-2xl font-bold mb-1">5 Day Streak</h3>
           <p className="text-primary-foreground/80 text-sm">You're doing great! Keep practicing speaking everyday.</p>
        </Card>

        <Card className="p-6 bg-white rounded-3xl border shadow-sm flex-1">
           <h3 className="text-lg font-semibold mb-4">Saved Words</h3>
           <div className="flex flex-wrap gap-2">
             <Badge variant="secondary" className="px-3 py-1.5 rounded-lg text-sm bg-gray-100 hover:bg-gray-200 cursor-pointer">
               Articulate
             </Badge>
             <Badge variant="secondary" className="px-3 py-1.5 rounded-lg text-sm bg-gray-100 hover:bg-gray-200 cursor-pointer">
               Persuasive
             </Badge>
             <Badge variant="secondary" className="px-3 py-1.5 rounded-lg text-sm bg-gray-100 hover:bg-gray-200 cursor-pointer">
               Comprehensive
             </Badge>
             <Badge variant="secondary" className="px-3 py-1.5 rounded-lg text-sm bg-gray-100 hover:bg-gray-200 cursor-pointer">
               Cohesive
             </Badge>
           </div>
        </Card>
      </div>
    </div>
  );
}
