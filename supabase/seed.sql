-- ============================================================
-- Meloscent — Seed Data
-- Run AFTER 001_initial_schema.sql
-- Safe to re-run: uses ON CONFLICT DO NOTHING
-- ============================================================

-- ── Perfumes ─────────────────────────────────────────────────

INSERT INTO perfumes (id, designer, name, badge, mood, retail_price, gradient, accent, text_col, card_height, notes_top, notes_mid, notes_base) VALUES

-- Original 11 (IDs preserved for quiz/badge compatibility)
(1,  'Tom Ford',         'Black Orchid',          'Niche Luxury',       'Mysterious',     135, 'linear-gradient(155deg,#1a0a2e 0%,#2d1b4e 45%,#6b2d7a 100%)', '#d8a8ff', '#FAF3E8', 448,
  ARRAY['Bergamot','Black Truffle'], ARRAY['Black Orchid','Jasmine'], ARRAY['Sandalwood','Patchouli']),

(2,  'Creed',            'Aventus',               'Prestige',           'Woody',          395, 'linear-gradient(155deg,#1c3a1c 0%,#2d5a2d 45%,#8b7d55 100%)', '#d4af37', '#FAF3E8', 400,
  ARRAY['Blackcurrant','Apple','Bergamot'], ARRAY['Birch','Jasmine','Rose'], ARRAY['Musk','Oak Moss','Ambergris']),

(3,  'Maison Margiela',  'Replica Beach Walk',    'Artisan',            'Fresh Aquatic',  175, 'linear-gradient(155deg,#1a5f7a 0%,#2d9bb0 50%,#8fccd8 100%)', '#b8e8f0', '#FAF3E8', 480,
  ARRAY['Lemon','Bergamot','Pink Pepper'], ARRAY['Ylang-Ylang','Heliotrope'], ARRAY['Musk','Vanilla','Woody Notes']),

(4,  'Chanel',           'No. 5',                 'Heritage',           'Floral Aldehyde',155, 'linear-gradient(155deg,#9a7b4f 0%,#c9a96e 50%,#f0dec8 100%)', '#4a2800', '#2C1810', 420,
  ARRAY['Aldehyde','Neroli','Ylang-Ylang'], ARRAY['Iris','Rose','Jasmine'], ARRAY['Vetiver','Sandalwood','Civet']),

(5,  'YSL',              'Black Opium',           'Mainstream Luxury',  'Gourmand',       130, 'linear-gradient(155deg,#1a0505 0%,#5c1515 40%,#a83030 80%,#d45050 100%)', '#ffb3b3', '#FAF3E8', 468,
  ARRAY['Pink Pepper','Orange Blossom','Pear'], ARRAY['Coffee','Jasmine','Bitter Almond'], ARRAY['Patchouli','Vanilla','White Musk']),

(6,  'Dior',             'Sauvage',               'Prestige',           'Fresh Spicy',    120, 'linear-gradient(155deg,#0d1b2a 0%,#1b3a5c 50%,#3a7ab0 100%)', '#90caef', '#FAF3E8', 402,
  ARRAY['Bergamot','Pepper'], ARRAY['Lavender','Pink Pepper','Vetiver'], ARRAY['Ambroxan','Cedar','Labdanum']),

(7,  'Jo Malone',        'Peony & Blush Suede',   'British Niche',      'Floral',         160, 'linear-gradient(155deg,#7a2a4a 0%,#b86080 50%,#e8a8b8 100%)', '#ffd8e4', '#FAF3E8', 440,
  ARRAY['Red Apple','Peony'], ARRAY['Jasmine','Rose'], ARRAY['Suede','White Musk','Blush']),

(8,  'MFK',              'Baccarat Rouge 540',     'Ultra-Niche',        'Oriental Woody', 325, 'linear-gradient(155deg,#8b1a1a 0%,#c4602a 40%,#d4af37 80%,#f0d060 100%)', '#fff0b0', '#FAF3E8', 500,
  ARRAY['Jasmine','Saffron'], ARRAY['Amberwood','Ambergris','Fir Resin'], ARRAY['Suede','Cedar','Oakmoss']),

(9,  'Chanel',           'Chance Eau Tendre',     'Heritage',           'Fresh Floral',   145, 'linear-gradient(155deg,#4a8a4a 0%,#7ab87a 50%,#c8dfa8 100%)', '#1a4a1a', '#1a3a1a', 420,
  ARRAY['Grapefruit','Quince'], ARRAY['Hyacinth','Jasmine','Rose'], ARRAY['Iris','White Musk','Amber']),

(10, 'Viktor & Rolf',    'Flowerbomb',            'Mainstream Luxury',  'Floral',         120, 'linear-gradient(155deg,#5a1a4a 0%,#a050a0 50%,#d898d0 100%)', '#ffd8f8', '#FAF3E8', 462,
  ARRAY['Bergamot','Green Tea','Osmanthus'], ARRAY['Freesia','Jasmine','Rose','Orchid'], ARRAY['Patchouli','Musk','Vanilla']),

(11, 'Guerlain',         'Mon Guerlain',          'Heritage',           'Floral Gourmand',115, 'linear-gradient(155deg,#4a2a6a 0%,#8a5aa8 50%,#c8a0d8 100%)', '#f0d8ff', '#FAF3E8', 382,
  ARRAY['Bergamot','Lavender'], ARRAY['Jasmine Sambac','Lavender'], ARRAY['Sandalwood','Vanilla','Tonka Bean']),

-- Expanded catalog (IDs 12–22)
(12, 'Dolce & Gabbana',  'Light Blue',            'Mainstream Luxury',  'Fresh',           95, 'linear-gradient(155deg,#1a3a5c 0%,#2d7ab0 50%,#88ccee 100%)', '#c8eeff', '#FAF3E8', 420,
  ARRAY['Sicilian Citron','Apple','Cedar'], ARRAY['Bamboo','Jasmine','White Rose'], ARRAY['Cedarwood','Amber','Musk']),

(13, 'Versace',          'Eros',                  'Mainstream Luxury',  'Fresh Spicy',    110, 'linear-gradient(155deg,#003d3d 0%,#006666 50%,#00a693 100%)', '#aafff0', '#FAF3E8', 430,
  ARRAY['Mint','Green Apple','Lemon'], ARRAY['Tonka Bean','Ambroxan','Geranium'], ARRAY['Vanilla','Vetiver','Oakmoss']),

