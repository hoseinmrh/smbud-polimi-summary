import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";

type FileData = {
  filename: string;
  slug: string;
  category: string;
};

const readContentDirectory = (dir: string): { [key: string]: FileData[] } => {
  const items = fs.readdirSync(dir);
  const sections: { [key: string]: FileData[] } = {};

  items.forEach((item) => {
    const itemPath = path.join(dir, item);
    const isDirectory = fs.statSync(itemPath).isDirectory();

    // Skip the "Images" folder
    if (item === "Images") {
      return; // Skip this folder
    }

    if (isDirectory) {
      const files = fs
        .readdirSync(itemPath)
        .filter((file) => file.endsWith(".md"));
      sections[item] = files.map((file) => ({
        filename: file,
        slug: file.replace(".md", ""),
        category: item,
      }));
    }
  });

  return sections;
};

export default async function Page() {
  const contentDirectory = path.join(process.cwd(), "public/content");
  const sections = readContentDirectory(contentDirectory);

  return (
    <main className="bg-black text-white h-screen">
      <div className="container max-w-5xl m-auto">
        <div className="flex flex-col items-center justify-between p-10">
          <div className="mt-12 text-center">
            <h1 className="font-bold text-4xl mb-8">
              Welcome to the SMBUD Summary!!
            </h1>
            <div className="text-3xl mb-4">List of contents:</div>
            {Object.entries(sections).map(([category, files]) => (
              <div key={category} className="mb-6 text-left">
                <h2 className="text-2xl font-semibold mb-2">{category}:</h2>
                <ul className="space-y-2 list-none pl-0">
                  {files.map(({ slug }) => (
                    <li key={slug} className="text-left">
                      <Link
                        href={`/content/${category}/${slug}`}
                        className="text-xl text-blue-200 hover:text-white"
                      >
                        {slug.replace(/_/g, " ")}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer className="text-center text-xl text-blue-400">
        <div className="mt-10 mb-10">
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
        <div className="flex justify-center mb-10">
          <Image
            src="/logo.png"
            alt="Polimi Logo"
            height={80}
            width={80}
            className="invert brightness-0"
          />
        </div>
      </footer>
    </main>
  );
}
