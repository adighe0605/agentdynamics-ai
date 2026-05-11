import { FlatList, Text, View } from "react-native";
import { mockLeads } from "@agentdynamics/types/mock";
import { LeadStatusPill } from "@/components/LeadStatusPill";

export default function LeadsScreen() {
  return (
    <FlatList
      className="bg-cloud"
      contentContainerClassName="p-4 gap-3"
      data={mockLeads}
      keyExtractor={(l) => l.id}
      renderItem={({ item: l }) => (
        <View className="rounded-lg border border-navy-100 bg-white p-4">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-3">
              <Text className="text-base font-semibold text-navy-900">
                {l.fullName}
              </Text>
              <Text className="mt-0.5 text-xs text-slate">{l.phone}</Text>
              <Text className="mt-2 text-sm text-navy-800">
                {l.vehicleInterest ?? l.intent}
              </Text>
            </View>
            <LeadStatusPill status={l.status} />
          </View>
          <View className="mt-3 flex-row items-center gap-2">
            <View className="h-1.5 flex-1 overflow-hidden rounded-pill bg-mist">
              <View
                className="h-full bg-cyan-500"
                style={{ width: `${l.score}%` }}
              />
            </View>
            <Text className="text-xs font-semibold text-navy-800">{l.score}</Text>
          </View>
        </View>
      )}
    />
  );
}
