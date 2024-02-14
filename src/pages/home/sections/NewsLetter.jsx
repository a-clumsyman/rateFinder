import { Button } from "../../../components";

const NewsLetter = () => {
  return (
    <section className="bg-[#EBDDFF] py-14">
      <div className=" w-[60%] max-sm:w-[90%] m-auto">
        <h1 className="text-4xl max-sm:text-2xl font-merriweather font-bold text-center">
          Get the latest news and mortgage trends right into your mailbox
        </h1>
        <div className="w-fit m-auto py-8 flex max-sm:flex-col gap-4 align-center">
          <input type="text" className="input rounded-md w-[22rem] max-sm:w-[18rem]" placeholder="jhon@sample.com" />
          <Button label="Subscribe" />
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
