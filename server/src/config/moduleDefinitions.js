const modules = {
  communicationChannels: {
    label: "Communication channels",
    fields: {
      name: { type: "string", required: true },
      incidentReference: { type: "string", required: true },
      description: { type: "string" },
      members: { type: "string" },
      status: { type: "enum", values: ["active", "archived"], default: "active" }
    }
  },
  roadBlockages: {
    label: "Road blockage reports",
    fields: {
      title: { type: "string", required: true },
      roadName: { type: "string", required: true },
      location: { type: "string", required: true },
      severity: { type: "enum", values: ["low", "medium", "high", "critical"], default: "medium" },
      description: { type: "string" },
      status: { type: "enum", values: ["reported", "verified", "cleared"], default: "reported" }
    }
  },
  facilityInspections: {
    label: "Facility inspections",
    fields: {
      facilityName: { type: "string", required: true },
      facilityType: { type: "string", required: true },
      location: { type: "string", required: true },
      inspector: { type: "string", required: true },
      inspectionDate: { type: "date", required: true },
      result: { type: "enum", values: ["passed", "needs_attention", "failed"], default: "needs_attention" },
      notes: { type: "string" }
    }
  },
  translations: {
    label: "Incident translations",
    fields: {
      incidentReference: { type: "string", required: true },
      sourceLanguage: { type: "string", required: true },
      targetLanguage: { type: "string", required: true },
      originalText: { type: "string", required: true },
      translatedText: { type: "string", required: true },
      status: { type: "enum", values: ["pending_review", "reviewed"], default: "pending_review" }
    }
  },
  transportationRequests: {
    label: "Transportation requests",
    fields: {
      requester: { type: "string", required: true },
      transportType: { type: "string", required: true },
      pickupLocation: { type: "string", required: true },
      destination: { type: "string", required: true },
      passengerCount: { type: "number", required: true },
      status: { type: "enum", values: ["requested", "assigned", "in_transit", "completed", "cancelled"], default: "requested" },
      assignedVehicle: { type: "string" }
    }
  },
  weatherAssessments: {
    label: "Weather impact assessments",
    fields: {
      location: { type: "string", required: true },
      condition: { type: "string", required: true },
      severity: { type: "enum", values: ["low", "medium", "high", "critical"], default: "medium" },
      provider: { type: "string" },
      observedAt: { type: "date" },
      impactSummary: { type: "string", required: true }
    }
  },
  shiftSchedules: {
    label: "Operations shift schedules",
    fields: {
      responderName: { type: "string", required: true },
      role: { type: "string", required: true },
      shiftStart: { type: "date", required: true },
      shiftEnd: { type: "date", required: true },
      location: { type: "string", required: true },
      status: { type: "enum", values: ["scheduled", "active", "completed", "cancelled"], default: "scheduled" }
    }
  },
  transcripts: {
    label: "Communication transcripts",
    fields: {
      incidentReference: { type: "string", required: true },
      channel: { type: "string", required: true },
      transcriptText: { type: "string", required: true },
      recordedBy: { type: "string", required: true },
      recordedAt: { type: "date", required: true },
      classification: { type: "enum", values: ["internal", "restricted"], default: "internal" }
    }
  },
  resourceApprovals: {
    label: "Resource request approvals",
    fields: {
      requestTitle: { type: "string", required: true },
      resourceType: { type: "string", required: true },
      quantity: { type: "number", required: true },
      requestedBy: { type: "string", required: true },
      approver: { type: "string" },
      decision: { type: "enum", values: ["pending", "approved", "rejected"], default: "pending" },
      comments: { type: "string" }
    }
  },
  situationReports: {
    label: "Situation reports",
    fields: {
      title: { type: "string", required: true },
      incidentReference: { type: "string", required: true },
      reportingPeriod: { type: "string", required: true },
      summary: { type: "string", required: true },
      affectedArea: { type: "string" },
      preparedBy: { type: "string", required: true },
      status: { type: "enum", values: ["draft", "published"], default: "draft" }
    }
  },
  publicAnnouncements: {
    label: "Public announcements",
    fields: {
      title: { type: "string", required: true },
      message: { type: "string", required: true },
      category: { type: "string", required: true },
      severity: { type: "enum", values: ["information", "warning", "urgent"], default: "information" },
      status: { type: "enum", values: ["draft", "published", "expired"], default: "draft" },
      expiresAt: { type: "date" }
    }
  },
  medicalInventory: {
    label: "Medical supply inventory",
    fields: {
      itemName: { type: "string", required: true },
      facility: { type: "string", required: true },
      quantity: { type: "number", required: true },
      unit: { type: "string", required: true },
      expiresAt: { type: "date" },
      reorderLevel: { type: "number" }
    }
  },
  volunteerAttendance: {
    label: "Volunteer attendance",
    fields: {
      volunteerName: { type: "string", required: true },
      activity: { type: "string", required: true },
      checkInAt: { type: "date", required: true },
      checkOutAt: { type: "date" },
      status: { type: "enum", values: ["checked_in", "checked_out"], default: "checked_in" }
    }
  },
  infrastructureDamage: {
    label: "Infrastructure damage assessments",
    fields: {
      assetType: { type: "string", required: true },
      assetName: { type: "string", required: true },
      location: { type: "string", required: true },
      severity: { type: "enum", values: ["low", "medium", "high", "critical"], default: "medium" },
      description: { type: "string", required: true },
      repairStatus: { type: "enum", values: ["unassessed", "planned", "in_progress", "repaired"], default: "unassessed" }
    }
  },
  incidentCosts: {
    label: "Incident cost estimates",
    fields: {
      incidentReference: { type: "string", required: true },
      expenseCategory: { type: "string", required: true },
      estimatedAmount: { type: "number", required: true },
      actualAmount: { type: "number" },
      currency: { type: "string", default: "INR" },
      notes: { type: "string" }
    }
  },
  responseFeedback: {
    label: "Response feedback",
    fields: {
      incidentReference: { type: "string", required: true },
      rating: { type: "number", required: true },
      category: { type: "string", required: true },
      comments: { type: "string" },
      submittedBy: { type: "string" }
    }
  },
  dashboardPreferences: {
    label: "Dashboard preferences",
    fields: {
      userReference: { type: "string", required: true },
      visibleWidgets: { type: "string", required: true },
      layout: { type: "string" }
    }
  }
};

module.exports = modules;
