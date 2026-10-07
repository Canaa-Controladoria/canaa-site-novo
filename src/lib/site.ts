export const site = {
  name: "Canaã Controladoria",
  legalName: "Canaã Treinamento e Consultoria LTDA",
  cnpj: "08.928.880/0001-72",
  phoneDisplay: "(16) 3603-2650",
  phoneWhatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "551636032650",
  email: "contato@canaacontroladoria.com.br",
  address: "Av. Luiz Eduardo de Toledo Prado, 900, sala 108 — Torre Empresarial do Shopping Iguatemi, Vila do Golf, Ribeirão Preto - SP",
  addressShort: "Av. Luiz Eduardo de Toledo Prado, 900, sl 108. Ribeirão Preto - SP",
  hours: "Segunda à sexta, das 8h às 12h e das 14h às 18h",
  social: {
    linkedin: "https://br.linkedin.com/company/cana%C3%A3-controladoria-e-finan%C3%A7as",
    instagram: "https://www.instagram.com/canaacontroladoria",
    // TODO: preencher com a URL real do canal antes de publicar (pedir pra cliente).
    youtube: "",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};

export function whatsappLink(message: string) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${site.phoneWhatsapp}?text=${text}`;
}

export const mainNav = [
  { label: "Início", href: "/" },
  { label: "Soluções", href: "/solucoes" },
  { label: "Método", href: "/metodo" },
  { label: "Controller terceirizado", href: "/solucoes/controller-terceirizado" },
  { label: "Quem somos", href: "/quem-somos" },
  { label: "Insights", href: "/blog" },
];

export const solutions = [
  { slug: "report-estrategico", title: "BI Canaã", short: "Report Estratégico" },
  { slug: "cubo-de-resultado", title: "Cubo de Resultado", short: "Margem de contribuição" },
  { slug: "gestao-por-squad", title: "Gestão por OKR e KPIs", short: "Metas e indicadores" },
  { slug: "gestao-para-giro", title: "Gestão para Giro", short: "Capital de giro" },
  { slug: "gestao-de-futuro", title: "Gestão de Futuro & XP&A", short: "Orçamento, projeções e XP&A" },
  { slug: "valuation", title: "Valuation", short: "Quanto vale sua empresa" },
  { slug: "estrutura-de-controladoria", title: "Estrutura de Controladoria", short: "Equipe e processos" },
  { slug: "training", title: "Training", short: "Desenvolvimento de equipes" },
  { slug: "consultoria-financeira", title: "Consultoria Financeira", short: "Caixa, orçamento e decisões com dados" },
] as const;
