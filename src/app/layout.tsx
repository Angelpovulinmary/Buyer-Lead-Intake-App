//import './globals.css';
import "./styles/app.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header style={{ borderBottom: "1px solid #ccc" }}>
          <section>
            <h2 className="">Buyer Lead Intake App</h2>
          </section>
        </header>
        <main style={{ padding: "20px" }}>{children}</main>
      </body>
    </html>
  );
}
