import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
title: "Pokémon TCG Favoritos",
description: "Sistema de gerenciamento de cartas favoritas do Pokémon Trading Card Game",
keywords: ["pokemon", "tcg", "trading card game", "favoritos", "cartas"],
authors: [{ name: "Estudantes FIAP" }],
icons: {
icon: "/favicon.ico",
},
};

export default function RootLayout({
children,
}: {
children: React.ReactNode;
}) {
return (
<html lang="pt-BR">
<body className={inter.className}>
{children}
</body>
</html>
);
}