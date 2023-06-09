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
    <html lang="en">
      <body className={inter.className}>
        {children}
        <footer className="h-20">
          <div className=" bg-gray-950 fixed bottom-0 w-full">
            <p className="text-white text-sm sm:text-base mx-auto w-1/2 text-center">
              This website was created by{" "}
              <a className="underline" href="https://github.com/LukIvan8">
                Lukov Ivan
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
