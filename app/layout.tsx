import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Historical Figures Bingo",
  description: "A World War II historical figures bingo game",
  icons: {
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/5_Point_Star_with_Army_Star_Border.svg/32px-5_Point_Star_with_Army_Star_Border.svg.png',
    shortcut: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/5_Point_Star_with_Army_Star_Border.svg/32px-5_Point_Star_with_Army_Star_Border.svg.png',
    apple: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/5_Point_Star_with_Army_Star_Border.svg/32px-5_Point_Star_with_Army_Star_Border.svg.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/5_Point_Star_with_Army_Star_Border.svg/32px-5_Point_Star_with_Army_Star_Border.svg.png" sizes="any" />
      </head>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