(14, 'Chanel',           'Bleu de Chanel',        'Prestige',           'Fresh Woody',    165, 'linear-gradient(155deg,#0a1628 0%,#1a2d5a 50%,#2a4a8a 100%)', '#88aadd', '#FAF3E8', 410,
  ARRAY['Citrus','Mint','Pink Pepper'], ARRAY['Ginger','Nutmeg','Jasmine'], ARRAY['Sandalwood','Cedar','Vetiver']),

(15, 'Paco Rabanne',     '1 Million',             'Mainstream Luxury',  'Oriental Spicy', 110, 'linear-gradient(155deg,#7a5500 0%,#c49b2a 50%,#f0d060 100%)', '#fff0b0', '#2C1810', 450,
  ARRAY['Blood Mandarin','Mint','Grapefruit'], ARRAY['Rose','Cinnamon','Spices'], ARRAY['Leather','Ambergris','Patchouli']),

(16, 'Chanel',           'Coco Mademoiselle',     'Heritage',           'Oriental Floral',155, 'linear-gradient(155deg,#3a1a00 0%,#6b3a10 50%,#c4843a 100%)', '#ffd8a0', '#FAF3E8', 440,
  ARRAY['Orange','Bergamot','Grapefruit'], ARRAY['Rose','Jasmine','Mimosa'], ARRAY['Patchouli','Vetiver','Musk']),

(17, 'Giorgio Armani',   'Acqua di Gio',          'Prestige',           'Fresh Aquatic',  130, 'linear-gradient(155deg,#0d2d3a 0%,#1a6a8a 50%,#4aaabb 100%)', '#88eeff', '#FAF3E8', 390,
  ARRAY['Lime','Lemon','Bergamot'], ARRAY['Jasmine','Calone','Rosemary'], ARRAY['Cedar','Patchouli','Musk']),

(18, 'Marc Jacobs',      'Daisy',                 'Mainstream Luxury',  'Floral',         120, 'linear-gradient(155deg,#a04060 0%,#c87090 50%,#f0c0d0 100%)', '#ffd8e8', '#FAF3E8', 400,
  ARRAY['Strawberry','Violet Leaf','Grapefruit'], ARRAY['Gardenia','Violet','Jasmine'], ARRAY['White Woods','Vanilla','Musk']),

(19, 'Thierry Mugler',   'Angel',                 'Mainstream Luxury',  'Oriental Gourmand', 125, 'linear-gradient(155deg,#0a0820 0%,#1a0a40 40%,#3a1a70 80%,#6a2aaa 100%)', '#c8b0ff', '#FAF3E8', 480,
  ARRAY['Bergamot','Melon','Mandarin'], ARRAY['Honey','Red Fruits','Plum'], ARRAY['Patchouli','Caramel','Chocolate','Vanilla']),

(20, 'Narciso Rodriguez','For Her',               'Niche Luxury',       'Floral Musk',    140, 'linear-gradient(155deg,#c8a090 0%,#d8b8a8 50%,#ead0c0 100%)', '#5a3020', '#2C1810', 420,
  ARRAY['Rose','Peach','Osmanthus'], ARRAY['Rose','Musk','Vetiver'], ARRAY['Sandalwood','Musk','Cedar']),

(21, 'Paco Rabanne',     'Olympea',               'Mainstream Luxury',  'Floral Gourmand',105, 'linear-gradient(155deg,#c0a0d0 0%,#a080b0 50%,#8060a0 100%)', '#ffe0f8', '#FAF3E8', 430,
  ARRAY['Green Mandarin','Ginger'], ARRAY['Jasmine','Water Jasmine'], ARRAY['Sandalwood','Cashmere Wood','Ambergris']),

(22, 'Burberry',         'Her',                   'British Niche',      'Fruity Floral',  120, 'linear-gradient(155deg,#6b1a2a 0%,#a03050 50%,#d06080 100%)', '#ffc0d0', '#FAF3E8', 395,
  ARRAY['Blackcurrant','Strawberry','Raspberry'], ARRAY['Jasmine','Violet'], ARRAY['Amber','Musk','Sandalwood']),

-- Second expansion (IDs 23–36)
(23, 'YSL',              'Libre',                 'Mainstream Luxury',  'Floral Woody',   115, 'linear-gradient(155deg,#2a1050 0%,#6a2a90 45%,#d4602a 100%)', '#ffaa60', '#FAF3E8', 440,
  ARRAY['Lavender','Bergamot','Mandarin'], ARRAY['Orange Blossom','Lavender','Jasmine'], ARRAY['Vanilla','White Musk','Cedarwood']),

(24, 'Dior',             'Miss Dior Blooming Bouquet', 'Prestige',      'Fruity Floral',  145, 'linear-gradient(155deg,#c04060 0%,#e08098 50%,#f8c8d4 100%)', '#7a1030', '#2C1810', 415,
  ARRAY['Peach','Bergamot','Pink Pepper'], ARRAY['Peony','Rose','Apricot Flower'], ARRAY['White Musk','Patchouli']),

(25, 'Carolina Herrera', 'Good Girl',             'Mainstream Luxury',  'Oriental Floral',130, 'linear-gradient(155deg,#080818 0%,#18184a 40%,#b89010 100%)', '#d4af37', '#FAF3E8', 458,
  ARRAY['Coffee','Almond','Bergamot'], ARRAY['Tuberose','Jasmine','Cocoa'], ARRAY['Sandalwood','Patchouli','Benzoin']),

(26, 'Lancôme',          'La Vie Est Belle',      'Mainstream Luxury',  'Floral Gourmand',120, 'linear-gradient(155deg,#7a1a5a 0%,#b84a88 50%,#e898c0 100%)', '#ffc8e8', '#FAF3E8', 422,
  ARRAY['Blackcurrant','Pear'], ARRAY['Iris','Jasmine','Orange Blossom'], ARRAY['Praline','Vanilla','Patchouli']),

(27, 'Parfums de Marly', 'Layton',                'Ultra-Niche',        'Oriental Woody', 325, 'linear-gradient(155deg,#0f0820 0%,#2a1248 40%,#6a3a18 75%,#c48030 100%)', '#e8c870', '#FAF3E8', 492,
  ARRAY['Apple','Bergamot','Cardamom'], ARRAY['Vanilla','Jasmine','Violet'], ARRAY['Sandalwood','Pepper','Guaiac Wood']),

