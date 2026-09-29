export interface SolutionTopic {
  title: string;
  body: string;
}

export interface SolutionHighlight {
  title: string;
  body: string;
}

export interface SolutionContent {
  slug: string;
  navTitle: string;
  eyebrow?: string;
  heroTitle: string;
  heroLede: string;
  highlights?: [SolutionHighlight, SolutionHighlight];
  topicsHeading: string;
  topics: SolutionTopic[];
  proposalHeading: string;
  seoTitle: string;
  seoDescription: string;
}

export const solutionsContent: Record<string, SolutionContent> = {
  "report-estrategico": {
    slug: "report-estrategico",
    navTitle: "BI Canaã",
    eyebrow: "Elaboramos o painel de controle exato que sua empresa precisa",
    heroTitle: "BI Canaã — seu BI financeiro para decisões mais inteligentes",
    heroLede:
      "O BI financeiro Canaã reúne os principais dados da sua empresa em um painel personalizado e intuitivo. Visualize indicadores, acompanhe resultados e tome decisões com base em informações reais, usando seu ERP e ferramentas de tecnologia — podendo acoplar Inteligência Artificial.",
    highlights: [
      {
        title: "Foco no que importa",
        body: "Aumente a eficiência com decisões baseadas em dados. Otimize processos e reduza custos.",
      },
      {
        title: "Exatidão em tempo real",
        body: "Confiabilidade e exatidão em tempo real. Visão da empresa pelo celular, tablet ou computador.",
      },
    ],
    topicsHeading: "Mais sobre o BI Financeiro Canaã",
    topics: [
      {
        title: "Demonstração de Resultados do Exercício (DRE)",
        body: "Revela o lucro real da empresa e sua formação. Somos especializados na elaboração e análise da DRE para maximizar esse lucro, identificando áreas de correção e oportunidades de melhoria.",
      },
      {
        title: "Balanço Patrimonial",
        body: "Uma \"foto sinalizadora\" dos ativos, passivos e patrimônio líquido da empresa. Avalia liquidez e solidez, orientando decisões para maior estabilidade futura.",
      },
      {
        title: "Demonstração do Fluxo de Caixa (DFC)",
        body: "Detalha entradas e saídas de dinheiro em um período, essencial para planejar investimentos e avaliar a capacidade de pagamento de dívidas.",
      },
      {
        title: "Dashboard Report",
        body: "Painéis visuais que consolidam informações de várias fontes, permitindo monitorar indicadores-chave e tomar decisões com facilidade.",
      },
      {
        title: "Demonstrativo Financeiro para Auditoria (DFA)",
        body: "Registro detalhado das operações financeiras que garante conformidade com normas contábeis e credibilidade perante investidores e órgãos reguladores.",
      },
      {
        title: "Reports por Centro de Custo",
        body: "Auxiliam na identificação de gastos, avaliação da rentabilidade por setor e análise da contribuição de cada área para a empresa.",
      },
      {
        title: "Notas Explicativas",
        body: "Complementam a leitura das demonstrações financeiras, dando contexto às variações de fluxo de caixa e às decisões de investimento.",
      },
    ],
    proposalHeading: "Ligamos para você",
    seoTitle: "BI Canaã | BI Financeiro para decisões inteligentes",
    seoDescription:
      "Com o BI financeiro Canaã, visualize resultados em tempo real, otimize processos e aumente a eficiência da sua gestão empresarial.",
  },

  "cubo-de-resultado": {
    slug: "cubo-de-resultado",
    navTitle: "Cubo de Resultado",
    eyebrow: "Prosperidade e resultado para sua empresa",
    heroTitle: "Cubo de Resultado — análise de margem de contribuição",
    heroLede:
      "O Cubo de Resultado permite uma análise de margem de contribuição detalhada, ajudando sua empresa a identificar quais produtos, clientes, vendedores e regiões realmente geram lucro e onde concentrar esforços estratégicos. Rentabilidade não significa contribuição — analise de forma clara e tome decisões seguras.",
    highlights: [
      {
        title: "Agilize a tomada de decisões",
        body: "Tenha uma visão clara de resultados por produtos, clientes, regiões, unidades, ramos e processos.",
      },
      {
        title: "Impulsione seu negócio",
        body: "Otimize esforços nas áreas certas, que vão catapultar os resultados da sua empresa.",
      },
    ],
    topicsHeading: "Mais sobre o Cubo de Resultado",
    topics: [
      {
        title: "MC por Produto",
        body: "Revela a contribuição de cada item para cobrir custos fixos e gerar lucro — fundamental para ajustes de preço ou descontinuação de itens.",
      },
      {
        title: "MC por Cliente",
        body: "Calcula quanto cada cliente contribui para a empresa, orientando estratégias de vendas e marketing.",
      },
      {
        title: "MC por Ramo",
        body: "Avalia a lucratividade de diferentes segmentos de negócio, orientando a alocação de recursos.",
      },
      {
        title: "MC por Vendedor",
        body: "Avalia o desempenho individual de cada vendedor, direcionando recursos para melhorar o time comercial.",
      },
      {
        title: "MC por Região",
        body: "Avalia a lucratividade de cada área geográfica, permitindo direcionar recursos estrategicamente.",
      },
      {
        title: "MC por Unidade",
        body: "Calcula o lucro gerado por cada unidade vendida, essencial para avaliar rentabilidade por vetor de custo.",
      },
      {
        title: "Mix Produtividade",
        body: "Plano de ação que seleciona produtos, ramos, regiões e clientes estrategicamente para melhorar desempenho e competitividade.",
      },
      {
        title: "Revisão de Processos",
        body: "Análise estruturada dos procedimentos para reduzir custos, simplificar operações e aumentar a qualidade.",
      },
      {
        title: "Aumento de Lucro",
        body: "Estratégias para aumentar receita, reduzir custos ou ambos — maximizando a rentabilidade sustentável.",
      },
    ],
    proposalHeading: "Ligamos para você",
    seoTitle: "Cubo de Resultado: Análise de Margem de Contribuição",
    seoDescription:
      "Descubra como o Cubo de Resultado realiza análise de margem de contribuição, identificando lucros por produto, cliente, vendedor e região.",
  },

  "gestao-por-squad": {
    slug: "gestao-por-squad",
    navTitle: "Gestão por OKR e KPIs",
    eyebrow: "O segredo para atingir seus resultados",
    heroTitle: "Gestão por OKR e KPIs",
    heroLede:
      "A Gestão por OKR e KPIs ajuda sua empresa a estruturar metas, acompanhar indicadores e analisar resultados de forma prática e estratégica, apoiando decisões conscientes. Montamos, com a equipe Canaã e a sua equipe, um grupo forte e multidisciplinar para projetos e estratégias.",
    highlights: [
      { title: "Equipes ágeis", body: "Formamos equipes multidisciplinares e autogerenciáveis para uma colaboração eficaz e resultados rápidos." },
      { title: "Resultados precisos", body: "Utilizamos OKRs e KPIs para garantir o alcance dos objetivos e monitorar o progresso." },
    ],
    topicsHeading: "Mais sobre Gestão por OKR e KPIs",
    topics: [
      { title: "KPIs", body: "Medem o desempenho da empresa em relação a metas específicas, alinhados aos objetivos estratégicos." },
      { title: "OKRs", body: "Estrutura para definir metas e medir progresso, promovendo transparência, alinhamento e foco." },
      { title: "Formação de times chave", body: "Seleção e desenvolvimento de grupos com habilidades complementares para atingir metas ambiciosas." },
      { title: "Interação com times chave", body: "Colaboração ativa e comunicação regular para promover inovação e resolver problemas rapidamente." },
      { title: "Controladoria de compras", body: "Redução de custos via políticas de compra, gestão de estoque, negociação de contratos e conformidade." },
      { title: "Controladoria comercial", body: "Monitoramento das atividades comerciais: desempenho de vendas, conversão e funil de vendas." },
      { title: "Redução de custo", body: "Renegociação de contratos, automação de processos e otimização de recursos." },
      { title: "Controladoria de estoque", body: "Níveis ótimos de estoque, redução de custos de armazenagem e prevenção de rupturas." },
      { title: "Revisão de processos", body: "Reestruturação de processos internos para reduzir custos e aumentar a qualidade." },
    ],
    proposalHeading: "Ligamos para você",
    seoTitle: "Gestão por OKR e KPIs: metas claras e decisões estratégicas",
    seoDescription:
      "Organize metas e indicadores com a Gestão por OKR e KPIs da Canaã, acompanhando resultados e apoiando decisões estratégicas da empresa.",
  },

  "gestao-para-giro": {
    slug: "gestao-para-giro",
    navTitle: "Gestão para Giro",
    heroTitle: "Gestão para Giro: otimize seu capital de giro e decisões financeiras",
    heroLede:
      "A Gestão para Giro da Canaã Controladoria fortalece a gestão de capital de giro e o controle financeiro da sua empresa. Com análises detalhadas e estratégias de liquidez, você toma decisões mais seguras e garante fôlego para o crescimento sustentável.",
    topicsHeading: "Soluções de Gestão para Giro",
    topics: [
      { title: "Gestão de Caixa", body: "Controle e otimização do fluxo de dinheiro, garantindo liquidez e minimizando riscos financeiros." },
      { title: "Fluxo Futuro", body: "Estimativa das entradas e saídas de caixa esperadas, antecipando desafios de liquidez." },
      { title: "Demonstração do Fluxo de Caixa (DFC)", body: "Detalha entradas e saídas de dinheiro, avaliando a origem e o destino dos recursos." },
      { title: "DFC Futuro", body: "Projeção das entradas e saídas futuras, essencial para o planejamento financeiro de longo prazo." },
      { title: "Contas a pagar", body: "Controle das obrigações com fornecedores e credores, garantindo pagamentos em dia." },
      { title: "Contas a receber", body: "Controle dos valores devidos por clientes, essencial para um fluxo de caixa saudável." },
      { title: "Estratégias de NCG", body: "Gestão eficiente dos ativos e passivos circulantes para otimizar a liquidez." },
      { title: "Estruturação Financeira", body: "Organização de funções, responsabilidades e processos financeiros da empresa." },
      { title: "Controle financeiro", body: "Monitoramento das atividades financeiras, orçamentos e metas para operações sustentáveis." },
      { title: "NCG e ciclo financeiro", body: "Gestão do capital necessário para financiar as operações diárias da empresa." },
    ],
    proposalHeading: "Solicite uma proposta de Gestão para Giro",
    seoTitle: "Gestão para Giro e Capital de Giro | Canaã Controladoria",
    seoDescription:
      "Fortaleça a gestão de capital de giro com a Canaã Controladoria. Estratégias de Gestão para Giro para decisões financeiras mais seguras.",
  },

  "gestao-de-futuro": {
    slug: "gestao-de-futuro",
    navTitle: "Gestão de Futuro",
    eyebrow: "Orçamento alinhado à estratégia dos gestores",
    heroTitle: "Gestão de Futuro: planejamento orçamentário estratégico para decisões assertivas",
    heroLede:
      "Com base em um planejamento orçamentário bem estruturado, a Canaã auxilia na tomada de decisões financeiras mais conscientes. Utilizamos a metodologia Bottom-Up Canaã, orçamento base zero e metodologias de risco para projetar cenários — com participação ativa da sua equipe.",
    highlights: [
      { title: "Orçamento colaborativo", body: "Envolvemos toda a equipe no processo orçamentário para resultados alinhados e otimizados." },
      { title: "Estratégia eficaz", body: "Metodologias de risco e orçamento base zero para uma estrutura financeira robusta." },
    ],
    topicsHeading: "Mais sobre Gestão de Futuro",
    topics: [
      { title: "Plano de negócios", body: "Documento que descreve objetivos, estratégias, mercado-alvo, análise competitiva e projeções financeiras." },
      { title: "Orçamento", body: "Plano financeiro que estima receitas e despesas futuras, controlando o desempenho financeiro." },
      { title: "Forecast", body: "Projeção que combina dados realizados e orçados para prever resultados com mais precisão." },
      { title: "Budget bottom-up", body: "Cada área cria seu próprio orçamento, consolidado no orçamento total — combinado com o top-down na Canaã." },
      { title: "Budget top-down", body: "A alta administração define metas e diretrizes financeiras distribuídas aos departamentos." },
      { title: "Análise de viabilidade", body: "Avaliação de custos, benefícios, riscos e retornos esperados de um projeto ou investimento." },
      { title: "Projeção estatística", body: "Técnicas como regressão linear e séries temporais para prever desempenho com base em dados históricos." },
      { title: "Cenários estratégicos", body: "Criação de diferentes cenários futuros para preparar a empresa diante de incertezas." },
      { title: "Projeção Monte Carlo", body: "Simulação estatística com a ferramenta Crystal Ball da Oracle para avaliar riscos e incertezas." },
    ],
    proposalHeading: "Solicite uma proposta de Gestão de Futuro",
    seoTitle: "Gestão de Futuro e Planejamento Orçamentário Estratégico",
    seoDescription:
      "Não basta gerir bem o presente; é essencial planejar o amanhã. A Canaã oferece Gestão de Futuro com planejamento orçamentário estratégico.",
  },

  valuation: {
    slug: "valuation",
    navTitle: "Valuation",
    eyebrow: "Tenha clareza para investir ou expandir",
    heroTitle: "Valuation: descubra quanto vale sua empresa",
    heroLede:
      "Na Canaã, realizamos Valuation para que você, proprietário e acionista, conheça o valor real da sua empresa. Utilizamos metodologias de risco para projetar cenários, garantindo uma análise precisa e confiável para investir ou ampliar o negócio.",
    highlights: [
      { title: "Avaliação imparcial e técnica", body: "Análise precisa do valor da sua empresa, sem vieses ou parcialidade." },
      { title: "Estratégias de crescimento", body: "Preparamos sua empresa para novos investimentos e expansão." },
    ],
    topicsHeading: "Mais sobre Valuation e suas aplicações",
    topics: [
      { title: "Cisão", body: "Divisão de uma empresa em entidades independentes para focar em negócios específicos ou aumentar valor." },
      { title: "Fusão", body: "Combinação de duas ou mais entidades para criar sinergias, expandir mercados e reduzir custos." },
      { title: "Valuation para sócios", body: "Avaliação para compra e venda de participações, entrada ou saída de sócios." },
      { title: "Valuation para investidor", body: "Determinação do valor justo com base em ativos, endividamento e potencial de crescimento." },
      { title: "Fusão com sinergia", body: "Benefícios adicionais obtidos com a união de empresas, como economia de escala e eficiência operacional." },
      { title: "FC Descontado", body: "O método mais consagrado de valuation: estima o valor com base em fluxos de caixa futuros descontados." },
      { title: "Múltiplos P/E e EBITDA", body: "Técnica que compara métricas financeiras com empresas semelhantes no mercado." },
    ],
    proposalHeading: "Solicite mais informações sobre Valuation",
    seoTitle: "Valuation: descubra quanto vale sua empresa com a Canaã!",
    seoDescription:
      "A Canaã Controladoria é especialista em Valuation. Determine o valor de sua empresa através de metodologias como DCF e análise de múltiplos.",
  },

  "estrutura-de-controladoria": {
    slug: "estrutura-de-controladoria",
    navTitle: "Estrutura de Controladoria",
    heroTitle: "Estrutura de Controladoria",
    heroLede:
      "Conheça a estrutura de controladoria ideal para sua empresa: desde a formação e análise da equipe até a implementação do setor de FP&A, garantindo processos financeiros eficientes e decisões estratégicas baseadas em dados confiáveis.",
    topicsHeading: "Como montar e otimizar a estrutura de controladoria",
    topics: [
      { title: "Formação de Equipe", body: "Recrutamento e desenvolvimento de profissionais qualificados para funções de controle e análise financeira." },
      { title: "Análise de Equipe", body: "Avaliação de desempenho e competências, identificando áreas de melhoria e treinamento." },
      { title: "Diagnóstico de FP&A e Controladoria", body: "Avaliação abrangente de processos, ferramentas e competências da área financeira." },
      { title: "Implementação do setor de Controladoria e FP&A", body: "Criação e estruturação de processos, responsabilidades e ferramentas para a gestão financeira." },
    ],
    proposalHeading: "Solicite uma proposta para aprimorar sua estrutura de controladoria",
    seoTitle: "Estrutura de Controladoria: equipe e processos financeiros",
    seoDescription:
      "Conte com a expertise do time Canaã Controladoria para desenvolver a estrutura de controladoria da sua empresa com eficiência e segurança.",
  },

  training: {
    slug: "training",
    navTitle: "Training",
    heroTitle: "Training Empresarial: desenvolva habilidades e resultados da sua equipe",
    heroLede: "Training voltados à performance financeira e de gestão, para capacitar gestores e equipes com foco em resultado.",
    topicsHeading: "Trilhas de Training",
    topics: [
      { title: "Gestão de Caixa", body: "Administração dos fluxos de caixa para garantir liquidez e investir em oportunidades de crescimento." },
      { title: "Gestão por Squad", body: "Formação de equipes multidisciplinares para projetos específicos, promovendo agilidade e foco em resultados." },
      { title: "Cubo de Resultado", body: "Visualização multidimensional dos dados financeiros para identificar padrões e tendências." },
      { title: "Reports estratégicos", body: "Relatórios que auxiliam a alta administração a tomar decisões informadas." },
      { title: "Valuation", body: "Processo de determinar o valor econômico de uma empresa ou ativo." },
      { title: "Formação de Equipe", body: "Seleção, treinamento e desenvolvimento de colaboradores para equipes eficazes." },
    ],
    proposalHeading: "Solicite uma proposta para Training empresarial",
    seoTitle: "Training Empresarial: desenvolva resultados da equipe",
    seoDescription: "Desenvolva seu time com o Training da Canaã. Capacite gestores e equipes com foco em finanças, estratégia e performance empresarial.",
  },

  "consultoria-financeira": {
    slug: "consultoria-financeira",
    navTitle: "Consultoria Financeira",
    eyebrow: "Organize a gestão financeira da sua empresa",
    heroTitle: "Consultoria financeira: caixa, orçamento e decisões com dados",
    heroLede:
      "Organizamos a gestão financeira da sua empresa — fluxo de caixa, capital de giro, orçamento e indicadores — e transformamos esses dados em decisões, com uma rotina contínua de controladoria ao lado do seu time.",
    highlights: [
      {
        title: "Diagnóstico do momento financeiro",
        body: "Mapeamos caixa, endividamento e indicadores para saber exatamente de onde a empresa parte.",
      },
      {
        title: "Plano de ação orientado a dados",
        body: "Cada recomendação vem amarrada a um número e a uma decisão prática para o negócio.",
      },
    ],
    topicsHeading: "Mais sobre a consultoria financeira Canaã",
    topics: [
      {
        title: "Fluxo de caixa e capital de giro",
        body: "Visão clara de entradas e saídas para decidir com antecedência, sem sustos no fim do mês.",
      },
      {
        title: "Orçamento e FP&A",
        body: "Orçamento bottom-up e acompanhamento do realizado × orçado, com análise de desvios.",
      },
      {
        title: "Indicadores financeiros",
        body: "Poucos indicadores, bem escolhidos, que realmente orientam a tomada de decisão.",
      },
      {
        title: "Rotina de controladoria",
        body: "Relatórios e reuniões periódicas para que a análise financeira vire ação recorrente.",
      },
    ],
    proposalHeading: "Solicite uma proposta de consultoria financeira",
    seoTitle: "Consultoria Financeira para empresas | Canaã Controladoria",
    seoDescription:
      "Consultoria financeira que organiza fluxo de caixa, orçamento e indicadores da sua empresa e transforma dados em decisões, com a Canaã Controladoria.",
  },
};

export function getSolutionSlugs() {
  return Object.keys(solutionsContent);
}
