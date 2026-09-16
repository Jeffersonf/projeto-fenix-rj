export const INITIAL_ITINERARY = [
  {
    id: 'day-1',
    dayNumber: 1,
    dayOfWeek: 'Terça-feira',
    date: '22/09/2026',
    title: 'Chegada & Reconhecimento',
    badge: 'Mata & Mar',
    badgeColor: 'forest',
    quote: 'O primeiro passo da retomada. Sentir o cheiro do mar carioca.',
    activities: [
      {
        id: 'd1-a1',
        period: 'Manhã / Tarde',
        title: 'Desembarque na Rodoviária Novo Rio & Check-in',
        description: 'Chegada via ônibus, deslocamento seguro (app/metrô) e check-in no Social Hostel (Ipanema ou Botafogo). Acomodar bagagens e reconhecer arredores.',
        location: 'Rodoviária Novo Rio ➡️ Hostel',
        completed: false
      },
      {
        id: 'd1-a2',
        period: 'Fim de Tarde',
        title: 'Pôr do Sol Mágico na Pedra do Arpoador',
        description: 'Caminhada clássica pela orla até a Pedra do Arpoador para aplaudir o sol se pondo no mar. Energia pura de boas-vindas.',
        location: 'Pedra do Arpoador',
        completed: false
      },
      {
        id: 'd1-a3',
        period: 'Noite',
        title: 'Jantar Leve & Social no BotaSoho',
        description: 'Jantar nutritivo no polo gastronômico de Botafogo ou no bar do hostel. Conexões autênticas sem necessidade de álcool.',
        location: 'Botafogo / Hostel Lounge',
        completed: false
      }
    ]
  },
  {
    id: 'day-2',
    dayNumber: 2,
    dayOfWeek: 'Quarta-feira',
    date: '23/09/2026',
    title: 'O Grande Marco da Liberdade',
    badge: 'Adrenalina Máxima',
    badgeColor: 'sunset',
    quote: 'Abrir as asas e contemplar a Cidade Maravilhosa de cima. Um novo horizonte.',
    activities: [
      {
        id: 'd2-a1',
        period: 'Manhã',
        title: 'Voo Livre de Asa Delta (Pedra Bonita ➡️ São Conrado)',
        description: 'Subida até a rampa de decolagem da Pedra Bonita em São Conrado. Salto duplo com instrutor experiente e pouso na areia da praia de São Conrado. Experiência transformadora!',
        location: 'Pedra Bonita / Praia de São Conrado',
        completed: false,
        highlight: true
      },
      {
        id: 'd2-a2',
        period: 'Tarde',
        title: 'Pedalada Completa na Lagoa Rodrigo de Freitas',
        description: 'Aluguel de Bike Itaú para contornar os 7,5 km da Lagoa. Parada para água de coco e contemplação do Cristo e dos Dois Irmãos.',
        location: 'Lagoa Rodrigo de Freitas',
        completed: false
      },
      {
        id: 'd2-a3',
        period: 'Noite',
        title: 'Descanso & Rolê Tranquilo em Ipanema',
        description: 'Caminhada despretensiosa pelas ruas arborizadas de Ipanema, suco natural da Polly Sucos ou Bibi Sucos e recuperação física.',
        location: 'Ipanema',
        completed: false
      }
    ]
  },
  {
    id: 'day-3',
    dayNumber: 3,
    dayOfWeek: 'Quinta-feira',
    date: '24/09/2026',
    title: 'Raízes, Visual & Cultura Carioca',
    badge: 'Cultura & Trilha',
    badgeColor: 'forest',
    quote: 'Respeito à história, ritmo ancestral e pé na terra.',
    activities: [
      {
        id: 'd3-a1',
        period: 'Manhã',
        title: 'Trilha do Morro da Urca (Pista Claudio Coutinho)',
        description: 'Caminhada ecológica agradável e gratuita margeando o mar pela Pista Claudio Coutinho, subindo os degraus de mata preservada até o Morro da Urca.',
        location: 'Urca / Pista Claudio Coutinho',
        completed: false
      },
      {
        id: 'd3-a2',
        period: 'Tarde',
        title: 'Boulevard Olímpico, Museu do Amanhã & PF Tradicional',
        description: 'Centro histórico renovado, murais do Kobra, Museu do Amanhã. Almoço: autêntico Prato Feito (PF) carioca com feijão preto.',
        location: 'Praça Mauá / Boulevard Olímpico',
        completed: false
      },
      {
        id: 'd3-a3',
        period: 'Noite',
        title: 'Samba de Raiz na Pedra do Sal (Zero Álcool)',
        description: 'Berço do samba carioca. Chegar cedo para pegar bom lugar na arquibancada de pedra. Curtir a batucada autêntica 100% lúcido.',
        location: 'Pedra do Sal, Saúde',
        completed: false,
        highlight: true
      }
    ]
  },
  {
    id: 'day-4',
    dayNumber: 4,
    dayOfWeek: 'Sexta-feira',
    date: '25/09/2026',
    title: 'Esporte & O Cartão Postal',
    badge: 'Cardio & Praia',
    badgeColor: 'ocean',
    quote: 'Energia solar nas veias: acordar cedo e viver a orla como um local.',
    activities: [
      {
        id: 'd4-a1',
        period: 'Amanhecer',
        title: 'Nascer do Sol no Mirante Dona Marta',
        description: 'Subida de Uber antes do amanhecer para ver o sol despontar por trás do Pão de Açúcar e iluminar a Baía de Guanabara e o Cristo.',
        location: 'Mirante Dona Marta, Santa Teresa',
        completed: false,
        highlight: true
      },
      {
        id: 'd4-a2',
        period: 'Manhã',
        title: 'Corrida / Treino ou Natação no Posto 6 (Copacabana)',
        description: 'Mar calmo no Posto 6, ideal para uma travessia a nado ou treino no calçadão icônico de Copacabana.',
        location: 'Copacabana - Posto 6',
        completed: false
      },
      {
        id: 'd4-a3',
        period: 'Tarde',
        title: 'Relax & Social no Posto 9 (Ipanema)',
        description: 'Vibe descontraída, areia dourada e esporte ao ar livre (altinha, futevôlei). Ótimo ponto de interação social natural.',
        location: 'Praia de Ipanema - Posto 9',
        completed: false
      },
      {
        id: 'd4-a4',
        period: 'Noite',
        title: 'Arcos da Lapa & Boemia Tradicional',
        description: 'Passeio histórico sob os Arcos da Lapa, contemplando a arquitetura colonial e a energia noturna carioca.',
        location: 'Lapa',
        completed: false
      }
    ]
  },
  {
    id: 'day-5',
    dayNumber: 5,
    dayOfWeek: 'Sábado',
    date: '26/09/2026',
    title: 'A Foto Épica dos Dois Irmãos',
    badge: 'Trilha Panorâmica',
    badgeColor: 'forest',
    quote: 'Superar o aclive, alcançar o cume e contemplar toda a Zona Sul sob seus pés.',
    activities: [
      {
        id: 'd5-a1',
        period: 'Manhã',
        title: 'Trilha do Morro Dois Irmãos (Mototáxi Vidigal)',
        description: 'Pegar mototáxi na Praça do Vidigal até o campo de futebol da Vila Olímpica. Subida de 45-60 minutos até a crista do Irmão Maior com vista deslumbrante de Leblon, Ipanema, Rocinha e Lagoa.',
        location: 'Vidigal / Morro Dois Irmãos',
        completed: false,
        highlight: true
      },
      {
        id: 'd5-a2',
        period: 'Tarde',
        title: 'Descida para o Leblon & Almoço Revigorante',
        description: 'Descida tranquila até o Leblon, almoço saudável, açaí caprichado e descanso na praia do Leblon.',
        location: 'Praia do Leblon',
        completed: false
      },
      {
        id: 'd5-a3',
        period: 'Noite',
        title: 'Noite Social no Hostel',
        description: 'Integração com viajantes do mundo inteiro no hostel. Troca de ideias, vivências e preparação mental para o grande desafio de domingo.',
        location: 'Hostel Lounge & Área Comum',
        completed: false
      }
    ]
  },
  {
    id: 'day-6',
    dayNumber: 6,
    dayOfWeek: 'Domingo',
    date: '27/09/2026',
    title: 'O Desafio Final: Pedra da Gávea',
    badge: 'Desafio Supremo',
    badgeColor: 'sunset',
    quote: '842 metros de altitude. Foco total, guia contratado e a mística da Carrasqueira.',
    activities: [
      {
        id: 'd6-a1',
        period: 'Manhã',
        title: 'Trilha da Pedra da Gávea com Guia Profissional',
        description: 'O maior monólito à beira-mar do mundo. Exige preparo físico e equipamento de segurança para a Carrasqueira. Experiência lendária.',
        location: 'Parque Nacional da Tijuca - Barra/São Conrado',
        completed: false,
        highlight: true,
        warning: '⚠️ IMPORTANTE: Fazer estritamente com guia credenciado.'
      },
      {
        id: 'd6-a2',
        period: 'Tarde',
        title: 'Almoço dos Campeões & Recuperação Muscular',
        description: 'Almoço farto e reforçado para reposição de eletrólitos e calorias. Banho relaxante e descanso merecido.',
        location: 'São Conrado / Zona Sul',
        completed: false
      },
      {
        id: 'd6-a3',
        period: 'Noite',
        title: 'Despedida Leve pela Orla',
        description: 'Última brisa noturna no calçadão, agradecendo pelas conquistas e pela mente renovada.',
        location: 'Orla de Ipanema/Copacabana',
        completed: false
      }
    ]
  },
  {
    id: 'day-7',
    dayNumber: 7,
    dayOfWeek: 'Segunda-feira',
    date: '28/09/2026',
    title: 'Retorno Triunfal a Itapeva',
    badge: 'Missão Cumprida',
    badgeColor: 'ocean',
    quote: 'A fênix renasceu. Voltando para casa mais forte, mais lúcido e soberano.',
    activities: [
      {
        id: 'd7-a1',
        period: 'Manhã',
        title: 'Mergulho de Despedida no Mar Carioca',
        description: 'Último mergulho revigorante nas águas salgadas do Rio, caminhada descalço na areia e compra de lembranças.',
        location: 'Praia de Ipanema / Copacabana',
        completed: false
      },
      {
        id: 'd7-a2',
        period: 'Tarde',
        title: 'Check-out do Hostel & Almoço',
        description: 'Organizar mochila com todas as conquistas e itens de sobrevivência. Check-out até o meio-dia.',
        location: 'Social Hostel',
        completed: false
      },
      {
        id: 'd7-a3',
        period: 'Fim do Dia',
        title: 'Embarque na Rodoviária Novo Rio ➡️ Retorno',
        description: 'Deslocamento pontual para a rodoviária. Viagem de ônibus confortável de volta para Itapeva/SP.',
        location: 'Rodoviária Novo Rio ➡️ SP',
        completed: false
      }
    ]
  }
];

