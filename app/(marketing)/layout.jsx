import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function MarketingLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
