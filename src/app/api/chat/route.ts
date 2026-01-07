import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Catalogue produits Boulanger
const PRODUCT_CATALOG = `
## ORDINATEURS MAC
- MacBook Air M2 (1099€) : Idéal étudiants, léger, 15h autonomie, 8Go RAM, 256Go SSD
- MacBook Air M3 13" (1299€) : Parfait dev quotidien, léger, silencieux, 18h autonomie, 8Go RAM, 256Go SSD
- MacBook Pro M3 14" (1999€) : Pour développeurs exigeants, M3 Pro, 18Go RAM, 512Go SSD, écran ProMotion
- MacBook Pro M3 Max 16" (3499€) : Puissance ultime, 36Go RAM, 1To SSD, pour projets ambitieux

## ORDINATEURS WINDOWS - TRAVAIL
- Dell XPS 15 (1599€) : Premium pro, Intel i7-13700H, 16Go RAM, 512Go SSD, écran OLED 3.5K
- Lenovo ThinkPad X1 Carbon (1899€) : Référence business, robuste, i7-1365U, 32Go RAM, 1To SSD, clavier légendaire
- HP Spectre x360 14" (1449€) : Convertible élégant, i7-1355U, 16Go RAM, 512Go SSD, écran tactile OLED

## ORDINATEURS GAMING
- ASUS ROG Strix G16 (1799€) : Gaming puissant, i7-13650HX, RTX 4070, 16Go RAM, 165Hz QHD
- MSI Raider GE78 HX (2999€) : Monstre de puissance, i9-13980HX, RTX 4080, 32Go RAM, 240Hz QHD+
- Lenovo Legion Pro 7i (2499€) : Performance optimale, i9-13900HX, RTX 4080, 32Go RAM, 240Hz

## ORDINATEURS LINUX
- System76 Lemur Pro (1199€) : Conçu pour Linux, i7-1355U, 16Go RAM, 500Go SSD, Pop!_OS préinstallé
- Dell XPS 13 Plus Developer (1499€) : Ubuntu préinstallé, i7-1360P, 16Go RAM, 512Go SSD
- ThinkPad T14s Linux (1399€) : Certifié Linux, AMD Ryzen 7 Pro, 16Go RAM, 512Go SSD, Fedora

## ORDINATEURS ÉTUDIANT/BUDGET
- Acer Aspire 5 (549€) : Budget serré, AMD Ryzen 5, 8Go RAM, 256Go SSD, 15.6" Full HD
- HP Pavilion 15 (699€) : Bon rapport qualité-prix, Intel i5-1335U, 8Go RAM, 256Go SSD

## ÉCRANS
- Dell UltraSharp 27" 4K (549€) : USB-C 90W, pivot/rotation, couleurs calibrées
- LG 27" 4K USB-C (449€) : USB-C 65W, HDR10, FreeSync
- Samsung Odyssey G7 32" (699€) : Gaming, 240Hz, 1ms, incurvé, G-Sync
- ASUS ROG Swift 27" (799€) : Esport, 360Hz, IPS 1ms, G-Sync

## ACCESSOIRES GAMING
- Logitech G Pro X (149€) : Clavier mécanique compact TKL, switches GX, RGB
- Logitech G Pro X Superlight (159€) : Souris ultra-légère 63g, 25K DPI, 70h autonomie
- SteelSeries Arctis Nova Pro (349€) : Casque Hi-Res Audio, ANC, sans fil
`;

