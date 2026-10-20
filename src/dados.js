const capa = (cor, texto) =>
  `https://placehold.co/600x800/${cor}/ffffff/png?text=${encodeURIComponent(texto)}`;

const jogos = [
  {
    id: 1,
    titulo: 'Cyberpunk 2077',
    preco: 199.9,
    genero: 'RPG, Ação',
    descricao:
      'Explore Night City, uma metrópole futurista obcecada por poder, tecnologia e estilo. Jogue como V, um mercenário em busca de um implante capaz de garantir a imortalidade, e tome decisões que mudam a história.',
    imagemCapa: capa('064e3b', 'Cyberpunk 2077'),
    destaque: true,
  },
  {
    id: 2,
    titulo: 'Elden Ring',
    preco: 249.9,
    genero: 'RPG, Souls-like',
    descricao:
      'Percorra as Terras Intermédias, um vasto mundo aberto criado em parceria entre FromSoftware e George R. R. Martin. Combates desafiadores, chefes monumentais e muita liberdade de exploração.',
    imagemCapa: capa('2a3a52', 'Elden Ring'),
    destaque: false,
  },
  {
    id: 3,
    titulo: 'God of War',
    preco: 149.9,
    genero: 'Ação, Aventura',
    descricao:
      'Kratos vive agora no reino da mitologia nórdica, ao lado do filho Atreus. Uma jornada emocionante, com combate brutal e uma história sobre ser pai e deixar o passado para trás.',
    imagemCapa: capa('522a2a', 'God of War'),
    destaque: false,
  },
  {
    id: 4,
    titulo: 'GTA V',
    preco: 99.9,
    genero: 'Ação, Mundo Aberto',
    descricao:
      'Viva a vida de três criminosos muito diferentes na cidade de Los Santos. Assalte, dirija, explore e aproveite um dos mundos abertos mais completos já criados, com modo online incluso.',
    imagemCapa: capa('3b2a52', 'GTA V'),
    destaque: false,
  },
  {
    id: 5,
    titulo: 'Forza Horizon 5',
    preco: 249.9,
    genero: 'Corrida',
    descricao:
      'Dirija carros incríveis pelos cenários vibrantes do México. Participe de corridas, festivais e desafios em um mundo aberto cheio de estradas, desertos, selvas e vulcões.',
    imagemCapa: capa('52422a', 'Forza Horizon 5'),
    destaque: false,
  },
  {
    id: 6,
    titulo: 'Stardew Valley',
    preco: 24.99,
    genero: 'Simulação, Indie',
    descricao:
      'Herde a antiga fazenda do seu avô e transforme-a num lar próspero. Plante, colha, crie animais, pesque, explore minas e faça amizade com os moradores da cidade.',
    imagemCapa: capa('2a5238', 'Stardew Valley'),
    destaque: false,
  },
];

export default jogos;