import "./globals.css";
import Tabs from "./components/Tabs";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Tabs />
        <main>{children}</main>
      </body>
    </html>
  );
}