const SYSTEM_PROMPT = `Tu es l'assistant shopping de Boulanger, spécialisé dans les ordinateurs et accessoires informatiques.

## TON RÔLE
- Aider les clients à trouver l'ordinateur parfait selon leurs besoins
- Poser des questions pertinentes pour comprendre leur usage
- Recommander des produits du catalogue avec leurs prix
- Proposer des accessoires complémentaires (cross-sell)

## RÈGLES IMPORTANTES
1. Tu ne parles QUE d'ordinateurs et accessoires informatiques
2. Si on te parle d'autre chose (machine à laver, TV, etc.), dis poliment que tu es spécialisé en informatique
3. Sois conversationnel, naturel, pas robotique
4. Quand tu recommandes un produit, mentionne TOUJOURS le prix
5. Si le client change d'avis, adapte-toi sans problème
6. Pose maximum 2-3 questions avant de proposer des produits
7. Utilise des emojis avec modération (1-2 par message max)

## FORMAT DE RÉPONSE - TRÈS IMPORTANT
Tu dois TOUJOURS répondre en JSON valide avec ce format exact. Ne mets JAMAIS de texte avant ou après le JSON.

{
  "message": "Ton message texte conversationnel ici (PAS de JSON dans ce champ)",
  "options": [
    {"label": "🏷️ Option 1", "value": "option1"},
    {"label": "🏷️ Option 2", "value": "option2"}
  ],
  "products": [
    {"id": "product-id", "name": "Nom Produit", "price": 999, "image": "💻", "description": "Description courte"}
  ],
  "action": "none",
  "selectedProductId": null
}

RÈGLES DU FORMAT:
- "message": UNIQUEMENT du texte conversationnel, JAMAIS de JSON ou de structure technique
- "options": tableau de choix rapides (2-4 max), ou null si pas pertinent
- "products": tableau de produits recommandés, ou null si pas encore à l'étape recommandation
- "action": "add_to_cart" si le client a confirmé vouloir un produit, sinon "none"
- "selectedProductId": l'ID du produit choisi si action="add_to_cart", sinon null

## CATALOGUE PRODUITS
${PRODUCT_CATALOG}

## EXEMPLES DE FLUX
1. Client: "Je cherche un ordinateur" → Demander l'usage (travail/gaming/études/perso)
2. Client: "Pour le travail" → Demander le type de travail ou le système préféré
3. Client: "Je suis développeur, je veux un Mac" → Recommander MacBook Air M3, Pro M3, Pro M3 Max
4. Client: "Je prends le MacBook Air" → Ajouter au panier, proposer écran externe
5. Client: "Finalement non, je veux du gaming" → Pas de problème, proposer PC gaming

RAPPEL CRITIQUE: Le champ "message" doit contenir UNIQUEMENT du texte lisible par un humain, pas de JSON.`;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const { messages, userMessage } = await request.json();

    // Construire l'historique pour Claude
    const conversationHistory: Message[] = messages.map((msg: { role: string; text: string }) => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.role === 'assistant' ? JSON.stringify({ message: msg.text }) : msg.text,
    }));

    // Ajouter le nouveau message
    conversationHistory.push({
      role: 'user',
      content: userMessage,
    });

    const response = await anthropic.messages.create({
      model: 'claude-3-5-haiku-20241022', // Haiku = 3x plus rapide que Sonnet
      max_tokens: 512, // Réponses plus courtes = plus rapides
      system: SYSTEM_PROMPT,
      messages: conversationHistory,
    });

    // Extraire la réponse texte
    const textContent = response.content.find(block => block.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text response from Claude');
    }

    // Parser le JSON de la réponse
    let parsedResponse;
    try {
      // Nettoyer la réponse des backticks markdown si présents
      let jsonText = textContent.text.trim();

      // Retirer les backticks markdown ```json ... ``` ou ``` ... ```
      if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '');
      }

      parsedResponse = JSON.parse(jsonText);

      // SÉCURITÉ: Vérifier si le champ "message" contient du JSON brut
      // Cela arrive quand Claude met la réponse entière dans le champ message
      if (parsedResponse.message && typeof parsedResponse.message === 'string') {
        const messageText = parsedResponse.message.trim();

        // Détecter si le message commence par { et contient des champs JSON typiques
        if (messageText.startsWith('{') && messageText.includes('"message"')) {
          try {
            const nestedJson = JSON.parse(messageText);
            // Si c'est du JSON valide avec un champ message, l'utiliser
            if (nestedJson.message) {
              parsedResponse = nestedJson;
            }
          } catch {
            // Pas du JSON valide dans message, on garde tel quel
          }
        }

        // Nettoyer le message de tout résidu JSON partiel
        // ex: {"message": "Texte" devient juste "Texte"
        if (parsedResponse.message.startsWith('{"') || parsedResponse.message.startsWith('[')) {
          // Essayer d'extraire juste le texte du message
          const messageMatch = parsedResponse.message.match(/"message"\s*:\s*"([^"]+)"/);
          if (messageMatch) {
            parsedResponse.message = messageMatch[1];
          }
        }
      }
    } catch {
      // Si le JSON est invalide, essayer de récupérer quelque chose d'utile
      const rawText = textContent.text.replace(/```(?:json)?|```/g, '').trim();

      // Tenter d'extraire le message d'un JSON partiel
      let extractedMessage = rawText;
      const msgMatch = rawText.match(/"message"\s*:\s*"([^"]+)"/);
      if (msgMatch) {
        extractedMessage = msgMatch[1];
      }

      parsedResponse = {
        message: extractedMessage,
        options: [
          { label: "💻 Je cherche un ordinateur", value: "ordinateur" },
          { label: "🎮 Gaming", value: "gaming" },
          { label: "💼 Travail", value: "travail" }
        ],
        products: null,
        action: 'none',
      };
    }

    return NextResponse.json(parsedResponse);
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      {
        message: "Désolé, j'ai un petit souci technique. Pouvez-vous reformuler ?",
        options: [
          { label: "💻 Je cherche un ordinateur", value: "ordinateur" },
          { label: "🔄 Recommencer", value: "restart" }
        ],
        products: null,
        action: 'none'
      },
      { status: 200 } // On retourne 200 pour que le front puisse gérer
    );
  }
}
