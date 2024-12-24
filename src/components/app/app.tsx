import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from '@store';
import { loadFeeds, loadIngredients } from '@slices';
import { Protected } from '../protected';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(loadIngredients());
    dispatch(loadFeeds());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route
          path='/login'
          element={
            <Protected notAuthed>
              <Login />
            </Protected>
          }
        />
        <Route
          path='/register'
          element={
            <Protected notAuthed>
              <Register />
            </Protected>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <Protected notAuthed>
              <ForgotPassword />
            </Protected>
          }
        />
        <Route
          path='/reset-password'
          element={
            <Protected notAuthed>
              <ResetPassword />
            </Protected>
          }
        />
        <Route
          path='/profile'
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <Protected>
              <ProfileOrders />
            </Protected>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <Protected>
              <OrderInfo />
            </Protected>
          }
        />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/profile/orders/:number'
            element={
              <Protected>
                <Modal
                  title='Детали заказа'
                  onClose={() => {
                    navigate(-1);
                  }}
                >
                  <OrderInfo />
                </Modal>
              </Protected>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal
                title='Детали заказа'
                onClose={() => {
                  navigate(-1);
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title='Ингредиент'
                onClose={() => {
                  navigate(-1);
                }}
              >
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;

