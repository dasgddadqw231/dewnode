import { nanoid } from 'nanoid';
import providedImage from 'figma:asset/d880e991789adcdfed64bbbfedc73fe2994651bf.png';

// Types
export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'OUTER' | 'TOP' | 'BOTTOM' | 'ACC';
  image: string;
  detailImages?: string[];
  isSoldOut: boolean;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  priceAtPurchase: number;
  productName: string;
  productImage: string;
}

export interface Order {
  id: string;
  email: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'COMPLETED' | 'TvCancelled';
  createdAt: string;
  customerName: string;
  customerAddress: string;
  customerPhone: string;
}

export interface Collection {
  id: string;
  image: string;
  title: string;
  description: string;
}

export interface HeroImage {
  id: string;
  image: string;
  order: number;
}

// Initial Data
const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'STAINLESS PLATE 240',
    price: 48000,
    category: 'ACC',
    image: providedImage,
    isSoldOut: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'BRUSHED METAL BOWL',
    price: 36000,
    category: 'ACC',
    image: 'https://images.unsplash.com/photo-1705948731485-6e4c6c180d0d?q=80&w=1000&auto=format&fit=crop',
    isSoldOut: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'INDUSTRIAL CUTLERY SET',
    price: 52000,
    category: 'ACC',
    image: 'https://images.unsplash.com/photo-1616447194074-200c22166a5e?q=80&w=1000&auto=format&fit=crop',
    isSoldOut: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'CYLINDRICAL STORAGE 01',
    price: 42000,
    category: 'ACC',
    image: 'https://images.unsplash.com/photo-1699349360395-58ae635530f8?q=80&w=1000&auto=format&fit=crop',
    isSoldOut: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'METAL TRAY LARGE',
    price: 85000,
    category: 'ACC',
    image: 'https://images.unsplash.com/photo-1658472326330-2e7bea174f75?q=80&w=1000&auto=format&fit=crop',
    isSoldOut: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'PRECISION FORK',
    price: 18000,
    category: 'ACC',
    image: 'https://images.unsplash.com/photo-1699484477621-1f6ecb1d153f?q=80&w=1000&auto=format&fit=crop',
    isSoldOut: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '7',
    name: 'MINIMAL STEEL CUP',
    price: 24000,
    category: 'ACC',
    image: 'https://images.unsplash.com/photo-1676496220014-43540212ef5b?q=80&w=1000&auto=format&fit=crop',
    isSoldOut: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '8',
    name: 'STAINLESS PLATE 180',
    price: 32000,
    category: 'ACC',
    image: 'https://images.unsplash.com/photo-1705948731485-6e4c6c180d0d?q=80&w=1000&auto=format&fit=crop',
    isSoldOut: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '9',
    name: 'METAL STORAGE JAR S',
    price: 28000,
    category: 'ACC',
    image: 'https://images.unsplash.com/photo-1699349360395-58ae635530f8?q=80&w=1000&auto=format&fit=crop',
    isSoldOut: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '10',
    name: 'INDUSTRIAL SPOON',
    price: 18000,
    category: 'ACC',
    image: 'https://images.unsplash.com/photo-1699484477621-1f6ecb1d153f?q=80&w=1000&auto=format&fit=crop',
    isSoldOut: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '11',
    name: 'STEEL BREAD TRAY',
    price: 64000,
    category: 'ACC',
    image: 'https://images.unsplash.com/photo-1658472326330-2e7bea174f75?q=80&w=1000&auto=format&fit=crop',
    isSoldOut: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '12',
    name: 'MINIMAL CARAFE METAL',
    price: 92000,
    category: 'ACC',
    image: 'https://images.unsplash.com/photo-1676496220014-43540212ef5b?q=80&w=1000&auto=format&fit=crop',
    isSoldOut: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '13',
    name: 'PRECISION KNIFE',
    price: 22000,
    category: 'ACC',
    image: 'https://images.unsplash.com/photo-1616447194074-200c22166a5e?q=80&w=1000&auto=format&fit=crop',
    isSoldOut: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '14',
    name: 'METAL BASE STAND',
    price: 120000,
    category: 'ACC',
    image: 'https://images.unsplash.com/photo-1699349360395-58ae635530f8?q=80&w=1000&auto=format&fit=crop',
    isSoldOut: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '15',
    name: 'STAINLESS PLATE SET',
    price: 145000,
    category: 'ACC',
    image: providedImage,
    isSoldOut: false,
    createdAt: new Date().toISOString(),
  }
];

