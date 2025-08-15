import fs from "fs";
import path from "path";

// Directories
const uiDir = path.resolve("src/components/ui");
const exportsDir = path.resolve("src/exports");
const pkgPath = path.resolve("package.json");

// Ensure exportsDir exists
if (!fs.existsSync(exportsDir)) {
  fs.mkdirSync(exportsDir, { recursive: true });
}

// 1️⃣ Find all components (folder names or file names without extension)
const components = fs
  .readdirSync(uiDir, { withFileTypes: true })
  .map((dirent) => {
    if (dirent.isDirectory()) return dirent.name; // folder
    if (dirent.isFile()) {
      const ext = path.extname(dirent.name);
      const base = path.basename(dirent.name, ext);
      if ([".ts", ".tsx"].includes(ext) && base !== "index") return base;
    }
    return null;
  })
  .filter(Boolean);

// 2️⃣ Generate src/exports/*.ts files
components.forEach((component) => {
  const exportFilePath = path.join(exportsDir, `${component}.ts`);
  const content = `export * from "../components/ui/${component}";\n`;
  fs.writeFileSync(exportFilePath, content, "utf8");
});

console.log(`✅ Generated ${components.length} export files in src/exports`);

// 3️⃣ Update package.json exports
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
const newExports = {
  ".": pkg.exports?.["."] || {
    types: "./dist/index.d.ts",
    default: "./dist/index.js",
  },
};

// Add each component export
components.forEach((component) => {
  newExports[`./${component}`] = {
    types: `./dist/exports/${component}.d.ts`,
    default: `./dist/exports/${component}.js`,
  };
});

// Preserve other existing exports (like styles.css)
Object.entries(pkg.exports || {}).forEach(([key, value]) => {
  if (!newExports[key]) {
    newExports[key] = value;
  }
});

pkg.exports = newExports;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");

console.log("✅ package.json exports updated");
