/* Pasta Lovers — menu data.
   Dish names stay in Italian across every language (they are proper names).
   Only descriptions are translated. Prices in AUD.
   To add a photo to a dish, drop the file in assets/img/ and set `img`. */

window.PL_MENU = {
  currency: '$',

  addons: [
    { id: 'stracciatella', price: '3.5', name: { en: 'Stracciatella', it: 'Stracciatella', de: 'Stracciatella', fr: 'Stracciatella' } },
    { id: 'guanciale', price: '3.5', name: { en: 'Extra guanciale', it: 'Guanciale extra', de: 'Extra Guanciale', fr: 'Guanciale en plus' } },
    { id: 'chicken', price: '4.5', name: { en: 'Chicken', it: 'Pollo', de: 'Hähnchen', fr: 'Poulet' } }
  ],

  sections: [
    {
      id: 'appetizers',
      title: { en: 'Appetizers', it: 'Antipasti', de: 'Vorspeisen', fr: 'Entrées' },
      sub: {
        en: 'Kick off your meal with comforting Italian favourites — light, flavourful bites designed to set the perfect tone for your pasta.',
        it: 'Inizia il pasto con i grandi classici italiani: bocconi leggeri e saporiti, pensati per introdurre la tua pasta nel modo giusto.',
        de: 'Starte dein Essen mit italienischen Klassikern — leichte, aromatische Häppchen, die perfekt auf deine Pasta einstimmen.',
        fr: 'Commencez votre repas avec les grands classiques italiens : des bouchées légères et savoureuses qui préparent parfaitement vos pâtes.'
      },
      items: [
        {
          id: 'bruschetta-pomodoro', price: '10', img: 'assets/img/bruschetta.jpg',
          name: { en: 'Bruschetta al Pomodoro', it: 'Bruschetta al Pomodoro', de: 'Bruschetta al Pomodoro', fr: 'Bruschetta al Pomodoro' },
          desc: {
            en: 'Toasted bread topped with fresh tomato, fragrant basil, and a drizzle of extra virgin olive oil.',
            it: 'Pane tostato con pomodoro fresco, basilico profumato e un filo di olio extravergine di oliva.',
            de: 'Geröstetes Brot mit frischen Tomaten, duftendem Basilikum und einem Schuss natives Olivenöl extra.',
            fr: 'Pain grillé garni de tomate fraîche, basilic parfumé et un filet d’huile d’olive extra vierge.'
          }
        },
        {
          id: 'bruschetta-stracciatella', price: '15', img: 'assets/img/bruschetta.jpg',
          name: { en: 'Bruschetta with Stracciatella & Anchovies', it: 'Bruschetta con Stracciatella e Acciughe', de: 'Bruschetta mit Stracciatella & Sardellen', fr: 'Bruschetta Stracciatella & Anchois' },
          desc: {
            en: 'Creamy stracciatella and anchovies on crunchy bread.',
            it: 'Stracciatella cremosa e acciughe su pane croccante.',
            de: 'Cremige Stracciatella und Sardellen auf knusprigem Brot.',
            fr: 'Stracciatella crémeuse et anchois sur pain croustillant.'
          }
        }
      ]
    },

    {
      id: 'pomodoro',
      title: { en: 'I Classici al Pomodoro', it: 'I Classici al Pomodoro', de: 'I Classici al Pomodoro', fr: 'I Classici al Pomodoro' },
      sub: {
        en: 'Tomato-based Italian favourites',
        it: 'I grandi classici italiani a base di pomodoro',
        de: 'Italienische Klassiker auf Tomatenbasis',
        fr: 'Les classiques italiens à base de tomate'
      },
      items: [
        {
          id: 'amatriciana', price: '24', img: 'assets/img/amatriciana.jpg', addons: true,
          name: { en: 'Amatriciana — Spaghetti', it: 'Amatriciana — Spaghetti', de: 'Amatriciana — Spaghetti', fr: 'Amatriciana — Spaghetti' },
          desc: {
            en: 'Crispy *guanciale (Italian cured pork cheek), tomato sauce and *pecorino romano cheese.',
            it: 'Guanciale* croccante, salsa di pomodoro e pecorino romano*.',
            de: 'Knuspriger *Guanciale (italienische Schweinebacke), Tomatensauce und *Pecorino Romano.',
            fr: 'Guanciale* croustillant (joue de porc affinée), sauce tomate et pecorino romano*.'
          }
        },
        {
          id: 'tricolore', price: '24', img: 'assets/img/tricolore.jpg', addons: true,
          name: { en: 'Tricolore — Tortiglioni', it: 'Tricolore — Tortiglioni', de: 'Tricolore — Tortiglioni', fr: 'Tricolore — Tortiglioni' },
          desc: {
            en: 'Tomato sauce, basil pesto, creamy *stracciatella and pistachio granella.',
            it: 'Salsa di pomodoro, pesto di basilico, stracciatella* cremosa e granella di pistacchio.',
            de: 'Tomatensauce, Basilikumpesto, cremige *Stracciatella und Pistaziengranella.',
            fr: 'Sauce tomate, pesto de basilic, stracciatella* crémeuse et éclats de pistache.'
          }
        }
      ]
    },

    {
      id: 'caciopepe',
      title: { en: 'Collezione Cacio & Pepe', it: 'Collezione Cacio & Pepe', de: 'Collezione Cacio & Pepe', fr: 'Collezione Cacio & Pepe' },
      sub: {
        en: 'Creamy *pecorino & black pepper dishes',
        it: 'Piatti cremosi a base di pecorino* e pepe nero',
        de: 'Cremige Gerichte mit *Pecorino und schwarzem Pfeffer',
        fr: 'Plats crémeux au pecorino* et poivre noir'
      },
      items: [
        {
          id: 'carbonara', price: '24', img: 'assets/img/carbonara.jpg', addons: true,
          name: { en: 'Carbonara — Spaghetti', it: 'Carbonara — Spaghetti', de: 'Carbonara — Spaghetti', fr: 'Carbonara — Spaghetti' },
          desc: {
            en: 'A creamy twist on carbonara — *guanciale (Italian cured pork cheek), *pecorino romano cheese, egg and black pepper on a smooth cream-enhanced base.',
            it: 'Una carbonara in versione cremosa: guanciale*, pecorino romano*, uovo e pepe nero su una base vellutata arricchita di panna.',
            de: 'Carbonara in cremiger Variante — *Guanciale, *Pecorino Romano, Ei und schwarzer Pfeffer auf samtiger, sahniger Basis.',
            fr: 'Une carbonara version crémeuse — guanciale*, pecorino romano*, œuf et poivre noir sur une base veloutée à la crème.'
          }
        }
      ]
    },

    {
      id: 'freschi',
      title: { en: 'I Freschi & Verdi', it: 'I Freschi & Verdi', de: 'I Freschi & Verdi', fr: 'I Freschi & Verdi' },
      sub: {
        en: 'Basil, freshness and Italian aroma',
        it: 'Basilico, freschezza e profumo d’Italia',
        de: 'Basilikum, Frische und italienisches Aroma',
        fr: 'Basilic, fraîcheur et arômes d’Italie'
      },
      items: [
        {
          id: 'pesto', price: '23', img: 'assets/img/pesto.jpg', addons: true,
          name: { en: 'Pesto — Tortiglioni', it: 'Pesto — Tortiglioni', de: 'Pesto — Tortiglioni', fr: 'Pesto — Tortiglioni' },
          desc: {
            en: 'Fresh basil pesto with parmigiano and extra virgin olive oil.',
            it: 'Pesto di basilico fresco con parmigiano e olio extravergine di oliva.',
            de: 'Frisches Basilikumpesto mit Parmigiano und nativem Olivenöl extra.',
            fr: 'Pesto de basilic frais, parmigiano et huile d’olive extra vierge.'
          }
        }
      ]
    },

    {
      id: 'ricchi',
      title: { en: 'Ricchi & Saporiti', it: 'Ricchi & Saporiti', de: 'Ricchi & Saporiti', fr: 'Ricchi & Saporiti' },
      sub: {
        en: 'Rich, hearty and comforting Italian sauces',
        it: 'Sughi italiani ricchi, sostanziosi e avvolgenti',
        de: 'Reichhaltige, herzhafte und wohltuende italienische Saucen',
        fr: 'Sauces italiennes riches, généreuses et réconfortantes'
      },
      items: [
        {
          id: 'vodka', price: '23', img: 'assets/img/vodka.jpg', addons: true,
          name: { en: 'Vodka Sauce — Tortiglioni', it: 'Vodka Sauce — Tortiglioni', de: 'Vodka Sauce — Tortiglioni', fr: 'Vodka Sauce — Tortiglioni' },
          desc: {
            en: 'Creamy tomato and vodka reduction — smooth and velvety.',
            it: 'Riduzione cremosa di pomodoro e vodka: morbida e vellutata.',
            de: 'Cremige Tomaten-Wodka-Reduktion — weich und samtig.',
            fr: 'Réduction crémeuse de tomate et vodka — douce et veloutée.'
          }
        },
        {
          id: 'bolognese', price: '24', img: 'assets/img/bolognese.jpg', addons: true,
          name: { en: 'Bolognese — Tagliatelle', it: 'Bolognese — Tagliatelle', de: 'Bolognese — Tagliatelle', fr: 'Bolognese — Tagliatelle' },
          desc: {
            en: 'Slow-cooked beef ragù served with traditional tagliatelle.',
            it: 'Ragù di manzo a cottura lenta servito con tagliatelle tradizionali.',
            de: 'Langsam geschmortes Rinderragù mit traditionellen Tagliatelle.',
            fr: 'Ragù de bœuf mijoté longuement servi avec des tagliatelles traditionnelles.'
          }
        }
      ]
    },

    {
      id: 'kids',
      title: { en: 'Kids Menu', it: 'Menù Bambini', de: 'Kindermenü', fr: 'Menu Enfants' },
      sub: {
        en: 'Simple, tasty and kid-friendly',
        it: 'Semplice, gustoso e a misura di bambino',
        de: 'Einfach, lecker und kindgerecht',
        fr: 'Simple, savoureux et adapté aux enfants'
      },
      items: [
        {
          id: 'kids-pomodoro', price: '10',
          name: { en: 'Kids Pomodoro', it: 'Kids Pomodoro', de: 'Kids Pomodoro', fr: 'Kids Pomodoro' },
          desc: { en: 'Spaghetti with tomato sauce.', it: 'Spaghetti al pomodoro.', de: 'Spaghetti mit Tomatensauce.', fr: 'Spaghetti à la sauce tomate.' }
        },
        {
          id: 'kids-olio', price: '10',
          name: { en: 'Kids Olio & Parmigiano', it: 'Kids Olio & Parmigiano', de: 'Kids Olio & Parmigiano', fr: 'Kids Olio & Parmigiano' },
          desc: { en: 'Spaghetti with olive oil and parmesan.', it: 'Spaghetti con olio d’oliva e parmigiano.', de: 'Spaghetti mit Olivenöl und Parmesan.', fr: 'Spaghetti à l’huile d’olive et parmesan.' }
        },
        {
          id: 'kids-bolognese', price: '12',
          name: { en: 'Kids Bolognese', it: 'Kids Bolognese', de: 'Kids Bolognese', fr: 'Kids Bolognese' },
          desc: { en: 'Tagliatelle with beef ragù.', it: 'Tagliatelle al ragù di manzo.', de: 'Tagliatelle mit Rinderragù.', fr: 'Tagliatelles au ragù de bœuf.' }
        }
      ]
    },

    {
      id: 'desserts',
      title: { en: 'Desserts da condividere', it: 'Dolci da condividere', de: 'Desserts da condividere', fr: 'Desserts da condividere' },
      sub: {
        en: 'Sweet Italian classics to share and finish your meal',
        it: 'Dolci classici italiani da condividere per chiudere il pasto',
        de: 'Süße italienische Klassiker zum Teilen als Abschluss',
        fr: 'Douceurs italiennes classiques à partager pour finir le repas'
      },
      items: [
        {
          id: 'cannoli', img: 'assets/img/cannoli.jpg',
          variants: [
            { label: { en: '2 pcs', it: '2 pz', de: '2 Stk.', fr: '2 pcs' }, price: '9' },
            { label: { en: '3 pcs', it: '3 pz', de: '3 Stk.', fr: '3 pcs' }, price: '12.50' },
            { label: { en: '4 pcs', it: '4 pz', de: '4 Stk.', fr: '4 pcs' }, price: '15' }
          ],
          name: { en: 'Cannoli', it: 'Cannoli', de: 'Cannoli', fr: 'Cannoli' },
          desc: {
            en: 'Crispy pastry shells filled with sweet ricotta cream and chocolate chips, finished with powdered sugar.',
            it: 'Scorze croccanti ripiene di crema dolce di ricotta e gocce di cioccolato, rifinite con zucchero a velo.',
            de: 'Knusprige Teigrollen gefüllt mit süßer Ricottacreme und Schokostückchen, mit Puderzucker bestäubt.',
            fr: 'Coques croustillantes garnies de crème de ricotta sucrée et pépites de chocolat, saupoudrées de sucre glace.'
          }
        },
        {
          id: 'tiramisu', price: '17',
          name: { en: 'Homemade Tiramisù', it: 'Tiramisù fatto in casa', de: 'Hausgemachtes Tiramisù', fr: 'Tiramisù maison' },
          desc: {
            en: 'Layers of espresso-soaked savoiardi biscuits and mascarpone cream, topped with cocoa powder.',
            it: 'Strati di savoiardi inzuppati nell’espresso e crema al mascarpone, con cacao in polvere.',
            de: 'Schichten aus espressogetränkten Savoiardi und Mascarponecreme, mit Kakaopulver bestäubt.',
            fr: 'Couches de biscuits savoiardi imbibés d’espresso et crème au mascarpone, saupoudrées de cacao.'
          }
        }
      ]
    },

    {
      id: 'drinks',
      title: { en: 'Soft Drinks', it: 'Bibite', de: 'Softdrinks', fr: 'Boissons' },
      sub: { en: '', it: '', de: '', fr: '' },
      items: [
        { id: 'coke', price: '5', name: { en: 'Coca-Cola Classic 375 ml', it: 'Coca-Cola Classic 375 ml', de: 'Coca-Cola Classic 375 ml', fr: 'Coca-Cola Classic 375 ml' } },
        { id: 'coke-zero', price: '5', name: { en: 'Coca-Cola Zero 375 ml', it: 'Coca-Cola Zero 375 ml', de: 'Coca-Cola Zero 375 ml', fr: 'Coca-Cola Zero 375 ml' } },
        { id: 'sparkling', price: '4', name: { en: 'Sparkling Water 500 ml', it: 'Acqua frizzante 500 ml', de: 'Sprudelwasser 500 ml', fr: 'Eau pétillante 500 ml' } },
        { id: 'aranciata', price: '6', name: { en: 'San Pellegrino Aranciata Rossa 330 ml', it: 'San Pellegrino Aranciata Rossa 330 ml', de: 'San Pellegrino Aranciata Rossa 330 ml', fr: 'San Pellegrino Aranciata Rossa 330 ml' } },
        { id: 'limonata', price: '6', name: { en: 'San Pellegrino Limonata 330 ml', it: 'San Pellegrino Limonata 330 ml', de: 'San Pellegrino Limonata 330 ml', fr: 'San Pellegrino Limonata 330 ml' } }
      ]
    }
  ]
};
