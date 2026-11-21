import { readdirSync } from "node:fs";
import path from "node:path";

const imageDirectory = path.join(
  process.cwd(),
  "public",
  "documents",
  "images",
);
const pdfDirectory = path.join(
  process.cwd(),
  "public",
  "documents",
  "documents",
);

export type OfficialDocument = {
  image: string;
  pdf?: string;
  title: string;
  imageUrl: string;
  pdfUrl?: string;
};

export function documentAssetUrl(file: string, type: "images" | "documents") {
  return `/documents/${type}/${encodeURIComponent(file)}`;
}

export function getOfficialDocuments(): OfficialDocument[] {
  const imageFiles = readdirSync(imageDirectory).filter((file) =>
    /\.(?:svg|png|jpe?g|webp)$/i.test(file),
  );
  const pdfFiles = readdirSync(pdfDirectory).filter((file) =>
    /\.pdf$/i.test(file),
  );
  const pdfByName = new Map(
    pdfFiles.map((file) => [path.parse(file).name.toLowerCase(), file]),
  );

  return imageFiles
    .map((image) => {
      const name = path.parse(image).name;
      const pdf = pdfByName.get(name.toLowerCase());

      return {
        image,
        pdf,
        title: name.replace(/[_-]+/g, " "),
        imageUrl: documentAssetUrl(image, "images"),
        pdfUrl: pdf ? documentAssetUrl(pdf, "documents") : undefined,
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}
