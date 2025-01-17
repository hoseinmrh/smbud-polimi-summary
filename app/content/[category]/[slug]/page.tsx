import fs from "fs";
import path from "path";
import { marked } from "marked";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ContentPage({
  params,
}: {
  params: { category: string; slug: string }; // category and slug are separate params
}) {
  const { category, slug } = params;

  try {
    // Construct the file path based on the category and slug
    const filePath = path.join(
      process.cwd(),
      "public/content",
      category,
      `${slug}.md`,
    );
    const fileContent = fs.readFileSync(filePath, "utf8");
    const htmlContent = marked(fileContent);

    // Format the title for display (replace underscores with spaces)
    const displayName = slug.replace(/_/g, " ");

    return (
      <main className="bg-black text-white min-h-screen">
        <div className="container max-w-5xl m-auto p-10">
          {/* Add the Back Home button */}
          <Link
            href="/"
            className="text-blue-500 hover:text-blue-400 mb-4 inline-block"
          >
            ← Back To Main Page
          </Link>
          <h1 className="text-3xl font-bold mb-8">{displayName}</h1>
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
        <footer className="text-center text-xl text-blue-400">
          <div className="mt-10 mb-20">
            Created while{" "}
            <span className="font-bold text-orange-500">Suffering 😢</span> by{" "}
            <a
              target="_blank"
              href="https://hosein-mrh.vercel.app/"
              className="text-gray-200 hover:text-white underline"
            >
              Hosein Mirhoseini
            </a>
          </div>
        </footer>
      </main>
    );
  } catch (error) {
    notFound();
  }
}
