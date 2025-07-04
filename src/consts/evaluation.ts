export const SeniorityLevel = {
    ABOVE_C_LEVEL: 'ABOVE_C_LEVEL', // Above C-Level
    C_LEVEL: 'C_LEVEL', // CEO, CTO, CFO, etc.
    VP_LEVEL: 'VP_LEVEL', // VP, SVP, EVP
    DIRECTOR: 'DIRECTOR', // Director, Senior Director
    HEAD_OF: 'HEAD_OF', // Head of Department/Function
    SENIOR_MANAGER: 'SENIOR_MANAGER', // Senior Manager, Lead
    MANAGER: 'MANAGER', // Manager
    SENIOR_IC: 'SENIOR_IC', // Senior Individual Contributor
    IC: 'IC', // Individual Contributor
    ENTRY: 'ENTRY', // Entry Level
    OTHER: 'OTHER',
    UNKNOWN: 'UNKNOWN', // For cases where level cannot be determined
} as const