(28, 'Hermès',           'Terre d''Hermès',       'Prestige',           'Woody Earthy',   150, 'linear-gradient(155deg,#2a1005 0%,#7a3a10 50%,#c87030 100%)', '#ffa850', '#FAF3E8', 432,
  ARRAY['Orange','Grapefruit','Flint'], ARRAY['Pepper','Geranium','Pelargonium'], ARRAY['Vetiver','Benzoin','Cedar']),

(29, 'Tom Ford',         'Oud Wood',              'Niche Luxury',       'Woody Oriental', 195, 'linear-gradient(155deg,#150505 0%,#3a1210 40%,#8a3a10 100%)', '#c4783a', '#FAF3E8', 448,
  ARRAY['Oud Wood','Rosewood','Cardamom'], ARRAY['Sandalwood','Vetiver','Amber'], ARRAY['Tonka Bean','Vanilla','Musk']),

(30, 'Gucci',            'Bloom',                 'Mainstream Luxury',  'Floral',         120, 'linear-gradient(155deg,#1a3a0a 0%,#4a7a2a 50%,#c8e0a0 100%)', '#2a4a10', '#1a3a0a', 395,
  ARRAY['Tuberose','Rangoon Creeper'], ARRAY['Jasmine','Tuberose','Rangoon Creeper'], ARRAY['Orris','Sandalwood']),

(31, 'Le Labo',          'Santal 33',             'Ultra-Niche',        'Woody Leathery', 260, 'linear-gradient(155deg,#3a2005 0%,#7a4a15 50%,#c89845 100%)', '#f0d060', '#FAF3E8', 472,
  ARRAY['Violet','Cardamom','Iris'], ARRAY['Papyrus','Ambrox','Cedarwood'], ARRAY['Sandalwood','Leather','Musk']),

(32, 'Dior',             'J''adore',              'Prestige',           'Floral',         140, 'linear-gradient(155deg,#786005 0%,#b89020 50%,#f0d060 100%)', '#5a4000', '#2C1810', 425,
  ARRAY['Melon','Bergamot','Magnolia'], ARRAY['Rose','Jasmine','Violet'], ARRAY['Musk','Blackberry','Sandalwood']),

(33, 'Parfums de Marly', 'Delina',                'Ultra-Niche',        'Floral Chypre',  270, 'linear-gradient(155deg,#901848 0%,#c04878 50%,#e898b8 100%)', '#ffe0f0', '#FAF3E8', 465,
  ARRAY['Rhubarb','Nutmeg','Lychee'], ARRAY['Turkish Rose','Peony','Musk'], ARRAY['Cashmeran','Vetiver','Vanilla']),

(34, 'Davidoff',         'Cool Water',            'Mainstream Luxury',  'Fresh Aquatic',   75, 'linear-gradient(155deg,#001828 0%,#003868 50%,#1a68a8 100%)', '#80ccff', '#FAF3E8', 385,
  ARRAY['Dihydromyrcenol','Mint','Coriander'], ARRAY['Sandalwood','Neroli','Geranium'], ARRAY['Tobacco','Musk','Amber']),

(35, 'Versace',          'Bright Crystal',        'Mainstream Luxury',  'Fruity Floral',   90, 'linear-gradient(155deg,#1a4a6a 0%,#3a80aa 50%,#a8cce0 100%)', '#ddf0ff', '#FAF3E8', 400,
  ARRAY['Pomegranate','Yuzu','Lotus'], ARRAY['Peony','Magnolia','Rose'], ARRAY['Musk','Amber','Mahogany']),

(36, 'Giorgio Armani',   'Sì',                    'Prestige',           'Floral Chypre',  125, 'linear-gradient(155deg,#3a0810 0%,#780a28 50%,#c04060 100%)', '#ffb8c8', '#FAF3E8', 435,
  ARRAY['Blackcurrant','Freesia','Bergamot'], ARRAY['Rose','Neroli','Freesia'], ARRAY['Ambroxan','Patchouli','Vanilla']),

-- Men's expansion (IDs 37–42)
(37, 'Paco Rabanne',     'Invictus',              'Mainstream Luxury',  'Fresh Aquatic',  105, 'linear-gradient(155deg,#1a1a2a 0%,#3a3a5a 50%,#8a9ab0 100%)', '#c8d8f0', '#FAF3E8', 410,
  ARRAY['Grapefruit','Marine Accord','Mandarin'], ARRAY['Jasmine','Guaiac Wood','Hedione'], ARRAY['Ambergris','Oakmoss','Patchouli']),

(38, 'Jean Paul Gaultier','Le Male',              'Mainstream Luxury',  'Oriental Spicy',  95, 'linear-gradient(155deg,#0a1428 0%,#1a2a50 50%,#3a5a8a 100%)', '#c0d8f8', '#FAF3E8', 445,
  ARRAY['Mint','Tarragon','Cardamom'], ARRAY['Cumin','Lavender','Cinnamon'], ARRAY['Vanilla','Sandalwood','Amber']),

(39, 'Dolce & Gabbana',  'The One Men',           'Mainstream Luxury',  'Oriental Woody', 115, 'linear-gradient(155deg,#4a2800 0%,#8a5010 50%,#d4a030 100%)', '#ffe0a0', '#FAF3E8', 428,
  ARRAY['Grapefruit','Coriander','Basil'], ARRAY['Ginger','Cardamom','Tobacco'], ARRAY['Cedar','Amber','Musk']),

(40, 'YSL',              'La Nuit de l''Homme',  'Prestige',           'Spicy Floral',   110, 'linear-gradient(155deg,#030310 0%,#0a0a28 50%,#1a1a50 100%)', '#a0a8e0', '#FAF3E8', 420,
  ARRAY['Cardamom','Bergamot','Vetiver'], ARRAY['Lavender','Cedar','Caraway'], ARRAY['Amberwood','Coumarin','Vetiver']),

(41, 'Hugo Boss',        'The Scent',             'Mainstream Luxury',  'Oriental Spicy',  90, 'linear-gradient(155deg,#1a0808 0%,#4a1808 50%,#8a3820 100%)', '#e0a860', '#FAF3E8', 395,
  ARRAY['Ginger','Maninka Fruit'], ARRAY['Lavender','Osmanthus'], ARRAY['Leather','Musk','Vetiver']),

