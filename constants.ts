import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Karakou Moderne Velours',
    category: 'Femme',
    price: 28000,
    description: 'Veste traditionnelle algéroise revisitée avec une coupe moderne en velours noir et broderie dorée.',
    image: 'https://picsum.photos/400/400?random=1',
    stock: 10,
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: '2',
    name: 'Burnous Homme Laine',
    category: 'Homme',
    price: 18000,
    description: 'Burnous authentique en laine pure, idéal pour les grandes occasions et l\'hiver.',
    image: 'https://picsum.photos/400/400?random=2',
    stock: 15,
    sizes: ['M', 'L', 'XL']
  },
  {
    id: '3',
    name: 'Robe Kabyle Traditionnelle',
    category: 'Femme',
    price: 12500,
    description: 'Robe colorée aux motifs berbères, livrée avec sa fouta assortie.',
    image: 'https://picsum.photos/400/400?random=3',
    stock: 8,
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '4',
    name: 'Sahara Élixir Visage',
    category: 'Cosmétique',
    price: 2200,
    description: 'Sérum hydratant à base d\'huile de pépins de figue de barbarie bio.',
    image: 'https://picsum.photos/400/400?random=4',
    stock: 50,
  },
  {
    id: '5',
    name: 'Chemise Lin Oasis',
    category: 'Homme',
    price: 4500,
    description: 'Chemise décontractée en lin léger, parfaite pour l\'été algérien.',
    image: 'https://picsum.photos/400/400?random=5',
    stock: 25,
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: '6',
    name: 'Savon Noir Eucalyptus',
    category: 'Cosmétique',
    price: 800,
    description: 'Exfoliant naturel traditionnel pour le hammam, enrichi à l\'huile essentielle d\'eucalyptus.',
    image: 'https://picsum.photos/400/400?random=6',
    stock: 100,
  },
  {
    id: '7',
    name: 'Blouza Oranaise Soie',
    category: 'Femme',
    price: 32000,
    description: 'Magnifique blouza en soie ornée de perles, l\'élégance de l\'ouest algérien.',
    image: 'https://picsum.photos/400/400?random=7',
    stock: 4,
    sizes: ['M', 'L', 'XL']
  },
  {
    id: '8',
    name: 'Qamis Premium',
    category: 'Homme',
    price: 6000,
    description: 'Qamis élégant en tissu respirant de haute qualité.',
    image: 'https://picsum.photos/400/400?random=8',
    stock: 20,
    sizes: ['S', 'M', 'L', 'XL']
  }
];