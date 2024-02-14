import {
  Calculators,
  Clients,
  CustomerReviews,
  EducationCenter,
  Hero,
  HowItWorks,
  Inquiries,
  NewsLetter,
  RatesList,
  Services,
  Highlights,
} from "./sections";
import { Navbar, Footer } from "./sections";
export default function Home() {
  return (
    <main className="relative bg-primary">
      <Navbar />
      <section className="">
        <Hero />
      </section>
      <section className="padding">
        <Inquiries />
      </section>
      <section className="padding">
        <Services />
      </section>
      <section className="padding">
        <HowItWorks />
      </section>
      <section className="padding">
        <Calculators />
      </section>
      <section>
        <Highlights />
      </section>
      {/* <section className="padding">
        <Clients />
      </section> */}
      <section className="padding">
        <EducationCenter />
      </section>
      {/* <section className="padding">
        <CustomerReviews />
      </section> */}
      <section>
        <NewsLetter />
      </section>
      <section className="padding">
        <RatesList />
      </section>
      <section>
        <Footer />
      </section>
    </main>
  );
}
