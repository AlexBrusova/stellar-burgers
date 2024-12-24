import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import store, { useDispatch, useSelector } from '@store';
import { loadOrder, selectIngredients } from '@slices';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const orders = useSelector((store) => store.feeds.orders);
  const { buns, mains, sauces } = selectIngredients(store.getState());
  const orderData = orders.find((o) => o.number === +(params.number || 0));
  const ingredients: TIngredient[] = [...buns, ...mains, ...sauces];

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  useEffect(() => {
    if (!params.number) return;
    dispatch(loadOrder(+params.number));
  }, [params.number]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
