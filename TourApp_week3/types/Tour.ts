export type Tour={
    id: string;
    name: string;
    city: string; 
    days:number; 
    price: number; 
    seats: number;
    departure: string; 
    image: string;
    isFavorite:boolean;
};

export type TourGroup={
    title:string;
    data:Tour[];
};

export const formatDate = (d: string) => {
  if (!d) return "";
  const [y, m, day] = d.split("-");
  return `${day}/${m}/${y}`;
};

export const getSeatLabel=(seats:number): string =>{
    if(seats===0) return "Het Cho";
    if(seats>=1 && seats<=3) return `Chi con ${seats} cho`;
    return `Con ${seats} cho`
};

export const groupByCity = (tours: Tour[]) => {
  const map: Record<string, Tour[]> = {};
  tours.forEach(t => {
    const city = t.city || "Khác";
    if (!map[city]) map[city] = [];
    map[city].push(t);
  });
  
  Object.keys(map).forEach(city => {
    map[city].sort((a, b) => a.departure.localeCompare(b.departure));
  });

  return Object.keys(map).sort().map(city => ({
    title: `${city} · ${map[city].length} tour`,
    data: map[city],
  }))
};
