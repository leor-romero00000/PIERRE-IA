import { Dish } from '../types';

export const CHEF_AVATAR_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCh8OKNVCocJaopag43t5ixYsXbCNCqmnlC0fmdogghsS2DUVW7ISMwSPLIkjNYiPZp3oJrfqZsSnwiWOaERMKg_mCeb4yUF6PZLizojYVfiagrabKK72U_PimfkEzzUk82CXlkN1iZ5vqEMMLTBjMlGtCLAiQvTLCV2Y9l-tGbbwcERr7CzFxOwxFZcgUIDkLJx56ez3t7o7Uv1dzYUpgfehK6-D0y6a7PO0IpjGgZZgVnx1QJy34';

export const LOGO_EMBLEM_URL = 'https://lh3.googleusercontent.com/aida/AEtjO1VSdwPkuU5NEXjCxtY-wBvMM_2WRBS8l3qaHvqK6cHxVYdDnt_fnYvaTCuOXyEdVH4S8HmL83n4-UlBBF4ubNwGBrRqgxDJYaRmXmoHFy2bFsAT8SUKrp_-FjgnqhqUyxyzEiMiOdPpntVgiu2YLriNIUc8zibMkPMZHVVvyqk9sv2AcOP1j6Fq9iz4KsNcuXqrNt5chx-dffURFtU5Gft3Ln4N3zZL6H_-ESWICyXWycY5wkV-iNWHYQ';

