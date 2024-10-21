"use client";

import trips from "@/data/trips";
import { useState } from "react";

import SearchBar from "@/components/SearchBar";
import TripCard from "@/components/TripCard";
import { useSearchParams } from "next/navigation";

import Link from "next/link";

function TripList() {
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams().get("difficulty");
  const tripCards = trips
    .filter(
      (trip) =>
        trip.name.toLowerCase().includes(query.toLowerCase()) &&
        (!searchParams || trip.difficulty === searchParams)
    )
    .map((trip, index) => <TripCard trip={trip} key={index} />);
  const activeStyle =
    "bg-black text-white  py-5 px-6 rounded-lg text-lg mx-2 mb-2";
  const inactiveStyle =
    "bg-primary hover:bg-primarydark text-white  py-5 px-6 rounded-lg text-lg mx-2 mb-2";
  return (
    <section className="py-24 bg-white" id="portfolio">
      <div className="container mx-auto px-4">
        <h2 className="text-center uppercase text-3xl md:text-4xl font-bold text-secondary mb-0">
          Explore Trips
        </h2>
        <br />
        <SearchBar setQuery={setQuery} />
        <div className="text-center mt-4">
          <Link href={{ pathname: "/trips", query: { difficulty: "easy" } }}>
            <button
              className={searchParams === "easy" ? activeStyle : inactiveStyle}
            >
              Easy
            </button>
          </Link>
          <Link
            href={{ pathname: "/trips", query: { difficulty: "moderate" } }}
          >
            <button
              className={
                searchParams === "moderate" ? activeStyle : inactiveStyle
              }
            >
              Moderate
            </button>
          </Link>
          <Link href={{ pathname: "/trips", query: { difficulty: "hard" } }}>
            <button
              className={searchParams === "hard" ? activeStyle : inactiveStyle}
            >
              Hard
            </button>
          </Link>
        </div>
        <div className="flex justify-center items-center my-8">
          <div className="w-[10%] h-1 rounded bg-secondary"></div>
          <div className="mx-4 text-secondary text-2xl">
            <i className="fas fa-star"></i>
          </div>
          <div className="w-[10%] h-1 rounded bg-secondary"></div>
        </div>
        <div className="flex flex-wrap mx-4 justify-center items-center">
          {tripCards}
        </div>
      </div>
    </section>
  );
}

export default TripList;
