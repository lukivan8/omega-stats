import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Omega Stats",
  description: "The website for Omega Strikers data",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="black">
      <body className="min-h-screen relative">
        <div className="p-8">{children}</div>

        <footer className="footer footer-center absolute bottom-0 w-full h-8 bg-base-300 text-base-content">
          <p className="text-sm w-full text-center inline">
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
