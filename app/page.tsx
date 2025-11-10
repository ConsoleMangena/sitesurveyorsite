import Hero from "@/components/hero";
import Footer from "@/components/footer";
import BestUsers from "@/components/best-users";

export default function Home() {
  return (
    <main className="flex flex-col min-h-dvh">
      <Hero />
      <BestUsers />
      <Footer />
    </main>
  );
}
