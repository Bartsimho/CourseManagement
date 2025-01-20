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
    image: "https://www.sharpleygolf.co.uk/public/uploads/Sharpley.13.09.19.PM.MKIII.10.jpg?auto=format&fit=crop&q=80&w=400"
  }
];

export const locationOptions: LocationOption[] = locations.map(({ id, name, description, image }) => ({
  id,
  name,
  description,
  image
}));