// src/hooks/useAuth.ts
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { fetchUser } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const status = useAppSelector((state) => state.user.status);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchUser());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate]);

  return { user, status };
};