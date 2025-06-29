import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  activeStripeConnectAccount,
  messageClear,
} from '../store/Reducers/sellerReducer';
import { FadeLoader } from 'react-spinners';
import error from '../assets/image/error.png';
import success from '../assets/image/correct.png';
import { useNavigate } from 'react-router-dom';

function Success() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loader, errorMessage, successMessage } = useSelector(
    (state) => state.seller
  );

  const queryParams = new URLSearchParams(window.location.search);
  const activeCode = queryParams.get('activeCode');

  useEffect(() => {
    if (activeCode) {
      dispatch(activeStripeConnectAccount(activeCode));
    }
  }, [activeCode]);

  const redirect = () => {
    dispatch(messageClear());
    navigate('/');
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-4">
      {loader ? (
        <FadeLoader />
      ) : errorMessage ? (
        <>
          <img className="w-30" src={error} alt="error" />
          <button
            onClick={redirect}
            className="px-5 py-2 bg-green-500 rounded-sm text-white"
          >
            Back to Dashboard
          </button>
        </>
      ) : successMessage ? (
        <>
          <img className="w-30" src={success} alt="success" />
          <button
            onClick={redirect}
            className="px-5 py-2 bg-green-500 rounded-sm text-white"
          >
            Back to Dashboard
          </button>
        </>
      ) : null}
    </div>
  );
}

export default Success;
