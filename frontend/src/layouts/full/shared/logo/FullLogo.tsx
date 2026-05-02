






import Logo from "src/assets/images/logos/nexusrt.svg";
import Logowhite from "src/assets/images/logos/nexusrt.svg";


const FullLogo = () => {
  return (


    <>
      {/* Dark Logo   */}
      <img src={Logo} alt="logo" className="block dark:hidden rtl:scale-x-[-1] w-20 h-auto" />
      {/* Light Logo  */}
      <img src={Logowhite} alt="logo" className="hidden dark:block rtl:scale-x-[-1] w-20 h-auto" />
    </>
  );
};

export default FullLogo;
