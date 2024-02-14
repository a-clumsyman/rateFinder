const Button = ({
  label,
  iconURL,
  bg,
  labelColor,
  borderColor,
  handleClick = () => {},
}) => {
  return (
    <button
      className={`px-6 py-3 rounded-md ${
        bg ? bg : "bg-theme-purple"
      } flex items-center
      ${borderColor ? `border ${borderColor}` : ""}
      focus:outline-none
      `}
      onClick={handleClick}
    >
      {iconURL ? <img src={iconURL} alt="" width={20} className="mr-3" /> : ""}
      <p
        className={`font-lato ${
          labelColor ? labelColor : "text-white"
        } font-bold`}
      >
        {label}
      </p>
    </button>
  );
};

export default Button;