export const INITIAL_DISHES: Dish[] = [
  {
    id: 'dish-1',
    name: 'Risotto de Boletus y Trufa Negra',
    category: 'entrantes',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJ08rL4xhR8iV0C0T8IuKn4WhjuA0TqxylLSbmeJ0kklHZQ6KTEGQVU2TEEpASA5GK2iX10chTyNI0fk-HyG_aRKVGPJ7LR5s-hFTVQO1bo3-20aId7ygkJfp2wOa2-GlGXBdmdnQleJkyZqohgR2lCCW8RflZNnZIWU4rGd1ZAiJhA5ZLXQG5e7K4AaQpfpLF4n69EtIKiQzGzvKQTaMjRDekA7F8hsOPv9zhRZLgJt59T4fWQdI',
    tag: 'Alta Rentabilidad',
    tagColor: 'emerald',
    timeAgo: 'Hace 2 días',
    servings: 1,
    menuType: 'Degustación',
    costBase: 4.20,
    marginDesired: 77,
    marginReal: 77,
    suggestedPrice: 18.50,
    netProfit: 14.30,
    certified: true,
    ingredients: [
      {
        id: 'ing-1-1',
        name: 'Arroz Carnaroli Reserva',
        supplier: 'Molino di Lomellina',
        amount: 80,
        unit: 'g',
        unitPrice: 5.50, // per kg
        subtotal: 0.44,
        iconType: 'plant'
      },
      {
        id: 'ing-1-2',
        name: 'Boletus Edulis Silvestres',
        supplier: 'Setas del Piamonte',
        amount: 90,
        unit: 'g',
        unitPrice: 22.00,
        subtotal: 1.98,
        iconType: 'plant'
      },
      {
        id: 'ing-1-3',
        name: 'Trufa Negra Melanosporum',
        supplier: 'Trufas Teruel Selección',
        amount: 3,
        unit: 'g',
        unitPrice: 280.00, // per kg (approx $0.28/g -> $0.84 for 3g)
        subtotal: 0.84,
        iconType: 'spice'
      },
      {
        id: 'ing-1-4',
        name: 'Mantequilla de Pasto DOP',
        supplier: 'Lácteos Artesanales',
        amount: 25,
        unit: 'g',
        unitPrice: 14.00,
        subtotal: 0.35,
        iconType: 'butter'
      },
      {
        id: 'ing-1-5',
        name: 'Parmigiano Reggiano 24 Meses',
        supplier: 'Caseificio Tradizionale',
        amount: 20,
        unit: 'g',
        unitPrice: 24.00,
        subtotal: 0.48,
        iconType: 'spice'
      },
      {
        id: 'ing-1-6',
        name: 'Caldo Clarificado de Ave y Verduras',
        supplier: 'Producción Atelier',
        amount: 150,
        unit: 'ml',
        unitPrice: 0.75, // per l
        subtotal: 0.11,
        iconType: 'other'
      }
    ]
  },
  {
    id: 'dish-2',
    name: 'Lomo de Lubina salvaje con chirivía',
    category: 'principales',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_RZr6WNU5mu-LQaluyRvLR3o1Cb0jSiSMpPKRUGCAIj19c-xd0CxWpoiVcmoFNsBLfEoFD3rldKKEClrlvImI1tA5Y1k9aePuwMTIFx3m5yfrMkhOH4HtOuy0cbUmqSatoy3wyDxFNphUBPYqEwVH4080bfjXk1Ok0zk_gY6l-LIlTPQqaPAhyJOlT0zG69HNg-zFiTJ5crBkpNsJk3GPvEOlQaOSrBLV-D0oh7bJfAb_9skfBAA',
    tag: 'Óptimo',
    tagColor: 'gold',
    timeAgo: 'Hoy',
    servings: 1,
    menuType: 'Degustación',
    costBase: 6.60,
    marginDesired: 70,
    marginReal: 70,
    suggestedPrice: 22.00,
    netProfit: 15.40,
    certified: true,
    ingredients: [
      {
        id: 'ing-2-1',
        name: 'Lubina salvaje limpia',
        supplier: 'Pescadería Atlántica',
        amount: 220,
        unit: 'g',
        unitPrice: 22.00,
        subtotal: 4.84,
        iconType: 'fish'
      },
      {
        id: 'ing-2-2',
        name: 'Chirivía fresca',
        supplier: 'Huerto Orgánico Central',
        amount: 150,
        unit: 'g',
        unitPrice: 4.00,
        subtotal: 0.60,
        iconType: 'plant'
      },
      {
        id: 'ing-2-3',
        name: 'Mantequilla noisette',
        supplier: 'Lácteos Artesanales',
        amount: 30,
        unit: 'g',
        unitPrice: 12.00,
        subtotal: 0.36,
        iconType: 'butter'
      },
      {
        id: 'ing-2-4',
        name: 'Microbrotes & aceite de trufa',
        supplier: 'Botánica Gourmet',
        amount: 1,
        unit: 'ud',
        unitPrice: 0.80,
        subtotal: 0.80,
        iconType: 'sprout'
      }
    ]
  },
  {
    id: 'dish-3',
    name: 'Magret de Pato con reducción de Oporto',
    category: 'principales',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDvuppLlCmBErg8k-ltCI9wMB6s89zbZoa0xUkgPh8_Au0T80ljdpIxmvCdQlBwuw9I3S2LGKt2p3b_FBR-sxGQGB8wa77Tz1jap3-vh0Kqq3T0I_nTATNVBv0C1Ya0CxRppQiAioyd-9HfCVt0thOjw88pEXEOwteke8Ryil6V0oIQW6xVeEV9H0E5sTVn6vuuhA9xGeraYRrfr973CdTA3ZrlrqBZb_UjxtK__yBMEc8noY-On0',
    tag: 'Estándar',
    tagColor: 'secondary',
    timeAgo: 'Esta semana',
    servings: 1,
    menuType: 'Degustación',
    costBase: 8.90,
    marginDesired: 65,
    marginReal: 65,
    suggestedPrice: 26.00,
    netProfit: 17.10,
    certified: true,
    ingredients: [
      {
        id: 'ing-3-1',
        name: 'Magret de Pato Mulard IGP',
        supplier: 'Granjas del Suroeste',
        amount: 320,
        unit: 'g',
        unitPrice: 19.50,
        subtotal: 6.24,
        iconType: 'meat'
      },
      {
        id: 'ing-3-2',
        name: 'Reducción de Vino de Oporto Tawny',
        supplier: 'Bodega Selección',
        amount: 60,
        unit: 'ml',
        unitPrice: 18.00,
        subtotal: 1.08,
        iconType: 'other'
      },
      {
        id: 'ing-3-3',
        name: 'Higos frescos de temporada',
        supplier: 'Huerto Orgánico Central',
        amount: 2,
        unit: 'ud',
        unitPrice: 0.40,
        subtotal: 0.80,
        iconType: 'plant'
      },
      {
        id: 'ing-3-4',
        name: 'Mousseline de patata ratte',
        supplier: 'Producción Atelier',
        amount: 100,
        unit: 'g',
        unitPrice: 5.00,
        subtotal: 0.50,
        iconType: 'plant'
      },
      {
        id: 'ing-3-5',
        name: 'Fondo oscuro demi-glace',
        supplier: 'Producción Atelier',
        amount: 40,
        unit: 'ml',
        unitPrice: 7.00,
        subtotal: 0.28,
        iconType: 'other'
      }
    ]
  }
];
