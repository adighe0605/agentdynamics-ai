import { ScrollView, Text, View } from "react-native";
import { DEALERSHIP_NAME, mockDashboard, mockLeads } from "@agentdynamics/types/mock";
import { LeadStatusPill } from "@/components/LeadStatusPill";

function Stat({ label, value, delta }: { label: string; value: string | number; delta: string }) {
  return (
    <View className="flex-1 rounded-lg border border-navy-100 bg-white p-4">
      <Text className="text-[10px] font-medium uppercase tracking-wide text-slate">
        {label}
      </Text>
      <Text className="mt-1 text-2xl font-semibold text-navy-900">{value}</Text>
      <Text className="mt-0.5 text-[11px] font-medium text-emerald-600">{delta}</Text>
    </View>
  );
}

function pct(n: number): string {
  return `${(n * 100).toFixed(1)}%`;
}

function plus(n: number): string {
  return `${n >= 0 ? "+" : ""}${(n * 100).toFixed(1)}% vs prev`;
}

export default function DashboardScreen() {
  const snap = mockDashboard;
  return (
    <ScrollView className="flex-1 bg-cloud" contentContainerClassName="p-4 gap-4">
      <View>
        <Text className="text-xs uppercase tracking-wide text-slate">
          {snap.windowLabel}
        </Text>
        <Text className="text-xl font-semibold text-navy-900">{DEALERSHIP_NAME}</Text>
      </View>

      <View className="flex-row gap-3">
        <Stat label="Total Calls" value={snap.totalCalls.toLocaleString()} delta={plus(snap.deltas.calls)} />
        <Stat label="Appointments" value={snap.totalAppointments} delta={plus(snap.deltas.appointments)} />
      </View>
      <View className="flex-row gap-3">
        <Stat label="Total Leads" value={snap.totalLeads.toLocaleString()} delta={plus(snap.deltas.leads)} />
        <Stat label="Conversion" value={pct(snap.conversionRate)} delta={plus(snap.deltas.conversion)} />
      </View>

      <View className="rounded-lg border border-navy-100 bg-white p-4">
        <Text className="text-sm font-semibold text-navy-900">Recent leads</Text>
        <View className="mt-3">
          {mockLeads.slice(0, 4).map((l, i) => (
            <View
              key={l.id}
              className={`flex-row items-center justify-between py-3 ${
                i > 0 ? "border-t border-navy-100" : ""
              }`}
            >
              <View className="flex-1 pr-3">
                <Text className="text-sm font-medium text-navy-900">{l.fullName}</Text>
                <Text className="text-xs text-slate" numberOfLines={1}>
                  {l.vehicleInterest ?? l.intent}
                </Text>
              </View>
              <LeadStatusPill status={l.status} />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
