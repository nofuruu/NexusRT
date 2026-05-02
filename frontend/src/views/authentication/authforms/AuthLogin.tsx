import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'src/components/ui/button';
import { Checkbox } from 'src/components/ui/checkbox';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import axios from 'axios';
import axiosInstance from '../../../api/axios';

const AuthLogin = () => {
  // Setup state untuk form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      // Menembak API Laravel
      const response = await axiosInstance.post('/login', {
        email: email,
        password: password,
      });

      localStorage.setItem('token', response.data.access_token);

      navigate('/dashboard');
    } catch (error) {
      console.error('Gagal login:', error);

      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data && error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Terjadi kesalahan pada server.');
        }
      } else {
        setErrorMessage('Terjadi kesalahan yang tidak terduga.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className="mt-6" onSubmit={handleLogin}>
        {errorMessage && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 p-3 rounded-md">{errorMessage}</div>
        )}

        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="email">Email</Label>
          </div>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="userpwd">Password</Label>
          </div>
          <Input
            id="userpwd"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex justify-between my-5">
          <div className="flex items-center gap-2">
            <Checkbox id="accept" className="checkbox" />
            <Label htmlFor="accept" className="opacity-90 font-normal cursor-pointer">
              Ingat Saya
            </Label>
          </div>
          <Link to={'/'} className="text-primary text-sm font-medium">
            Lupa Password ?
          </Link>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Memproses...' : 'Log in'}
        </Button>
      </form>
    </>
  );
};

export default AuthLogin;
