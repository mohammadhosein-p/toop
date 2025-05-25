import { fetchData } from "@/lib/FetchData";
import { NewsResponse } from "@/interface/news";
import React from "react";
import NewsItem from "./NewsItem";

const YOUR_API_KEY = "6a790959624d4768a1854566eab9130a";

type Props = {
  filter?: string;
};

export default async function NewsContainer({ filter }: Props) {
  const url = `https://newsapi.org/v2/everything?q=${
    filter
      ? `'${filter}'`
      : `"soccer" OR "Champions League" OR "Premier League" OR "FIFA"`
  }&sortBy=publishedAt&language=en&apiKey=${YOUR_API_KEY}`;
  const response = await fetchData<NewsResponse>(url, ["news"]);

  if (!response || response.status !== "ok" || response.articles.length === 0) {
    return (
      <p className="text-gray-500 text-sm">No news available at the moment.</p>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl mb-0 font-bold text-emerald-900">
        Football News{" "}
      </h2>
      {filter && (
        <h4 className="mt-1 mb-3 font-semibold text-emerald-600">{`${filter} News`}</h4>
      )}
      {response.articles.map((article, index) => (
        <NewsItem article={article} key={index} />
      ))}
    </div>
  );
}
