"use client";

import { useState } from "react";

const faq = [
  {
    question: "O que faz um controller?",
    answer:
      "Garante que os números da empresa sejam confiáveis e transforma esses números em análises e decisões — do caixa à margem, do orçamento aos indicadores operacionais.",
  },
  {
    question: "Quanto custa um controller terceirizado?",
    answer:
      "O investimento varia conforme o porte da empresa, a complexidade das operações e o escopo do diagnóstico inicial. Na reunião de diagnóstico, apresentamos uma proposta sob medida, sem valor fixo padronizado.",
  },
  {
    question: "Em quanto tempo a controladoria começa a rodar?",
    answer:
      "O diagnóstico já aponta os primeiros ganhos. A estrutura de dados e os painéis dos 3 pilares costumam ficar prontos nas primeiras semanas, e a rotina de reports e reuniões de resultado entra em ritmo mensal a partir daí.",
  },
  {
    question: "A Canaã substitui meu contador?",
    answer:
      "Não. A Canaã atua na controladoria — organiza os dados de Finanças, Contabilidade e Operação em indicadores e decisões. A contabilidade legal e fiscal continua com o seu contador; trabalhamos em conjunto com ele.",
  },
];

export function ControllerFaq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="flex flex-col">
      {faq.map((item, i) => {
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
