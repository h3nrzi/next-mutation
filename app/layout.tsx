import Header from "@/components/header";
import "./globals.css";
import { PropsWithChildren } from "react";

export const metadata = {
  title: "NextPosts",
  description: "Browse and share amazing posts.",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
