import UsageEvent from "../models/UsageEvent.js";

export const aggregateUsage = async (tenantId, startDate, endDate) => {
  const events = await UsageEvent.find({
    tenantId,
    createdAt: { $gte: startDate, $lte: endDate },
  });

  const summary = {};

  for (const event of events) {
    summary[event.action] = (summary[event.action] || 0) + 1;
  }

  return {
    totalEvents: events.length,
    actionBreakdown: summary,
  };
};
