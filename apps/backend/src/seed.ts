/**
 * Seeds a demo dealership with the same mock data the web + mobile shells
 * use, so the first run of the database matches what developers see locally.
 */
import { prisma } from "./index.js";
import {
  mockAppointments,
  mockCalls,
  mockCampaigns,
  mockLeads,
  mockNotifications,
} from "@agentdynamics/types/mock";

async function main() {
  console.log("Seeding AgentDynamics demo data…");

  const dealership = await prisma.dealership.upsert({
    where: { id: "ds_demo_1" },
    update: {},
    create: {
      id: "ds_demo_1",
      name: "Bayview Toyota",
      brand: "Toyota",
      location: "San Francisco, CA",
      timezone: "America/Los_Angeles",
      phoneNumber: "+1 (415) 555-0100",
    },
  });

  const owner = await prisma.user.upsert({
    where: { email: "owner@agentdynamics.demo" },
    update: {},
    create: {
      id: "u_demo_1",
      dealershipId: dealership.id,
      email: "owner@agentdynamics.demo",
      fullName: "Jordan Reyes",
      role: "owner",
    },
  });

  for (const l of mockLeads) {
    await prisma.lead.upsert({
      where: { id: l.id },
      update: {},
      create: {
        id: l.id,
        dealershipId: dealership.id,
        fullName: l.fullName,
        phone: l.phone,
        email: l.email,
        vehicleInterest: l.vehicleInterest,
        intent: l.intent,
        status: l.status,
        score: l.score,
        source: l.source,
        createdAt: new Date(l.createdAt),
        lastTouchAt: new Date(l.lastTouchAt),
        assignedToUserId: l.assignedToUserId === "u_demo_1" ? owner.id : null,
      },
    });
  }

  for (const c of mockCalls) {
    await prisma.call.upsert({
      where: { id: c.id },
      update: {},
      create: {
        id: c.id,
        dealershipId: dealership.id,
        leadId: c.leadId,
        channel: c.channel,
        direction: c.direction,
        startedAt: new Date(c.startedAt),
        endedAt: c.endedAt ? new Date(c.endedAt) : null,
        durationSeconds: c.durationSeconds,
        outcome: c.outcome,
        summary: c.summary,
        transcript: c.transcript as object | undefined,
      },
    });
  }

  for (const a of mockAppointments) {
    await prisma.appointment.upsert({
      where: { id: a.id },
      update: {},
      create: {
        id: a.id,
        dealershipId: dealership.id,
        leadId: a.leadId,
        type: a.type,
        scheduledAt: new Date(a.scheduledAt),
        durationMinutes: a.durationMinutes,
        bookedByAi: a.bookedByAi,
        status: a.status,
        notes: a.notes,
      },
    });
  }

  for (const cp of mockCampaigns) {
    await prisma.campaign.upsert({
      where: { id: cp.id },
      update: {},
      create: {
        id: cp.id,
        dealershipId: dealership.id,
        name: cp.name,
        type: cp.type,
        status: cp.status,
        audienceSize: cp.audienceSize,
        startedAt: cp.startedAt ? new Date(cp.startedAt) : null,
        contacted: cp.metrics.contacted,
        responded: cp.metrics.responded,
        appointmentsBooked: cp.metrics.appointmentsBooked,
        revenueAttributed: cp.metrics.revenueAttributed?.toString(),
      },
    });
  }

  for (const n of mockNotifications) {
    await prisma.notification.upsert({
      where: { id: n.id },
      update: {},
      create: {
        id: n.id,
        userId: owner.id,
        kind: n.kind,
        title: n.title,
        body: n.body,
        createdAt: new Date(n.createdAt),
      },
    });
  }

  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
