const DescCard = ({ title, desc }) => {
  return (
    <div className="my-12">
      <h3 className="text-2xl text-theme-purple font-lato font-bold">
        {title}
      </h3>
      <p className="text-xl font-lato mt-4 w-[90%]">{desc}</p>
    </div>
  );
};

export default DescCard;
