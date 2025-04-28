import { Location, LocationOption } from './types';

export const locations: Location[] = [
  {
    id: 1,
    name: "Carholme Golf Course",
    coordinates: [53.234158, -0.560261],
    description: "A beautiful parkland golf course in Lincoln",
    image: "https://carholmegolfclub.co.uk/wp-content/uploads/2024/12/20240505_153300-scaled.jpg?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 2,
    name: "Lincoln Golf Club",
    coordinates: [53.303818, -0.737191],
    description: "Historic 18-hole golf course established in 1891",
    image: "https://www.lincolngc.co.uk/wp-content/uploads/2024/11/DJI_0701-1400x994.webp?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 3,
    name: "Sharpley Golf",
    coordinates: [54.844980, -1.404323],
    description: "Northeast England’s Leading Golf Course",
    image: "https://www.sharpleygolf.co.uk/public/uploads/Sharpley.13.09.19.AM.MKIV.11.2.jpg?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 4,
    name: "Woodhall Spa - Hotchkin",
    coordinates: [53.155399, -0.204674],
    description: "Hotchkin Course - 58th Best Course on the Planet",
    image: "https://cdn.sanity.io/images/arkm1m4f/production/5e294c7692421777ec2a2076103177083cfa9521-1600x1067.jpg?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 5,
    name: "Woodhall Spa -  Bracken",
    coordinates: [53.156085, -0.206711],
    description: "A contemporary classic and the perfect complement to The Hotchkin Course",
    image: "https://images.contentstack.io/v3/assets/blt99dd26276e65134a/blt626e0b466e380ae2/5bf486e7dafd18fa6a7037bb/hotchkin-9th-green.jpg?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 6,
    name: "Market Rasen & District Golf Club",
    coordinates: [53.376843, -0.303712],
    description: "One of Lincolnshire's Finest",
    image: "https://www.marketrasengolfclub.co.uk/wp-content/uploads/2024/02/4th-fairway-2300x1300.jpg?auto=format&fit=crop&q=80&w=400"
  }
];

export const locationOptions: LocationOption[] = locations.map(({ id, name, description, image }) => ({
  id,
  name,
  description,
  image
}));