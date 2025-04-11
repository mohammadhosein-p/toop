import { fetchData } from "@/lib/FetchData";
import { NewsResponse } from "@/interface/news";
import React from "react";
import NewsItem from "./NewsItem";

const YOUR_API_KEY = "6a790959624d4768a1854566eab9130a";

export default async function NewsContainer() {
  const response = await fetchData<NewsResponse>(
    `https://newsapi.org/v2/everything?q="soccer" OR "Champions League" OR "Premier League" OR "FIFA"&sortBy=publishedAt&language=en&apiKey=${YOUR_API_KEY}`
  );

  console.log(response);

  if (!response || response.status !== "ok" || response.articles.length === 0) {
    return (
      <p className="text-gray-500 text-sm">No news available at the moment.</p>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-emerald-900">Soccer News</h2>
      {response.articles.map((article, index) => (
        <NewsItem article={article} key={index} />
      ))}
    </div>
  );
}