export const INITIAL_BUDGET = [
  {
    id: 'b-passagens',
    category: 'Passagens (Ônibus)',
    description: 'Ônibus SP ➡️ RJ (Ida e Volta - Cometa / 1001)',
    estimated: 500,
    actual: 0,
    status: 'Pendente',
    icon: 'Bus',
    isOptional: false
  },
  {
    id: 'b-hospedagem',
    category: 'Hospedagem',
    description: '6 Noites em Social Hostel (Média R$ 80/dia - Ipanema/Botafogo)',
    estimated: 480,
    actual: 0,
    status: 'Pendente',
    icon: 'Bed',
    isOptional: false
  },
  {
    id: 'b-alimentacao',
    category: 'Alimentação Saudável',
    description: 'PFs nutritivos, frutas, quiosques, sucos (~R$ 130/dia)',
    estimated: 910,
    actual: 0,
    status: 'Planejado',
    icon: 'Utensils',
    isOptional: false
  },
  {
    id: 'b-transporte',
    category: 'Transporte Local',
    description: 'Uber/99, Metrô Carioca, VLT e Mototáxi no Vidigal',
    estimated: 200,
    actual: 0,
    status: 'Planejado',
    icon: 'Navigation',
    isOptional: false
  },
  {
    id: 'b-passeios',
    category: 'Passeios & Lazer',
    description: 'Aluguel Bike Itaú, ingressos, água de coco, museus',
    estimated: 350,
    actual: 0,
    status: 'Planejado',
    icon: 'Compass',
    isOptional: false
  },
  {
    id: 'b-asadelta',
    category: 'Asa Delta (Voo Livre)',
    description: 'Salto duplo com instrutor da Pedra Bonita + fotos/vídeo',
    estimated: 900,
    actual: 0,
    status: 'Pendente',
    icon: 'Wind',
    isOptional: true
  },
  {
    id: 'b-guia',
    category: 'Guia Pedra da Gávea',
    description: 'Guia credenciado com equipamento para Carrasqueira',
    estimated: 150,
    actual: 0,
    status: 'Pendente',
    icon: 'Mountain',
    isOptional: true
  }
];

