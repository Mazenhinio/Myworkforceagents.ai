/**
 * Agent data configuration
 */

import type { AgentData } from '@/types';

export const AGENTS: Record<string, AgentData> = {
  finn: {
    id: 'finn',
    name: 'FINN',
    role: 'Lead Generation Specialist',
    description: '24/7 automated lead generation with geo-targeted campaigns',
    icon: 'fas fa-bullseye',
    avatar: 'finn-avatar',
    painPoints: [
      'Feast-or-famine pipeline',
      'Cold start in new neighborhoods',
      'Dirty/duplicate contact lists',
      'Non-compliant outreach risk (TCPA/DNC)',
      'Channel attribution blind spots'
    ],
    solutions: [
      'Always-on geo-farm campaigns that never sleep',
      'Hyperlocal warm-up sequences that surface intent fast',
      'Auto enrichment + de-dupe = clean CRM, always',
      'Consent-aware sending with DNC scrubbing + audit trail',
      'End-to-end attribution (UTMs/call tracking) to a single ROI dashboard'
    ],
    features: [
      { icon: 'fas fa-rocket', text: 'Auto geo-farming' },
      { icon: 'fas fa-users', text: 'Lead enrichment' },
      { icon: 'fas fa-shield-alt', text: 'Compliance-ready' }
    ],
    colorTheme: {
      primary: '#ff4500',
      secondary: '#ff8c00',
      gradient: 'linear-gradient(135deg, #ff4500, #ff8c00)'
    }
  },
  
  lisa: {
    id: 'lisa',
    name: 'LISA',
    role: 'Response & Nurture Specialist',
    description: 'Instant responses with intelligent conversation handling',
    icon: 'fas fa-comments',
    avatar: 'lisa-avatar',
    painPoints: [
      'Missed/late replies across SMS/DM/email',
      'Manual qualifying & calendar ping-pong',
      'Inconsistent follow-up cadences',
      'Disjointed multi-channel threads',
      'Opt-out/consent handling errors'
    ],
    solutions: [
      'Replies in <60s, 24/7, on the channel the lead used',
      'Conversational qualify + instant booking (reschedule smart logic)',
      'Adaptive cadences that pause on reply and restart on silence',
      'Unified thread memory; clean CRM notes after every touch',
      'Consent captured, suppression lists updated automatically'
    ],
    features: [
      { icon: 'fas fa-bolt', text: '<60s response' },
      { icon: 'fas fa-brain', text: 'Smart qualifying' },
      { icon: 'fas fa-clock', text: '24/7 available' }
    ],
    colorTheme: {
      primary: '#00bfff',
      secondary: '#0080ff',
      gradient: 'linear-gradient(135deg, #00bfff, #0080ff)'
    }
  },
  
  rese: {
    id: 'rese',
    name: 'RESE',
    role: 'Listings & Socials Specialist',
    description: 'Automated content creation and multi-platform posting',
    icon: 'fas fa-home',
    avatar: 'rese-avatar',
    painPoints: [
      'Inconsistent listing promotion cadence',
      'Time-heavy creative for new listings',
      'Multi-listing bottlenecks & broken links',
      'MLS branding/disclosure compliance risk',
      'Weak analytics; no learn-and-repeat'
    ],
    solutions: [
      'Auto-schedules MLS→social across platforms with reliable cadence',
      'Generates reels/carousels/copy from MLS data + brand templates',
      'One-click syndication, link checks, and UTM stamping',
      'MLS-safe templates, fair-housing filters, and mandatory disclaimers',
      'Post-level analytics + A/B copy; best variants auto-promoted'
    ],
    features: [
      { icon: 'fas fa-camera', text: 'Auto content' },
      { icon: 'fas fa-share-alt', text: 'Social syndication' },
      { icon: 'fas fa-chart-line', text: 'Performance tracking' }
    ],
    colorTheme: {
      primary: '#9c27b0',
      secondary: '#e91e63',
      gradient: 'linear-gradient(135deg, #9c27b0, #e91e63)'
    }
  },
  
  tessa: {
    id: 'tessa',
    name: 'TESSA',
    role: 'Ops & Transaction Coordinator',
    description: 'Automated deadline tracking and document management',
    icon: 'fas fa-file-contract',
    avatar: 'tessa-avatar',
    painPoints: [
      'Tasks/deadlines slipping (option/contingency)',
      'Document chase & signature bottlenecks',
      'CRM/PM out of sync; double entry',
      'Vendor/inspection scheduling chaos',
      'No status visibility for clients/team'
    ],
    solutions: [
      'Watches timelines; nudges before deadlines; escalates risk automatically',
      'Sends doc requests, tracks e-sign, chases missing items to done',
      'Two-way sync across CRM, e-sign, file store, and transaction tools',
      'Books vendors with rules; confirms and posts updates to the portal',
      'Live status portal + proactive SMS/email updates for all parties'
    ],
    features: [
      { icon: 'fas fa-calendar-check', text: 'Timeline tracking' },
      { icon: 'fas fa-file-signature', text: 'E-sign monitoring' },
      { icon: 'fas fa-sync', text: 'CRM sync' }
    ],
    colorTheme: {
      primary: '#4caf50',
      secondary: '#009688',
      gradient: 'linear-gradient(135deg, #4caf50, #009688)'
    }
  },
  
  ross: {
    id: 'ross',
    name: 'ROSS',
    role: 'Voice Receptionist Specialist',
    description: 'Professional AI receptionist with smart call routing',
    icon: 'fas fa-phone',
    avatar: 'ross-avatar',
    painPoints: [
      'Missed/after-hours calls; voicemail pileup',
      'Inconsistent phone screening & routing',
      'Long holds and dropped transfers',
      'No call notes or CRM updates',
      'Uncertain consent/phrasing on calls (TCPA)'
    ],
    solutions: [
      'Answers 24/7; smart callbacks—no voicemail black holes',
      'Scripted qualify + ID verify; routes by priority/availability',
      'Warm transfers with context; queue mgmt to prevent drops',
      'Summarizes calls, creates tasks, and logs to CRM instantly',
      'Built-in consent prompts + recorded disclaimers; full audit log'
    ],
    features: [
      { icon: 'fas fa-phone', text: '24/7 answering' },
      { icon: 'fas fa-user-friends', text: 'Smart transfers' },
      { icon: 'fas fa-sticky-note', text: 'Call logging' }
    ],
    colorTheme: {
      primary: '#f44336',
      secondary: '#ff5722',
      gradient: 'linear-gradient(135deg, #f44336, #ff5722)'
    }
  }
};

export const AGENT_ORDER: string[] = ['finn', 'lisa', 'rese', 'tessa', 'ross'];
