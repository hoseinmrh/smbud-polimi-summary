import fs from "fs";
import path from "path";
import Link from "next/link";

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
                <h2 className="text-2xl font-semibold mb-2">{category}</h2>
                <ul className="space-y-2 list-none pl-0">
                  {files.map(({ slug }) => (
                    <li key={slug} className="text-left">
                      <Link
                        href={`/content/${category}/${slug}`} // Updated href to include category
                        className="text-blue-400 hover:text-blue-300 underline"
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
    </main>
  );
}
