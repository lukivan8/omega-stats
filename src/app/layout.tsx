import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Omega Stats",
  description: "Minimalistic way to track your Omega Strikers statistics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="black">
      <body className="relative min-h-screen">
        <div className="pb-12">{children}</div>

        <footer className="footer footer-center absolute bottom-0 h-8 w-full bg-base-300 text-base-content">
          <p className="inline w-full text-center text-sm">
            This website was created by{" "}
            <a className="underline" href="https://github.com/LukIvan8">
              Lukov Ivan
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
