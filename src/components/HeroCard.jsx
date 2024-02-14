import { Link } from "react-router-dom"

const HeroCard = ({icon,title,href}) => {
  return (
    <Link to={href} target="_blank">
      <div className="flex flex-col justify-center items-center shadow-xl rounded-lg py-5 px-20 max-sm:px-12 bg-white hover:scale-105 cursor-pointer transition">
          <img src={icon} alt="" width={48} height={48}/>
          <h3 className="mt-3 text-2xl text-gray-8 max-sm:text-lg">{title}</h3>
      </div>
    </Link>
  )
}

export default HeroCard