(42, 'Montblanc',        'Explorer',              'Mainstream Luxury',  'Woody Aromatic',  85, 'linear-gradient(155deg,#0a2010 0%,#184a28 50%,#3a7a50 100%)', '#a0d0a8', '#FAF3E8', 388,
  ARRAY['Bergamot','Vetiver','Patchouli'], ARRAY['Clary Sage','Papyrus'], ARRAY['Cedarwood','Ambroxan','Musk']),

-- Women's additions (IDs 43–46)
(43, 'Thierry Mugler',   'Alien',                 'Mainstream Luxury',  'Floral Woody',   120, 'linear-gradient(155deg,#4a3000 0%,#9a7010 50%,#e0c030 100%)', '#ffe880', '#2C1810', 452,
  ARRAY['Casablanca Lily'], ARRAY['Jasmine Sambac','Cashmeran'], ARRAY['White Amber','Woods']),

(44, 'Givenchy',         'L''Interdit',           'Prestige',           'Floral Woody',   130, 'linear-gradient(155deg,#1a0818 0%,#3a1040 50%,#7a2a6a 100%)', '#e8c0f0', '#FAF3E8', 418,
  ARRAY['Pear','Bergamot','Almond'], ARRAY['Tuberose','Orange Blossom','Jasmine'], ARRAY['Patchouli','Sandalwood','Vetiver']),

(45, 'Valentino',        'Donna Born in Roma',    'Prestige',           'Floral Chypre',  145, 'linear-gradient(155deg,#3a1a08 0%,#8a4820 50%,#d8a870 100%)', '#ffe0c0', '#FAF3E8', 435,
  ARRAY['Blackcurrant','Bergamot','Pear'], ARRAY['Rose','Jasmine','Iris'], ARRAY['Vanilla','Musk','Cedarwood']),

(46, 'Dolce & Gabbana',  'The One Women',         'Mainstream Luxury',  'Floral Oriental',115, 'linear-gradient(155deg,#6a3a10 0%,#c07830 50%,#e8c080 100%)', '#fff0d0', '#2C1810', 415,
  ARRAY['Mandarin','Peach','Lychee'], ARRAY['Lily','Marigold','Jasmine'], ARRAY['Musk','Amber','Vanilla']),

-- Niche additions (IDs 47–48)
(47, 'Initio',           'Oud for Greatness',     'Ultra-Niche',        'Woody Oriental', 280, 'linear-gradient(155deg,#050510 0%,#150520 40%,#3a0a10 100%)', '#c89840', '#FAF3E8', 488,
  ARRAY['Oud','Saffron','Nutmeg'], ARRAY['Patchouli','Amyris'], ARRAY['Musk','Ambergris','Civet']),

(48, 'Byredo',           'Gypsy Water',           'Ultra-Niche',        'Woody Aromatic',   220, 'linear-gradient(155deg,#0a1a08 0%,#1a3818 50%,#4a7a40 100%)', '#b0d8a0', '#FAF3E8', 462,
  ARRAY['Bergamot','Lemon','Pepper'], ARRAY['Incense','Orris','Pine Needles'], ARRAY['Sandalwood','Vanilla','Amber']),

(49, 'Thierry Mugler',  'Angel',                 'Mainstream Luxury',  'Gourmand Oriental', 115, 'linear-gradient(155deg,#020818 0%,#0a1840 50%,#1a3880 100%)', '#80b0ff', '#FAF3E8', 455,
  ARRAY['Bergamot','Melon','Cotton Candy'], ARRAY['Honey','Jasmine','Peach'], ARRAY['Vanilla','Patchouli','Chocolate']),

(50, 'Narciso Rodriguez','For Her',              'Prestige',           'Musky Floral',      120, 'linear-gradient(155deg,#3a1828 0%,#7a3858 50%,#c07888 100%)', '#ffd0e0', '#FAF3E8', 405,
  ARRAY['Rose','Peach','Osmanthus'], ARRAY['Muguet','Jasmine','Magnolia'], ARRAY['Musk','Vetiver','Amber']),

(51, 'Acqua di Parma',  'Colonia',               'Niche Luxury',       'Fresh Citrus',      155, 'linear-gradient(155deg,#5a4800 0%,#c89800 50%,#f0d840 100%)', '#2C1810', '#2C1810', 425,
  ARRAY['Calabrian Bergamot','Lemon','Grapefruit'], ARRAY['Lavender','Rose','Neroli'], ARRAY['Sandalwood','Vetiver','Oakmoss']),

(52, 'Amouage',         'Interlude Man',          'Ultra-Niche',        'Oriental Aromatic', 350, 'linear-gradient(155deg,#050808 0%,#151818 50%,#303820 100%)', '#c8a840', '#FAF3E8', 495,
  ARRAY['Oregano','Bergamot','Amber Accord'], ARRAY['Incense','Labdanum','Agarwood'], ARRAY['Sandalwood','Benzoin','Leather']),

(53, 'Frederic Malle',  'Portrait of a Lady',    'Ultra-Niche',        'Floral Oriental',   365, 'linear-gradient(155deg,#280a10 0%,#680820 50%,#a82838 100%)', '#ffa8b8', '#FAF3E8', 480,
  ARRAY['Blackcurrant','Raspberry','Cinnamon'], ARRAY['Turkish Rose','Patchouli','Sandalwood'], ARRAY['Musk','Benzoin','Frankincense']),

(54, 'Xerjoff',         'Naxos',                 'Ultra-Niche',        'Gourmand Woody',    390, 'linear-gradient(155deg,#3a1800 0%,#8a4800 50%,#d89030 100%)', '#ffe8b0', '#2C1810', 485,
  ARRAY['Bergamot','Lemon','Lavender'], ARRAY['Honey','Tobacco','Immortelle'], ARRAY['Tonka Bean','Vanilla','Sandalwood']),

(55, 'Prada',           'Candy',                 'Prestige',           'Gourmand',          135, 'linear-gradient(155deg,#400820 0%,#902858 50%,#e07898 100%)', '#ffe8f0', '#FAF3E8', 395,
  ARRAY['Caramel','Musk'], ARRAY['Benzyl Salicylate','White Musk'], ARRAY['Vanilla','Caramel','Benzoin']),

