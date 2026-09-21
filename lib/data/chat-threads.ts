import type { ChatThread } from "@/lib/types/chat";

/**
 * Mock conversations for the Vodacom chat module.
 *
 * The shape mirrors the future API exactly — to plug in a real backend,
 * swap this module for a `fetch()` (or a TanStack Query hook) and keep
 * the `ChatThread[]` contract unchanged. Thread numbers ("001"…) are
 * stable across reloads because they're stored on the dataset, not
 * derived from array index.
 */

export const chatThreads: ChatThread[] = [
  {
    id: "thr-002",
    number: "002",
    title: "Remboursement roaming — M. Kabila",
    subtitle: "Ticket #R-44218",
    status: "active",
    pinned: true,
    updatedAt: "2026-09-21T07:55:00Z",
    participants: [
      {
        id: "agent-marc",
        name: "Marc Delvaux",
        role: "agent",
        initials: "MD",
        avatarColor: "#0EA5E9",
      },
      { id: "user-me", name: "Vous", role: "agent", initials: "VO", avatarColor: "#111111" },
    ],
    messages: [
      {
        id: "m-002-1",
        threadId: "thr-002",
        senderId: "agent-marc",
        role: "assistant",
        createdAt: "2026-09-21T07:30:00Z",
        content:
          "Le client M. Kabila conteste un débit roaming de 42 800 CDF facturé alors qu'il disposait d'un pass Roam Plus. Dossier en cours de vérification.",
      },
      {
        id: "m-002-2",
        threadId: "thr-002",
        senderId: "user-me",
        role: "user",
        createdAt: "2026-09-21T07:42:00Z",
        content:
          "Vérifie la date d'activation du pass et l'historique CDR du 14 au 17 septembre. Si éligible, lance le remboursement sous 48h.",
        status: "read",
      },
      {
        id: "m-002-3",
        threadId: "thr-002",
        senderId: "agent-marc",
        role: "assistant",
        createdAt: "2026-09-21T07:55:00Z",
        content:
          "Pass actif du 13/09 au 20/09. Les sessions data tombent toutes dans la fenêtre. Je lance le remboursement de 42 800 CDF via l'outil GRC, validation au supervisor.",
      },
    ],
  },
  {
    id: "thr-003",
    number: "003",
    title: "TOBi AI — diagnostic 5G",
    subtitle: "Bot conversationnel",
    status: "pending",
    pinned: true,
    updatedAt: "2026-09-21T07:10:00Z",
    participants: [
      { id: "bot-tobi", name: "TOBi", role: "bot", initials: "T", avatarColor: "#E60000" },
      { id: "user-me", name: "Vous", role: "agent", initials: "VO", avatarColor: "#111111" },
    ],
    messages: [
      {
        id: "m-003-1",
        threadId: "thr-003",
        senderId: "user-me",
        role: "user",
        createdAt: "2026-09-21T07:01:00Z",
        content:
          "TOBi, peux-tu me sortir la liste des antennes 5G qui présentent un débit moyen inférieur à 200 Mbps sur les 7 derniers jours dans la zone de Lubumbashi ?",
        status: "read",
      },
      {
        id: "m-003-2",
        threadId: "thr-003",
        senderId: "bot-tobi",
        role: "assistant",
        createdAt: "2026-09-21T07:03:00Z",
        content:
          "J'ai analysé 184 sites 5G sur la zone Lubumbashi. 17 antennes sont sous le seuil de 200 Mbps, dont 4 en dégradation forte (> 30 % vs J-7). Je peux te générer un rapport PDF + un ticket d'escalade NOC par site, tu valides ?",
      },
      {
        id: "m-003-3",
        threadId: "thr-003",
        senderId: "user-me",
        role: "user",
        createdAt: "2026-09-21T07:10:00Z",
        content:
          "Oui, génère le rapport et crée uniquement les tickets pour les 4 antennes en dégradation forte.",
        status: "delivered",
      },
    ],
  },
  {
    id: "thr-004",
    number: "004",
    title: "Migration flotte — Banque Atlantique",
    subtitle: "Compte clé — 3 200 lignes",
    status: "active",
    updatedAt: "2026-09-20T18:20:00Z",
    participants: [
      {
        id: "agent-sophie",
        name: "Sophie Renard",
        role: "agent",
        initials: "SR",
        avatarColor: "#8B5CF6",
      },
      { id: "user-me", name: "Vous", role: "agent", initials: "VO", avatarColor: "#111111" },
    ],
    messages: [
      {
        id: "m-004-1",
        threadId: "thr-004",
        senderId: "agent-sophie",
        role: "assistant",
        createdAt: "2026-09-20T17:55:00Z",
        content:
          "On a migré 1 200 lignes hier soir sur le lot 3, RAS. Le lot 4 est planifié demain à 22h, j'aurai besoin d'un binôme support NOC.",
      },
      {
        id: "m-004-2",
        threadId: "thr-004",
        senderId: "user-me",
        role: "user",
        createdAt: "2026-09-20T18:10:00Z",
        content:
          "OK, je demande à Patrick de rester dispo. Envoie-moi le runbook et la liste des IMEI à surveiller.",
        status: "read",
      },
      {
        id: "m-004-3",
        threadId: "thr-004",
        senderId: "agent-sophie",
        role: "assistant",
        createdAt: "2026-09-20T18:20:00Z",
        content:
          "Runbook partagé dans le canal #projet-banque-atlantique. Liste IMEI jointe, 800 IMEI concernés.",
      },
    ],
  },
  {
    id: "thr-005",
    number: "005",
    title: "Plainte facturation — Mme Tshala",
    subtitle: "Réseau voix — Double facturation",
    status: "unread",
    unreadCount: 1,
    updatedAt: "2026-09-20T16:04:00Z",
    participants: [
      {
        id: "agent-jules",
        name: "Jules Mbeki",
        role: "agent",
        initials: "JM",
        avatarColor: "#10B981",
      },
      { id: "user-me", name: "Vous", role: "agent", initials: "VO", avatarColor: "#111111" },
    ],
    messages: [
      {
        id: "m-005-1",
        threadId: "thr-005",
        senderId: "agent-jules",
        role: "assistant",
        createdAt: "2026-09-20T15:42:00Z",
        content:
          "Mme Tshala a été facturée deux fois pour le même appel international (France, 18 min). Total contesté : 14 200 CDF. CDR confirme l'appel n'a eu lieu qu'une fois.",
      },
      {
        id: "m-005-2",
        threadId: "thr-005",
        senderId: "agent-jules",
        role: "assistant",
        createdAt: "2026-09-20T16:04:00Z",
        content:
          "C'est un doublon technique côté billing — j'ai escaladé au support plateforme (ticket INC-9012). Crédit commercial de 15 000 CDF envoyé en geste commercial en attendant. Tu valides ?",
      },
    ],
  },
  {
    id: "thr-006",
    number: "006",
    title: "Audit qualité — campagne été",
    subtitle: "Équipe Lubumbashi",
    status: "archived",
    updatedAt: "2026-09-15T11:00:00Z",
    participants: [
      {
        id: "agent-audrey",
        name: "Audrey Kouassi",
        role: "supervisor",
        initials: "AK",
        avatarColor: "#F59E0B",
      },
      { id: "user-me", name: "Vous", role: "agent", initials: "VO", avatarColor: "#111111" },
    ],
    messages: [
      {
        id: "m-006-1",
        threadId: "thr-006",
        senderId: "agent-audrey",
        role: "assistant",
        createdAt: "2026-09-15T10:45:00Z",
        content:
          "Voici le rapport d'audit qualité de l'équipe Lubumbashi pour la campagne été. Score global 87/100, en progression de 4 points vs T-1.",
      },
      {
        id: "m-006-2",
        threadId: "thr-006",
        senderId: "user-me",
        role: "user",
        createdAt: "2026-09-15T11:00:00Z",
        content:
          "Merci Audrey, je le partage avec l'équipe. On programme un coaching individuel pour les 3 agents sous 80.",
        status: "read",
      },
    ],
  },
  {
    id: "thr-007",
    number: "007",
    title: "Demande partenariat — TechCorp",
    subtitle: "Prospection commerciale",
    status: "pending",
    updatedAt: "2026-09-14T14:25:00Z",
    participants: [
      {
        id: "agent-leo",
        name: "Léo Vandenberg",
        role: "agent",
        initials: "LV",
        avatarColor: "#EC4899",
      },
      { id: "user-me", name: "Vous", role: "agent", initials: "VO", avatarColor: "#111111" },
    ],
    messages: [
      {
        id: "m-007-1",
        threadId: "thr-007",
        senderId: "agent-leo",
        role: "assistant",
        createdAt: "2026-09-14T14:25:00Z",
        content:
          "TechCorp (intégrateur SAP local) souhaite un accord de co-marketing sur les offres IoT. RDV proposé vendredi 14h avec leur DG. Tu peux représenter Vodacom ?",
      },
    ],
  },
  {
    id: "thr-008",
    number: "008",
    title: "Incident réseau — région Sud",
    subtitle: "Suivi NOC",
    status: "active",
    updatedAt: "2026-09-13T22:18:00Z",
    participants: [
      {
        id: "agent-patrice",
        name: "Patrice N'Diaye",
        role: "agent",
        initials: "PN",
        avatarColor: "#06B6D4",
      },
      { id: "user-me", name: "Vous", role: "agent", initials: "VO", avatarColor: "#111111" },
    ],
    messages: [
      {
        id: "m-008-1",
        threadId: "thr-008",
        senderId: "agent-patrice",
        role: "assistant",
        createdAt: "2026-09-13T21:50:00Z",
        content:
          "Fibre coupée sur l'axe Likasi — Lubumbashi suite à travaux publics. 14 sites impactés, 38 000 clients en 4G dégradée.",
      },
      {
        id: "m-008-2",
        threadId: "thr-008",
        senderId: "user-me",
        role: "user",
        createdAt: "2026-09-13T22:00:00Z",
        content:
          "Active le plan B via le backbone satellite pour les sites prioritaires et envoie une communication client proactive.",
        status: "read",
      },
      {
        id: "m-008-3",
        threadId: "thr-008",
        senderId: "agent-patrice",
        role: "assistant",
        createdAt: "2026-09-13T22:18:00Z",
        content:
          "Plan B activé sur 4 sites prioritaires (hôpitaux, data center). Communication client push envoyée à 22h10, taux d'ouverture à 64 % en 8 min.",
      },
    ],
  },
  {
    id: "thr-009",
    number: "009",
    title: "Onboarding nouvel agent",
    subtitle: "Promotion interne — équipe support",
    status: "unread",
    unreadCount: 3,
    updatedAt: "2026-09-12T09:30:00Z",
    participants: [
      {
        id: "agent-audrey",
        name: "Audrey Kouassi",
        role: "supervisor",
        initials: "AK",
        avatarColor: "#F59E0B",
      },
      { id: "user-me", name: "Vous", role: "agent", initials: "VO", avatarColor: "#111111" },
    ],
    messages: [
      {
        id: "m-009-1",
        threadId: "thr-009",
        senderId: "agent-audrey",
        role: "assistant",
        createdAt: "2026-09-12T09:00:00Z",
        content:
          "Bienvenue dans l'équipe ! Je te prépare ton plan d'onboarding sur 2 semaines avec un buddy dédié.",
      },
      {
        id: "m-009-2",
        threadId: "thr-009",
        senderId: "agent-audrey",
        role: "assistant",
        createdAt: "2026-09-12T09:15:00Z",
        content:
          "Étape 1 — shadowing d'un agent senior pendant 3 jours. Tu observeras principalement les conversations entrantes.",
      },
      {
        id: "m-009-3",
        threadId: "thr-009",
        senderId: "agent-audrey",
        role: "assistant",
        createdAt: "2026-09-12T09:30:00Z",
        content:
          "Étape 2 — prise en main supervisée sur les dossiers simples (info facture, activation SIM). Je serai en double écoute.",
      },
    ],
  },
  {
    id: "thr-010",
    number: "010",
    title: "Bilan mensuel — KPIs support",
    subtitle: "Revue septembre",
    status: "archived",
    updatedAt: "2026-09-10T17:00:00Z",
    participants: [
      {
        id: "agent-audrey",
        name: "Audrey Kouassi",
        role: "supervisor",
        initials: "AK",
        avatarColor: "#F59E0B",
      },
      { id: "user-me", name: "Vous", role: "agent", initials: "VO", avatarColor: "#111111" },
    ],
    messages: [
      {
        id: "m-010-1",
        threadId: "thr-010",
        senderId: "agent-audrey",
        role: "assistant",
        createdAt: "2026-09-10T16:45:00Z",
        content:
          "Bilan septembre prêt : CSAT 4,6/5, FCR 78 %, temps moyen de réponse 2 min 14. Tous les objectifs sont atteints.",
      },
      {
        id: "m-010-2",
        threadId: "thr-010",
        senderId: "user-me",
        role: "user",
        createdAt: "2026-09-10T17:00:00Z",
        content:
          "Excellent. On prépare la revue avec la direction lundi. Merci pour le travail de l'équipe.",
        status: "read",
      },
    ],
  },
];

/**
 * Re-orders threads by most recent activity first, matching the ChatGPT
 * left rail behaviour. Kept as a separate helper so it can later be
 * replaced by a server-side `ORDER BY updated_at DESC` without touching
 * the UI.
 */
export function getChatThreads(): ChatThread[] {
  return [...chatThreads].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}
