import { ScrollView, Text, View } from "react-native";
import { mockCalls } from "@agentdynamics/types/mock";

function fmtDuration(seconds?: number): string {
  if (!seconds) return "—";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s.toString().padStart(2, "0")}s`;
}

const outcomeBg: Record<string, string> = {
  appointment_booked: "bg-emerald-50",
  qualified: "bg-cyan-50",
  handoff_requested: "bg-amber-50",
  voicemail: "bg-mist",
  spam: "bg-rose-50",
  no_answer: "bg-mist",
};
const outcomeFg: Record<string, string> = {
  appointment_booked: "text-emerald-700",
  qualified: "text-cyan-700",
  handoff_requested: "text-amber-700",
  voicemail: "text-slate",
  spam: "text-rose-700",
  no_answer: "text-slate",
};

export default function CallsScreen() {
  return (
    <ScrollView className="flex-1 bg-cloud" contentContainerClassName="p-4 gap-3">
      {mockCalls.map((c) => (
        <View key={c.id} className="rounded-lg border border-navy-100 bg-white p-4">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-3">
              <Text className="text-[10px] uppercase tracking-wide text-slate">
                {c.channel} · {c.direction}
              </Text>
              <Text className="mt-0.5 text-sm font-medium text-navy-900">
                {new Date(c.startedAt).toLocaleString()}
              </Text>
              <Text className="text-xs text-slate">
                {fmtDuration(c.durationSeconds)}
              </Text>
            </View>
            <View
              className={`rounded-pill px-2.5 py-1 ${outcomeBg[c.outcome] ?? "bg-mist"}`}
            >
              <Text className={`text-[11px] font-medium ${outcomeFg[c.outcome] ?? "text-slate"}`}>
                {c.outcome.replace(/_/g, " ")}
              </Text>
            </View>
          </View>
          {c.summary ? (
            <Text className="mt-3 text-sm leading-5 text-navy-800">
              {c.summary}
            </Text>
          ) : null}
        </View>
      ))}
    </ScrollView>
  );
}