(56, 'By Kilian',       'Black Phantom',          'Ultra-Niche',        'Gourmand Dark',     280, 'linear-gradient(155deg,#020202 0%,#100808 50%,#281410 100%)', '#c07840', '#FAF3E8', 475,
  ARRAY['Rum Accord','Black Pepper'], ARRAY['Coffee','Almond','Dark Rum'], ARRAY['Sugar Cane','Sandalwood','Vetiver']),

(57, 'YSL',             'Mon Paris',              'Mainstream Luxury',  'Floral Fruity',     105, 'linear-gradient(155deg,#380010 0%,#900828 50%,#e03058 100%)', '#ffb0c8', '#FAF3E8', 408,
  ARRAY['Strawberry','Raspberry','White Datura'], ARRAY['Peony','Rose','Jasmine'], ARRAY['Patchouli','White Musk','Ambroxan']),

(58, 'Dolce & Gabbana', 'Light Blue',             'Mainstream Luxury',  'Fresh Citrus',       95, 'linear-gradient(155deg,#001830 0%,#004870 50%,#00a0c0 100%)', '#b0f0ff', '#FAF3E8', 390,
  ARRAY['Sicilian Lemon','Apple','Bluebell'], ARRAY['Bamboo','Jasmine','White Rose'], ARRAY['Cedarwood','Amber','Musk']),

(59, 'Maison Margiela', 'Replica Jazz Club',      'Artisan',            'Warm Woody',        175, 'linear-gradient(155deg,#200808 0%,#501820 50%,#904838 100%)', '#f0c090', '#FAF3E8', 445,
  ARRAY['Neroli','Vetiver','Pink Pepper'], ARRAY['Tobacco Leaf','Rum Accord','Clary Sage'], ARRAY['Vanilla','Musk','Styrax']),

(60, 'Diptyque',        'Philosykos',             'Niche Luxury',       'Woody Green',       190, 'linear-gradient(155deg,#080f00 0%,#1a2808 50%,#4a6820 100%)', '#c8e880', '#FAF3E8', 460,
  ARRAY['Fig Leaf','Fig Tree Bark'], ARRAY['Fig Blossom','White Cedar'], ARRAY['Fig Wood','Creamy Woods','Benzoin']),

-- Premium additions (IDs 61–75)
(61, 'MFK',             'Oud Satin Mood',         'Ultra-Niche',        'Velvety Oriental',  390, 'linear-gradient(155deg,#080010 0%,#200838 50%,#580858 100%)', '#d8a0ff', '#FAF3E8', 490,
  ARRAY['Rose','Saffron','Jasmine'], ARRAY['Oud','Benzoin','Turkish Rose'], ARRAY['Vanilla','Amber','Musk']),

(62, 'Creed',           'Royal Oud',              'Prestige',           'Woody Royal',       460, 'linear-gradient(155deg,#050f00 0%,#101a05 50%,#2a3a10 100%)', '#c8d080', '#FAF3E8', 468,
  ARRAY['Pink Pepper','Bergamot','Lemon'], ARRAY['Oud','Cypress','Juniper'], ARRAY['Patchouli','Vetiver','Amber']),

(63, 'Jo Malone',       'Lime Basil & Mandarin',  'British Niche',      'Fresh Citrus Green',155, 'linear-gradient(155deg,#1a3a10 0%,#3a7020 50%,#80c030 100%)', '#e0ffb0', '#1a3010', 390,
  ARRAY['Lime','Mandarin','Bergamot'], ARRAY['Basil','White Thyme','Violet'], ARRAY['Amber','White Musk','Patchouli']),

(64, 'Chanel',          'Allure Homme Sport',     'Heritage',           'Fresh Sporty',      125, 'linear-gradient(155deg,#080c18 0%,#101828 50%,#203050 100%)', '#b0ccf0', '#FAF3E8', 408,
  ARRAY['Aldehydes','Bergamot','Mandarin Orange'], ARRAY['Iris','Cedar','White Pepper'], ARRAY['Vetiver','White Musk','Tonka Bean']),

(65, 'Maison Margiela', 'Replica Flower Market',  'Artisan',            'Dewy Floral',       175, 'linear-gradient(155deg,#1a0820 0%,#502050 50%,#a06090 100%)', '#ffd0e8', '#FAF3E8', 442,
  ARRAY['Bergamot','Peony','Freesia'], ARRAY['Rose','Lilac','Muguet'], ARRAY['White Musk','Sandalwood','Amber']),

(66, 'Paco Rabanne',    'Lady Million',           'Mainstream Luxury',  'Floral Chypre',     105, 'linear-gradient(155deg,#4a3000 0%,#a08010 50%,#e8c830 100%)', '#fff0a0', '#2C1810', 445,
  ARRAY['Raspberry','Neroli','Peach'], ARRAY['Gardenia','Orange Blossom','Rose'], ARRAY['Patchouli','Amber','Honey']),

(67, 'Chanel',          'Allure',                 'Heritage',           'Floral Oriental',   145, 'linear-gradient(155deg,#4a2808 0%,#9a6020 50%,#d4b060 100%)', '#ffe8b0', '#2C1810', 418,
  ARRAY['Vanilla','Mandarin Orange','Peach'], ARRAY['Iris','Rose','Lily of the Valley'], ARRAY['Vanilla','Sandalwood','Amber']),

(68, 'Giorgio Armani',  'Code',                   'Prestige',           'Oriental Woody',    110, 'linear-gradient(155deg,#050308 0%,#100808 50%,#281810 100%)', '#d8c0a0', '#FAF3E8', 415,
  ARRAY['Bergamot','Lemon','Star Anise'], ARRAY['Olive Blossom','Rosewood','Sage'], ARRAY['Tonka Bean','Vanilla','Guaiac Wood']),

(69, 'Issey Miyake',    'L''Eau d''Issey',        'Mainstream Luxury',  'Fresh Aquatic Floral', 95, 'linear-gradient(155deg,#1a3a5a 0%,#2860a0 50%,#60a8d8 100%)', '#d0f0ff', '#FAF3E8', 400,
  ARRAY['Lotus','Freesia','Cyclamen'], ARRAY['White Lily','Carnation','Peony'], ARRAY['Cedar','Musk','Civet']),

