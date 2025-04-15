import Movie from "./client";

interface Showtime {
  id: number;
  movieId: number;
  theaterId: number;
  startTime: string;
  endTime: string;
  endDate: string;
  price: string;
  theater?: {
    id: number;
    name: string;
  };
}

interface MovieData {
  id: number;
  title: string;
  description: string;
  poster: string;
  duration: number | string;
  genres: {
    id: number;
    name: string;
  }[];
  showtimes: Showtime[];
}

type SearchParams = {
  sd?: string; // selectedDate
};

type Params = {
  id: string;
};

type Props = {
  params: Params;
  searchParams: SearchParams;
};

async function getMovie(id: string, selectedDate?: string): Promise<MovieData> {
  const BASE_URL = process.env.BASE_URL;
  const url = new URL(`${BASE_URL}/movies/${id}`);

  if (selectedDate) {
    url.searchParams.append("selectedDate", selectedDate);
  }

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error("Failed to fetch movie");
  }

  const data = await res.json();
  return data.data as MovieData;
}

export async function generateMetadata({ params, searchParams }: Props) {
  const getParams = await params;
  const getSearchParams = await searchParams;

  const sd = getSearchParams.sd;
  const id = getParams.id;
  const movie = await getMovie(id, sd);

  return {
    title: `${movie.title} | Movie App`,
    description: movie.description,
    openGraph: {
      title: movie.title,
      description: movie.description,
      images: movie.poster ? [{ url: movie.poster }] : [],
    },
  };
}

export default async function MoviePage({ params, searchParams }: Props) {
  const getParams = await params;
  const getSearchParams = await searchParams;

  const sd = getSearchParams.sd;
  const id = getParams.id;
  const movie = await getMovie(id, sd);

  return <Movie movie={movie} />;
}
