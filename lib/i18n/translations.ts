export const fr = {
  common: {
    switchLanguage: "Changer de langue",
    themeLight: "Passer au thème clair",
    themeDark: "Passer au thème sombre",
  },
  nav: {
    dashboard: "Tableau de bord",
    conversations: "Discussions",
    customers: "Clients",
    calls: "Appels",
    knowledgeBase: "Base de connaissances",
    reports: "Rapports",
  },
  topbar: {
    notifications: "Notifications",
    myAccount: "Mon compte",
    notif1Title: "Nouveau message — Assistance Mobile",
    notif1Time: "il y a 2 min",
    notif2Title: "Bundle 5 Go activé sur votre ligne",
    notif2Time: "il y a 6 min",
    notif3Title: "TOBi a répondu à votre demande",
    notif3Time: "il y a 18 min",
  },
  brand: {
    headline: "Chaque conversation client, une plateforme connectée.",
    subline:
      "Support, assistance en direct et conversations assistées par l'IA pour les équipes care Vodacom — unifiés dans un seul espace de travail.",
    privacy: "Confidentialité",
    support: "Assistance",
  },
  auth: {
    backToSignIn: "Retour à la connexion",
    login: {
      title: "Connectez-vous à votre espace",
      subtitle: "Saisissez vos identifiants Vodacom pour accéder à la plateforme care.",
      workEmail: "E-mail professionnel",
      password: "Mot de passe",
      remember: "Rester connecté sur cet appareil",
      forgotPassword: "Mot de passe oublié ?",
      signingIn: "Connexion…",
      signIn: "Se connecter",
      trouble: "Problème d'accès ?",
      contactIt: "Contacter le support IT",
      serverError: "L'e-mail ou le mot de passe saisi est incorrect.",
    },
    otp: {
      title: "Vérifiez votre identité",
      subtitle: "Saisissez le code à 6 chiffres envoyé à votre adresse e-mail enregistrée.",
      verifying: "Vérification…",
      verify: "Vérifier le code",
      resendIn: "Renvoyer le code dans {seconds}s",
      resend: "Renvoyer le code",
      serverError: "Ce code est incorrect ou a expiré.",
    },
    forgot: {
      title: "Réinitialiser votre mot de passe",
      subtitle:
        "Saisissez votre e-mail professionnel et nous vous enverrons les instructions de réinitialisation.",
      workEmail: "E-mail professionnel",
      sending: "Envoi…",
      send: "Envoyer les instructions",
      checkTitle: "Consultez votre boîte mail",
      checkBodyBefore: "Nous avons envoyé les instructions à",
      checkBodyAfter: "Le lien expire dans 30 minutes.",
      didntReceive: "Vous ne l'avez pas reçu ?",
      tryDifferent: "Essayer une autre adresse",
    },
    reset: {
      title: "Créer un nouveau mot de passe",
      subtitle: "Choisissez un mot de passe fort que vous n'avez pas déjà utilisé sur ce compte.",
      newPassword: "Nouveau mot de passe",
      confirmPassword: "Confirmer le nouveau mot de passe",
      updating: "Mise à jour…",
      update: "Mettre à jour le mot de passe",
      reqLength: "Au moins 8 caractères",
      reqUpper: "Une lettre majuscule",
      reqNumber: "Un chiffre",
      reqSymbol: "Un symbole",
    },
    firstLogin: {
      badge: "Bienvenue sur la plateforme",
      title: "Configurez votre compte",
      subtitle:
        "Première connexion : confirmez votre nom et choisissez un mot de passe pour activer votre compte.",
      fullName: "Nom complet",
      createPassword: "Créer un mot de passe",
      confirmPassword: "Confirmer le mot de passe",
      terms:
        "J'accepte la politique d'utilisation acceptable de Vodacom et les directives de traitement des données pour les systèmes internes.",
      activating: "Activation…",
      activate: "Activer le compte",
    },
    passwordStrength: {
      label: "Force du mot de passe :",
      weak: "Faible",
      fair: "Moyenne",
      good: "Bonne",
      strong: "Forte",
    },
  },
  validation: {
    emailRequired: "Saisissez votre e-mail professionnel.",
    emailInvalid: "Saisissez une adresse e-mail valide.",
    passwordRequired: "Saisissez votre mot de passe.",
    otpLength: "Saisissez le code à 6 chiffres.",
    otpDigits: "Le code ne doit contenir que des chiffres.",
    passwordMin: "Utilisez au moins 8 caractères.",
    passwordUpper: "Incluez au moins une lettre majuscule.",
    passwordNumber: "Incluez au moins un chiffre.",
    passwordSymbol: "Incluez au moins un symbole.",
    confirmRequired: "Confirmez votre nouveau mot de passe.",
    passwordsMismatch: "Les mots de passe ne correspondent pas.",
    fullNameRequired: "Saisissez votre nom complet.",
    acceptTerms: "Acceptez les conditions pour continuer.",
  },
  conversations: {
    title: "Discussions",
    unread: "non lus",
    searchPlaceholder: "Rechercher une conversation…",
    filters: {
      all: "Tous",
      unread: "Non lus",
      favorites: "Favoris",
      agents: "Conseillers",
    },
    dateFilters: {
      all: "Toutes les dates",
      today: "Aujourd'hui",
      yesterday: "Hier",
      week: "7 derniers jours",
      month: "30 derniers jours",
      custom: "Période personnalisée",
    },
    resetDateFilter: "Réinitialiser le filtre par date",
    clear: "Effacer",
    from: "Du",
    to: "Au",
    apply: "Appliquer",
    sectionOfficial: "Assistance Vodacom",
    sectionRecent: "Conversations récentes",
    emptyList: "Aucune conversation ne correspond à votre recherche.",
    noSelectionTitle: "Aucune conversation sélectionnée",
    noSelectionBody: "Choisissez un salon ou une conversation à gauche.",
    noMessages: "Aucun message pour le moment. Démarrez la conversation ci-dessous.",
    pinnedPrefix: "Message épinglé :",
    autoReply: "Bien reçu, je m'en occupe tout de suite.",
    voiceNote: "🎤 Note vocale",
    header: {
      channelMembers: "Salon · {count} membres",
      direct: "Conversation directe",
      online: " · {count} en ligne",
      searchPlaceholder: "Rechercher dans la conversation…",
      closeSearch: "Fermer la recherche",
      search: "Rechercher",
    },
    composer: {
      replyTo: "Réponse à :",
      attachment: "Pièce jointe",
      recording: "Enregistrement…",
      cancel: "Annuler",
      send: "Envoyer",
      emojis: "Émojis",
      attach: "Joindre un fichier",
      placeholder: "Écrivez un message…",
      voiceNote: "Note vocale",
    },
    details: {
      channelTitle: "Détails du salon",
      contactTitle: "Détails du contact",
      officialChannel: "Salon officiel",
      members: "{count} membres",
      online: "{count} en ligne",
      notifications: "Notifications",
      allNotifications: "Toutes",
      media: "Médias, liens et documents",
      filesCount: "{count} fichiers",
      starred: "Messages importants",
      searchInChat: "Rechercher dans la conversation",
      participants: "Participants ({count})",
      seeAll: "Voir tous",
      onlineStatus: "En ligne",
      offlineStatus: "Hors ligne",
      sharedFiles: "Fichiers partagés",
    },
    roles: {
      agent: "Agent",
      supervisor: "Superviseur",
      customer: "Client",
      bot: "Bot",
    },
    message: {
      imagePreview: "Aperçu image",
      reply: "Répondre",
      react: "Réagir",
      forward: "Transférer",
      copy: "Copier",
      pin: "Épingler",
      more: "Plus",
    },
  },
} as const;

