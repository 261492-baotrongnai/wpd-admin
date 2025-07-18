import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./layout.css";
import { getAuthToken } from "./actions/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WanPorDee Admin",
  description: "",
};

const navigation = [
  { name: "Home", href: "/" },
  { name: "โครงการ", href: "/program" },
  { name: "Profile", href: "/profile" },
];

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("RootLayout rendered: ", await getAuthToken());
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <>
          <header
            style={{
              padding: "1rem",
              background: "#f5f5f5",
              borderBottom: "1px solid #eee",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h1>WanPorDee Admin</h1>
            <nav aria-label="Main navigation">
              <ul
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                }}
              >
                {navigation.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      style={{
                        textDecoration: "none",
                        color: "#333",
                        fontWeight: 500,
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        transition: "background 0.2s",
                      }}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </header>
          <main style={{ padding: "2rem", flex: 1 }}>{children}</main>
          <footer
            style={{
              padding: "1rem",
              background: "#f5f5f5",
              borderTop: "1px solid #eee",
              textAlign: "center",
            }}
          >
            &copy; {new Date().getFullYear()} ยังไม่มีลิขสิทธิ์ WanPorDee
          </footer>
        </>
      </body>
    </html>
  );
}
