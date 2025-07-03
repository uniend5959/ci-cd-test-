"use client";

import { useState } from "react";

interface CounterProps {
  initialValue?: number;
  title?: string;
}

export default function Counter({ initialValue = 0, title = "Counter" }: CounterProps) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(initialValue);

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="text-3xl font-mono mb-4">{count}</div>
      <div className="flex gap-2">
        <button
          onClick={decrement}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          data-testid="decrement-button"
        >
          -
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          data-testid="reset-button"
        >
          리셋버튼 
        </button>
        <button
          onClick={increment}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          data-testid="increment-button"
        >
          +
        </button>
      </div>
    </div>
  );
}
