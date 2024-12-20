import FormBody from "./sections/FormBody";
import Head from "./sections/Head";
import Layout from "../../components/Layout";

const BusinessForm = () => {
  return (
    <Layout>
      <div className="w-[80%] max-sm:w-[90%] m-auto py-10">
        <section>
          <Head />
        </section>
        <section>
          <FormBody />
        </section>
      </div>
    </Layout>
  );
};

export default BusinessForm;
