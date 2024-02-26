/* eslint-disable react/prop-types */
const Button = (props) => {
  return (
    <button
    disabled={props.disabled}
      className={`px-5 py-2 rounded-md ${
        props.disabled ? 'bg-slate-400 cursor-not-allowed' :props.bg ? props.bg : "bg-theme-purple"
      } flex items-center
      ${props.borderColor ? `border ${props.borderColor}` : ""}
      focus:outline-none`}
      onClick={props.handleClick}
    >
      {props.iconURL ? <img src={props.iconURL} alt="" width={20} className="mr-3" /> : ""}
      <p
        className={`font-lato ${
          props.labelColor ? props.labelColor : "text-white"
        }`}
      >
        {props.label}
      </p>
    </button>
  );
};

export default Button;
