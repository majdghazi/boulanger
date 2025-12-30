# Boulanger Shopping Agent IA - POC

> Prototype de Shopping Agent IA pour Boulanger - Trouvez le produit idéal en moins de 5 minutes

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)
![License](https://img.shields.io/badge/license-POC-orange.svg)

## Apercu du projet

Ce POC (Proof of Concept) demontre la vision d'un **Shopping Agent IA** pour Boulanger, permettant aux clients de trouver le produit ideal en moins de 5 minutes grace a une experience conversationnelle intelligente.

### Objectifs

- **Desirabilite** : Offrir une experience client fluide et personnalisee
- **Utilite** : Reduire le temps de recherche produit de 70%
- **Faisabilite** : Demontrer l'integration possible avec l'ecosysteme Boulanger

## Fonctionnalites

### Shopping Agent IA
- Parcours conversationnel guide par questions
- Recommandations produits personnalisees avec score de correspondance
- Integration des services Boulanger (livraison, installation, reprise, garantie)
- Interface de chat moderne et responsive

### Dashboard Product Owner
- KPIs temps reel (conversations, conversion, satisfaction)
- Analyse des categories les plus demandees
- Suivi des regles agentiques
- Roadmap MVP visualisee

## Stack Technique

| Technologie | Usage |
|-------------|-------|
| **Next.js 15** | Framework React avec App Router |
| **TypeScript** | Typage statique |
| **Tailwind CSS** | Styling utility-first |
| **Framer Motion** | Animations fluides |
| **Lucide React** | Icones modernes |
| **Vercel** | Deploiement et hosting |

## Installation

```bash
# Cloner le repository
git clone https://github.com/majdghazi/boulanger.git

# Installer les dependances
npm install

# Lancer en developpement
npm run dev

# Build pour production
npm run build
```

## Structure du Projet

```
src/
├── app/                    # Pages Next.js (App Router)
│   ├── page.tsx           # Page d'accueil + Chat
│   ├── dashboard/         # Dashboard PO
│   └── layout.tsx         # Layout global
├── components/
│   ├── chat/              # Composants du chat
│   │   ├── ChatInterface.tsx
│   │   ├── ChatMessage.tsx
│   │   └── ChatOptions.tsx
│   ├── layout/            # Header, Footer
│   └── products/          # Cartes produits
├── data/                  # Donnees mockees
│   ├── categories.ts
│   ├── products.ts
│   └── conversation.ts
├── types/                 # Types TypeScript
└── lib/                   # Utilitaires
```

## Deploiement Vercel

1. Connecter le repo GitHub a Vercel
2. Vercel detecte automatiquement Next.js
3. Deploiement automatique a chaque push

## Parcours Utilisateur

```
1. Accueil
   └── Message de bienvenue de l'Agent IA

2. Selection categorie
   └── Electromenager / TV / Informatique / etc.

3. Questions de qualification
   ├── Type de produit
   ├── Capacite / Taille
   ├── Budget
   └── Priorites (eco, silence, rapidite...)

4. Recommandations
   ├── 3 produits avec score de correspondance
   ├── Raisons du match
   ├── Services Boulanger associes
   └── CTA vers achat
```

## Roadmap (Vision)

| Phase | Status | Contenu |
|-------|--------|---------|
| **Phase 1** | Livre | Core Agent, parcours conversationnel |
| **Phase 2** | En cours | Personnalisation, historique client |
| **Phase 3** | Planifie | Omnicanal (app, WhatsApp, magasin) |
| **Phase 4** | Vision | Agent autonome, negociation |

## Auteur

**Majd Ghazi** - Product Owner IA Generative (Candidat)

---

*Ce POC est une maquette interactive demontrant la vision produit. Non affilie officiellement a Boulanger.*
