import FormBody from "./sections/FormBody";
import Head from "./sections/Head";
const BusinessForm = () => {
  return (
    <main className="w-[80%] max-sm:w-[90%] m-auto py-10">
      <section>
        <Head />
      </section>
      <section>
        <FormBody />
      </section>
    </main>
  );
};

export default BusinessForm;
