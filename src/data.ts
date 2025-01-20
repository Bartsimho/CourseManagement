import { Location, LocationOption } from './types';

export const locations: Location[] = [
  {
    id: 1,
    name: "Carholme Golf Course",
    coordinates: [53.2397, -0.5674],
    description: "A beautiful parkland golf course in Lincoln",
    image: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 2,
    name: "Lincoln Golf Club",
    coordinates: [53.2703, -0.5934],
    description: "Historic 18-hole golf course established in 1891",
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&q=80&w=400"
  }
];

export const locationOptions: LocationOption[] = locations.map(({ id, name, description, image }) => ({
  id,
  name,
  description,
  image
}));