export const en = {
  common: {
    switchLanguage: "Switch language",
    themeLight: "Switch to light theme",
    themeDark: "Switch to dark theme",
  },
  nav: {
    dashboard: "Dashboard",
    conversations: "Conversations",
    customers: "Customers",
    calls: "Calls",
    knowledgeBase: "Knowledge base",
    reports: "Reports",
  },
  topbar: {
    notifications: "Notifications",
    myAccount: "My account",
    notif1Title: "New message — Mobile Support",
    notif1Time: "2 min ago",
    notif2Title: "5 GB bundle activated on your line",
    notif2Time: "6 min ago",
    notif3Title: "TOBi replied to your request",
    notif3Time: "18 min ago",
  },
  brand: {
    headline: "Every customer conversation, one connected platform.",
    subline:
      "Support, live assistance and AI-powered conversations for Vodacom's customer care teams — unified in a single workspace.",
    privacy: "Privacy",
    support: "Support",
  },
  auth: {
    backToSignIn: "Back to sign in",
    login: {
      title: "Sign in to your workspace",
      subtitle: "Enter your Vodacom credentials to access the care platform.",
      workEmail: "Work email",
      password: "Password",
      remember: "Keep me signed in on this device",
      forgotPassword: "Forgot password?",
      signingIn: "Signing in",
      signIn: "Sign in",
      trouble: "Trouble accessing your account?",
      contactIt: "Contact IT support",
      serverError: "The email or password you entered is incorrect.",
    },
    otp: {
      title: "Verify your identity",
      subtitle: "Enter the 6-digit code we sent to your registered email address.",
      verifying: "Verifying",
      verify: "Verify code",
      resendIn: "Resend code in {seconds}s",
      resend: "Resend code",
      serverError: "That code is incorrect or has expired.",
    },
    forgot: {
      title: "Reset your password",
      subtitle: "Enter your work email and we'll send you instructions to reset your password.",
      workEmail: "Work email",
      sending: "Sending instructions",
      send: "Send reset instructions",
      checkTitle: "Check your email",
      checkBodyBefore: "We've sent password reset instructions to",
      checkBodyAfter: "The link expires in 30 minutes.",
      didntReceive: "Didn't receive it?",
      tryDifferent: "Try a different address",
    },
    reset: {
      title: "Create a new password",
      subtitle: "Choose a strong password you haven't used before on this account.",
      newPassword: "New password",
      confirmPassword: "Confirm new password",
      updating: "Updating password",
      update: "Update password",
      reqLength: "At least 8 characters",
      reqUpper: "One uppercase letter",
      reqNumber: "One number",
      reqSymbol: "One symbol",
    },
    firstLogin: {
      badge: "Welcome to the platform",
      title: "Set up your account",
      subtitle:
        "This is your first sign-in. Confirm your name and choose a password to activate your account.",
      fullName: "Full name",
      createPassword: "Create password",
      confirmPassword: "Confirm password",
      terms:
        "I agree to Vodacom's acceptable use policy and data handling guidelines for internal systems.",
      activating: "Activating account",
      activate: "Activate account",
    },
    passwordStrength: {
      label: "Password strength:",
      weak: "Weak",
      fair: "Fair",
      good: "Good",
      strong: "Strong",
    },
  },
  validation: {
    emailRequired: "Enter your work email address.",
    emailInvalid: "Enter a valid email address.",
    passwordRequired: "Enter your password.",
    otpLength: "Enter the 6-digit code.",
    otpDigits: "The code must contain only digits.",
    passwordMin: "Use at least 8 characters.",
    passwordUpper: "Include at least one uppercase letter.",
    passwordNumber: "Include at least one number.",
    passwordSymbol: "Include at least one symbol.",
    confirmRequired: "Confirm your new password.",
    passwordsMismatch: "Passwords don't match.",
    fullNameRequired: "Enter your full name.",
    acceptTerms: "Accept the terms to continue.",
  },
  conversations: {
    title: "Conversations",
    unread: "unread",
    searchPlaceholder: "Search conversations…",
    filters: {
      all: "All",
      unread: "Unread",
      favorites: "Starred",
      agents: "Agents",
    },
    dateFilters: {
      all: "All dates",
      today: "Today",
      yesterday: "Yesterday",
      week: "Last 7 days",
      month: "Last 30 days",
      custom: "Custom range",
    },
    resetDateFilter: "Reset date filter",
    clear: "Clear",
    from: "From",
    to: "To",
    apply: "Apply",
    sectionOfficial: "Vodacom Support",
    sectionRecent: "Recent conversations",
    emptyList: "No conversations match your search.",
    noSelectionTitle: "No conversation selected",
    noSelectionBody: "Choose a channel or conversation on the left.",
    noMessages: "No messages yet. Start the conversation below.",
    pinnedPrefix: "Pinned message:",
    autoReply: "Got it, I'll take care of this right away.",
    voiceNote: "🎤 Voice note",
    header: {
      channelMembers: "Channel · {count} members",
      direct: "Direct message",
      online: " · {count} online",
      searchPlaceholder: "Search in conversation…",
      closeSearch: "Close search",
      search: "Search",
    },
    composer: {
      replyTo: "Replying to:",
      attachment: "Attachment",
      recording: "Recording…",
      cancel: "Cancel",
      send: "Send",
      emojis: "Emojis",
      attach: "Attach file",
      placeholder: "Write a message…",
      voiceNote: "Voice note",
    },
    details: {
      channelTitle: "Channel details",
      contactTitle: "Contact details",
      officialChannel: "Official channel",
      members: "{count} members",
      online: "{count} online",
      notifications: "Notifications",
      allNotifications: "All",
      media: "Media, links and docs",
      filesCount: "{count} files",
      starred: "Starred messages",
      searchInChat: "Search in conversation",
      participants: "Participants ({count})",
      seeAll: "See all",
      onlineStatus: "Online",
      offlineStatus: "Offline",
      sharedFiles: "Shared files",
    },
    roles: {
      agent: "Agent",
      supervisor: "Supervisor",
      customer: "Customer",
      bot: "Bot",
    },
    message: {
      imagePreview: "Image preview",
      reply: "Reply",
      react: "React",
      forward: "Forward",
      copy: "Copy",
      pin: "Pin",
      more: "More",
    },
  },
} as const;

type Widen<T> = {
  [K in keyof T]: T[K] extends string ? string : T[K] extends object ? Widen<T[K]> : T[K];
};

export type Dictionary = Widen<typeof fr>;

export type Locale = "fr" | "en";

export const dictionaries: Record<Locale, Dictionary> = { fr, en };

export type TranslationKey = string;

export function translate(
  locale: Locale,
  key: TranslationKey,
  params?: Record<string, string | number>
): string {
  const parts = key.split(".");
  let node: unknown = dictionaries[locale];
  for (const part of parts) {
    if (node && typeof node === "object" && part in node) {
      node = (node as Record<string, unknown>)[part];
    } else {
      return key;
    }
  }
  if (typeof node !== "string") return key;
  if (!params) return node;
  return Object.entries(params).reduce(
    (text, [param, value]) => text.replaceAll(`{${param}}`, String(value)),
    node
  );
}

export function localeToBcp47(locale: Locale): string {
  return locale === "fr" ? "fr-FR" : "en-GB";
}

export function localeLabel(locale: Locale): "FR" | "EN" {
  return locale === "fr" ? "FR" : "EN";
}
