import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
