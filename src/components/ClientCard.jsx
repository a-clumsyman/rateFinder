const ClientCard = ({img,link}) => {
  return (
    <div className="w-[15%] max-sm:w-1/3">
        <a href="">
        <img src={img} alt="" width={160} />
        </a>
    </div>
  )
}

export default ClientCard