(70, 'Byredo',          'Bal d''Afrique',         'Ultra-Niche',        'Floral Woody Citrus',220, 'linear-gradient(155deg,#2a1a00 0%,#7a5010 50%,#c89040 100%)', '#ffe0a0', '#FAF3E8', 472,
  ARRAY['Bergamot','Violet Leaf','African Marigold'], ARRAY['Neroli','Jasmine','African Geranium'], ARRAY['Vetiver','Musk','Cedarwood']),

(71, 'YSL',             'Opium',                  'Heritage',           'Oriental Spicy',    130, 'linear-gradient(155deg,#0a0000 0%,#280500 50%,#680010 100%)', '#ffa050', '#FAF3E8', 480,
  ARRAY['Coriander','Pepper','Mandarin'], ARRAY['Rose','Jasmine','Cinnamon'], ARRAY['Incense','Sandalwood','Vanilla']),

(72, 'Serge Lutens',    'Ambre Sultan',           'Ultra-Niche',        'Warm Oriental',     155, 'linear-gradient(155deg,#2a1000 0%,#6a3000 50%,#c07818 100%)', '#ffc070', '#FAF3E8', 475,
  ARRAY['Oregano','Bay Leaf','Coriander'], ARRAY['Amber','Plant Resins','Labdanum'], ARRAY['Benzoin','Beeswax','Musk']),

(73, 'Tom Ford',        'Tobacco Vanille',        'Niche Luxury',       'Gourmand Woody',    195, 'linear-gradient(155deg,#1a0a00 0%,#3a1800 50%,#8a4010 100%)', '#e8c090', '#FAF3E8', 488,
  ARRAY['Tobacco Leaf','Spices','Clove'], ARRAY['Tobacco Blossom','Jasmine','Ginger'], ARRAY['Vanilla','Tonka Bean','Cocoa']),

(74, 'Guerlain',        'Shalimar',               'Heritage',           'Oriental Vanilla',  145, 'linear-gradient(155deg,#3a1808 0%,#8a4818 50%,#d0901a 100%)', '#ffe8b0', '#FAF3E8', 478,
  ARRAY['Lemon','Bergamot','Aldehydes'], ARRAY['Iris','Jasmine','Rose'], ARRAY['Civet','Vanilla','Opoponax']),

(75, 'Dior',            'Homme',                  'Prestige',           'Powdery Iris',      125, 'linear-gradient(155deg,#0a0818 0%,#181828 50%,#302840 100%)', '#c8c0e0', '#FAF3E8', 420,
  ARRAY['Lemon','Bergamot','Aldehydes'], ARRAY['Iris','Violet','Ambroxan'], ARRAY['Vetiver','Patchouli','Cedarwood'])

ON CONFLICT (id) DO NOTHING;

-- Reset identity sequences
SELECT setval(pg_get_serial_sequence('perfumes','id'), (SELECT MAX(id) FROM perfumes));


-- ── Dupes ────────────────────────────────────────────────────

INSERT INTO dupes (perfume_id, brand, name, price_usd, match_score) VALUES
(1,  'Zara',    'Black Oud',                  '$19.99', 89),
(2,  'Armaf',   'Club de Nuit',               '$35.00', 92),
(3,  'Pacifica','Tahitian Gardenia',           '$28.00', 87),
(4,  'Zara',    'Emotions No. 5',             '$22.00', 91),
(5,  'Dossier', 'Ambery Vanilla',             '$49.00', 94),
(6,  'Armaf',   'Club de Nuit Intense Man',   '$32.00', 90),
(7,  'Zara',    'Peony',                      '$18.00', 85),
(8,  'Lattafa', 'Badee Al Oud',               '$25.00', 93),
(9,  'Zara',    'Gardenia',                   '$16.00', 86),
(10, 'Zara',    'Femme',                      '$17.00', 88),
(11, 'Dossier', 'Sweet Iris',                 '$29.00', 88),
(12, 'Zara',    'Sea Flowers',                '$18.00', 88),
(13, 'Armaf',   'Tres Nuit',                  '$30.00', 87),
(14, 'Armaf',   'Club de Nuit Blue',          '$28.00', 88),
(15, 'Lattafa', 'Asad',                       '$22.00', 87),
(16, 'Zara',    'Red Temptation',             '$20.00', 88),
(17, 'Armaf',   'Storm Sport',                '$25.00', 88),
(18, 'Zara',    'Wild Gardenia',              '$16.00', 85),
(19, 'Dossier', 'Gourmand Patchouli',         '$29.00', 90),
(20, 'Dossier', 'Floral Musk',               '$29.00', 87),
(21, 'Zara',    'Vibrant Leather',            '$19.00', 85),
(22, 'Zara',    'Rich Warm',                  '$18.00', 84),
(23, 'Dossier', 'Floral Orange Blossom',      '$29.00', 88),
(24, 'Zara',    'Fleur D''Or',               '$16.00', 87),
(25, 'Lattafa', 'Yara Moi',                   '$18.00', 89),
(26, 'Zara',    'Joy',                         '$17.00', 87),
(27, 'Armaf',   'Tag Him',                    '$28.00', 89),
(28, 'Rasasi',  'Al Wisam Day',               '$22.00', 85),
(29, 'Lattafa', 'Oud Mood',                   '$25.00', 88),
(30, 'Zara',    'White Jasmine',              '$16.00', 84),
(31, 'Dossier', 'Woody Sandalwood',           '$29.00', 87),
(32, 'Zara',    'Golden Years',               '$18.00', 86),
(33, 'Zara',    'Rose Gourmand',              '$16.00', 88),
(34, 'Zara',    'Marine',                     '$14.00', 83),
(35, 'Zara',    'Crystal',                    '$15.00', 84),
(36, 'Dossier', 'Floral Blackcurrant',        '$29.00', 87),
(37, 'Zara',    'Seoul Vibe',                 '$16.00', 84),
(38, 'Armaf',   'Club Milestone',             '$28.00', 88),
(39, 'Dossier', 'Woody Tobacco',              '$29.00', 87),
(40, 'Dossier', 'Spicy Cardamom',             '$29.00', 87),
(41, 'Armaf',   'Italiano Uomo',              '$22.00', 84),
(42, 'Zara',    'Adventure Amazonia',         '$14.00', 82),
(43, 'Dossier', 'Floral Casablanca',          '$29.00', 86),
(44, 'Zara',    'Blackberry & Peony',         '$16.00', 85),
(45, 'Dossier', 'Floral Vanilla',             '$29.00', 87),
(46, 'Zara',    'Warm Amber',                 '$15.00', 84),
(47, 'Lattafa', 'Oud for Glory',              '$28.00', 87),
(48, 'Dossier', 'Woody Pine',                 '$29.00', 85),
(49, 'Dossier', 'Gourmand Patchouli',         '$29.00', 88),
(50, 'Zara',    'White Tuberose',             '$18.00', 87),
(51, 'Zara',    'Mediterraneo',               '$15.00', 84),
(52, 'Lattafa', 'Khamrah',                    '$25.00', 86),
(53, 'Dossier', 'Floral Rose',                '$29.00', 88),
(54, 'Dossier', 'Gourmand Tobacco',           '$29.00', 89),
(55, 'Zara',    'Sweet Vanilla',              '$15.00', 86),
(56, 'Dossier', 'Gourmand Rum',               '$29.00', 88),
(57, 'Zara',    'Femme',                      '$18.00', 85),
(58, 'Zara',    'Fresh Water',                '$15.00', 87),
(59, 'Lattafa', 'Raghba',                     '$22.00', 86),
(60, 'Dossier', 'Woody Fig',                  '$29.00', 85),