export const INITIAL_CHECKLIST = [
  {
    id: 'chk-1',
    category: 'Transporte & Hospedagem',
    title: 'Comprar passagens de ônibus (Viação Cometa / 1001)',
    completed: false
  },
  {
    id: 'chk-2',
    category: 'Transporte & Hospedagem',
    title: 'Reservar hospedagem (Social Hostel em Ipanema ou Botafogo)',
    completed: false
  },
  {
    id: 'chk-3',
    category: 'Segurança & Sobrevivência',
    title: 'Comprar Doleira antifurto (usar por baixo da bermuda)',
    completed: false
  },
  {
    id: 'chk-4',
    category: 'Segurança & Sobrevivência',
    title: 'Comprar Capinha de celular à prova d\'água (com cordão reforçado)',
    completed: false
  },
  {
    id: 'chk-5',
    category: 'Equipamento & Vestuário',
    title: 'Separar tênis de trilha com boa aderência (grip para pedras úmidas)',
    completed: false
  },
  {
    id: 'chk-6',
    category: 'Equipamento & Vestuário',
    title: 'Roupas esportivas leves (dry-fit, sunga/bermuda, toalha de secagem rápida)',
    completed: false
  },
  {
    id: 'chk-7',
    category: 'Logística & Digital',
    title: 'Baixar mapas offline do Rio de Janeiro no Google Maps',
    completed: false
  },
  {
    id: 'chk-8',
    category: 'Logística & Digital',
    title: 'Fazer orçamento e separar reserva financeira no Pix e cartão seguro',
    completed: false
  },
  {
    id: 'chk-9',
    category: 'Equipamento & Vestuário',
    title: 'Mochila de ataque leve (15-20L) com garrafa de água térmica e protetor solar',
    completed: false
  }
];

