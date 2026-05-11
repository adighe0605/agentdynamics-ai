/**
 * Shared domain types for the AgentDynamics platform.
 *
 * Domain notes (from agentdynamics.ai positioning):
 * - Customers are automotive dealerships.
 * - The "AI Employee" answers calls, qualifies leads, books appointments,
 *   and hands off to human staff with conversation summaries.
 * - These types describe the state surfaced in the web dashboard and mobile app.
 */

export type ISODateString = string;
export type ID = string;

/** A dealership tenant. */
export interface Dealership {
  id: ID;
  name: string;
  brand: string;          // e.g. "Toyota", "Ford"
  location: string;
  timezone: string;       // IANA
  phoneNumber: string;
}

export type UserRole = "owner" | "manager" | "sales" | "service" | "viewer";

export interface User {
  id: ID;
  dealershipId: ID;
  email: string;
  fullName: string;
  role: UserRole;
  avatarUrl?: string;
}

/** Lead lifecycle stages a dealership cares about. */
export type LeadStatus =
  | "new"
  | "qualifying"
  | "appointment_booked"
  | "handed_off"
  | "won"
  | "lost";

export type LeadIntent = "sales" | "service" | "parts" | "general";

export type LeadSourceId =
  | "carfax"
  | "autotrader"
  | "cargurus"
  | "dealer_com"
  | "cars_com"
  | "nissanusa"
  | "intelliprice"
  | "buyathome";

export interface Lead {
  id: ID;
  dealershipId: ID;
  fullName: string;
  phone: string;
  email?: string;
  vehicleInterest?: string;
  intent: LeadIntent;
  status: LeadStatus;
  score: number;                // 0-100
  source: "inbound_call" | "sms" | "email" | "web";
  sourceChannel?: LeadSourceId; // upstream marketplace
  createdAt: ISODateString;
  lastTouchAt: ISODateString;
  assignedToUserId?: ID;
}

export type CallChannel = "voice" | "sms" | "email";
export type CallDirection = "inbound" | "outbound";
export type CallOutcome =
  | "qualified"
  | "appointment_booked"
  | "voicemail"
  | "handoff_requested"
  | "spam"
  | "no_answer";

export interface CallTurn {
  speaker: "ai" | "customer" | "human_agent";
  text: string;
  at: ISODateString;
}

export interface Call {
  id: ID;
  dealershipId: ID;
  leadId?: ID;
  channel: CallChannel;
  direction: CallDirection;
  startedAt: ISODateString;
  endedAt?: ISODateString;
  durationSeconds?: number;
  outcome: CallOutcome;
  summary?: string;
  transcript?: CallTurn[];
  recordingUrl?: string;
}

/** A call still in progress, surfaced on the Live page. */
export interface LiveCall {
  id: ID;
  leadName: string;
  phone: string;
  vehicleInterest?: string;
  startedAt: ISODateString;
  liveTranscript: CallTurn[];
  aiConfidence: number;       // 0-1
}

export type AppointmentType = "test_drive" | "service" | "consultation";

export interface Appointment {
  id: ID;
  dealershipId: ID;
  leadId: ID;
  leadName?: string;
  type: AppointmentType;
  scheduledAt: ISODateString;
  durationMinutes: number;
  bookedByAi: boolean;
  status: "scheduled" | "confirmed" | "completed" | "no_show" | "cancelled";
  notes?: string;
}

export interface Campaign {
  id: ID;
  dealershipId: ID;
  name: string;
  type: "sales" | "service";
  status: "draft" | "running" | "paused" | "completed";
  audienceSize: number;
  startedAt?: ISODateString;
  metrics: {
    contacted: number;
    responded: number;
    appointmentsBooked: number;
    revenueAttributed?: number;
  };
}

export type NotificationKind =
  | "hot_lead"
  | "appointment_booked"
  | "handoff_requested"
  | "missed_call"
  | "campaign_completed";

export interface Notification {
  id: ID;
  userId: ID;
  kind: NotificationKind;
  title: string;
  body: string;
  createdAt: ISODateString;
  readAt?: ISODateString;
  payload?: Record<string, unknown>;
}

/** Inventory vehicle on the dealership lot. */
export interface Vehicle {
  id: ID;
  dealershipId: ID;
  vin: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  exteriorColor: string;
  condition: "new" | "used" | "certified";
  price: number;
  mileage?: number;
  status: "available" | "in_transit" | "sold" | "reserved";
  imageUrl?: string;
}

/** A single event on a lead's timeline (Lead detail page). */
export type LeadEventKind =
  | "lead_created"
  | "call_inbound"
  | "sms_received"
  | "ai_summary"
  | "appointment_booked"
  | "human_note"
  | "status_changed";

export interface LeadEvent {
  id: ID;
  leadId: ID;
  kind: LeadEventKind;
  at: ISODateString;
  title: string;
  body?: string;
  actor: "ai" | "customer" | "human_agent" | "system";
}

/** Dashboard summary surfaced on web + mobile home. */
export interface DashboardSnapshot {
  windowLabel: string;
  totalCalls: number;
  totalAppointments: number;
  totalLeads: number;
  conversionRate: number;       // 0-1
  deltas: {
    calls: number;              // +/- fraction vs previous period
    appointments: number;
    leads: number;
    conversion: number;
  };
  dailyCallVolume: Array<{ date: ISODateString; calls: number }>;
  leadSourceBreakdown: Array<{ source: LeadSourceId; label: string; share: number }>;
}

export type PeriodKey = "7d" | "30d" | "90d";
