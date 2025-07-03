type Person = {
  readonly id: number;
  readonly name: string;
  birth_year: number;
  death_year?: number;
  biography: string;
  image: string;
}

type ActressNationality = 
  | "American"
  | "British"
  | "Australian"
  | "Israeli-American"
  | "South African"
  | "French"
  | "Indian"
  | "Israeli"
  | "Spanish"
  | "South Korean"
  | "Chinese"

type Actress = Person & {
  most_famous_movies: [string, string, string];
  awards: string;
  nationality: ActressNationality;
}

function isActress(data: unknown): data is Actress {
  return (
    typeof data === "object" &&
    data !== null &&
    "id" in data && typeof data.id === "number" && 
    "name" in data && typeof data.name === "string" &&
    "birth_year" in data && typeof data.birth_year === "number" &&
    "death_year" in data && typeof data.death_year === "number" &&
    "biography" in data && typeof data.biography === "string" &&
    "image" in data && typeof data.image === "string" &&
    "most_famous_movies" in data && Array.isArray(data.most_famous_movies) && data.most_famous_movies.length === 3 && data.most_famous_movies.every(movie => typeof movie === "string") &&
    "awards" in data && typeof data.awards === "string" &&
    "nationality" in data && typeof (data as any).nationality === "string" && 
    [
      "American",
      "British",
      "Australian",
      "Israeli-American",
      "South African",
      "French",
      "Indian",
      "Israeli",
      "Spanish",
      "South Korean",
      "Chinese"
    ].includes((data as any).nationality)
  );
}

async function getAcrtess(id: number): Promise<Actress | null> {
  try {
    const response = await fetch(`http://localhost:3333/actresses/${id}`);
    const dati = await response.json();
    if (!isActress(dati)) {
      throw new Error("Invalid actress data format");
    }
    return dati;
  }catch (error) {
    if(error instanceof Error) {
      console.error("Error fetching actress data:", error.message);
    }else {
      console.error("An unexpected error occurred:", error);
    }
    return null;
  }
}