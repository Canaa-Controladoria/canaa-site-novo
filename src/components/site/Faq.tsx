"use client";

import { useState } from "react";

const faqs = [
  {
    question: "O que faz uma consultoria financeira?",
    answer:
      "Organiza a gestão financeira — fluxo de caixa, capital de giro, orçamento e indicadores — e transforma esses dados em decisões. Na Canaã, isso vem com uma rotina contínua de controladoria.",
  },
  {
    question: "O que é um controller terceirizado?",
    answer:
      "É uma equipe dedicada que assume o papel de controladoria da sua empresa — diagnóstico, estrutura de dados, relatórios e reuniões de resultado — sem o custo e o tempo de montar essa área internamente.",
  },
  {
    question: "Qual a diferença entre contabilidade e controladoria?",
    answer:
      "A contabilidade registra o que já aconteceu, cumprindo obrigações fiscais e legais. A controladoria usa esses números — e os de operação e finanças — para orientar decisões e conectar o planejado ao realizado.",
  },
  {
    question: "Para que porte de empresa a Canaã é indicada?",
    answer:
      "Para médias empresas que já têm operação estruturada, mas ainda não contam com uma controladoria própria — e querem profissionalizar a gestão sem montar uma equipe interna do zero.",
  },
  {
    question: "Vocês atendem empresas fora de Ribeirão Preto?",
    answer:
      "Sim. A equipe é baseada em Ribeirão Preto-SP, mas a rotina de controladoria é feita majoritariamente à distância, com reuniões periódicas — o que permite atender empresas em outras cidades e estados.",
  },
];

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <div className="flex flex-1 flex-col">
      {faqs.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question} className="border-b border-base-300 py-6">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="flex w-full items-center justify-between gap-6 text-left text-lg font-bold text-navy-800 sm:text-xl"
            >
              <span>{item.question}</span>
              <span className="shrink-0 text-2xl leading-none text-navy-800">{isOpen ? "–" : "+"}</span>
            </button>
            {isOpen && <p className="mt-3 max-w-2xl text-base leading-relaxed text-navy-600">{item.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}
