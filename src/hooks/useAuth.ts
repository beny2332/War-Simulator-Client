// src/hooks/useAuth.ts
import { useEffect } from 'react';
import { useAppSelector } from '../redux/store';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const status = useAppSelector((state) => state.user.status);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return { user, status };
};