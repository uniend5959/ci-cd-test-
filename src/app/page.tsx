import Counter from "../components/Counter";

// 변경
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <main className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">CI/CD Test App Event</h1>
        <div className="max-w-md mx-auto">
          <Counter />
        </div>
      </main>
    </div>
  );
}
