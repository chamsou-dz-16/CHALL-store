
import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '9',
    name: 'Sac à Dos Voyage Multifonction',
    category: 'Accessoires',
    price: 6500,
    description: 'Sac à dos extensible, imperméable, compartiment PC, port USB et dos respirant. Idéal pour voyages et travail.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80',
    stock: 12,
    video: 'https://assets.mixkit.co/videos/preview/mixkit-man-packing-a-travel-backpack-42944-large.mp4',
    rating: 4.7,
    reviews: 156,
    discount: 20
  },
  {
    id: '10',
    name: 'Set Pinceaux Maquillage (13 Pcs)',
    category: 'Cosmétique',
    price: 2800,
    description: 'Kit complet de 13 pinceaux doux avec pochette de rangement en velours. Qualité premium pour un maquillage parfait.',
    image: 'https://img.kwcdn.com/product/open/bd883c57bc1f4b52ba2868316326b01d-goods.jpeg?imageView2/2/w/800/q/70/format/avif',
    gallery: [
      'https://img.kwcdn.com/product/open/bd883c57bc1f4b52ba2868316326b01d-goods.jpeg?imageView2/2/w/800/q/70/format/avif',
      'https://img.kwcdn.com/product/fancy/eff29134-07b9-4d4b-afb0-3292d82214cd.jpg?imageView2/2/w/800/q/70/format/avif',
      'https://img.kwcdn.com/product/fancy/329f85df-4ebd-4214-a9fa-59a5c035906a.jpg?imageView2/2/w/800/q/70/format/avif',
      'https://img.kwcdn.com/product/open/923208660c57437885000a6081b484d2-goods.jpeg?imageView2/2/w/800/q/70/format/avif'
    ],
    stock: 30,
    video: 'https://assets.mixkit.co/videos/preview/mixkit-make-up-brushes-with-powder-explosion-slow-motion-23058-large.mp4',
    rating: 4.9,
    reviews: 890,
    discount: 30
  },
  {
    id: '11',
    name: 'Sac à Dos Voyage Grande Capacité',
    category: 'Accessoires',
    price: 7900,
    description: 'Sac à dos de voyage grande capacité approuvé par les compagnies aériennes avec compartiment pour ordinateur portable de 40,64 cm, poche à chaussures et organisateur multi-poches.',
    image: 'https://img.kwcdn.com/product/fancy/2931083a-7ade-4674-ae59-d9d552c4a433.jpg?imageView2/2/w/800/q/70/format/avif',
    gallery: [
      'https://img.kwcdn.com/product/fancy/2931083a-7ade-4674-ae59-d9d552c4a433.jpg?imageView2/2/w/800/q/70/format/avif',
      'https://img.kwcdn.com/product/fancy/991ac217-6d23-49dc-b898-b02fe57f6615.jpg?imageView2/2/w/800/q/70/format/avif',
      'https://img.kwcdn.com/product/fancy/6b335669-fc8f-4a6d-9cf3-77dbef9a2b85.jpg?imageView2/2/w/800/q/70/format/avif',
      'https://img.kwcdn.com/product/fancy/b62963a9-4a8b-476f-859d-e47db08e6e90.jpg?imageView2/2/w/800/q/70/format/avif',
      'https://img.kwcdn.com/product/fancy/76e3a8a8-333c-4952-966c-fb04dc3fc5b7.jpg?imageView2/2/w/800/q/70/format/avif',
      'https://img.kwcdn.com/product/fancy/e21ec7a5-3baa-426b-9d5b-0b05a8419e68.jpg?imageView2/2/w/800/q/70/format/avif',
      'https://img.kwcdn.com/product/fancy/00f96a84-e47f-449c-bb17-73b146cfa707.jpg?imageView2/2/w/800/q/70/format/avif'
    ],
    stock: 15,
    rating: 4.8,
    reviews: 76
  },
  {
    id: '12',
    name: 'Ensemble Sport Décontracté Homme',
    category: 'Homme',
    price: 5800,
    description: 'Ensemble coordonné t-shirt et short avec logo tendance. Design moderne, tissu confortable et respirant pour un look décontracté au quotidien.',
    image: 'https://img.kwcdn.com/product/fancy/da476c45-99d0-4d3e-b826-f51b0a10929a.jpg?imageView2/2/w/800/q/70/format/avif',
    stock: 25,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.5,
    reviews: 45
  },
  {
    id: '13',
    name: 'Robe de Soirée Sirène Asymétrique',
    category: 'Femme',
    price: 8900,
    description: 'Robe élégante sans bretelles avec fente asymétrique et traîne. Coupe sirène flatteuse, parfaite pour les mariages, soirées et occasions spéciales.',
    image: 'https://img.kwcdn.com/product/fancy/ac36567c-cc8d-4caf-9722-46cd568c8e17.jpg?imageView2/2/w/800/q/70/format/avif',
    stock: 10,
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviews: 112,
    discount: 10
  },
  {
    id: '14',
    name: 'Ensemble Sweat à Capuche 3 Pièces',
    category: 'Femme',
    price: 5200,
    description: 'Ensemble décontracté oversize 3 pièces comprenant un sweat à capuche, un haut et un pantalon. Confort absolu et style urbain pour le quotidien.',
    image: 'https://img.kwcdn.com/product/fancy/7d497a6a-c916-4993-9ed0-3f2750e60e19.jpg?imageView2/2/w/800/q/70/format/avif',
    stock: 20,
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.6,
    reviews: 67
  },
  {
    id: '15',
    name: 'Robe Bleu Marine Manches Bouffantes',
    category: 'Femme',
    price: 7800,
    description: 'Robe longue élégante d\'inspiration arabe avec manches bouffantes et taille smockée. Idéale pour les mariages et les grandes occasions.',
    image: 'https://img.kwcdn.com/product/fancy/6876c357-f05c-4980-abd1-9e64a6298a8f.jpg?imageView2/2/w/800/q/70/format/avif',
    stock: 12,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 5.0,
    reviews: 33
  },
  {
    id: '16',
    name: 'Pull Décontracté Col Rond',
    category: 'Femme',
    price: 2500,
    description: 'Pull femme doux et confortable pour l\'automne/hiver, texture sophistiquée et coupe décontractée.',
    image: 'https://img.kwcdn.com/product/fmket/0b7cefdba3c90e708d27211fd65731ad.jpg?imageView2/2/w/800/q/70/format/avif',
    stock: 40,
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.4,
    reviews: 85,
    discount: 25
  },
  {
    id: '17',
    name: 'Pull Feuilles Élégant',
    category: 'Femme',
    price: 2800,
    description: 'Haut à manches longues avec imprimé feuilles vibrant, tissu extensible et doux pour un look automnal chic.',
    image: 'https://img.kwcdn.com/product/fancy/6d1e5757-a584-4b35-bed6-29800df7679b.jpg?imageView2/2/w/800/q/70/format/avif',
    stock: 35,
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.7,
    reviews: 120,
    discount: 15
  },
  {
    id: '18',
    name: 'Robe Été Florale',
    category: 'Femme',
    price: 3500,
    description: 'Robe légère à bretelles fines avec imprimé floral, idéale pour les journées ensoleillées et les vacances.',
    image: 'https://img.kwcdn.com/product/fancy/f9d85dc9-10cd-4e7c-9bf9-8b25e001ff69.jpg?imageView2/2/w/800/q/70/format/avif',
    stock: 20,
    sizes: ['S', 'M', 'L'],
    rating: 4.6,
    reviews: 94
  },
  {
    id: '19',
    name: 'Set Crayons Lèvres (12 pcs)',
    category: 'Cosmétique',
    price: 1200,
    description: 'Ensemble de 12 crayons à lèvres mats velours, couleurs variées et texture hydratante longue tenue.',
    image: 'https://img.kwcdn.com/product/fancy/1c73b8af-1b1f-48d2-837e-e296ff024676.jpg?imageView2/2/w/800/q/70/format/avif',
    stock: 60,
    rating: 4.8,
    reviews: 430,
    discount: 40
  },
  {
    id: '20',
    name: 'Ensemble Sport Homme Hiver',
    category: 'Homme',
    price: 6500,
    description: 'Veste à capuche et pantalon sportswear avec motif géométrique, tissu résistant pour l\'automne/hiver.',
    image: 'https://img.kwcdn.com/product/fancy/125b0960-0ca2-46b2-9c93-8d0d2228dc22.jpg?imageView2/2/w/800/q/70/format/avif',
    stock: 18,
    sizes: ['M', 'L', 'XL', 'XXL'],
    rating: 4.5,
    reviews: 78
  },
  {
    id: '21',
    name: 'Bottines Chic Talon Épais',
    category: 'Femme',
    price: 4200,
    description: 'Bottines modernes à talon épais avec fermeture éclair arrière, confortables et élégantes pour toutes occasions.',
    image: 'https://img.kwcdn.com/product/fancy/b8e09a80-150b-4f52-a399-9e6189d7a990.jpg?imageView2/2/w/800/q/70/format/avif',
    stock: 15,
    sizes: ['36', '37', '38', '39', '40'],
    rating: 4.7,
    reviews: 156,
    discount: 10
  },
  {
    id: '22',
    name: 'Lot 4 Montres Homme',
    category: 'Accessoires',
    price: 3800,
    description: 'Ensemble de 4 montres à quartz avec bracelets en PU et métal, style professionnel et décontracté.',
    image: 'https://img.kwcdn.com/product/fancy/407a41be-326f-4ef9-8ae1-6668b80b137e.jpg?imageView2/2/w/800/q/70/format/avif',
    stock: 25,
    rating: 4.3,
    reviews: 65,
    discount: 20
  },
  {
    id: '23',
    name: 'Abaya Arabe Élégante',
    category: 'Femme',
    price: 5500,
    description: 'Robe Abaya longue et ample, tissu fluide non extensible, parfaite pour les événements et le quotidien.',
    image: 'https://img.kwcdn.com/product/fancy/0caa7022-d5fc-4a13-98ac-a3e707ef2369.jpg?imageView2/2/w/800/q/70/format/avif',
    stock: 12,
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    rating: 4.9,
    reviews: 210
  },
  {
    id: '24',
    name: 'Montre Homme Tendance Sportive',
    category: 'Accessoires',
    price: 2800,
    description: 'Montre électronique multifonction pour homme. Design sportif haut de gamme, étanche, avec réveil et affichage LED. Technologie noire tendance.',
    image: 'https://img.kwcdn.com/product/fancy/919fec31-fba0-4f6f-a2c0-a019e36ebf1f.jpg',
    gallery: [
      'https://img.kwcdn.com/product/fancy/919fec31-fba0-4f6f-a2c0-a019e36ebf1f.jpg',
      'https://img.kwcdn.com/product/fancy/957afd7e-6e90-4285-9130-f372f253cd11.jpg?imageView2/2/w/800/q/70/format/avif',
      'https://img.kwcdn.com/product/fancy/d28e6df1-d805-4a30-b233-de6b0c8825a8.jpg?imageView2/2/w/800/q/70/format/avif'
    ],
    video: 'https://goods-vod.kwcdn.com/goods-video/202a0ed7419bd6c7024c56865b72af2a650048eb.f30.mp4',
    stock: 50,
    rating: 4.8,
    reviews: 42,
    discount: 20
  }
];
