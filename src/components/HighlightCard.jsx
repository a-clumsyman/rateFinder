const HighlightCard = ({ value, name }) => {
  return (
    <div className="max-sm:w-[40%]">
      <h3 className="text-[40px] max-lg:text-3xl max-sm:text-xl font-lato text-theme-purple font-bold">
        {value}
      </h3>
      <p className="text-xl max-sm:text-base w-[80%] font-lato font-bold">{name}</p>
    </div>
  );
};

export default HighlightCard;
