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
import Layout from "../../components/Layout";

export default function Home() {
  return (
    <Layout>
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
      <section className="padding">
        <EducationCenter />
      </section>
      <section className="">
        <CustomerReviews />
      </section>
      <section>
        <NewsLetter />
      </section>
      <section className="padding">
        <RatesList />
      </section>
    </Layout>
  );
}