export const INITIAL_RESOURCES = [
  {
    id: 'res-1',
    title: 'Passagem de Ônibus (Ida SP ➡️ RJ)',
    description: 'Viação Cometa / 1001 / Buser para Rodoviária Novo Rio',
    url: 'https://www.viacaocometa.com.br',
    category: 'Passagens',
    icon: 'Ticket'
  },
  {
    id: 'res-2',
    title: 'Passagem de Ônibus (Volta RJ ➡️ SP)',
    description: 'Retorno seguro para Itapeva / São Paulo',
    url: 'https://www.autoviacao1001.com.br',
    category: 'Passagens',
    icon: 'Ticket'
  },
  {
    id: 'res-3',
    title: 'Hospedagem (Social Hostel)',
    description: 'Foco em Ipanema ou Botafogo no Booking ou Hostelworld',
    url: 'https://www.hostelworld.com',
    category: 'Hospedagem',
    icon: 'Bed'
  },
  {
    id: 'res-4',
    title: 'Agendamento Voo Livre (Pedra Bonita)',
    description: 'Instrutores certificados pelo Clube São Conrado de Voo Livre (CSCVL)',
    url: 'https://www.cscvl.com.br',
    category: 'Aventura',
    icon: 'Wind'
  },
  {
    id: 'res-5',
    title: 'Guia Trilha da Pedra da Gávea',
    description: 'Guias certificados ICMBio para escalada da Carrasqueira',
    url: 'https://trilhasnorio.com.br',
    category: 'Aventura',
    icon: 'Mountain'
  }
];
