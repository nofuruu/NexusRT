import { Link } from 'react-router-dom'; 
import CardBox from 'src/components/shared/CardBox';
import AuthLogin from '../authforms/AuthLogin';
import FullLogo from 'src/layouts/full/shared/logo/FullLogo';

const Login = () => {
  return (
    <>
      <div className="relative overflow-hidden h-screen bg-lightprimary dark:bg-darkprimary">
        <div className="flex h-full justify-center items-center px-4">
          <CardBox className="md:w-[450px] w-full border-none">
            <div className="flex justify-center items-center mb-2">
              <div className="flex items-center gap-3">
                <FullLogo />
                <span className="text-2xl font-bold dark:text-foreground text-foreground">
                  Nexus<span className="text-primary">RT</span>
                </span>
              </div>
            </div>

            <AuthLogin />

            <div className="flex gap-2 text-base text-ld font-medium mt-6 items-center justify-center">
              <p>Belum memiliki akun?</p>
              <Link to={'/auth/auth2/register'} className="text-primary text-sm font-medium">
                Registrasi
              </Link>
            </div>
          </CardBox>
        </div>
      </div>
    </>
  );
};

export default Login;
