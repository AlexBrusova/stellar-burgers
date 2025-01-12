import { useSelector } from '@store';
import { ProfileOrdersUI } from '@ui-pages';
import { FC } from 'react';

export const ProfileOrders: FC = () => {
  const orders = useSelector((store) => store.orders.orders);

  return <ProfileOrdersUI orders={orders} />;
};
