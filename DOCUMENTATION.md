# Documentation Technique et Fonctionnelle

## Shopping Agent IA - Boulanger POC

---

## Table des matières

1. [Vision Produit](#1-vision-produit)
2. [Architecture Technique](#2-architecture-technique)
3. [Spécifications Fonctionnelles](#3-spécifications-fonctionnelles)
4. [Règles Agentiques](#4-règles-agentiques)
5. [Parcours Client](#5-parcours-client)
6. [KPIs et Métriques](#6-kpis-et-métriques)
7. [Roadmap](#7-roadmap)

---

## 1. Vision Produit

### 1.1 Objectif

Déployer un **Shopping Agent basé sur l'IA générative** dont la mission est d'aider les clients Boulanger à trouver le produit idéal en **moins de 5 minutes**.

### 1.2 Proposition de valeur

| Partie prenante | Bénéfice |
|-----------------|----------|
| **Client** | Gain de temps, recommandation personnalisée, expertise accessible |
| **Boulanger** | Augmentation conversion, données clients, différenciation |
| **Vendeurs** | Qualification préalable, focus sur le conseil expert |

### 1.3 Différenciants Boulanger à intégrer

- **Services** : Livraison, installation, reprise, garantie étendue
- **Expertise** : 70 ans d'expérience, conseillers experts
- **Proximité** : Réseau de magasins, SAV local
- **Confiance** : Avis clients, marques premium

---

## 2. Architecture Technique

### 2.1 Stack POC

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                    │
├─────────────────────────────────────────────────────────┤
│  Components    │  Pages        │  Data Layer            │
│  ├── Chat      │  ├── Home     │  ├── categories.ts    │
│  ├── Products  │  ├── Dashboard│  ├── products.ts      │
│  └── Layout    │  └── ...      │  └── conversation.ts  │
├─────────────────────────────────────────────────────────┤
│                    Styling (Tailwind CSS)                │
├─────────────────────────────────────────────────────────┤
│                    Hosting (Vercel)                      │
└─────────────────────────────────────────────────────────┘
```

### 2.2 Architecture cible (production)

```
┌─────────────────────────────────────────────────────────┐
│                      Clients                             │
│         Web │ App Mobile │ WhatsApp │ Magasin           │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│                   API Gateway                            │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│              Agent Orchestrator                          │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │
│  │ Shopping    │ │ Services    │ │ Support     │       │
│  │ Agent       │ │ Agent       │ │ Agent       │       │
│  └─────────────┘ └─────────────┘ └─────────────┘       │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│                  Services Backend                        │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │ Catalogue│ │ Stock    │ │ Prix     │ │ Client   │   │
│  │ Produits │ │ Dispo    │ │ Promos   │ │ 360°     │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│                    LLM Provider                          │
│          (Claude / GPT / Mistral / etc.)                │
└─────────────────────────────────────────────────────────┘
```

### 2.3 Composants clés

| Composant | Rôle | Technologie suggérée |
|-----------|------|---------------------|
| **Agent Orchestrator** | Routing et coordination des agents | LangChain / Custom |
| **Shopping Agent** | Conversation et recommandation | Claude API |
| **Vector Store** | Embedding produits et recherche | Pinecone / Weaviate |
| **Analytics** | Tracking conversations | Mixpanel / Amplitude |

---

## 3. Spécifications Fonctionnelles

### 3.1 Fonctionnalités MVP

#### F1 - Conversation guidée
- **Description** : L'agent pose une série de questions pour qualifier le besoin
- **Règles** :
  - Maximum 5 questions avant recommandation
  - Options cliquables + saisie libre
  - Possibilité de revenir en arrière

#### F2 - Recommandation produits
- **Description** : Affichage de 3 produits max avec score de correspondance
- **Données affichées** :
  - Nom, marque, prix (+ ancien prix si promo)
  - Note et nombre d'avis
  - Caractéristiques clés (4 max)
  - Classe énergétique
  - Raisons du match (personnalisées)

#### F3 - Intégration services
- **Description** : Chaque produit propose les services Boulanger
- **Services** :
  - Installation (tarif)
  - Reprise ancien appareil (gratuit)
  - Extension garantie (tarifs)
  - Livraison (options)

#### F4 - Dashboard PO
- **Description** : Vue de pilotage pour le Product Owner
- **Métriques** :
  - Volume conversations
  - Taux de conversion
  - Temps moyen
  - Satisfaction
  - Top catégories
  - Règles agentiques

### 3.2 Fonctionnalités futures

| Priorité | Fonctionnalité | Description |
|----------|----------------|-------------|
| P1 | Historique client | Reprendre une conversation, préférences |
| P1 | A/B testing | Tester différents flows |
| P2 | Comparateur | Comparer les produits recommandés |
| P2 | Panier direct | Ajouter au panier depuis le chat |
| P3 | Voice | Interaction vocale |
| P3 | Magasin | Borne interactive en magasin |

---

## 4. Règles Agentiques

### 4.1 Règles d'or UX/Agent

| ID | Règle | Priorité |
|----|-------|----------|
| R1 | Toujours qualifier le budget | Critique |
| R2 | Maximum 3 produits recommandés | Haute |
| R3 | Mentionner les services après chaque reco | Haute |
| R4 | Proposer escalade humain si insatisfaction | Moyenne |
| R5 | Ne jamais critiquer la concurrence | Critique |
| R6 | Toujours donner une raison au match | Haute |

### 4.2 Guardrails

```
┌─────────────────────────────────────────────────────────┐
│                    Input Guardrails                      │
├─────────────────────────────────────────────────────────┤
│ • Détection hors-sujet → Recentrer poliment            │
│ • Langage inapproprié → Message standard                │
│ • Demande concurrence → Réponse neutre + redirection    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                   Output Guardrails                      │
├─────────────────────────────────────────────────────────┤
│ • Vérification prix avant affichage                     │
│ • Vérification stock avant recommandation               │
│ • Pas de promesses (délais, prix futurs)               │
│ • Ton professionnel et bienveillant                    │
└─────────────────────────────────────────────────────────┘
```

### 4.3 Personnalité de l'agent

- **Ton** : Professionnel, chaleureux, expert
- **Niveau de langage** : Accessible, pas de jargon technique
- **Posture** : Conseiller de confiance, pas vendeur agressif
- **Signature** : "Votre assistant Boulanger"

---

## 5. Parcours Client

### 5.1 Parcours principal - Achat lave-linge

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│ Accueil │───▶│Catégorie│───▶│  Type   │───▶│Capacité │───▶│ Budget  │
└─────────┘    └─────────┘    └─────────┘    └─────────┘    └─────────┘
                                                                  │
┌─────────┐    ┌─────────┐    ┌─────────┐                        │
│  Achat  │◀───│ Détail  │◀───│  Reco   │◀───────────────────────┘
└─────────┘    └─────────┘    └─────────┘
```

### 5.2 Points de contact services

| Étape | Service proposé |
|-------|-----------------|
| Recommandation | Reprise ancien appareil |
| Détail produit | Installation, garantie |
| Panier | Livraison, financement |
| Post-achat | SAV, accessoires |

### 5.3 Gestion des cas limites

| Cas | Comportement agent |
|-----|-------------------|
| Produit indisponible | Proposer alternative + alerte retour stock |
| Budget insuffisant | Adapter les recommendations + financement |
| Besoin complexe | Proposer RDV conseiller expert |
| Hésitation | Proposer comparaison ou plus d'infos |

---

## 6. KPIs et Métriques

### 6.1 Métriques business

| KPI | Cible | Calcul |
|-----|-------|--------|
| Taux de conversion | 30% | Achats / Conversations complètes |
| Temps moyen conversation | < 5 min | Moyenne durée |
| Panier moyen assisté | +15% | vs panier non-assisté |
| NPS Shopping Agent | > 50 | Score NPS dédié |

### 6.2 Métriques opérationnelles

| Métrique | Description |
|----------|-------------|
| Taux de complétion | % conversations jusqu'à la reco |
| Taux d'abandon | % conversations interrompues |
| Taux d'escalade | % transferts vers humain |
| Précision recommandation | % "bon match" (feedback) |

### 6.3 Métriques techniques

| Métrique | Cible |
|----------|-------|
| Latence réponse | < 2s |
| Disponibilité | 99.9% |
| Erreurs LLM | < 0.1% |

---

## 7. Roadmap

### 7.1 Phase 1 - MVP (T1 2025)

**Objectif** : Valider le concept avec un parcours fonctionnel

- [x] Parcours conversationnel guidé
- [x] Recommandation 3 produits
- [x] Intégration services Boulanger
- [x] Dashboard PO basique
- [ ] Déploiement beta sur segment clients

### 7.2 Phase 2 - Personnalisation (T2 2025)

**Objectif** : Améliorer la pertinence des recommandations

- [ ] Connexion compte client
- [ ] Historique conversations
- [ ] Recommandations ML (collaborative filtering)
- [ ] A/B testing framework
- [ ] Analytics avancés

### 7.3 Phase 3 - Omnicanal (T3 2025)

**Objectif** : Étendre la portée de l'agent

- [ ] Application mobile native
- [ ] Intégration WhatsApp Business
- [ ] Borne magasin
- [ ] Continuité cross-canal

### 7.4 Phase 4 - Agent Autonome (T4 2025+)

**Objectif** : Maximiser l'autonomie et la valeur

- [ ] Actions automatisées (ajout panier, réservation)
- [ ] Négociation contextuelle (bundle, fidélité)
- [ ] Suivi proactif post-achat
- [ ] Agent multi-modal (image, voix)

---

## Annexes

### A. Glossaire

| Terme | Définition |
|-------|------------|
| **Agent IA** | Programme autonome utilisant l'IA pour accomplir des tâches |
| **LLM** | Large Language Model (ex: Claude, GPT) |
| **Guardrails** | Règles de sécurité limitant les réponses de l'IA |
| **RAG** | Retrieval-Augmented Generation |
| **Embedding** | Représentation vectorielle d'un texte |

### B. Références

- [Anthropic Claude Documentation](https://docs.anthropic.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Vercel Platform](https://vercel.com)

---

*Document rédigé dans le cadre du POC Shopping Agent IA Boulanger*
*Version 1.0 - Décembre 2024*
