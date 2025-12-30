import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "./context/CartContext";

export const metadata: Metadata = {
  title: "Boulanger - Trouvez votre produit",
  description: "Trouvez le produit idéal en quelques secondes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-[#0a0a0a]">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
