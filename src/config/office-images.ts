export interface OfficeImage {
  id: string;
  src: string;
  title: string;
  caption: string;
  alt: string;
  category: "exterior" | "operations" | "consultation" | "awards" | "events" | "team-culture";
  width: number;
  height: number;
  intendedPlacement: string;
}

export const officeImages = {
  // Exterior & Headquarters Signboard
  buildingSignboard: {
    id: "ext-building-signboard",
    src: "/assets/office/exterior/office.png",
    title: "MTPL Dharampeth Office Building",
    caption: "Shri Ganesh Apartments, Dharampeth, Nagpur — Head Office & Customer Service Center",
    alt: "Exterior facade and primary IATA signboard of Mishrikotkar Travels Pvt Ltd Nagpur headquarters",
    category: "exterior",
    width: 1121,
    height: 407,
    intendedPlacement: "Contact Page / Location & Visiting Card",
  },
  streetSignboard: {
    id: "ext-street-board",
    src: "/assets/office/exterior/mtpl-indigo-street-board.webp",
    title: "Official IndiGo & MTPL Street Signboard",
    caption: "Prominent street signage showing verified airline ticketing and travel management services",
    alt: "Outdoor official IndiGo and Mishrikotkar Travels partnership signage on main street",
    category: "exterior",
    width: 1280,
    height: 720,
    intendedPlacement: "About Page / Physical Presence & Street Accessibility",
  },

  // Operations Floor
  consultantsFloor: {
    id: "ops-consultants-desk",
    src: "/assets/office/operations/mtpl-consultants-operations-desk.webp",
    title: "Dedicated Travel Operations Desk",
    caption: "Professional travel planners coordinating customer bookings and airline reservations",
    alt: "MTPL travel consultants at modern computer workstations with official branding backdrop",
    category: "operations",
    width: 1280,
    height: 720,
    intendedPlacement: "Home Page Trust Section / Services Page Overview",
  },
  ticketingOperations: {
    id: "ops-ticketing",
    src: "/assets/office/operations/mtpl-ticketing-operations.webp",
    title: "Flight Ticketing & Documentation Center",
    caption: "High-precision booking desk managing visa clearances, flight itineraries, and passenger documentation",
    alt: "Back-office ticketing desk with travel executives managing passenger files and computer terminals",
    category: "operations",
    width: 1280,
    height: 720,
    intendedPlacement: "Services Page / Flight & Visa Operations Section",
  },
  operationsFloorWide: {
    id: "ops-floor-wide",
    src: "/assets/office/operations/mtpl-operations-floor-wide.webp",
    title: "Central Operations Floor & Accreditation Wall",
    caption: "Panoramic view of MTPL central travel desk and certified partner accreditation wall",
    alt: "Wide angle view of MTPL travel agency office workstations and certificates of appreciation",
    category: "operations",
    width: 1600,
    height: 898,
    intendedPlacement: "About Us Page / Workplace Infrastructure",
  },
  hotelBookingOperations: {
    id: "ops-hotel-booking",
    src: "/assets/office/operations/mtpl-hotel-booking.jpeg",
    title: "Hotel Reservation & Accommodations Desk",
    caption: "Dedicated hotel booking and curated accommodations coordination desk",
    alt: "MTPL travel executive coordinating hotel bookings and accommodation reservations",
    category: "operations",
    width: 1280,
    height: 720,
    intendedPlacement: "Services Page / Hotel Bookings Section",
  },
  visaAssistanceOperations: {
    id: "ops-visa-assistance",
    src: "/assets/office/operations/mtpl-visa-assistance.jpeg",
    title: "Visa & Travel Documentation Desk",
    caption: "Specialized visa processing, passport services, and travel documentation advisory",
    alt: "MTPL visa and documentation assistance desk assisting clients with overseas travel requirements",
    category: "operations",
    width: 1280,
    height: 720,
    intendedPlacement: "Services Page / Visa Assistance Section",
  },
  officeExteriorTransfers: {
    id: "ext-transfers-office",
    src: "/assets/office/exterior/office.png",
    title: "MTPL Office & Ground Transfers Dispatch",
    caption: "Central dispatch hub for airport transfers, intercity travel, and local sightseeing",
    alt: "Mishrikotkar Travels office and dispatch center for ground transfers and transport",
    category: "exterior",
    width: 1121,
    height: 407,
    intendedPlacement: "Services Page / Transfers & Ground Section",
  },

  // Consultation
  clientConsultation: {
    id: "consult-client-session",
    src: "/assets/office/consultation/mtpl-client-consultation-session.webp",
    title: "In-Person Itinerary Consultation",
    caption: "One-on-one travel planning sessions tailoring domestic and international tour packages",
    alt: "Travel specialists engaged in personalized holiday consultation with clients around meeting table",
    category: "consultation",
    width: 1280,
    height: 720,
    intendedPlacement: "Home Page / Dedicated Assistance & Tailored Travel Section",
  },
  itineraryPlanning: {
    id: "consult-itinerary-planning",
    src: "/assets/office/consultation/mtpl-itinerary-planning-session.webp",
    title: "Curated Itinerary Design Session",
    caption: "Collaborative itinerary building ensuring optimal routing, verified hotels, and seamless transfers",
    alt: "Team members and director reviewing travel route options and scheduling on laptop",
    category: "consultation",
    width: 1280,
    height: 720,
    intendedPlacement: "Packages Page / Curated Planning Assurance",
  },
  directorCabin: {
    id: "consult-director-cabin",
    src: "/assets/office/consultation/mtpl-director-consultation-cabin.webp",
    title: "Director's Cabin",
    caption: "Personalized travel oversight and round-the-clock journey support from the director's desk",
    alt: "Director Tushar Mishrikotkar at work in the executive director's cabin managing client travel",
    category: "consultation",
    width: 1280,
    height: 720,
    intendedPlacement: "About Page / Leadership & Directorial Consultation",
  },

  // Awards & Recognition
  airlineRecognitionIndigo: {
    id: "award-airline-indigo",
    src: "/assets/office/awards/mtpl-airline-recognition-indigo.webp",
    title: "IndiGo Airline Partnership Award",
    caption: "Honoring outstanding performance and premier partnership in commercial airline ticketing",
    alt: "MTPL leadership and team receiving official framed IndiGo airline recognition plaque",
    category: "awards",
    width: 1920,
    height: 1440,
    intendedPlacement: "About Page / Industry Recognition & Accreditations",
  },
  directorsAirlineCertificate: {
    id: "award-directors-certificate",
    src: "/assets/office/awards/mtpl-directors-airline-certificate.webp",
    title: "Airline Excellence Certification",
    caption: "Official presentation of airline excellence certificate to MTPL directorship",
    alt: "Directors Tushar Mishrikotkar and Puja Mishrikotkar receiving airline partner certificate",
    category: "awards",
    width: 1280,
    height: 960,
    intendedPlacement: "About Page / Directors Leadership Story",
  },
  teamAwardReception: {
    id: "award-team-portal",
    src: "/assets/office/awards/mtpl-team-award-reception.webp",
    title: "Team Recognition Milestone",
    caption: "Celebrating airline milestone recognition at the MTPL headquarters entrance",
    alt: "MTPL team gathered at office glass entrance presenting airline achievement award",
    category: "awards",
    width: 1600,
    height: 1200,
    intendedPlacement: "Reviews Page / Certified Trust Banner",
  },

  // Events & Expos
  travelExpoStall: {
    id: "event-expo-stall",
    src: "/assets/office/events/mtpl-travel-expo-stall.webp",
    title: "MTPL Official Travel Expo Booth",
    caption: "Showcasing bespoke holiday packages and wildlife safari itineraries at premier tourism expos",
    alt: "Mishrikotkar Travels exhibition stall with promotional banners and customer service executives",
    category: "events",
    width: 1600,
    height: 993,
    intendedPlacement: "Services Page / Corporate & Group Travel Section",
  },

  // Team Culture
  teamReceptionDesk: {
    id: "culture-reception-desk",
    src: "/assets/office/team-culture/mtpl-team-reception-desk.webp",
    title: "Frontline Customer Service Team",
    caption: "The welcoming faces of MTPL dedicated to prompt, personalized client support",
    alt: "MTPL travel specialists standing at front office reception desk in brand uniforms",
    category: "team-culture",
    width: 1152,
    height: 864,
    intendedPlacement: "Contact Page / Warm Welcome & Support Team",
  },
  teamFestiveCelebration: {
    id: "culture-festive-celebration",
    src: "/assets/office/team-culture/mtpl-team-festive-celebration.webp",
    title: "Cultural Celebration at MTPL",
    caption: "A tight-knit, passionate team fostering trusted relationships with clients since 2006",
    alt: "MTPL team members celebrating annual cultural festival in traditional attire at office entrance",
    category: "team-culture",
    width: 1600,
    height: 1200,
    intendedPlacement: "About Page / Team Culture & Workplace Harmony",
  },
  teamMilestoneCelebration: {
    id: "culture-milestone-celebration",
    src: "/assets/office/team-culture/mtpl-team-milestone-celebration.webp",
    title: "Celebrating Milestones Together",
    caption: "Shared dedication, mutual trust, and collaborative spirit that drive exceptional travel service",
    alt: "Team gathered inside the office celebrating company achievement with cake and certificates",
    category: "team-culture",
    width: 1600,
    height: 1200,
    intendedPlacement: "About Page / Office Gallery",
  },
} as const;

export type OfficeImageKey = keyof typeof officeImages;
