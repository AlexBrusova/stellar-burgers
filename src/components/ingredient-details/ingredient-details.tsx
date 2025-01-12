import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { selectIngredients } from '@slices';
import store from '@store';

export const IngredientDetails: FC = () => {
  const params = useParams();
  const { buns, sauces, mains } = selectIngredients(store.getState());
  const ingredientData = [...buns, ...sauces, ...mains].find(
    (i) => i._id === params.id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
