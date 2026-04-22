export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: string;
  description: string;
  details: string;
  materials: string;
  dimensions: {
    height: string;
    width: string;
    depth: string;
    seatHeight?: string;
  };
  images: string[];
  model3d?: string;
  featured?: boolean;
  itemType?: 'Piece' | 'Collection';
  collectionName?: string;
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'vanguard-lounge',
    name: 'The Vanguard Lounge',
    category: 'Seating',
    price: '₦4,500',
    description: 'Designed for the contemplative hour. The Vanguard reconciles the structural rigor of mid-century architecture with the soft, inviting warmth of Italian craftsmanship.',
    details: 'Sculpted from a single block of kiln-dried American Walnut, its silhouette is defined by a continuous, fluid line that supports without imposing.',
    materials: 'Solid American Walnut frame with hand-rubbed oil finish. Full-grain Italian aniline leather.',
    dimensions: { height: '85 cm', width: '70 cm', depth: '82 cm', seatHeight: '42 cm' },
    images: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1506898667547-42e22a46e125?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800'
    ],
    featured: true
  },
  {
    id: '2',
    slug: 'arthurs-stool',
    name: "Arthur's Bar Stool",
    category: 'Stools',
    price: '₦1,200',
    description: 'A robust yet refined seating solution for the modern kitchen or bar.',
    details: 'Crafted from solid white oak with a focus on structural integrity and minimalist form.',
    materials: 'Solid White Oak, Natural Oil Finish.',
    dimensions: { height: '75 cm', width: '40 cm', depth: '40 cm' },
    images: ['/images/editorial_image_of_202604170109.png']
  },
  {
    id: '3',
    slug: 'holloway-chair',
    name: 'Holloway Dining Chair',
    category: 'Dining',
    price: '₦1,800',
    description: 'An elegant dining chair that combines ebonized ash with plush velvet.',
    details: 'The curved back provides exceptional support for long evenings of conversation.',
    materials: 'Ebonized Ash, Midnight Velvet.',
    dimensions: { height: '80 cm', width: '50 cm', depth: '55 cm', seatHeight: '45 cm' },
    images: ['https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800']
  },
  {
    id: '4',
    slug: 'sculpture-ottoman',
    name: 'The Sculpture Ottoman',
    category: 'Benches',
    price: '₦2,400',
    description: 'A statement piece that functions as both seating and art.',
    details: 'Upholstered in cognac aniline leather that will develop a beautiful patina over time.',
    materials: 'Cognac Aniline Leather, Walnut Base.',
    dimensions: { height: '45 cm', width: '120 cm', depth: '60 cm' },
    images: [
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800'
    ],
    model3d: '/assets/3d/ottoman.glb'
  },
  {
    id: '5',
    slug: 'curved-side-chair',
    name: 'Curved Back Side Chair',
    category: 'Dining',
    price: '₦1,500',
    description: 'A minimalist side chair with a focus on organic curves.',
    details: 'The beech wood frame is light yet incredibly strong, finished with natural linen upholstery.',
    materials: 'Beech Wood, Natural Linen.',
    dimensions: { height: '82 cm', width: '48 cm', depth: '52 cm', seatHeight: '46 cm' },
    images: ['https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&q=80&w=800']
  },
  {
    id: '6',
    slug: 'bespoke-settee',
    name: 'Bespoke Settee',
    category: 'Lounge',
    price: '₦6,800',
    description: 'A luxurious settee designed for intimate seating areas.',
    details: 'Wrapped in midnight velvet with hand-tufted details and a solid oak frame.',
    materials: 'Midnight Velvet, Solid Oak.',
    dimensions: { height: '78 cm', width: '160 cm', depth: '85 cm', seatHeight: '42 cm' },
    images: ['https://images.unsplash.com/photo-1550226891-ef816aed4a98?auto=format&fit=crop&q=80&w=800']
  },
  {
    id: '7',
    slug: 'directors-armchair',
    name: "Director's Armchair",
    category: 'Office',
    price: '₦3,200',
    description: 'A commanding armchair for the executive study.',
    details: 'Tobacco leather meets polished brass accents in this masterclass of office seating.',
    materials: 'Tobacco Leather, Polished Brass, Walnut.',
    dimensions: { height: '95 cm', width: '65 cm', depth: '70 cm', seatHeight: '48 cm' },
    images: ['https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&q=80&w=800']
  },
  {
    id: '8',
    slug: 'elysian-chaise',
    name: 'Elysian Chaise Lounge',
    category: 'Lounge',
    price: '₦5,500',
    description: 'The ultimate in restorative comfort.',
    details: 'Upholstered in soft mohair velvet, designed for the quietest corners of the home.',
    materials: 'Mohair Velvet, Ash Wood.',
    dimensions: { height: '70 cm', width: '180 cm', depth: '80 cm' },
    images: ['https://images.unsplash.com/photo-1520006403909-838d6b92c22e?auto=format&fit=crop&q=80&w=800']
  },
  {
    id: '9',
    slug: 'obsidian-oak-table',
    name: 'Obsidian Oak Table',
    category: 'Tables',
    price: '₦12,500',
    description: 'A monolithic dining table that anchors the room.',
    details: 'Hand-carved solid oak with a deep obsidian finish and subtle bronze inlays.',
    materials: 'Solid Oak, Bronze Inlay.',
    dimensions: { height: '76 cm', width: '240 cm', depth: '110 cm' },
    images: ['/images/Editorial_image_revealing_202604170203.png']
  },
  {
    id: '10',
    slug: 'lumiere-chandelier',
    name: 'Lumière Chandelier',
    category: 'Lighting',
    price: '₦8,200',
    description: 'An architectural lighting masterpiece.',
    details: 'Custom blown glass elements suspended from a cast bronze structure.',
    materials: 'Blown Glass, Cast Bronze.',
    dimensions: { height: '120 cm', width: '90 cm', depth: '90 cm' },
    images: ['/images/An_image_of_202604170110.png']
  },
  {
    id: '11',
    slug: 'aurelia-mirror',
    name: 'Aurelia Grand Mirror',
    category: 'Decor',
    price: '₦3,800',
    description: 'A double-height mirror that reflects grandeur.',
    details: 'Framed in hand-patinated brass with beveled edge glass.',
    materials: 'Brass, Beveled Glass.',
    dimensions: { height: '220 cm', width: '110 cm', depth: '5 cm' },
    images: ['https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=800']
  },
  {
    id: '12',
    slug: 'verona-seating',
    name: 'Verona Statement Seating',
    category: 'Seating',
    price: '₦4,200',
    description: 'A sculptural armchair designed for the grand entryway.',
    details: 'Plush velvet upholstery on a hidden swivel base.',
    materials: 'Velvet, Steel Base.',
    dimensions: { height: '88 cm', width: '82 cm', depth: '80 cm', seatHeight: '44 cm' },
    images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800']
  },
  {
    id: '13',
    slug: 'nolimits-desk',
    name: 'No Limits Writing Desk',
    category: 'Office',
    price: '₦9,500',
    description: 'A sanctuary of focus and power.',
    details: 'Crafted from ancient walnut with hand-burnished leather top.',
    materials: 'Ancient Walnut, Burnished Leather.',
    dimensions: { height: '76 cm', width: '180 cm', depth: '85 cm' },
    images: ['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800']
  },
  {
    id: '14',
    slug: 'midnight-club-chair',
    name: 'Midnight Velvet Club Chair',
    category: 'Seating',
    price: '₦3,400',
    description: 'Deep, encompassing comfort.',
    details: 'Upholstered in midnight velvet with a solid walnut frame.',
    materials: 'Midnight Velvet, Walnut.',
    dimensions: { height: '82 cm', width: '78 cm', depth: '80 cm', seatHeight: '42 cm' },
    images: ['https://images.unsplash.com/photo-1617364852223-75f57e78dc96?auto=format&fit=crop&q=80&w=800']
  },
  {
    id: '15',
    slug: 'tectona-bench',
    name: 'Tectona Teak Bench',
    category: 'Outdoor',
    price: '₦2,800',
    description: 'Indestructible elegance for the courtyard.',
    details: 'Marine-grade teak that resists decay and thermal fluctuations.',
    materials: 'Marine-Grade Teak.',
    dimensions: { height: '45 cm', width: '150 cm', depth: '40 cm' },
    images: ['https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&q=80&w=800']
  },
  {
    id: '16',
    slug: 'bronze-patina-lamp',
    name: 'Bronze Patina Lamp',
    category: 'Lighting',
    price: '₦1,850',
    description: 'A warm, metallic contrast for the study.',
    details: 'Articulated brass lamp with a hand-applied patina finish.',
    materials: 'Brass, Patina Finish.',
    dimensions: { height: '60 cm', width: '20 cm', depth: '30 cm' },
    images: ['/images/Bronze_Patina_Lamp_202604170112.png']
  },
  {
    id: '17',
    slug: 'statement-wall-mirror',
    name: 'The Statement Wall Mirror',
    category: 'Decor',
    price: '₦2,200',
    description: 'A monolithic circular mirror that expands spatial horizons.',
    details: 'Frameless edge design with subtle backlighting capable of defining the ambiance of a dining setting.',
    materials: 'Silvered Glass, Aluminum Backing.',
    dimensions: { height: '150 cm', width: '150 cm', depth: '3 cm' },
    images: ['https://images.unsplash.com/photo-1622372738946-62b0222a7f5e?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1582582494705-f8ce0b0c24f0?auto=format&fit=crop&q=80&w=800']
  },
  {
    id: '18',
    slug: 'modern-resin-dining-table',
    name: 'Modern Resin Dining Table',
    category: 'Tables',
    price: '₦8,500',
    description: 'A sleek, synthetic monolith challenging traditional material constraints.',
    details: 'Poured resin over a steel skeleton, polished to a perfect, highly durable matte surface.',
    materials: 'Matte White Resin, Powder-Coated Steel.',
    dimensions: { height: '75 cm', width: '220 cm', depth: '100 cm' },
    images: ['https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fd2?auto=format&fit=crop&q=80&w=800']
  },
  {
    id: '19',
    slug: 'emerald-velvet-dining-chair',
    name: 'Emerald Velvet Dining Chair',
    category: 'Dining',
    price: '₦1,400',
    description: 'A pop of dramatic color wrapped in mid-century architecture.',
    details: 'Rich emerald green velvet stretched over an ergonomic curved seat pan with slender blackened steel legs.',
    materials: 'Emerald Velvet, Blackened Steel.',
    dimensions: { height: '82 cm', width: '52 cm', depth: '56 cm', seatHeight: '46 cm' },
    images: ['https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1567538096621-ce83f124cfa9?auto=format&fit=crop&q=80&w=800']
  },
  // --- NEW COLLECTIONS START HERE ---
  {
    id: 'c1',
    slug: 'conversation-3-seater',
    name: 'The Conversation 3-Seater',
    category: 'Seating',
    price: '₦9,500',
    description: 'The foundation of the Living space.',
    details: 'A robust three-seater sofa featuring continuous lines and deep cushions.',
    materials: 'Bouclé, Oak Frame',
    dimensions: { height: '80 cm', width: '240 cm', depth: '95 cm', seatHeight: '42 cm' },
    images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800'],
    itemType: 'Collection',
    collectionName: 'Living'
  },
  {
    id: 'c2',
    slug: 'conversation-2-seater',
    name: 'The Conversation 2-Seater',
    category: 'Seating',
    price: '₦7,200',
    description: 'Intimate seating for the Living space.',
    details: 'Matching the 3-seater aesthetic with a more compact footprint.',
    materials: 'Bouclé, Oak Frame',
    dimensions: { height: '80 cm', width: '180 cm', depth: '95 cm', seatHeight: '42 cm' },
    images: ['https://images.unsplash.com/photo-1519643381401-22c77e60520e?auto=format&fit=crop&q=80&w=800'],
    itemType: 'Collection',
    collectionName: 'Living'
  },
  {
    id: 'c3',
    slug: 'conversation-armchair',
    name: 'The Conversation Armchair',
    category: 'Seating',
    price: '₦4,800',
    description: 'The accent piece of the Living space.',
    details: 'A sculptural armchair that forms the perfect conversation circle.',
    materials: 'Bouclé, Oak Frame',
    dimensions: { height: '80 cm', width: '90 cm', depth: '95 cm', seatHeight: '42 cm' },
    images: ['https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800'],
    itemType: 'Collection',
    collectionName: 'Living'
  },
  {
    id: 'c4',
    slug: 'sanctuary-master-bed',
    name: 'The Sanctuary Bed',
    category: 'Beds',
    price: '₦14,000',
    description: 'The centerpiece of the Master Suite Collection.',
    details: 'An expansive king-sized bed with an integrated upholstered headboard.',
    materials: 'Linen, Walnut, Brass detailing',
    dimensions: { height: '110 cm', width: '220 cm', depth: '210 cm' },
    images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=800'],
    itemType: 'Collection',
    collectionName: 'Sanctuary'
  },
  {
    id: 'c5',
    slug: 'sanctuary-nightstand',
    name: 'The Sanctuary Nightstand',
    category: 'Tables',
    price: '₦3,100',
    description: 'Complementary storage for the bedroom.',
    details: 'A minimalist bedside table with soft-close drawers and brass hardware.',
    materials: 'Walnut, Brass',
    dimensions: { height: '55 cm', width: '60 cm', depth: '45 cm' },
    images: ['https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?auto=format&fit=crop&q=80&w=800'],
    itemType: 'Collection',
    collectionName: 'Sanctuary'
  },
  {
    id: 'c6',
    slug: 'sanctuary-wardrobe',
    name: 'The Sanctuary Wardrobe',
    category: 'Wardrobes',
    price: '₦18,500',
    description: 'Architectural storage for the bedroom suite.',
    details: 'Floor-to-ceiling cabinetry with integrated lighting and leather-wrapped handles.',
    materials: 'Walnut, Leather, Glass',
    dimensions: { height: '260 cm', width: '300 cm', depth: '65 cm' },
    images: ['https://images.unsplash.com/photo-1623910271168-5e8cdb664fc8?auto=format&fit=crop&q=80&w=800'],
    itemType: 'Collection',
    collectionName: 'Sanctuary'
  },
  {
    id: 'c7',
    slug: 'dining-monolith-table',
    name: 'The Monolith Dining Table',
    category: 'Tables',
    price: '₦12,000',
    description: 'The anchor of the Dining architecture.',
    details: 'A monumental stone dining table that seats twelve comfortably.',
    materials: 'Travertine, Blackened Matte Steel',
    dimensions: { height: '76 cm', width: '320 cm', depth: '110 cm' },
    images: ['https://images.unsplash.com/photo-1577140918692-788fa8a196b7?auto=format&fit=crop&q=80&w=800'],
    itemType: 'Collection',
    collectionName: 'Dining'
  },
  {
    id: 'c8',
    slug: 'kitchen-island-cabinetry',
    name: 'Atelier Kitchen Island & Cabinets',
    category: 'Cabinets',
    price: '₦28,000',
    description: 'A full kitchen unit belonging to the Kitchen Space.',
    details: 'Integrated countertops, matte black faucets, and continuous oak veneer cabinets.',
    materials: 'Oak Veneer, Calacatta Marble, Matte Black Brass',
    dimensions: { height: '95 cm', width: '400 cm', depth: '120 cm' },
    images: ['https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800'],
    itemType: 'Collection',
    collectionName: 'Kitchen'
  },
  {
    id: 'c9',
    slug: 'study-executive-desk',
    name: 'The Executive Desk',
    category: 'Tables',
    price: '₦9,800',
    description: 'The profound centerpiece of the Study.',
    details: 'A commanding desk crafted from ancient walnut, featuring hidden cable management and leather inlay.',
    materials: 'Walnut, Leather, Burnished Brass',
    dimensions: { height: '76 cm', width: '200 cm', depth: '100 cm' },
    images: ['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800'],
    itemType: 'Collection',
    collectionName: 'Study'
  },
  {
    id: 'c10',
    slug: 'cellar-sommelier-island',
    name: 'The Sommelier\'s Island',
    category: 'Tables',
    price: '₦8,500',
    description: 'The focal point of the Cellar.',
    details: 'A standing tasting station with integrated chilling and a thick stone top.',
    materials: 'Oak, Soapstone',
    dimensions: { height: '105 cm', width: '180 cm', depth: '80 cm' },
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuDmqvr-vhWJR-vFcn0YfD8ItTnARePU5ufgSBuo6K3MDFFKNzUpX9yXKpzLuqlZxV5IubJyA8d3jF65RGCiVI5hDHmnHe0IpvErNq-lEso4zC8uufwPc07Tj9aj1owPWyqQ7x7DKqP0clYf5sFDZHJIbxm4wMnHXzz6ODrartBRL18rBmiyvnGhFJlgzg_toX2BwvRC4Sh2c8vkKYiToC3m-rm6dr6mVTaxEplXN0zKs7H9sgS_zqFw8Jx5FvEziN701V8vXR5Wvko'],
    itemType: 'Collection',
    collectionName: 'Cellar'
  },
  {
    id: 'l1',
    slug: 'living-green-atrium',
    name: 'The Green Atrium Set',
    category: 'Seating',
    price: '₦12,500',
    description: 'A masterpiece for the living space.',
    details: 'Curated deep green seating built for a serene atmosphere.',
    materials: 'Leather, Oak',
    dimensions: { height: '90 cm', width: '220 cm', depth: '110 cm' },
    images: ['https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&q=60&w=800'],
    itemType: 'Collection',
    collectionName: 'Living'
  },
  {
    id: 'l2',
    slug: 'living-sunroom-modular',
    name: 'The Sunroom Modular',
    category: 'Seating',
    price: '₦14,000',
    description: 'Adaptable configurations for light-filled environments.',
    details: 'Modular seating that can be rearranged for varying social interactions.',
    materials: 'Linen, Aluminum',
    dimensions: { height: '80 cm', width: '300 cm', depth: '200 cm' },
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=60&w=800'],
    itemType: 'Collection',
    collectionName: 'Living'
  },
  {
    id: 'l3',
    slug: 'living-mid-century-chair',
    name: 'Mid-Century Accent',
    category: 'Seating',
    price: '₦3,200',
    description: 'A striking solitary piece.',
    details: 'Perfect balance of vintage lines and modern comfort.',
    materials: 'Walnut, Wool',
    dimensions: { height: '85 cm', width: '70 cm', depth: '80 cm' },
    images: ['https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?auto=format&fit=crop&q=60&w=800'],
    itemType: 'Collection',
    collectionName: 'Living'
  },
  {
    id: 'l4',
    slug: 'living-velvet-sofa',
    name: 'The Velvet Lounge',
    category: 'Seating',
    price: '₦11,000',
    description: 'A cozy atmosphere enhancer.',
    details: 'Luxurious velvet paired with deep seating for maximum relaxation.',
    materials: 'Velvet, Brass',
    dimensions: { height: '80 cm', width: '240 cm', depth: '100 cm' },
    images: ['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=60&w=800'],
    itemType: 'Collection',
    collectionName: 'Living'
  }
];