-- Premium additions (IDs 61–75)
(61, 'Lattafa',          'Velvet Oud',             '$18.00', 88),
(62, 'Armaf',            'Tres Nuit',              '$30.00', 87),
(63, 'Zara',             'Frosted Lime',           '$15.00', 87),
(64, 'Armaf',            'Nightclub Sports',       '$22.00', 88),
(65, 'Dossier',          'Floral Roses & Jasmine', '$30.00', 86),
(66, 'Armaf',            'Tres Belle',             '$25.00', 88),
(67, 'Dossier',          'Floral Vanilla Rose',    '$29.00', 87),
(68, 'Armaf',            'Italiano Black',         '$22.00', 87),
(69, 'Dossier',          'Aquatic Freesia',        '$29.00', 85),
(70, 'Dossier',          'Floral Neroli & Musk',   '$30.00', 87),
(71, 'Al Haramain',      'Opium Night',            '$25.00', 87),
(72, 'Lattafa',          'Ambar Al Hind',          '$18.00', 88),
(73, 'Maison Alhambra',  'Tobacco Wood',           '$25.00', 91),
(74, 'Paris Corner',     'Shalimar Clone',         '$20.00', 87),
(75, 'Maison Alhambra',  'Homme de Maison',        '$25.00', 88)

ON CONFLICT DO NOTHING;


-- ── Dupe corrections ─────────────────────────────────────────
-- Research-validated replacements for inaccurate or suboptimal dupes

UPDATE dupes SET brand='Dossier',        name='Aquatic Coconut & Tiare', price_usd='$30.00', match_score=88 WHERE perfume_id=3;
UPDATE dupes SET brand='Lattafa',         name='Asad',                   price_usd='$22.00', match_score=90 WHERE perfume_id=6;
UPDATE dupes SET brand='Lattafa',         name='Mayar',                  price_usd='$20.00', match_score=89 WHERE perfume_id=10;
UPDATE dupes SET brand='Armaf',           name='Club de Nuit Blue',      price_usd='$25.00', match_score=91 WHERE perfume_id=14;
UPDATE dupes SET brand='Al Haramain',     name='Aqua',                   price_usd='$22.00', match_score=90 WHERE perfume_id=17;
UPDATE dupes SET brand='Lattafa',         name='La Vita',                price_usd='$18.00', match_score=89 WHERE perfume_id=26;
UPDATE dupes SET brand='Maison Alhambra', name='Santal Wood',            price_usd='$25.00', match_score=91 WHERE perfume_id=31;
UPDATE dupes SET brand='Al Haramain',     name='Anber Hayati',           price_usd='$25.00', match_score=87 WHERE perfume_id=49;
UPDATE dupes SET brand='Maison Alhambra', name='Interlude',              price_usd='$25.00', match_score=92 WHERE perfume_id=52;
UPDATE dupes SET brand='Lattafa',         name='Portrait',               price_usd='$22.00', match_score=88 WHERE perfume_id=53;


-- ── Blog Posts ───────────────────────────────────────────────

INSERT INTO blog_posts (id, category, title, excerpt, gradient, read_time, content, published) VALUES

(1, 'Dupe Guide', 'The Art of Dupes: You Don''t Need $300 Perfume',
  'Luxury fragrance dupes have come a long way. Discover how modern perfumery makes exquisite scents accessible at every budget.',
  'linear-gradient(155deg,#8b4513 0%,#c4843a 100%)', '5 min read',
  ARRAY[
    'For decades, the fragrance world operated on a simple premise: luxury costs money. Iconic bottles lined department store counters with prices that put them out of reach for most. But something shifted quietly in the last decade — the democratisation of scent.',
    'Modern fragrance houses have mastered the art of sourcing identical aromatic molecules. The same ISO E Super that gives Dior Sauvage its distinctive ambroxan signature can be sourced and blended by independent perfumers at a fraction of the cost. Fragrance, unlike fashion, doesn''t carry the weight of physical craftsmanship — it''s chemistry.',
    'The best dupes aren''t cheap knock-offs. They''re studied interpretations — perfumers who have analysed the character of an original and reconstructed it with available materials. Brands like Armaf, Lattafa, and Dossier have built entire reputations on doing exactly this, and doing it well.',
    'The smart fragrance wardrobe looks like this: one or two originals you love deeply, and a curated set of affordable alternatives that let you explore freely. You wouldn''t wear your best shoes every single day. Your fragrance wardrobe should work the same way.'
  ], true),

