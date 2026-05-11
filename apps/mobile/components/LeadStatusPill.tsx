import { Text, View } from "react-native";
import type { LeadStatus } from "@agentdynamics/types";

const bg: Record<LeadStatus, string> = {
  new: "bg-cyan-50",
  qualifying: "bg-navy-50",
  appointment_booked: "bg-emerald-50",
  handed_off: "bg-amber-50",
  won: "bg-emerald-100",
  lost: "bg-mist",
};
const fg: Record<LeadStatus, string> = {
  new: "text-cyan-700",
  qualifying: "text-navy-700",
  appointment_booked: "text-emerald-700",
  handed_off: "text-amber-700",
  won: "text-emerald-800",
  lost: "text-slate",
};
const labels: Record<LeadStatus, string> = {
  new: "New",
  qualifying: "Qualifying",
  appointment_booked: "Appt booked",
  handed_off: "Handoff",
  won: "Won",
  lost: "Lost",
};

export function LeadStatusPill({ status }: { status: LeadStatus }) {
  return (
    <View className={`rounded-pill px-2.5 py-1 ${bg[status]}`}>
      <Text className={`text-[11px] font-medium ${fg[status]}`}>{labels[status]}</Text>
    </View>
  );
}
