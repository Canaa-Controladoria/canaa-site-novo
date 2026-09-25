import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Canaã Controladoria: Consultoria Financeira em Ribeirão Preto, SP",
    template: "%s | Canaã Controladoria",
  },
  description:
    "Consultoria financeira e controladoria para resultados em Ribeirão Preto, SP. BI, FP&A, gestão de caixa, valuation e OKRs para médias empresas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      data-theme="canaa"
      className={`${openSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-base-100 text-base-content">{children}</body>
    </html>
  );
}
