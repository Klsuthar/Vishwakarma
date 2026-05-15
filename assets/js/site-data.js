function createProductGallery(slug, title) {
  return [
    {
      src: "assets/img/products/gallery/" + slug + "-01.png",
      alt: title + " showcase view 1"
    },
    {
      src: "assets/img/products/gallery/" + slug + "-02.png",
      alt: title + " showcase view 2"
    },
    {
      src: "assets/img/products/gallery/" + slug + "-03.png",
      alt: title + " showcase view 3"
    },
    {
      src: "assets/img/products/gallery/" + slug + "-04.png",
      alt: title + " showcase view 4"
    }
  ];
}

window.VISHWAKARMA_SITE = {
  brand: {
    name: "Vishwakarma Wood & CNC Work",
    shortName: "Vishwakarma Wood",
    tagLine: "Furniture, CNC jali, panels and interiors",
    heroBadge: "Ramsara Workshop",
    heroTitle: "Custom wood and CNC work for modern homes.",
    heroCopy:
      "Beds, wardrobes, TV units, mandirs, partitions, doors and CNC panels made to size with neat finishing.",
    introCopy:
      "Share a size, site photo, or reference design on WhatsApp for quick discussion.",
    serviceAreaTitle: "Where We Work",
    serviceArea: [
      "Ramsara workshop",
      "Vishvkarma Furniture House location",
      "Nearby measurement and fitting support"
    ],
    footerCopy:
      "Custom furniture and CNC work from the Vishwakarma workshop at Ramsara.",
    stats: [
      {
        value: "100% Custom",
        label: "Made to fit"
      },
      {
        value: "CNC Precision",
        label: "Sharp detailing"
      },
      {
        value: "Site Support",
        label: "Measure to install"
      },
      {
        value: "Strong Finish",
        label: "Built to last"
      }
    ]
  },
  navigation: [
    { label: "Home", href: "index.html#home" },
    { label: "Services", href: "index.html#services" },
    { label: "Products", href: "products.html" },
    { label: "About", href: "index.html#about" },
    { label: "Contact", href: "index.html#contact" }
  ],
  contact: {
    phoneDisplay: "+91 89057 57460",
    phoneHref: "tel:+918905757460",
    whatsappDisplay: "+91 95713 75791",
    whatsappHref:
      "https://wa.me/919571375791?text=Hello%20Vishwakarma%20Wood%20%26%20CNC%20Work,%20I%20want%20to%20discuss%20a%20wood%20or%20CNC%20project.",
    emailDisplay: "WhatsApp preferred",
    emailHref:
      "https://wa.me/919571375791?text=Hello%20Vishwakarma%20Wood%20%26%20CNC%20Work,%20I%20want%20to%20discuss%20a%20project.",
    addressTitle: "Vishvkarma Furniture House",
    addressLines: [
      "Vishwakarma Wood & CNC Work",
      "Vishvkarma Furniture House, Ramsara",
      "Rajasthan 331403"
    ],
    hours: [
      { days: "Monday - Saturday", time: "9:00 AM - 8:00 PM" },
      { days: "Sunday", time: "By Appointment" }
    ],
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d733.94765728144!2d74.20045706706509!3d28.044485590837862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3915210001af0683%3A0xa6ef435682f27432!2sVishvkarma%20furniture%20house%20%F0%9F%8F%A0!5e1!3m2!1sen!2sin!4v1778346404421!5m2!1sen!2sin",
    teamMembers: [
      { name: "Ramdev Suthar", phone: "8949324163" },
      { name: "Ashok Suthar", phone: "376528717" },
      { name: "Kanhaiyalal Suthar", phone: "8905757460" }
    ],
    note:
      "Visit the workshop at the map location or send measurements and photos on WhatsApp.",
    inquiryChecklist: [
      "Work type",
      "Approx size",
      "Finish choice",
      "Location",
      "Reference photo"
    ]
  },
  socialLinks: [
    {
      label: "WhatsApp",
      href:
        "https://wa.me/919571375791?text=Hello%20Vishwakarma%20Wood%20%26%20CNC%20Work"
    },
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" }
  ],
  highlights: [
    {
      title: "Custom Size",
      copy:
        "Built for your layout."
    },
    {
      title: "CNC Detail",
      copy:
        "Clean carving and panels."
    },
    {
      title: "Home & Shop",
      copy:
        "Made for homes and shops."
    },
    {
      title: "Clear Process",
      copy:
        "Simple step-by-step work."
    },
    {
      title: "Durable Build",
      copy:
        "Strong material and finish."
    },
    {
      title: "Neat Fitting",
      copy:
        "Clean site fitting."
    }
  ],
  process: [
    {
      step: "01",
      title: "Discuss Project",
      copy:
        "Share size or reference."
    },
    {
      step: "02",
      title: "Measure Site",
      copy:
        "We check exact dimensions."
    },
    {
      step: "03",
      title: "Build & CNC",
      copy:
        "Cut, build, and finish."
    },
    {
      step: "04",
      title: "Install",
      copy:
        "Final fitting on site."
    }
  ],
  services: [
    {
      icon: "CF",
      title: "Custom Furniture",
      summary:
        "Beds, wardrobes, tables, and storage made to size.",
      points: [
        "Room-fit sizing",
        "Finish options",
        "Clean hardware"
      ]
    },
    {
      icon: "CN",
      title: "CNC Carving",
      summary:
        "Precise cutting for panels, jali, and carved designs.",
      points: [
        "Jali work",
        "2D and 3D cuts",
        "Batch support"
      ]
    },
    {
      icon: "WA",
      title: "Wood Decor",
      summary:
        "Decor pieces for living rooms, entrances, and shops.",
      points: [
        "Wall decor",
        "Logo work",
        "LED-ready designs"
      ]
    },
    {
      icon: "JP",
      title: "Jali & Partitions",
      summary:
        "Decorative dividers with privacy and style.",
      points: [
        "Wood or MDF",
        "Ceiling or floor fit",
        "Room zoning"
      ]
    },
    {
      icon: "IW",
      title: "Wall Panels & TV Units",
      summary:
        "Panels, cladding, and TV units for modern interiors.",
      points: [
        "Fluted panels",
        "Hidden storage",
        "Modern styling"
      ]
    },
    {
      icon: "MD",
      title: "Mandir Work",
      summary:
        "Custom mandirs with storage, lights, and detail.",
      points: [
        "Custom size",
        "Lights and drawers",
        "Traditional finish"
      ]
    }
  ],
  productCategories: [
    { id: "all", label: "All" },
    { id: "beds", label: "Beds" },
    { id: "doors", label: "Doors" },
    { id: "wardrobes", label: "Wardrobes" },
    { id: "tv-units", label: "TV Units" },
    { id: "mandir", label: "Mandirs" },
    { id: "cnc-panels", label: "CNC Panels" },
    { id: "custom-work", label: "Custom Work" }
  ],
  products: [
    {
      title: "Royal Oak Bed",
      category: "beds",
      image: "assets/img/WhatsApp Image 2026-03-30 at 2.17.42 PM.jpeg",
      gallery: [
        { src: "assets/img/WhatsApp Image 2026-03-30 at 2.17.42 PM.jpeg", alt: "Latest bed and furniture work sample 1" },
        { src: "assets/img/WhatsApp Image 2026-03-30 at 2.17.41 PM (2).jpeg", alt: "Latest bed and furniture work sample 2" },
        { src: "assets/img/WhatsApp Image 2026-03-30 at 2.17.41 PM (1).jpeg", alt: "Latest bed and furniture work sample 3" },
        { src: "assets/img/WhatsApp Image 2026-03-30 at 2.17.40 PM.jpeg", alt: "Latest bed and furniture work sample 4" }
      ],
      summary:
        "Modern bed with a carved CNC headboard.",
      finish: "Natural Matte Oak Polish",
      tag: "Best Seller",
      accent: "#8f5529"
    },
    {
      title: "Carved Entrance Door",
      category: "doors",
      image: "assets/img/WhatsApp Image 2026-03-30 at 2.17.40 PM (1).jpeg",
      gallery: [
        { src: "assets/img/WhatsApp Image 2026-03-30 at 2.17.40 PM (1).jpeg", alt: "Latest carved door and CNC sample 1" },
        { src: "assets/img/WhatsApp Image 2026-03-30 at 2.17.39 PM.jpeg", alt: "Latest carved door and CNC sample 2" },
        { src: "assets/img/WhatsApp Image 2026-03-30 at 2.17.39 PM (1).jpeg", alt: "Latest carved door and CNC sample 3" },
        { src: "assets/img/WhatsApp Image 2026-03-30 at 2.17.38 PM.jpeg", alt: "Latest carved door and CNC sample 4" }
      ],
      summary:
        "Solid wood door with bold CNC carving.",
      finish: "Dark Walnut Weatherproof Seal",
      tag: "Statement Piece",
      accent: "#6a3e1d"
    },
    {
      title: "Fluted Wardrobe",
      category: "wardrobes",
      image: "assets/img/WhatsApp Image 2026-03-30 at 2.17.38 PM (2).jpeg",
      gallery: [
        { src: "assets/img/WhatsApp Image 2026-03-30 at 2.17.38 PM (2).jpeg", alt: "Latest wardrobe work sample 1" },
        { src: "assets/img/WhatsApp Image 2026-03-30 at 2.17.38 PM (1).jpeg", alt: "Latest wardrobe work sample 2" },
        { src: "assets/img/WhatsApp Image 2026-03-30 at 2.17.37 PM.jpeg", alt: "Latest wardrobe work sample 3" },
        { src: "assets/img/WhatsApp Image 2026-03-30 at 2.17.36 PM.jpeg", alt: "Latest wardrobe work sample 4" }
      ],
      summary:
        "Tall storage with a clean fluted front.",
      finish: "PU Paint Finish (Custom Colors)",
      tag: "Modern Minimalist",
      accent: "#a46838"
    },
    {
      title: "Floating TV Unit",
      category: "tv-units",
      image: "assets/img/products/gallery/Tv_unit (5).png",
      gallery: [
        { src: "assets/img/products/gallery/Tv_unit (5).png", alt: "Latest TV unit work sample 1" },
        { src: "assets/img/products/gallery/Tv_unit (4).png", alt: "Latest TV unit work sample 2" },
        { src: "assets/img/products/gallery/Tv_unit (3).png", alt: "Latest TV unit work sample 3" },
        { src: "assets/img/products/gallery/Tv_unit (2).png", alt: "Latest TV unit work sample 4" },
        { src: "assets/img/products/gallery/Tv_unit (1).png", alt: "Latest TV unit work sample 5" }
      ],
      summary:
        "Wall TV unit with paneling and hidden storage.",
      finish: "Ash Wood veneer",
      tag: "Smart Living",
      accent: "#bb7f46"
    },
    {
      title: "Heritage Teak Mandir",
      category: "mandir",
      image: "assets/img/products/gallery/heritage-teak-mandir-01.png",
      gallery: createProductGallery("heritage-teak-mandir", "Heritage Teak Mandir"),
      summary:
        "Detailed mandir with jali, lights, and storage.",
      finish: "Traditional High Gloss Teak",
      tag: "High Demand",
      accent: "#b56f2d"
    },
    {
      title: "Geometric Divider",
      category: "cnc-panels",
      image: "assets/img/products/gallery/geometric-room-divider-01.png",
      gallery: createProductGallery("geometric-room-divider", "Geometric Divider"),
      summary:
        "Divider that separates space without closing it.",
      finish: "Satin White Duco Paint",
      tag: "Interior Favorite",
      accent: "#7d4d25"
    },
    {
      title: "Boutique Display",
      category: "custom-work",
      image: "assets/img/products/gallery/boutique-display-shelving-01.png",
      gallery: createProductGallery("boutique-display-shelving", "Boutique Display"),
      summary:
        "Retail shelving and display units for shops.",
      finish: "Raw Industrial Wood & Metal mix",
      tag: "Retail Specific",
      accent: "#9a6a45"
    },
    {
      title: "Chevron Wall Panel",
      category: "custom-work",
      image: "assets/img/products/gallery/chevron-wall-cladding-01.png",
      gallery: createProductGallery("chevron-wall-cladding", "Chevron Wall Panel"),
      summary:
        "Chevron wall cladding for warm feature walls.",
      finish: "Mixed Stain Woodgrains",
      tag: "Architectural Focus",
      accent: "#c38b52"
    }
  ],
  testimonials: [
    {
      quote:
        "Our TV unit fit perfectly. Clean work and finish.",
      author: "Rahul Sharma",
      role: "Homeowner"
    },
    {
      quote:
        "The carved doors were on time and beautifully finished.",
      author: "Vikram Mehta",
      role: "Hotel Project"
    },
    {
      quote:
        "I shared a mandir reference and got exactly what I wanted.",
      author: "Priya Patel",
      role: "Client"
    }
  ],
  faq: [
    {
      q: "Do you make custom sizes?",
      a:
        "Yes. Everything is made to size."
    },
    {
      q: "Can I share my own design?",
      a:
        "Yes. Share a photo or design."
    },
    {
      q: "Do you do CNC work?",
      a:
        "Yes. We handle jali, panel, and carving work."
    },
    {
      q: "How long does work take?",
      a:
        "It depends on size and design. We confirm it first."
    }
  ]
};
