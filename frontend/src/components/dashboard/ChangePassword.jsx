import React, { useEffect, useState } from "react";
import {
  customerChangePassword,
  messageClear,
} from "../../store/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PropagateLoader } from "react-spinners";

function ChangePassword() {
  const dispatch = useDispatch();
  const { loader, successMessage, errorMessage } = useSelector(
    (state) => state.auth
  );

  const [passwordData, setPasswordData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const submitPasswordChange = (e) => {
    e.preventDefault();
    dispatch(customerChangePassword(passwordData));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);

  const overrideStyle = {
    display: "flex",
    margin: "0 auto",
    height: "24px",
    justifyContent: "center",
    alignItem: "center",
  };

  return (
    <div className="p-4 bg-white rounded-md">
      <h2 className="text-xl text-slate-600 pb-5">Change Password</h2>
      <form onSubmit={submitPasswordChange}>
        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            value={passwordData.email}
            onChange={handlePasswordChange}
            className="outline-none px-3 py-1 border rounded-md text-slate-600"
          />
        </div>

        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="oldPassword">Old Password</label>
          <input
            type="password"
            id="oldPassword"
            name="oldPassword"
            placeholder="Old Password"
            value={passwordData.oldPassword}
            onChange={handlePasswordChange}
            className="outline-none px-3 py-1 border rounded-md text-slate-600"
          />
        </div>

        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            placeholder="New Password"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            className="outline-none px-3 py-1 border rounded-md text-slate-600"
          />
        </div>

        <div>
          <button
            disabled={loader}
            className="px-8 py-2 bg-purple-500 shadow-lg hover:shadow-purple-500/30 text-white rounded-md"
          >
            {loader ? (
              <PropagateLoader color="#fff" cssOverride={overrideStyle} />
            ) : (
              "Update Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