(2, 'Scent 101', 'Understanding Scent Families: A Beginner''s Guide',
  'From woody orientals to aquatic florals — learn to decode the language of fragrance and find your signature scent family.',
  'linear-gradient(155deg,#2d5a2d 0%,#6b9b5c 100%)', '7 min read',
  ARRAY[
    'The fragrance industry has its own language, and once you learn it, everything clicks. Perfumes are grouped into families — broad categories that describe the dominant character of a scent. Understanding these families is the fastest shortcut to knowing what you actually like.',
    'Florals are the most popular family worldwide, ranging from the powdery rose of Chanel No. 5 to the heady jasmine of Tom Ford''s darker compositions. Orientals — now often called Ambers — are warm, rich, and sensual, built on musks, vanilla, and resins. Woody fragrances anchor themselves in cedar, sandalwood, and vetiver. Fresh scents open with citrus, green notes, or the aquatic freshness of sea air.',
    'Every fragrance unfolds in three acts called the pyramid. Top notes are what you smell immediately — bright, volatile, gone within minutes. Heart notes are the true character of the fragrance, blooming after 15–30 minutes. Base notes are the lasting impression: the deep woods, musks, and resins that stay on your skin for hours.',
    'The quickest way to discover your family: ignore top notes when testing. Spray, wait 20 minutes, and smell. That dry-down — that quiet signature left on your skin — is what you''re actually buying. Buy for the base, not the opening.'
  ], true),

(3, 'Niche Reviews', '5 Niche Perfumes Worth Every Single Penny',
  'When a fragrance transcends the ordinary, price becomes irrelevant. We curate the five niche perfumes that truly deserve the splurge.',
  'linear-gradient(155deg,#4a1a6b 0%,#8b4db0 100%)', '6 min read',
  ARRAY[
    'Niche perfumery exists in a different dimension to designer fragrance. Where designer houses balance wearability and mass appeal, niche perfumers answer only to the scent itself. The results are often challenging, sometimes bizarre, and occasionally transcendent.',
    'Maison Francis Kurkdjian''s Baccarat Rouge 540 became the most discussed fragrance of the last decade for good reason. Its jasmine-saffron opening gives way to a crystalline amber drydown that doesn''t smell like anything else. It''s polarising, persistent, and unmistakable on skin.',
    'Frederic Malle''s Portrait of a Lady is the quintessential rose for people who think they don''t like rose. Perfumer Dominique Ropion layered rose absolute with patchouli and incense to create something simultaneously gothic and radiant — complex in a way that takes multiple wearings to fully understand.',
    'The case for spending on niche is simple: concentration and longevity. A quality niche fragrance will typically outlast a designer fragrance by hours. Cost-per-wear, the maths often favours the splurge. Choose one niche fragrance you love deeply. It will become your signature.'
  ], true),

(4, 'Tips & Tricks', 'How to Layer Fragrances Like a Professional Nose',
  'Layering is the secret weapon of fragrance connoisseurs. Master the art of building complex, personal scent profiles.',
  'linear-gradient(155deg,#8b1a3a 0%,#c45a7a 100%)', '5 min read',
  ARRAY[
    'Layering fragrances is how professionals build a scent that''s entirely your own. It''s not complicated — it''s just intentional. The goal is to create depth, longevity, or a personalised accord that doesn''t exist in any single bottle.',
    'Start with a foundation. An unscented or lightly-scented body lotion applied before your fragrance gives the scent something to cling to, dramatically improving longevity. Some perfumers recommend layering a complementary shower gel first — same family, different expression.',
    'The most reliable layering combinations follow scent family logic. Fresh citrus on top of a woody base extends the brightness without fighting the depth. A floral layered over a musk creates a more complex, skin-like quality. Oriental base notes make almost everything warmer and more sensual when applied to pulse points before the main fragrance.',
    'One rule matters above all: restraint. The point of layering is enhancement, not accumulation. One spray of a base fragrance at the wrists, one spray of the main fragrance at the neck. Give each fragrance room to breathe. Perfume should be discovered by those close to you, not announced to a room.'
  ], true),

(5, 'Scent 101', 'The Science of Skin Chemistry and Fragrance',
  'Ever wonder why perfume smells different on you? Your skin''s pH, temperature, and microbiome all play a fascinating role.',
  'linear-gradient(155deg,#1a4a6b 0%,#4a8ab0 100%)', '6 min read',
  ARRAY[
    'Two people wearing the same fragrance will almost never smell exactly the same. This isn''t a myth — it''s biochemistry. Your skin is a living, active surface, and it interacts with fragrance molecules in ways unique to your body.',
    'Skin pH is the primary variable. Most fragrances are calibrated for a slightly acidic skin pH around 5.5. Drier skin tends to be more acidic, making floral and citrus notes evaporate faster. Oily skin — more alkaline — amplifies and projects fragrance further. This is why some people find certain fragrances disappear within an hour while others smell incredible all day.',
    'Your skin''s microbiome — the invisible ecosystem of bacteria on your surface — also processes fragrance compounds. Certain bacteria metabolise musks and ambers differently, creating subtle but real variations in how base notes evolve. This is why a fragrance can smell better on someone else: their microbiome is completing the composition.',
    'Practical takeaways: moisturise before applying fragrance — hydrated skin holds scent longer. Apply to pulse points where warmth amplifies projection. And when testing a new fragrance, always test it on your own skin. A paper blotter tells you almost nothing about how a scent will actually wear.'
  ], true),

(6, 'Dupe Guide', '2025''s Most-Wanted Fragrance Dupes, Ranked',
  'Our annual roundup of the best affordable alternatives to designer fragrances — tested, verified, and completely obsessed over.',
  'linear-gradient(155deg,#6b4a1a 0%,#c49b5c 100%)', '4 min read',
  ARRAY[
    'Every year, the fragrance community converges on a shortlist of originals that become must-haves — and a shortlist of dupes that satisfy the same craving at a fraction of the cost. 2025''s list is arguably the best yet.',
    'At the top: Lattafa''s Badee Al Oud has cemented itself as the undisputed alternative to Baccarat Rouge 540. At under $25, it captures the saffron-jasmine-amberwood signature with remarkable accuracy. The longevity is exceptional — 12+ hours on most skin types.',
    'Armaf Club de Nuit Intense Man continues to reign as the best Creed Aventus alternative. The pineapple-birch opening is crisp and clean, and it lasts considerably longer than many authentic batches. At $32 for 105ml, it''s the most cost-effective purchase in the dupe space.',
    'The story of 2025 isn''t just that dupes are cheaper — it''s that they''ve become genuinely good. Dossier''s Ambery Vanilla captures the coffee-vanilla-patchouli soul of Black Opium with ingredient transparency that the original can''t match.'
  ], true)

ON CONFLICT (id) DO NOTHING;

-- Reset identity sequences
SELECT setval(pg_get_serial_sequence('blog_posts','id'), (SELECT MAX(id) FROM blog_posts));
