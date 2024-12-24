import { loadFeeds, loadIngredients } from '@slices';
import { useDispatch, useSelector } from '@store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const feedLoading = useSelector((state) => state.feeds.loading);
  const orders: TOrder[] = useSelector((state) => state.feeds.orders);

  useEffect(() => {
    dispatch(loadIngredients());
    dispatch(loadFeeds());
  }, []);

  if (!orders.length || feedLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(loadFeeds());
      }}
    />
  );
};