const INITIAL_HERO_IMAGES: HeroImage[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1616447194074-200c22166a5e?q=80&w=2000&auto=format&fit=crop',
    order: 0,
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1699484477621-1f6ecb1d153f?q=80&w=2000&auto=format&fit=crop',
    order: 1,
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1658472326330-2e7bea174f75?q=80&w=2000&auto=format&fit=crop',
    order: 2,
  }
];

const INITIAL_COLLECTIONS: Collection[] = [
  {
    id: '1',
    title: 'DEW&ODE_VOL.01',
    description: 'Minimalist essentials for the new season',
    image: 'https://images.unsplash.com/photo-1761830476467-0ff86dbcc75d?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'ARCHIVE_SERIES',
    description: 'City life simplified',
    image: 'https://images.unsplash.com/photo-1738748444676-113d30c9a25b?q=80&w=1000&auto=format&fit=crop',
  }
];

// LocalStorage Keys
const KEYS = {
  PRODUCTS: 'dew_ode_products_v3', // Force update to stainless collection
  ORDERS: 'dew_ode_orders',
  COLLECTIONS: 'dew_ode_collections',
  HERO: 'dew_ode_hero_v3',
};

// Helper to load from LS or return default
const load = <T>(key: string, initial: T): T => {
  if (typeof window === 'undefined') return initial;
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(stored);
};

const save = <T>(key: string, data: T) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
};

// DB Interface
export const db = {
  products: {
    getAll: () => load<Product[]>(KEYS.PRODUCTS, INITIAL_PRODUCTS),
    getById: (id: string) => load<Product[]>(KEYS.PRODUCTS, INITIAL_PRODUCTS).find(p => p.id === id),
    add: (product: Omit<Product, 'id' | 'createdAt'>) => {
      const products = load<Product[]>(KEYS.PRODUCTS, INITIAL_PRODUCTS);
      const newProduct = { ...product, id: nanoid(), createdAt: new Date().toISOString() };
      save(KEYS.PRODUCTS, [newProduct, ...products]);
      return newProduct;
    },
    update: (id: string, updates: Partial<Product>) => {
      const products = load<Product[]>(KEYS.PRODUCTS, INITIAL_PRODUCTS);
      const updated = products.map(p => p.id === id ? { ...p, ...updates } : p);
      save(KEYS.PRODUCTS, updated);
    },
    delete: (id: string) => {
      const products = load<Product[]>(KEYS.PRODUCTS, INITIAL_PRODUCTS);
      save(KEYS.PRODUCTS, products.filter(p => p.id !== id));
    }
  },
  orders: {
    getAll: () => load<Order[]>(KEYS.ORDERS, []),
    getByEmail: (email: string) => load<Order[]>(KEYS.ORDERS, []).filter(o => o.email === email),
    create: (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => {
      const orders = load<Order[]>(KEYS.ORDERS, []);
      const newOrder: Order = { 
        ...order, 
        id: nanoid(), 
        createdAt: new Date().toISOString(),
        status: 'PENDING' 
      };
      save(KEYS.ORDERS, [newOrder, ...orders]);
      return newOrder;
    },
    updateStatus: (id: string, status: Order['status']) => {
      const orders = load<Order[]>(KEYS.ORDERS, []);
      const updated = orders.map(o => o.id === id ? { ...o, status } : o);
      save(KEYS.ORDERS, updated);
    }
  },
  collections: {
    getAll: () => load<Collection[]>(KEYS.COLLECTIONS, INITIAL_COLLECTIONS),
    add: (col: Omit<Collection, 'id'>) => {
      const cols = load<Collection[]>(KEYS.COLLECTIONS, INITIAL_COLLECTIONS);
      const newCol = { ...col, id: nanoid() };
      save(KEYS.COLLECTIONS, [...cols, newCol]);
    },
    delete: (id: string) => {
      const cols = load<Collection[]>(KEYS.COLLECTIONS, INITIAL_COLLECTIONS);
      save(KEYS.COLLECTIONS, cols.filter(c => c.id !== id));
    }
  },
  hero: {
    getAll: () => load<HeroImage[]>(KEYS.HERO, INITIAL_HERO_IMAGES),
    add: (img: string) => {
      const images = load<HeroImage[]>(KEYS.HERO, INITIAL_HERO_IMAGES);
      const newImg = { id: nanoid(), image: img, order: images.length };
      save(KEYS.HERO, [...images, newImg]);
    },
    delete: (id: string) => {
      const images = load<HeroImage[]>(KEYS.HERO, INITIAL_HERO_IMAGES);
      save(KEYS.HERO, images.filter(i => i.id !== id));
    }
  }
};