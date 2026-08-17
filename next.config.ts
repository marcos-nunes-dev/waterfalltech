import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // O pin do root vale SÓ no desenvolvimento local.
  //
  // Ele existe porque, sem ele, o Turbopack sobe a árvore e acha o
  // package-lock.json de D:\github (fora deste repo), avisando a cada run. Na
  // Vercel o efeito é outro: com o root fixado, o Turbopack deixa de enxergar o
  // `@vercel/turbopack-next` que resolve `next/font/google`, e o build morre com
  // "Module not found" em toda página que carrega fonte.
  ...(process.env.VERCEL === undefined ? { turbopack: { root: __dirname } } : {}),
};

export default nextConfig;
