const ClientCard = ({img,link}) => {
  return (
    <div className="w-[15%] flex justify-center max-sm:w-1/3">
        <a href={link} className="w-fit block">
        <img src={img} alt="" width={'auto'} height={50} />
        </a>
    </div>
  )
}

export default ClientCard