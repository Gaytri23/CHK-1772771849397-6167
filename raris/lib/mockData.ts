export const complaints = [
    { id: "1", trackingId: "TRK-A9F2", category: "Harassment", description: "Repeated unwanted messages and approaches at the library.", department: "Library", location: "Main Level 2", incidentDate: "2024-05-12", evidenceCount: 2, riskScore: 75, riskBreakdown: { evidence: 26, description: 20, patternMatch: 15, noEvidencePenalty: 0 }, status: "new", assignedTo: "Officer A", investigationNotes: "", isFlagged: false, flagReasons: [], createdAt: "2024-05-13" },
    { id: "2", trackingId: "TRK-B4C1", category: "Bullying", description: "Public humiliation in the study hall by a group.", department: "Academic", location: "Study Hall B", incidentDate: "2024-05-10", evidenceCount: 0, riskScore: 25, riskBreakdown: { evidence: 0, description: 10, patternMatch: 0, noEvidencePenalty: -30 }, status: "under_review", assignedTo: "Officer B", investigationNotes: "Checking CCTV footage.", isFlagged: false, flagReasons: [], createdAt: "2024-05-11" },
    { id: "3", trackingId: "TRK-E7D8", category: "Stalking", description: "Followed from class to dorm building multiple nights.", department: "Housing", location: "North Dorms", incidentDate: "2024-05-08", evidenceCount: 3, riskScore: 85, riskBreakdown: { evidence: 39, description: 20, patternMatch: 15, noEvidencePenalty: 0 }, status: "evidence_requested", assignedTo: "Officer A", investigationNotes: "Need dorm entry logs.", isFlagged: false, flagReasons: [], createdAt: "2024-05-09" },
    { id: "4", trackingId: "TRK-F1A2", category: "Discrimination", description: "Professor made biased remarks during lecture.", department: "Faculty", location: "Room 402", incidentDate: "2024-05-05", evidenceCount: 1, riskScore: 45, riskBreakdown: { evidence: 13, description: 10, patternMatch: 0, noEvidencePenalty: 0 }, status: "verified", assignedTo: "Officer C", investigationNotes: "Witnesses confirmed.", isFlagged: false, flagReasons: [], createdAt: "2024-05-06" },
    { id: "5", trackingId: "TRK-G8H3", category: "Abuse", description: "Physical altercation at the student union.", department: "Student Life", location: "Union Hall", incidentDate: "2024-05-02", evidenceCount: 4, riskScore: 90, riskBreakdown: { evidence: 39, description: 20, patternMatch: 15, noEvidencePenalty: 0 }, status: "action_taken", assignedTo: "Officer B", investigationNotes: "Disciplinary action issued.", isFlagged: false, flagReasons: [], createdAt: "2024-05-03" },
    { id: "6", trackingId: "TRK-J5K9", category: "Other", description: "Suspicious individual lingering around parking lot after hours.", department: "Security", location: "Lot 3", incidentDate: "2024-04-28", evidenceCount: 0, riskScore: 15, riskBreakdown: { evidence: 0, description: 10, patternMatch: 0, noEvidencePenalty: -30 }, status: "closed", assignedTo: "Officer A", investigationNotes: "Patrol increased, no further incidents.", isFlagged: false, flagReasons: [], createdAt: "2024-04-29" },
    { id: "7", trackingId: "TRK-L2M4", category: "Harassment", description: "Spam emails and aggressive messages online.", department: "IT", location: "Online", incidentDate: "2024-04-25", evidenceCount: 5, riskScore: 65, riskBreakdown: { evidence: 39, description: 20, patternMatch: 0, noEvidencePenalty: 0 }, status: "rejected", assignedTo: "Officer C", investigationNotes: "Determined to be outside campus jurisdiction.", isFlagged: true, flagReasons: ["repeat_reject"], createdAt: "2024-04-26" },
    { id: "8", trackingId: "TRK-N6P7", category: "Bullying", description: "Excluded and verbally abused during club meeting.", department: "Student Life", location: "Club Room", incidentDate: "2024-04-20", evidenceCount: 1, riskScore: 50, riskBreakdown: { evidence: 13, description: 20, patternMatch: 0, noEvidencePenalty: 0 }, status: "new", assignedTo: "Officer B", investigationNotes: "", isFlagged: false, flagReasons: [], createdAt: "2024-04-21" },
    { id: "9", trackingId: "TRK-Q3R1", category: "Stalking", description: "Repeatedly appearing at same off-campus locations.", department: "Security", location: "Off-campus", incidentDate: "2024-04-15", evidenceCount: 2, riskScore: 78, riskBreakdown: { evidence: 26, description: 20, patternMatch: 15, noEvidencePenalty: 0 }, status: "verified", assignedTo: "Officer A", investigationNotes: "Local police coordinated.", isFlagged: false, flagReasons: [], createdAt: "2024-04-16" },
    { id: "10", trackingId: "TRK-T9U2", category: "Discrimination", description: "Unfair grading based on personal bias.", department: "Faculty", location: "Online", incidentDate: "2024-04-10", evidenceCount: 0, riskScore: 40, riskBreakdown: { evidence: 0, description: 20, patternMatch: 0, noEvidencePenalty: -30 }, status: "under_review", assignedTo: "Officer C", investigationNotes: "Reviewing assignment rubrics.", isFlagged: true, flagReasons: ["ip_spike"], createdAt: "2024-04-11" }
];

