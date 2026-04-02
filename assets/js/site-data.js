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
    name: "Vishwakarma Wood Art & CNC Work",
    shortName: "Vishwakarma Wood Art",
    tagLine: "Custom furniture and CNC interiors.",
    heroBadge: "Custom Furniture | CNC Work | Wood Decor",
    heroTitle: "Custom woodwork for homes and shops.",
    heroCopy:
      "We build furniture, panels, doors, mandirs, and CNC pieces to fit your space.",
    introCopy:
      "Share size or reference photos on WhatsApp for a quick discussion.",
    serviceAreaTitle: "Where We Work",
    serviceArea: [
      "Ramsara workshop",
      "Nearby site visits",
      "Measurement support"
    ],
    footerCopy:
      "Custom furniture, CNC work, wall panels, and wood decor from our Ramsara workshop.",
    stats: [
      {
        value: "100% Custom",
        label: "Made for your room size"
      },
      {
        value: "CNC Precision",
        label: "Clean cuts and repeat accuracy"
      },
      {
        value: "Site Support",
        label: "Measurement to installation"
      },
      {
        value: "Strong Finish",
        label: "Durable material and polish"
      }
    ]
  },
  navigation: [
    { label: "Home", href: "index.html" },
    { label: "About", href: "about.html" },
    { label: "Services", href: "services.html" },
    { label: "Products", href: "products.html" },
    { label: "Contact", href: "contact.html" }
  ],
  contact: {
    phoneDisplay: "+91 89493 2413",
    phoneHref: "tel:+91894932413",
    whatsappDisplay: "+91 89493 2413",
    whatsappHref:
      "https://wa.me/91894932413?text=Hello%20Vishwakarma%20Wood%20Art%20%26%20CNC%20Work,%20I%20want%20to%20discuss%20a%20project.",
    emailDisplay: "contact@vishwakarmawoodart.in",
    emailHref: "mailto:contact@vishwakarmawoodart.in",
    addressTitle: "Ramsara Workshop",
    addressLines: [
      "Vishwakarma Wood Art & CNC Work",
      "Ramsara"
    ],
    hours: [
      { days: "Monday - Saturday", time: "9:00 AM - 8:00 PM" },
      { days: "Sunday", time: "By Appointment" }
    ],
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d439.7822741128873!2d74.20079727021172!3d28.044244817810775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3915210001af0683%3A0xa6ef435682f27432!2sVishvkarma%20furniture%20house%20%F0%9F%8F%A0!5e1!3m2!1sen!2sin!4v1774887552998!5m2!1sen!2sin",
    note:
      "Visit our Ramsara workshop or send measurements and reference photos on WhatsApp.",
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
        "https://wa.me/91894932413?text=Hello%20Vishwakarma%20Wood%20Art"
    },
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" }
  ],
  highlights: [
    {
      title: "Custom Size",
      copy:
        "Built to match your room and layout."
    },
    {
      title: "CNC Detail",
      copy:
        "Clean jali, panel, and carving work."
    },
    {
      title: "Home & Shop",
      copy:
        "Suitable for homes, counters, and interiors."
    },
    {
      title: "Clear Process",
      copy:
        "Quote, measure, build, and install."
    },
    {
      title: "Durable Build",
      copy:
        "Strong hardware and long-lasting finish."
    },
    {
      title: "Neat Fitting",
      copy:
        "Clean final installation at your site."
    }
  ],
  process: [
    {
      step: "01",
      title: "Discuss Project",
      copy:
        "Share your idea, size, or reference photo."
    },
    {
      step: "02",
      title: "Measure Site",
      copy:
        "We take proper measurements for custom work."
    },
    {
      step: "03",
      title: "Build & CNC",
      copy:
        "Cut, craft, assemble, and finish in the workshop."
    },
    {
      step: "04",
      title: "Install",
      copy:
        "Final polish and fitting at your location."
    }
  ],
  services: [
    {
      icon: "CF",
      title: "Custom Furniture",
      summary:
        "Beds, wardrobes, tables, and storage built to size.",
      points: [
        "Size as per room",
        "Wood and finish options",
        "Premium hardware"
      ]
    },
    {
      icon: "CN",
      title: "CNC Carving",
      summary:
        "Precise cutting for panels, patterns, and carved designs.",
      points: [
        "Jali and pattern work",
        "2D and 3D carving",
        "Batch work available"
      ]
    },
    {
      icon: "WA",
      title: "Wood Decor",
      summary:
        "Feature pieces for living rooms, entrances, and shops.",
      points: [
        "Wall decor",
        "Logo or motif work",
        "LED-ready designs"
      ]
    },
    {
      icon: "JP",
      title: "Jali & Partitions",
      summary:
        "Decorative dividers that add privacy and style.",
      points: [
        "Wood or MDF options",
        "Ceiling or floor fit",
        "Ideal for rooms and pooja areas"
      ]
    },
    {
      icon: "IW",
      title: "Wall Panels & TV Units",
      summary:
        "Panels, cladding, and TV units for clean interiors.",
      points: [
        "Fluted and slatted panels",
        "Hidden storage options",
        "Modern wall styling"
      ]
    },
    {
      icon: "MD",
      title: "Mandir Work",
      summary:
        "Custom wooden mandirs with practical storage and detail.",
      points: [
        "Custom size",
        "Lighting and drawers",
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
      image: "assets/img/products/gallery/royal-oak-bed-01.png",
      gallery: createProductGallery("royal-oak-bed", "Royal Oak Bed"),
      summary:
        "Modern bed with a wide CNC headboard and clean finish.",
      finish: "Natural Matte Oak Polish",
      tag: "Best Seller",
      accent: "#8f5529"
    },
    {
      title: "Carved Entrance Door",
      category: "doors",
      image: "assets/img/products/gallery/grand-entrance-door-01.png",
      gallery: createProductGallery("grand-entrance-door", "Carved Entrance Door"),
      summary:
        "Solid wood door with deep CNC carving and strong presence.",
      finish: "Dark Walnut Weatherproof Seal",
      tag: "Statement Piece",
      accent: "#6a3e1d"
    },
    {
      title: "Fluted Wardrobe",
      category: "wardrobes",
      image: "assets/img/products/gallery/fluted-wardrobe-01.png",
      gallery: createProductGallery("fluted-wardrobe", "Fluted Wardrobe"),
      summary:
        "Floor-to-ceiling storage with a sharp fluted front.",
      finish: "PU Paint Finish (Custom Colors)",
      tag: "Modern Minimalist",
      accent: "#a46838"
    },
    {
      title: "Floating TV Unit",
      category: "tv-units",
      image: "assets/img/products/gallery/floating-media-console-01.png",
      gallery: createProductGallery("floating-media-console", "Floating TV Unit"),
      summary:
        "Wall-mounted TV unit with paneling and hidden storage.",
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
        "Detailed mandir with jali doors, lighting, and storage.",
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
        "Decorative divider that separates space without closing it.",
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
        "Custom retail shelving and display units for shops.",
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
        "Chevron panel design for warm feature walls.",
      finish: "Mixed Stain Woodgrains",
      tag: "Architectural Focus",
      accent: "#c38b52"
    }
  ],
  testimonials: [
    {
      quote:
        "Our TV unit and CNC panel fit perfectly. Clean work and great finish.",
      author: "Rahul Sharma",
      role: "Homeowner"
    },
    {
      quote:
        "We needed multiple carved doors on time. The finish and consistency were excellent.",
      author: "Vikram Mehta",
      role: "Hotel Project"
    },
    {
      quote:
        "I shared a reference photo for a mandir and got exactly what I wanted with better storage.",
      author: "Priya Patel",
      role: "Client"
    }
  ],
  faq: [
    {
      q: "Do you make custom sizes?",
      a:
        "Yes. We build as per your room size and layout."
    },
    {
      q: "Can I share my own design?",
      a:
        "Yes. Share a photo or design and we will guide you."
    },
    {
      q: "Do you do CNC work?",
      a:
        "Yes. We handle jali, panel, texture, and carving work."
    },
    {
      q: "How long does work take?",
      a:
        "Timeline depends on size and design. We share it before starting."
    }
  ]
};
