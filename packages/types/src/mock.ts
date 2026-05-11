/**
 * Deterministic mock data used by the web + mobile shells until the backend
 * is wired to real telephony / Supabase data.
 *
 * Anchor date: 2026-05-10 (today, per session context).
 */
import type {
  Appointment,
  Call,
  Campaign,
  DashboardSnapshot,
  Lead,
  LeadEvent,
  LeadSourceId,
  LiveCall,
  Notification,
  PeriodKey,
  Vehicle,
} from "./index";

const DEALERSHIP_ID = "ds_demo_1";
const USER_ID = "u_demo_1";
const ANCHOR = new Date("2026-05-10T18:00:00Z");

export const DEALERSHIP_NAME = "Downtown Toyota";

const SOURCE_LABELS: Record<LeadSourceId, string> = {
  carfax: "Carfax",
  autotrader: "Autotrader",
  cargurus: "Cargurus",
  dealer_com: "Dealer.com",
  cars_com: "Cars.com",
  nissanusa: "NissanUSA.com",
  intelliprice: "Intelliprice.com",
  buyathome: "BuyAtHome",
};

const SOURCE_SHARES: Record<PeriodKey, Array<{ source: LeadSourceId; share: number }>> = {
  "7d": [
    { source: "carfax", share: 0.27 },
    { source: "autotrader", share: 0.19 },
    { source: "cargurus", share: 0.17 },
    { source: "dealer_com", share: 0.12 },
    { source: "cars_com", share: 0.10 },
    { source: "nissanusa", share: 0.08 },
    { source: "intelliprice", share: 0.04 },
    { source: "buyathome", share: 0.03 },
  ],
  "30d": [
    { source: "carfax", share: 0.26 },
    { source: "autotrader", share: 0.20 },
    { source: "cargurus", share: 0.17 },
    { source: "dealer_com", share: 0.12 },
    { source: "cars_com", share: 0.10 },
    { source: "nissanusa", share: 0.08 },
    { source: "intelliprice", share: 0.04 },
    { source: "buyathome", share: 0.03 },
  ],
  "90d": [
    { source: "carfax", share: 0.25 },
    { source: "autotrader", share: 0.20 },
    { source: "cargurus", share: 0.18 },
    { source: "dealer_com", share: 0.12 },
    { source: "cars_com", share: 0.10 },
    { source: "nissanusa", share: 0.08 },
    { source: "intelliprice", share: 0.04 },
    { source: "buyathome", share: 0.03 },
  ],
};

