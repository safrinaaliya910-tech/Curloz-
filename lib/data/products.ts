export type ProductType = 'shampoo' | 'conditioner' | 'treatment';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  type: ProductType;
  price: number;
  size: string;
  description: string;
  imagePath: string;
  bottleColor: string;
  capColor: string;
  ingredients: string[];
  benefits: string[];
}

export const products: Product[] = [
  {
    id: 'shampoo-moisturizing',
    name: 'SHAMPOO',
    subtitle: 'Moisturizing & Defining',
    type: 'shampoo',
    price: 38,
    size: '8 fl oz / 236 ml',
    description: 'A sulfate-free, deeply hydrating lather that gently cleanses without stripping natural oils. Formulated to enhance curl pattern and deliver lasting moisture.',
    imagePath: '/images/products/curloz-shampoo-bottle.png',
    bottleColor: '#FFFFFF',
    capColor: '#B8722D',
    ingredients: ['Argan Oil', 'Aloe Vera', 'Hydrolyzed Silk Protein', 'Rosemary Extract'],
    benefits: ['Gently cleanses', 'Restores moisture', 'Enhances natural curl pattern', 'Safe for color-treated hair']
  },
  {
    id: 'conditioner-nourishing',
    name: 'CONDITIONER',
    subtitle: 'Nourishing & Detangling',
    type: 'conditioner',
    price: 42,
    size: '8 fl oz / 236 ml',
    description: 'A rich, slip-enhancing conditioner that effortlessly detangles and deeply nourishes every strand, leaving curls defined, soft, and remarkably shiny.',
    imagePath: '/images/products/curloz-conditioner-bottle.png',
    bottleColor: '#FFFFFF',
    capColor: '#B8722D',
    ingredients: ['Shea Butter', 'Jojoba Oil', 'Vitamin E', 'Coconut Water'],
    benefits: ['Superior slip for easy detangling', 'Deeply hydrates and softens', 'Reduces frizz', 'Adds luminous shine']
  },
  {
    id: 'curl-cream-ultra',
    name: 'CURL CREAM',
    subtitle: 'Ultra-Defining',
    type: 'treatment',
    price: 48,
    size: '6 oz / 177 ml',
    description: 'Our signature rich, velvety cream that locks in moisture, provides touchable hold, and defines curls with an ultra-luxurious finish.',
    imagePath: '/images/products/curloz-curl-cream-jar.png',
    bottleColor: '#0D0B08', // Black jar
    capColor: '#0D0B08',   // Black cap
    ingredients: ['Mango Butter', 'Sweet Almond Oil', 'Castor Oil', 'Hibiscus Extract'],
    benefits: ['Provides touchable, flake-free hold', 'Intense moisture retention', 'Seals the hair cuticle', 'Protects against environmental damage']
  }
];

export const getProductById = (id: string) => products.find(p => p.id === id);
