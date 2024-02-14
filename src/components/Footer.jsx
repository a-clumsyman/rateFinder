import { navLogo } from "../assets/images";
import { footerLinks } from "../constants";
const Footer = () => {
  return (
    <footer className="bg-black p-16 pb-6 max-sm:p-8 ">
      <div className="flex max-sm:flex-col gap-20 max-sm:gap-5 justify-between">
        <div>
          <img src={navLogo} alt="" className="w-[15rem]" />
          <p className="text-white font-lato text-xl max-sm:text-base mt-2">
            One-stop solution for all your home-ownership needs
          </p>
        </div>
        <div className="flex max-sm:flex-col justify-between gap-36 max-sm:gap-5 ">
          {footerLinks.map((link, index) => (
            <div key={`index-footer-link-${index}`}>
              <h5 className="text-white text-ls font-lato text-2xl font-bold mb-4">
                {link.title ? link.title : ""}
              </h5>
              <ul>
                {link.links.map((rec, j) => (
                  <a href={rec.href} key={`footer-link-${j}`}>
                    <p className="text-white font-lato hover:text-gray-400 text-base mb-2">
                      {rec.label}
                    </p>
                  </a>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 ">
        <div className="w-full h-[2px] bg-white mb-2"></div>
        <h5 className="text-white font-lato font-bold">Disclaimer:</h5>
        <p className="text-xs text text-gray-300">
          Financial institutions pay us for connecting them with customers,
          including by paying for advertisements, clicks, or when someone
          applies for/is approved for a product. Terms and conditions apply
          between you and the provider of the product - please be sure to review
          them. Product information and details vary for Quebec. The content
          provided on our site is for information only; it is not meant to be
          relied on or used in lieu of advice from a professional.
          Partners/Advertisers are not responsible for the accuracy of
          information on our site. For complete and current information on any
          product, please visit the provider’s website. However, not all
          products we list are tied to compensation for us. Our industry-leading
          education centres and calculators are available 24/7, free of charge,
          and with no obligation to purchase. To{" "}
          <a href="" className="underline underline-offset-2">
            learn more
          </a>
          , visit our About us page.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
