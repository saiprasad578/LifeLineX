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

  // Issues #212-#236: emergency response modules
  webPushSubscriptions: {
    label: "Web push subscriptions",
    fields: {
      userReference: { type: "string", required: true },
      endpoint: { type: "string", required: true },
      platform: { type: "enum", values: ["web", "android", "ios", "other"], default: "web" },
      status: { type: "enum", values: ["active", "expired", "revoked"], default: "active" },
      lastUsedAt: { type: "date" },
      expiresAt: { type: "date" }
    }
  },
  qrInformationShares: {
    label: "QR information sharing",
    fields: {
      incidentReference: { type: "string", required: true },
      title: { type: "string", required: true },
      shareCode: { type: "string", required: true },
      informationUrl: { type: "string", required: true },
      expiresAt: { type: "date", required: true },
      accessLevel: { type: "enum", values: ["public", "responders", "restricted"], default: "responders" },
      status: { type: "enum", values: ["active", "revoked", "expired"], default: "active" }
    }
  },
  locationAccuracyAssessments: {
    label: "Location accuracy assessments",
    fields: {
      incidentReference: { type: "string", required: true },
      reportedLocation: { type: "string", required: true },
      verifiedLocation: { type: "string" },
      accuracyMeters: { type: "number", required: true },
      verificationMethod: { type: "enum", values: ["gps", "landmark", "caller_confirmation", "field_responder", "other"], default: "gps" },
      assessedBy: { type: "string", required: true },
      status: { type: "enum", values: ["unverified", "verified", "inaccurate"], default: "unverified" }
    }
  },
  responsePlaybooks: {
    label: "Response playbook execution",
    fields: {
      incidentReference: { type: "string", required: true },
      playbookName: { type: "string", required: true },
      steps: { type: "string", required: true },
      completedSteps: { type: "number", default: 0 },
      assignedTo: { type: "string", required: true },
      status: { type: "enum", values: ["not_started", "in_progress", "blocked", "completed"], default: "not_started" },
      notes: { type: "string" }
    }
  },
  resourceConsumption: {
    label: "Resource consumption tracking",
    fields: {
      incidentReference: { type: "string", required: true },
      resourceName: { type: "string", required: true },
      resourceType: { type: "string", required: true },
      quantityUsed: { type: "number", required: true },
      unit: { type: "string", required: true },
      recordedBy: { type: "string", required: true },
      consumedAt: { type: "date", required: true }
    }
  },
  notificationQuietHours: {
    label: "Notification quiet hours",
    fields: {
      userReference: { type: "string", required: true },
      startTime: { type: "string", required: true },
      endTime: { type: "string", required: true },
      timezone: { type: "string", required: true },
      allowCriticalAlerts: { type: "enum", values: ["yes", "no"], default: "yes" },
      enabled: { type: "enum", values: ["yes", "no"], default: "yes" }
    }
  },
  externalReferences: {
    label: "Incident external references",
    fields: {
      incidentReference: { type: "string", required: true },
      title: { type: "string", required: true },
      referenceType: { type: "enum", values: ["government", "news", "document", "partner", "other"], default: "other" },
      url: { type: "string", required: true },
      sourceName: { type: "string" },
      notes: { type: "string" }
    }
  },
  incidentClassifications: {
    label: "Incident data classification",
    fields: {
      incidentReference: { type: "string", required: true },
      classification: { type: "enum", values: ["public", "internal", "confidential", "restricted"], default: "internal" },
      reason: { type: "string", required: true },
      classifiedBy: { type: "string", required: true },
      reviewDate: { type: "date" }
    }
  },
  shelterRegistrations: {
    label: "Shelter registration and capacity",
    fields: {
      shelterName: { type: "string", required: true },
      location: { type: "string", required: true },
      totalCapacity: { type: "number", required: true },
      occupiedCapacity: { type: "number", required: true },
      contactPerson: { type: "string", required: true },
      status: { type: "enum", values: ["open", "full", "temporarily_closed"], default: "open" }
    }
  },
  equipmentCheckouts: {
    label: "Emergency equipment checkout",
    fields: {
      equipmentName: { type: "string", required: true },
      assetCode: { type: "string", required: true },
      checkedOutBy: { type: "string", required: true },
      quantity: { type: "number", required: true },
      checkedOutAt: { type: "date", required: true },
      expectedReturnAt: { type: "date" },
      returnedAt: { type: "date" },
      status: { type: "enum", values: ["checked_out", "returned", "overdue", "damaged"], default: "checked_out" }
    }
  },
  volunteerOnboarding: {
    label: "Volunteer onboarding",
    fields: {
      volunteerName: { type: "string", required: true },
      email: { type: "string", required: true },
      phone: { type: "string", required: true },
      skills: { type: "string" },
      emergencyContact: { type: "string", required: true },
      orientationCompleted: { type: "enum", values: ["yes", "no"], default: "no" },
      status: { type: "enum", values: ["pending", "approved", "rejected", "active"], default: "pending" }
    }
  },
  postIncidentReviews: {
    label: "Post-incident reviews",
    fields: {
      incidentReference: { type: "string", required: true },
      reviewDate: { type: "date", required: true },
      facilitator: { type: "string", required: true },
      strengths: { type: "string", required: true },
      improvements: { type: "string", required: true },
      actionItems: { type: "string" },
      status: { type: "enum", values: ["draft", "in_review", "completed"], default: "draft" }
    }
  },
  trainingCertifications: {
    label: "Volunteer training and certification",
    fields: {
      volunteerName: { type: "string", required: true },
      trainingName: { type: "string", required: true },
      provider: { type: "string", required: true },
      completedAt: { type: "date", required: true },
      expiresAt: { type: "date" },
      certificateReference: { type: "string" },
      status: { type: "enum", values: ["valid", "expired", "pending_verification"], default: "valid" }
    }
  },
  incidentImportValidations: {
    label: "Incident data import validation",
    fields: {
      fileName: { type: "string", required: true },
      sourceSystem: { type: "string", required: true },
      totalRows: { type: "number", required: true },
      validRows: { type: "number", required: true },
      rejectedRows: { type: "number", required: true },
      validationErrors: { type: "string" },
      importedBy: { type: "string", required: true },
      status: { type: "enum", values: ["pending", "validated", "imported", "failed"], default: "pending" }
    }
  },
  accessibilityAssistance: {
    label: "Accessibility assistance",
    fields: {
      incidentReference: { type: "string", required: true },
      requesterName: { type: "string", required: true },
      assistanceType: { type: "enum", values: ["mobility", "visual", "hearing", "communication", "medical", "other"], default: "other" },
      pickupLocation: { type: "string", required: true },
      assignedResponder: { type: "string" },
      notes: { type: "string" },
      status: { type: "enum", values: ["requested", "assigned", "in_progress", "completed"], default: "requested" }
    }
  },
  incidentCommunicationChannels: {
    label: "Incident communication channels",
    fields: {
      incidentReference: { type: "string", required: true },
      channelName: { type: "string", required: true },
      channelType: { type: "enum", values: ["radio", "phone", "email", "chat", "in_person", "other"], default: "other" },
      contactDetails: { type: "string" },
      owner: { type: "string", required: true },
      status: { type: "enum", values: ["active", "backup", "unavailable", "archived"], default: "active" }
    }
  },
  incidentCommandCenters: {
    label: "Incident command center",
    fields: {
      incidentReference: { type: "string", required: true },
      centerName: { type: "string", required: true },
      location: { type: "string", required: true },
      incidentCommander: { type: "string", required: true },
      operatingStatus: { type: "enum", values: ["planned", "active", "standby", "closed"], default: "planned" },
      openedAt: { type: "date" },
      notes: { type: "string" }
    }
  },
  powerOutages: {
    label: "Power outage reports",
    fields: {
      location: { type: "string", required: true },
      affectedArea: { type: "string", required: true },
      reportedAt: { type: "date", required: true },
      estimatedAffectedPeople: { type: "number", required: true },
      utilityProvider: { type: "string" },
      estimatedRestorationAt: { type: "date" },
      status: { type: "enum", values: ["reported", "investigating", "repairing", "restored"], default: "reported" }
    }
  },
  medicalSupplyInventory: {
    label: "Medical supply inventory management",
    fields: {
      itemName: { type: "string", required: true },
      itemCode: { type: "string", required: true },
      facility: { type: "string", required: true },
      availableQuantity: { type: "number", required: true },
      minimumQuantity: { type: "number", required: true },
      unit: { type: "string", required: true },
      expiryDate: { type: "date" },
      status: { type: "enum", values: ["available", "low_stock", "out_of_stock", "expired"], default: "available" }
    }
  },
  incidentRelationships: {
    label: "Incident relationship tracking",
    fields: {
      sourceIncident: { type: "string", required: true },
      relatedIncident: { type: "string", required: true },
      relationshipType: { type: "enum", values: ["caused_by", "escalation_of", "duplicate_of", "nearby", "dependent_on", "related", "other"], default: "related" },
      description: { type: "string" },
      linkedBy: { type: "string", required: true }
    }
  },
  announcementManagement: {
    label: "Public announcement management",
    fields: {
      title: { type: "string", required: true },
      message: { type: "string", required: true },
      targetAudience: { type: "string", required: true },
      channel: { type: "enum", values: ["web", "sms", "email", "radio", "social", "other"], default: "web" },
      publishAt: { type: "date" },
      expiresAt: { type: "date" },
      status: { type: "enum", values: ["draft", "scheduled", "published", "withdrawn"], default: "draft" }
    }
  },
  volunteerAttendanceRecords: {
    label: "Volunteer attendance tracking",
    fields: {
      volunteerReference: { type: "string", required: true },
      volunteerName: { type: "string", required: true },
      shiftReference: { type: "string" },
      checkInAt: { type: "date", required: true },
      checkOutAt: { type: "date" },
      recordedBy: { type: "string", required: true },
      status: { type: "enum", values: ["present", "late", "absent", "checked_out"], default: "present" }
    }
  },
  infrastructureDamageAssessments: {
    label: "Infrastructure damage assessment",
    fields: {
      incidentReference: { type: "string", required: true },
      infrastructureType: { type: "string", required: true },
      assetName: { type: "string", required: true },
      location: { type: "string", required: true },
      damageSeverity: { type: "enum", values: ["minor", "moderate", "major", "destroyed"], default: "moderate" },
      safetyRisk: { type: "enum", values: ["low", "medium", "high", "critical"], default: "medium" },
      assessedBy: { type: "string", required: true },
      estimatedRepairCost: { type: "number" },
      notes: { type: "string" }
    }
  },
  incidentCostEstimates: {
    label: "Incident cost estimation",
    fields: {
      incidentReference: { type: "string", required: true },
      costCategory: { type: "string", required: true },
      description: { type: "string", required: true },
      estimatedCost: { type: "number", required: true },
      actualCost: { type: "number" },
      currency: { type: "string", default: "INR" },
      estimatedBy: { type: "string", required: true },
      status: { type: "enum", values: ["estimated", "approved", "incurred", "reconciled"], default: "estimated" }
    }
  },
  responseFeedbackAnalysis: {
    label: "Emergency response feedback analysis",
    fields: {
      incidentReference: { type: "string", required: true },
      feedbackSource: { type: "enum", values: ["affected_person", "volunteer", "responder", "partner", "other"], default: "affected_person" },
      serviceArea: { type: "string", required: true },
      rating: { type: "number", required: true },
      strengths: { type: "string" },
      improvementAreas: { type: "string" },
      comments: { type: "string" },
      analyzedBy: { type: "string", required: true },
      status: { type: "enum", values: ["new", "reviewed", "action_planned", "resolved"], default: "new" }
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
