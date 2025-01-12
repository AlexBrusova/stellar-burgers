import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { useSelector } from '@store';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const bun = useSelector((store) => store.burgerConstructor.bunId);
  const ingredientsIds = useSelector(
    (store) => store.burgerConstructor.ingredientsIds
  );
  const burgerConstructor = {
    bun,
    ingredientsIds
  };

  const ingredientsCounters = useMemo(() => {
    const { bun, ingredientsIds } = burgerConstructor;
    const counters: { [key: string]: number } = ingredientsIds.reduce(
      (res, id) => {
        const [ingredientId] = id.split('_');
        res[ingredientId] = (res[ingredientId] || 0) + 1;
        return res;
      },
      {} as { [key: string]: number }
    );
    if (bun) counters[bun] = 2;
    return counters;
  }, [burgerConstructor]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
