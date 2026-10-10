/**
 * Types for SwasthyaSaathi AI Clinical Intelligence Frontend
 */

export type AppView =
  | 'overview'
  | 'assistant'
  | 'doctor-prep'
  | 'health-library'
  | 'emergency-sos'
  | 'login'
  | 'signup'
  | 'recovery';

export type Language = 'en' | 'hi';

export interface UserProfile {
  name: string;
  email: string;
  abhaId: string;
  role: 'patient' | 'doctor';
  assignedPhysician?: string;
}

export interface VitalMetric {
  label: string;
  value: string;
  unit: string;
  status: 'nominal' | 'optimal' | 'warning' | 'critical';
  trend: string;
  icon: string;
}

export interface QuerySuggestion {
  id: string;
  label: string;
  query: string;
  category: 'medication' | 'trend' | 'nutrition' | 'hindi';
  icon: string;
}

export interface ClinicalMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  icdCode?: string;
  language?: 'en' | 'hi';
  isEmergencyAlert?: boolean;
}

export interface HealthGuide {
  id: string;
  title: string;
  titleHi: string;
  category: string;
  summary: string;
  summaryHi: string;
  readTime: string;
  certifiedBy: string;
  imageUrl?: string;
}
