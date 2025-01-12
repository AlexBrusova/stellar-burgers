import React, { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '@store';
import { isAuthedSelector } from '@slices';

type ProtectedRouteProps = PropsWithChildren & {
  notAuthed?: boolean;
};

export const Protected = ({
  notAuthed = false,
  children
}: ProtectedRouteProps) => {
  const isAuthed = useSelector(isAuthedSelector);
  const location = useLocation();

  if (!notAuthed && !isAuthed) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (notAuthed && isAuthed) {
    const fromPage = location.state?.from || { pathname: '/' };

    return <Navigate replace to={fromPage} />;
  }
  return children;
};
