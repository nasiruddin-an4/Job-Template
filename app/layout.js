import "./globals.css";

export const metadata = {
  title: "Job Poster Generator - Betopia Group",
  description: "Generate professional job posters from published positions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased bg-gray-50`}>{children}</body>
    </html>
  );
}
