// Fields are used by both the backend model definitions and the frontend form.
module.exports = {
  communicationChannels: {
    label: "Communication Channels",
    fields: {
      name: { type: "String", required: true },
      incidentId: { type: "String", required: true },
      description: { type: "String" },
      members: { type: "String" },
      status: { type: "String", enum: ["active", "archived"], default: "active" }
    }
  },
  roadBlockages: {
    label: "Road Blockage Reports",
    fields: {
      title: { type: "String", required: true },
      roadName: { type: "String", required: true },
      location: { type: "String", required: true },
      severity: { type: "String", enum: ["low", "medium", "high", "critical"], default: "medium" },
      description: { type: "String" },
      status: { type: "String", enum: ["reported", "verified", "cleared"], default: "reported" },
      reportedBy: { type: "String" }
    }
  },
  facilityInspections: {
    label: "Facility Inspections",
    fields: {
      facilityName: { type: "String", required: true },
      facilityType: { type: "String", required: true },
      location: { type: "String", required: true },
      inspector: { type: "String", required: true },
      inspectionDate: { type: "Date", required: true },
      result: { type: "String", enum: ["passed", "needs_attention", "failed"], default: "needs_attention" },
      notes: { type: "String" }
    }
  },
  translations: {
    label: "Incident Translations",
    fields: {
      incidentId: { type: "String", required: true },
      sourceLanguage: { type: "String", required: true },
      targetLanguage: { type: "String", required: true },
      originalText: { type: "String", required: true },
      translatedText: { type: "String", required: true },
      reviewedBy: { type: "String" },
      status: { type: "String", enum: ["pending_review", "reviewed"], default: "pending_review" }
    }
  },
  transportationRequests: {
    label: "Transportation Requests",
    fields: {
      requester: { type: "String", required: true },
      incidentId: { type: "String" },
      transportType: { type: "String", required: true },
      pickupLocation: { type: "String", required: true },
      destination: { type: "String", required: true },
      passengerCount: { type: "Number", required: true },
      status: { type: "String", enum: ["requested", "assigned", "in_transit", "completed", "cancelled"], default: "requested" },
      assignedVehicle: { type: "String" }
    }
  },
  weatherAssessments: {
    label: "Weather Impact Assessments",
    fields: {
      location: { type: "String", required: true },
      condition: { type: "String", required: true },
      severity: { type: "String", enum: ["low", "medium", "high", "critical"], default: "medium" },
      provider: { type: "String" },
      observedAt: { type: "Date" },
      impactSummary: { type: "String", required: true },
      incidentId: { type: "String" }
    }
  },
  shiftSchedules: {
    label: "Operations Shift Scheduling",
    fields: {
      responderName: { type: "String", required: true },
      role: { type: "String", required: true },
      shiftStart: { type: "Date", required: true },
      shiftEnd: { type: "Date", required: true },
      location: { type: "String", required: true },
      status: { type: "String", enum: ["scheduled", "active", "completed", "cancelled"], default: "scheduled" }
    }
  },
  transcripts: {
    label: "Communication Transcripts",
    fields: {
      incidentId: { type: "String", required: true },
      channel: { type: "String", required: true },
      transcriptText: { type: "String", required: true },
      recordedBy: { type: "String", required: true },
      recordedAt: { type: "Date", required: true },
      classification: { type: "String", enum: ["internal", "restricted"], default: "internal" }
    }
  },
  resourceApprovals: {
    label: "Resource Request Approvals",
    fields: {
      requestTitle: { type: "String", required: true },
      resourceType: { type: "String", required: true },
      quantity: { type: "Number", required: true },
      requestedBy: { type: "String", required: true },
      approver: { type: "String" },
      decision: { type: "String", enum: ["pending", "approved", "rejected"], default: "pending" },
      comments: { type: "String" }
    }
  },
  situationReports: {
    label: "Situation Reports",
    fields: {
      title: { type: "String", required: true },
      incidentId: { type: "String", required: true },
      reportingPeriod: { type: "String", required: true },
      summary: { type: "String", required: true },
      affectedArea: { type: "String" },
      preparedBy: { type: "String", required: true },
      status: { type: "String", enum: ["draft", "published"], default: "draft" }
    }
  }
};
