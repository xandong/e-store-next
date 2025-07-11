export const DEFAULT_CATEGORIES = [
  { name: "Masculino", slug: "masculino" },
  { name: "Feminino", slug: "feminino" },
  { name: "Infantil", slug: "infantil" },
  { name: "Moda Praia", slug: "moda-praia" },
  { name: "Moda Fitness", slug: "moda-fitness" },
  { name: "Casual & Streetwear", slug: "casual-e-streetwear" },
  { name: "Bolsas & Mochilas", slug: "bolsas-e-mochilas" },
  { name: "Acessórios & Calçados", slug: "acessorios-e-calcados" }
]

export const DEFAULT_PRODUCTS_BY_CATEGORY = [
  {
    masculino: [
      {
        id: "550e8400-e29b-41d4-a716-446655440001",
        title: "Camiseta Polo Masculina Lacoste",
        slug: "camiseta-polo-masculina-lacoste",
        price: 29900,
        description:
          "Camiseta polo em algodão pima, ideal para looks casuais elegantes.",
        images: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLB98765432109_052023-F.jpg"
        ],
        externalId: null,
        categoryId: 1,
        createdAt: new Date()
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440002",
        title: "Calça Jeans Slim Aramis",
        slug: "calca-jeans-slim-aramis",
        price: 19990,
        description: "Calça jeans masculina slim fit, confortável e versátil.",
        images: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLB98765432109_052023-F.jpg"
        ],
        externalId: null,
        categoryId: 1,
        createdAt: new Date()
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440003",
        title: "Tênis Casual Nike Air",
        slug: "tenis-casual-nike-air",
        price: 39990,
        description:
          "Tênis casual masculino com amortecimento Air, perfeito para o dia a dia.",
        images: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLB98765432109_052023-F.jpg"
        ],
        externalId: null,
        categoryId: 1,
        createdAt: new Date()
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440004",
        title: "Jaqueta Corta Vento Adidas",
        slug: "jaqueta-corta-vento-adidas",
        price: 24990,
        description:
          "Jaqueta leve e resistente, ideal para atividades ao ar livre.",
        images: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLB98765432109_052023-F.jpg"
        ],
        externalId: null,
        categoryId: 1,
        createdAt: new Date()
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440005",
        title: "Bermuda Cargo TACO",
        slug: "bermuda-cargo-taco",
        price: 12990,
        description:
          "Bermuda cargo masculina, prática e estilosa para looks casuais.",
        images: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLB98765432109_052023-F.jpg"
        ],
        externalId: null,
        categoryId: 1,
        createdAt: new Date()
      }
    ]
  },
  {
    feminino: [
      {
        id: "550e8400-e29b-41d4-a716-446655440006",
        title: "Vestido Floral Dress To",
        slug: "vestido-floral-dress-to",
        price: 18990,
        description:
          "Vestido floral leve, perfeito para ocasiões casuais e elegantes.",
        images: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLB98765432109_052023-F.jpg"
        ],
        externalId: null,
        categoryId: 2,
        createdAt: new Date()
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440007",
        title: "Sandália Salto Alto Vizzano",
        slug: "sandalia-salto-alto-vizzano",
        price: 14990,
        description:
          "Sandália de salto alto, elegante e confortável para eventos.",
        images: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLB98765432109_052023-F.jpg"
        ],
        externalId: null,
        categoryId: 2,
        createdAt: new Date()
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440008",
        title: "Calça Jeans Mom Zattini",
        slug: "calca-jeans-mom-zattini",
        price: 15990,
        description:
          "Calça jeans mom fit, moderna e confortável para o dia a dia.",
        images: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLB98765432109_052023-F.jpg"
        ],
        externalId: null,
        categoryId: 2,
        createdAt: new Date()
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440009",
        title: "Blusa de Manga Bufante Marisa",
        slug: "blusa-manga-bufante-marisa",
        price: 7990,
        description: "Blusa com mangas bufantes, ideal para looks românticos.",
        images: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLB98765432109_052023-F.jpg"
        ],
        externalId: null,
        categoryId: 2,
        createdAt: new Date()
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440010",
        title: "Bolsa Tote Santa Lolla",
        slug: "bolsa-tote-santa-lolla",
        price: 19990,
        description:
          "Bolsa tote espaçosa, perfeita para o trabalho ou viagens.",
        images: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLB98765432109_052023-F.jpg"
        ],
        externalId: null,
        categoryId: 2,
        createdAt: new Date()
      }
    ]
  },
  {
    infantil: [
      {
        id: "550e8400-e29b-41d4-a716-446655440011",
        title: "Conjunto Infantil Dinossauros",
        slug: "conjunto-infantil-dinossauros",
        price: 9990,
        description: "Conjunto de camiseta e short com estampa de dinossauros.",
        images: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLB98765432109_052023-F.jpg"
        ],
        externalId: null,
        categoryId: 3,
        createdAt: new Date()
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440012",
        title: "Tênis Infantil Feminino Fila",
        slug: "tenis-infantil-feminino-fila",
        price: 12990,
        description: "Tênis leve e colorido, ideal para crianças ativas.",
        images: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLB98765432109_052023-F.jpg"
        ],
        externalId: null,
        categoryId: 3,
        createdAt: new Date()
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440013",
        title: "Mochila Infantil Puket",
        slug: "mochila-infantil-puket",
        price: 8990,
        description: "Mochila escolar divertida e funcional para crianças.",
        images: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLB98765432109_052023-F.jpg"
        ],
        externalId: null,
        categoryId: 3,
        createdAt: new Date()
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440014",
        title: "Vestido Infantil Estampado",
        slug: "vestido-infantil-estampado",
        price: 7990,
        description: "Vestido leve com estampa floral, perfeito para festas.",
        images: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLB98765432109_052023-F.jpg"
        ],
        externalId: null,
        categoryId: 3,
        createdAt: new Date()
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440015",
        title: "Macacão Bebê Plush",
        slug: "macacao-bebe-plush",
        price: 6990,
        description: "Macacão quentinho e confortável para bebês.",
        images: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLB98765432109_052023-F.jpg"
        ],
        externalId: null,
        categoryId: 3,
        createdAt: new Date()
      }
    ]
  },
  {
    modaPraia: [
      {
        id: "550e8400-e29b-41d4-a716-446655440016",
        title: "Biquíni Estampado 2025",
        slug: "biquini-estampado-2025",
        price: 11990,
        description:
          "Biquíni com estampa tropical, tendência para o verão 2025.",
        images: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLB98765432109_052023-F.jpg"
        ],
        externalId: null,
        categoryId: 4,
        createdAt: new Date()
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440017",
        title: "Maiô com Recorte Marisa",
        slug: "maio-com-recorte-marisa",
        price: 13990,
        description: "Maiô elegante com recortes laterais, ideal para a praia.",
        images: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLB98765432109_052023-F.jpg"
        ],
        externalId: null,
        categoryId: 4,
        createdAt: new Date()
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440018",
        title: "Saída de Praia Zattini",
        slug: "saida-de-praia-zattini",
        price: 9990,
        description: "Saída de praia leve e fluida, perfeita para o verão.",
        images: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLB98765432109_052023-F.jpg"
        ],
        externalId: null,
        categoryId: 4,
        createdAt: new Date()
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440019",
        title: "Sunga Masculina TACO",
        slug: "sunga-masculina-taco",
        price: 7990,
        description: "Sunga confortável com estampa moderna para a praia.",
        images: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLB98765432109_052023-F.jpg"
        ],
        externalId: null,
        categoryId: 4,
        createdAt: new Date()
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440020",
        title: "Chinelo Ipanema Praia",
        slug: "chinelo-ipanema-praia",
        price: 4990,
        description: "Chinelo leve e colorido, ideal para a praia.",
        images: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLB98765432109_052023-F.jpg"
        ],
        externalId: null,
        categoryId: 4,
        createdAt: new Date()
      }
    ]
  },
  {
    modaFitness: [
      {
        id: "550e8400-e29b-41d4-a716-446655440021",
        title: "Legging Fitness Nike",
        slug: "legging-fitness-nike",
        price: 17990,
        description: "Legging de alta compressão, ideal para treinos intensos.",
        images: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLB98765432109_052023-F.jpg"
        ],
        externalId: null,
        categoryId: 5,
        createdAt: new Date()
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440022",
        title: "Top Esportivo Adidas",
        slug: "top-esportivo-adidas",
        price: 9990,
        description: "Top esportivo com suporte para atividades físicas.",
        images: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLB98765432109_052023-F.jpg"
        ],
        externalId: null,
        categoryId: 5,
        createdAt: new Date()
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440023",
        title: "Tênis Esportivo Olympikus",
        slug: "tenis-esportivo-olympikus",
        price: 19990,
        description: "Tênis com amortecimento para corrida e academia.",
        images: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLB98765432109_052023-F.jpg"
        ],
        externalId: null,
        categoryId: 5,
        createdAt: new Date()
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440024",
        title: "Short Fitness Fila",
        slug: "short-fitness-fila",
        price: 8990,
        description: "Short leve e confortável para treinos.",
        images: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLB98765432109_052023-F.jpg"
        ],
        externalId: null,
        categoryId: 5,
        createdAt: new Date()
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440025",
        title: "Mochila Esportiva Nike",
        slug: "mochila-esportiva-nike",
        price: 14990,
        description: "Mochila com compartimento para tênis e roupas de treino.",
        images: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLB98765432109_052023-F.jpg"
        ],
        externalId: null,
        categoryId: 5,
        createdAt: new Date()
      }
    ]
  },
  {
    casualEStreetwear: [
      {
        id: "550e8400-e29b-41d4-a716-446655440026",
        title: "Camiseta Estampada Reversa",
        slug: "camiseta-estampada-reversa",
        price: 7990,
        description:
          "Camiseta com estampa alternativa, ideal para looks streetwear.",
        images: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLB98765432109_052023-F.jpg"
        ],
        externalId: null,
        categoryId: 6,
        createdAt: new Date()
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440027",
        title: "Calça Jogger TACO",
        slug: "calca-jogger-taco",
        price: 12990,
        description: "Calça jogger confortável para um visual urbano.",
        images: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLB98765432109_052023-F.jpg"
        ],
        externalId: null,
        categoryId: 6,
        createdAt: new Date()
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440028",
        title: "Tênis Chunky Passarela",
        slug: "tenis-chunky-passarela",
        price: 15990,
        description: "Tênis chunky, tendência para looks streetwear.",
        images: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLB98765432109_052023-F.jpg"
        ],
        externalId: null,
        categoryId: 6,
        createdAt: new Date()
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440029",
        title: "Jaqueta Jeans Hering",
        slug: "jaqueta-jeans-hering",
        price: 19990,
        description: "Jaqueta jeans oversized, perfeita para o estilo casual.",
        images: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLB98765432109_052023-F.jpg"
        ],
        externalId: null,
        categoryId: 6,
        createdAt: new Date()
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440030",
        title: "Boné OriginalCap",
        slug: "bone-originalcap",
        price: 6990,
        description: "Boné estiloso, ideal para complementar looks urbanos.",
        images: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLB98765432109_052023-F.jpg"
        ],
        externalId: null,
        categoryId: 6,
        createdAt: new Date()
      }
    ]
  },
  {
    bolsasEMochilas: [
      {
        id: "550e8400-e29b-41d4-a716-446655440031",
        title: "Bolsa Tiracolo Colcci",
        slug: "bolsa-tiracolo-colcci",
        price: 22990,
        description: "Bolsa tiracolo versátil, ideal para o dia a dia.",
        images: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLB98765432109_052023-F.jpg"
        ],
        externalId: null,
        categoryId: 7,
        createdAt: new Date()
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440032",
        title: "Mochila Executiva Dafiti",
        slug: "mochila-executiva-dafiti",
        price: 24990,
        description:
          "Mochila com compartimento para notebook, perfeita para trabalho.",
        images: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLB98765432109_052023-F.jpg"
        ],
        externalId: null,
        categoryId: 7,
        createdAt: new Date()
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440033",
        title: "Bolsa Saco Studio Z",
        slug: "bolsa-saco-studio-z",
        price: 17990,
        description: "Bolsa saco em ráfia, tendência para looks casuais.",
        images: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLB98765432109_052023-F.jpg"
        ],
        externalId: null,
        categoryId: 7,
        createdAt: new Date()
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440034",
        title: "Clutch Jorge Bischoff",
        slug: "clutch-jorge-bischoff",
        price: 29990,
        description: "Clutch elegante para eventos especiais.",
        images: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLB98765432109_052023-F.jpg"
        ],
        externalId: null,
        categoryId: 7,
        createdAt: new Date()
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440035",
        title: "Mochila Casual Cavalera",
        slug: "mochila-casual-cavalera",
        price: 19990,
        description: "Mochila estilosa para uso diário ou viagens.",
        images: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLB98765432109_052023-F.jpg"
        ],
        externalId: null,
        categoryId: 7,
        createdAt: new Date()
      }
    ]
  },
  {
    acessoriosECalcados: [
      {
        id: "550e8400-e29b-41d4-a716-446655440036",
        title: "Óculos de Sol Ray-Ban",
        slug: "oculos-de-sol-ray-ban",
        price: 49990,
        description: "Óculos de sol unissex com design clássico.",
        images: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLB98765432109_052023-F.jpg"
        ],
        externalId: null,
        categoryId: 8,
        createdAt: new Date()
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440037",
        title: "Cinto Masculino Aramis",
        slug: "cinto-masculino-aramis",
        price: 9990,
        description: "Cinto de couro legítimo, ideal para looks formais.",
        images: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLB98765432109_052023-F.jpg"
        ],
        externalId: null,
        categoryId: 8,
        createdAt: new Date()
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440038",
        title: "Pulseira Feminina Dazzeli",
        slug: "pulseira-feminina-dazzeli",
        price: 5990,
        description: "Pulseira delicada em aço titânio, não enferruja.",
        images: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLB98765432109_052023-F.jpg"
        ],
        externalId: null,
        categoryId: 8,
        createdAt: new Date()
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440039",
        title: "Sapatilha Via Marte",
        slug: "sapatilha-via-marte",
        price: 12990,
        description: "Sapatilha confortável para o dia a dia.",
        images: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLB98765432109_052023-F.jpg"
        ],
        externalId: null,
        categoryId: 8,
        createdAt: new Date()
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440040",
        title: "Relógio Masculino Quartz",
        slug: "relogio-masculino-quartz",
        price: 24990,
        description:
          "Relógio analógico com pulseira de couro, resistente à água.",
        images: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLB45678912345_042023-F.jpg",
          "https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLB98765432109_052023-F.jpg"
        ],
        externalId: null,
        categoryId: 8,
        createdAt: new Date()
      }
    ]
  }
]
