import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import store, { useDispatch, useSelector } from '@store';
import { useNavigate } from 'react-router-dom';
import { createOrder, resetOrder, selectIngredients } from '@slices';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { buns, mains, sauces } = selectIngredients(store.getState());
  const isAuthed = useSelector((store) => store.user.isAuthed);
  const orderRequest = useSelector((store) => store.orders.creating);
  const orderModalData = useSelector((store) => store.orders.created);
  const bun = useSelector((store) => store.burgerConstructor.bunId);
  const ingredientsIds = useSelector(
    (store) => store.burgerConstructor.ingredientsIds
  );
  const constructorItems: {
    bun?: TIngredient;
    ingredients: TConstructorIngredient[];
  } = {
    bun: buns.find((b) => b._id === bun),
    ingredients: ingredientsIds.map((id) => {
      const [ingredientId] = id.split('_');
      return {
        ...[...mains, ...sauces].find((i) => ingredientId === i._id),
        id
      };
    }) as TConstructorIngredient[]
  };

  const onOrderClick = () => {
    if (
      !constructorItems.bun ||
      !constructorItems.ingredients?.length ||
      orderRequest
    )
      return;
    if (!isAuthed) {
      navigate('/login', { replace: true, state: { from: location } });
      return;
    }
    dispatch(
      createOrder(
        Object.values(constructorItems).map((i) => (i as TIngredient)._id)
      )
    );
  };
  const closeOrderModal = () => {
    dispatch(resetOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
