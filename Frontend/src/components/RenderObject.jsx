import React from "react";

function RenderObject({ data }) {
  // Handle arrays (like slides) and other values
  const renderValue = (value) => {
    if (Array.isArray(value)) {
      return (
        <ul className="list-disc pl-4">
          {value.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    }
    return <span>{String(value)}</span>;
  };

  return (
    <div className="p-4 border rounded shadow-md">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="mb-2">
          <strong className="capitalize">{key}:</strong> {renderValue(value)}
        </div>
      ))}
    </div>
  );
}

// Example usage
export default function App() {
  const obj = {
    userId: "68c9600d84a85dde88294a21",
    url: "https://apnews.com/article/h1b-visa-trump-immigration-8d39699d0b2de3d90936f8076357254e",
    title: "Trump signs proclamation adding $100K annual fee for H-1B visa applications",
    slides: [
      "Here's a summary of the article in 5 digestible Insights. The immigration debate is far from over! #USVisas #H1B #ImmigrationNews",
    ],
    _id: "68ce35b5c76c9a1fd6981985",
    createdAt: "2025-09-20T05:03:49.678Z",
    updatedAt: "2025-09-20T05:03:49.678Z",
    __v: 0,
  };

  return (
    <div className="max-w-xl mx-auto mt-6">
      <RenderObject data={obj} />
    </div>
  );
}