export const analyticsData = {
    monthlyTrend: [
        { month: "Jan", total: 10, verified: 5, rejected: 2 }, { month: "Feb", total: 15, verified: 8, rejected: 3 },
        { month: "Mar", total: 20, verified: 12, rejected: 4 }, { month: "Apr", total: 25, verified: 15, rejected: 5 },
        { month: "May", total: 30, verified: 18, rejected: 6 }, { month: "Jun", total: 28, verified: 16, rejected: 5 },
        { month: "Jul", total: 18, verified: 10, rejected: 3 }, { month: "Aug", total: 22, verified: 12, rejected: 4 },
        { month: "Sep", total: 35, verified: 20, rejected: 8 }, { month: "Oct", total: 40, verified: 25, rejected: 10 },
        { month: "Nov", total: 38, verified: 22, rejected: 9 }, { month: "Dec", total: 32, verified: 19, rejected: 7 }
    ],
    categoryBreakdown: [
        { category: "Harassment", count: 120, color: "#3B82F6" }, { category: "Bullying", count: 80, color: "#7C3AED" },
        { category: "Stalking", count: 45, color: "#EF4444" }, { category: "Discrimination", count: 60, color: "#F59E0B" },
        { category: "Abuse", count: 30, color: "#10B981" }, { category: "Other", count: 50, color: "#06B6D4" }
    ],
    riskDistribution: [
        { band: "LOW", count: 150 }, { band: "MEDIUM", count: 180 }, { band: "HIGH", count: 55 }
    ],
    resolutionTime: [
        { month: "Jan", avgDays: 5.2 }, { month: "Feb", avgDays: 4.8 }, { month: "Mar", avgDays: 4.5 },
        { month: "Apr", avgDays: 4.1 }, { month: "May", avgDays: 4.3 }, { month: "Jun", avgDays: 3.9 },
        { month: "Jul", avgDays: 3.8 }, { month: "Aug", avgDays: 3.5 }, { month: "Sep", avgDays: 4.0 },
        { month: "Oct", avgDays: 4.5 }, { month: "Nov", avgDays: 4.2 }, { month: "Dec", avgDays: 4.1 }
    ],
    departmentHeatmap: [
        [10, 5, 2, 8, 1, 4], [15, 12, 5, 20, 3, 8], [8, 4, 15, 2, 8, 5],
        [5, 2, 1, 10, 2, 12], [20, 15, 8, 5, 15, 6]
    ]
};

export const stats = { total: 48, open: 12, flagged: 3, verified: 22, rejected: 8, avgResolutionDays: 4.2, monthlyGrowth: "+18%" };

export const users = [
    { id: "u1", name: "Admin Jane", email: "admin@college.edu", role: "admin", avatar: "" },
    { id: "u2", name: "Officer Bob", email: "bob@college.edu", role: "officer", avatar: "" }
];