/** Deterministic pseudo-random — same inputs → same outputs. */
function seeded(n: number): number {
  const x = Math.sin(n * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

function daysBack(n: number): Date {
  const d = new Date(ANCHOR);
  d.setUTCDate(d.getUTCDate() - n);
  return d;
}

/** Build daily call volume that resembles the mockup: weekday peaks, weekend dips. */
function dailyCallVolume(days: number) {
  const out: Array<{ date: string; calls: number }> = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = daysBack(i);
    const dow = d.getUTCDay(); // 0=Sun, 6=Sat
    const weekend = dow === 0 || dow === 6;
    const base = weekend ? 30 : 55;
    const jitter = Math.floor(seeded(i + 1) * 10) - 4;
    out.push({ date: d.toISOString(), calls: Math.max(20, base + jitter) });
  }
  return out;
}

const TOTAL_BY_PERIOD: Record<PeriodKey, {
  calls: number; appointments: number; leads: number; conversion: number;
  deltas: { calls: number; appointments: number; leads: number; conversion: number };
}> = {
  "7d":  { calls: 387,  appointments: 36,  leads: 204,  conversion: 0.144,
            deltas: { calls: 0.062, appointments: 0.125, leads: 0.080, conversion: 0.041 } },
  "30d": { calls: 1612, appointments: 154, leads: 920,  conversion: 0.151,
            deltas: { calls: 0.094, appointments: 0.180, leads: 0.100, conversion: 0.092 } },
  "90d": { calls: 4583, appointments: 422, leads: 2696, conversion: 0.157,
            deltas: { calls: 0.117, appointments: 0.287, leads: 0.117, conversion: 0.152 } },
};

export function getDashboardSnapshot(period: PeriodKey): DashboardSnapshot {
  const days = period === "7d" ? 7 : period === "30d" ? 30 : 90;
  const totals = TOTAL_BY_PERIOD[period];
  return {
    windowLabel: period === "7d" ? "Last 7 Days" : period === "30d" ? "Last 30 Days" : "Last 90 Days",
    totalCalls: totals.calls,
    totalAppointments: totals.appointments,
    totalLeads: totals.leads,
    conversionRate: totals.conversion,
    deltas: totals.deltas,
    dailyCallVolume: dailyCallVolume(days),
    leadSourceBreakdown: SOURCE_SHARES[period].map((s) => ({
      source: s.source,
      label: SOURCE_LABELS[s.source],
      share: s.share,
    })),
  };
}

export const mockLeads: Lead[] = [
  {
    id: "ld_001",
    dealershipId: DEALERSHIP_ID,
    fullName: "Marcus Hill",
    phone: "+1 (415) 555-0142",
    email: "marcus@example.com",
    vehicleInterest: "2025 Toyota RAV4 Hybrid",
    intent: "sales",
    status: "appointment_booked",
    score: 92,
    source: "inbound_call",
    sourceChannel: "carfax",
    createdAt: "2026-05-10T13:42:00Z",
    lastTouchAt: "2026-05-10T13:58:00Z",
    assignedToUserId: USER_ID,
  },
  {
    id: "ld_002",
    dealershipId: DEALERSHIP_ID,
    fullName: "Priya Anand",
    phone: "+1 (415) 555-0187",
    vehicleInterest: "2024 Tacoma TRD",
    intent: "sales",
    status: "qualifying",
    score: 78,
    source: "sms",
    sourceChannel: "autotrader",
    createdAt: "2026-05-10T12:11:00Z",
    lastTouchAt: "2026-05-10T12:24:00Z",
  },
  {
    id: "ld_003",
    dealershipId: DEALERSHIP_ID,
    fullName: "Diego Ramirez",
    phone: "+1 (415) 555-0163",
    email: "diego@example.com",
    intent: "service",
    status: "new",
    score: 54,
    source: "inbound_call",
    sourceChannel: "cargurus",
    createdAt: "2026-05-10T11:02:00Z",
    lastTouchAt: "2026-05-10T11:02:00Z",
  },
  {
    id: "ld_004",
    dealershipId: DEALERSHIP_ID,
    fullName: "Avery Chen",
    phone: "+1 (415) 555-0119",
    vehicleInterest: "Used Camry",
    intent: "sales",
    status: "handed_off",
    score: 88,
    source: "inbound_call",
    sourceChannel: "carfax",
    createdAt: "2026-05-09T16:50:00Z",
    lastTouchAt: "2026-05-10T09:30:00Z",
    assignedToUserId: USER_ID,
  },
  {
    id: "ld_005",
    dealershipId: DEALERSHIP_ID,
    fullName: "Jonah Park",
    phone: "+1 (415) 555-0231",
    email: "jonah@example.com",
    vehicleInterest: "2025 4Runner TRD Off-Road",
    intent: "sales",
    status: "qualifying",
    score: 71,
    source: "web",
    sourceChannel: "dealer_com",
    createdAt: "2026-05-09T20:15:00Z",
    lastTouchAt: "2026-05-10T08:45:00Z",
  },
  {
    id: "ld_006",
    dealershipId: DEALERSHIP_ID,
    fullName: "Sasha Volkov",
    phone: "+1 (415) 555-0274",
    vehicleInterest: "2024 Highlander Hybrid",
    intent: "sales",
    status: "appointment_booked",
    score: 81,
    source: "inbound_call",
    sourceChannel: "cars_com",
    createdAt: "2026-05-09T18:02:00Z",
    lastTouchAt: "2026-05-10T07:25:00Z",
    assignedToUserId: USER_ID,
  },
];

export const mockCalls: Call[] = [
  {
    id: "cl_001",
    dealershipId: DEALERSHIP_ID,
    leadId: "ld_001",
    channel: "voice",
    direction: "inbound",
    startedAt: "2026-05-10T13:42:00Z",
    endedAt: "2026-05-10T13:50:18Z",
    durationSeconds: 498,
    outcome: "appointment_booked",
    summary:
      "Caller is shopping for a 2025 RAV4 Hybrid (XLE trim). Trading in a 2018 CR-V. Booked Saturday 10:30am test drive with Jordan in sales. Pre-qualified for financing through manufacturer program.",
    transcript: [
      { speaker: "ai", text: "Thanks for calling Downtown Toyota. How can I help today?", at: "2026-05-10T13:42:02Z" },
      { speaker: "customer", text: "Hi, I'm looking at the RAV4 Hybrid. Do you have any XLE in stock?", at: "2026-05-10T13:42:09Z" },
      { speaker: "ai", text: "We have three XLE trims on the lot right now. Would you like to come in for a test drive this weekend?", at: "2026-05-10T13:42:18Z" },
      { speaker: "customer", text: "Saturday morning works.", at: "2026-05-10T13:42:30Z" },
      { speaker: "ai", text: "Booked Saturday 10:30am with Jordan. You'll get a text confirmation shortly.", at: "2026-05-10T13:42:42Z" },
    ],
  },
  {
    id: "cl_002",
    dealershipId: DEALERSHIP_ID,
    leadId: "ld_004",
    channel: "voice",
    direction: "inbound",
    startedAt: "2026-05-10T09:18:00Z",
    endedAt: "2026-05-10T09:30:11Z",
    durationSeconds: 731,
    outcome: "handoff_requested",
    summary:
      "Returning customer Avery Chen asked specifically about used Camry pricing and financing for a co-signer scenario. AI handed off to Morgan in sales — sensitive credit topic.",
  },
];

export const mockLiveCalls: LiveCall[] = [
  {
    id: "live_001",
    leadName: "Tessa Brooks",
    phone: "+1 (415) 555-0144",
    vehicleInterest: "2025 Camry XSE",
    startedAt: new Date(ANCHOR.getTime() - 3 * 60_000).toISOString(),
    aiConfidence: 0.91,
    liveTranscript: [
      { speaker: "ai", text: "Thanks for calling Downtown Toyota. How can I help today?", at: new Date(ANCHOR.getTime() - 3 * 60_000).toISOString() },
      { speaker: "customer", text: "Hi, I saw the 2025 Camry XSE online — is the Supersonic Red one still available?", at: new Date(ANCHOR.getTime() - 2.7 * 60_000).toISOString() },
      { speaker: "ai", text: "Yes, that XSE in Supersonic Red is on the lot. Would you like to schedule a test drive this week?", at: new Date(ANCHOR.getTime() - 2.4 * 60_000).toISOString() },
      { speaker: "customer", text: "Maybe Thursday evening? I get off work at 6.", at: new Date(ANCHOR.getTime() - 2.0 * 60_000).toISOString() },
      { speaker: "ai", text: "We have a 6:30pm slot Thursday with Casey. Should I book that?", at: new Date(ANCHOR.getTime() - 1.7 * 60_000).toISOString() },
    ],
  },
  {
    id: "live_002",
    leadName: "Owen Rivera",
    phone: "+1 (415) 555-0298",
    vehicleInterest: "Service · 2022 Tacoma",
    startedAt: new Date(ANCHOR.getTime() - 8 * 60_000).toISOString(),
    aiConfidence: 0.83,
    liveTranscript: [
      { speaker: "ai", text: "Downtown Toyota service, how can I help?", at: new Date(ANCHOR.getTime() - 8 * 60_000).toISOString() },
      { speaker: "customer", text: "I need a 60k mile service on my Tacoma. How early can you get me in?", at: new Date(ANCHOR.getTime() - 7.6 * 60_000).toISOString() },
      { speaker: "ai", text: "We have a 7:30am drop-off this Friday. Loaner included.", at: new Date(ANCHOR.getTime() - 7.2 * 60_000).toISOString() },
    ],
  },
];

export const mockAppointments: Appointment[] = [
  { id: "ap_001", dealershipId: DEALERSHIP_ID, leadId: "ld_001", leadName: "Marcus Hill",
    type: "test_drive", scheduledAt: "2026-05-16T17:30:00Z", durationMinutes: 45,
    bookedByAi: true, status: "confirmed", notes: "RAV4 Hybrid XLE — Pearl White preferred." },
  { id: "ap_002", dealershipId: DEALERSHIP_ID, leadId: "ld_006", leadName: "Sasha Volkov",
    type: "test_drive", scheduledAt: "2026-05-12T22:00:00Z", durationMinutes: 45,
    bookedByAi: true, status: "scheduled", notes: "Highlander Hybrid Limited." },
  { id: "ap_003", dealershipId: DEALERSHIP_ID, leadId: "ld_003", leadName: "Diego Ramirez",
    type: "service", scheduledAt: "2026-05-11T15:30:00Z", durationMinutes: 90,
    bookedByAi: true, status: "confirmed", notes: "60k mile service, loaner requested." },
  { id: "ap_004", dealershipId: DEALERSHIP_ID, leadId: "ld_005", leadName: "Jonah Park",
    type: "test_drive", scheduledAt: "2026-05-13T18:00:00Z", durationMinutes: 60,
    bookedByAi: true, status: "scheduled", notes: "4Runner TRD Off-Road, after work." },
  { id: "ap_005", dealershipId: DEALERSHIP_ID, leadId: "ld_002", leadName: "Priya Anand",
    type: "consultation", scheduledAt: "2026-05-14T19:30:00Z", durationMinutes: 30,
    bookedByAi: false, status: "scheduled", notes: "Tacoma TRD trade-in valuation." },
];

export const mockVehicles: Vehicle[] = [
  { id: "v_001", dealershipId: DEALERSHIP_ID, vin: "JT3HP10V5W7012345",
    year: 2025, make: "Toyota", model: "RAV4 Hybrid", trim: "XLE",
    exteriorColor: "Pearl White", condition: "new", price: 36450, status: "available" },
  { id: "v_002", dealershipId: DEALERSHIP_ID, vin: "JT3HP10V5W7045678",
    year: 2025, make: "Toyota", model: "RAV4 Hybrid", trim: "Limited",
    exteriorColor: "Magnetic Gray", condition: "new", price: 41200, status: "available" },
  { id: "v_003", dealershipId: DEALERSHIP_ID, vin: "5TFSZ5AN9PX012398",
    year: 2024, make: "Toyota", model: "Tacoma", trim: "TRD Off-Road",
    exteriorColor: "Lunar Rock", condition: "new", price: 42890, status: "reserved" },
  { id: "v_004", dealershipId: DEALERSHIP_ID, vin: "5TDDZRFH8MS123987",
    year: 2024, make: "Toyota", model: "Highlander Hybrid", trim: "Limited",
    exteriorColor: "Midnight Black", condition: "new", price: 49995, status: "available" },
  { id: "v_005", dealershipId: DEALERSHIP_ID, vin: "4T1B11HK0KU712345",
    year: 2022, make: "Toyota", model: "Camry", trim: "SE",
    exteriorColor: "Celestial Silver", condition: "used", price: 22450, mileage: 38900, status: "available" },
  { id: "v_006", dealershipId: DEALERSHIP_ID, vin: "JTEBU5JR1L5812345",
    year: 2025, make: "Toyota", model: "4Runner", trim: "TRD Off-Road",
    exteriorColor: "Army Green", condition: "new", price: 47650, status: "in_transit" },
  { id: "v_007", dealershipId: DEALERSHIP_ID, vin: "4T1G11AK1NU712908",
    year: 2025, make: "Toyota", model: "Camry", trim: "XSE",
    exteriorColor: "Supersonic Red", condition: "new", price: 34225, status: "available" },
  { id: "v_008", dealershipId: DEALERSHIP_ID, vin: "JTDEPMAE7M3082341",
    year: 2023, make: "Toyota", model: "Corolla", trim: "LE",
    exteriorColor: "Blueprint", condition: "certified", price: 21900, mileage: 24300, status: "available" },
];

export const leadTimelines: Record<string, LeadEvent[]> = {
  ld_001: [
    { id: "ev_l1_1", leadId: "ld_001", kind: "lead_created", at: "2026-05-10T13:42:00Z",
      title: "Lead created from inbound call", actor: "system" },
    { id: "ev_l1_2", leadId: "ld_001", kind: "call_inbound", at: "2026-05-10T13:42:00Z",
      title: "Inbound call — 8m 18s", body: "RAV4 Hybrid XLE inquiry", actor: "customer" },
    { id: "ev_l1_3", leadId: "ld_001", kind: "ai_summary", at: "2026-05-10T13:50:30Z",
      title: "AI handoff summary",
      body: "Caller is shopping for a 2025 RAV4 Hybrid (XLE trim). Trading in a 2018 CR-V. Booked Saturday 10:30am test drive with Jordan in sales. Pre-qualified for financing through manufacturer program.",
      actor: "ai" },
    { id: "ev_l1_4", leadId: "ld_001", kind: "appointment_booked", at: "2026-05-10T13:50:35Z",
      title: "Test drive booked", body: "Saturday May 16, 10:30am with Jordan Reyes.", actor: "ai" },
    { id: "ev_l1_5", leadId: "ld_001", kind: "status_changed", at: "2026-05-10T13:50:36Z",
      title: "Status → Appointment booked", actor: "system" },
    { id: "ev_l1_6", leadId: "ld_001", kind: "sms_received", at: "2026-05-10T13:58:00Z",
      title: "SMS from customer", body: "Confirmed! Can my wife join the test drive?", actor: "customer" },
  ],
  ld_004: [
    { id: "ev_l4_1", leadId: "ld_004", kind: "lead_created", at: "2026-05-09T16:50:00Z",
      title: "Returning customer recognized", actor: "system" },
    { id: "ev_l4_2", leadId: "ld_004", kind: "call_inbound", at: "2026-05-10T09:18:00Z",
      title: "Inbound call — 12m 11s", body: "Used Camry pricing + co-signer financing question", actor: "customer" },
    { id: "ev_l4_3", leadId: "ld_004", kind: "ai_summary", at: "2026-05-10T09:30:30Z",
      title: "AI handoff summary",
      body: "Returning customer Avery Chen asked specifically about used Camry pricing and financing for a co-signer scenario. Handing off to Morgan in sales — sensitive credit topic.",
      actor: "ai" },
    { id: "ev_l4_4", leadId: "ld_004", kind: "status_changed", at: "2026-05-10T09:30:35Z",
      title: "Status → Handoff requested", actor: "system" },
    { id: "ev_l4_5", leadId: "ld_004", kind: "human_note", at: "2026-05-10T09:42:00Z",
      title: "Note from Morgan", body: "Called Avery back. Walking through co-signer requirements over email.", actor: "human_agent" },
  ],
};

export const mockCampaigns: Campaign[] = [
  {
    id: "cp_001",
    dealershipId: DEALERSHIP_ID,
    name: "Spring Service Reminders",
    type: "service",
    status: "running",
    audienceSize: 1240,
    startedAt: "2026-05-01T15:00:00Z",
    metrics: { contacted: 891, responded: 217, appointmentsBooked: 84, revenueAttributed: 38400 },
  },
];

export const mockNotifications: Notification[] = [
  { id: "nt_001", userId: USER_ID, kind: "hot_lead",
    title: "Hot lead: Marcus Hill", body: "Score 92 — booked Saturday 10:30am test drive.",
    createdAt: "2026-05-10T13:50:30Z" },
  { id: "nt_002", userId: USER_ID, kind: "handoff_requested",
    title: "Handoff requested", body: "Avery Chen asked for human help with financing.",
    createdAt: "2026-05-10T09:30:11Z" },
];

/** Backwards-compat for the mobile shell currently importing mockDashboard. */
export const mockDashboard = getDashboardSnapshot("90d");
