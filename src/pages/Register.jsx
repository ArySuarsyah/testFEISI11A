/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { asyncRegister } from "../redux/action/authAction";
import { deleteMessage } from "../redux/reducers/auth";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

// YUP Validation Schema
const validationSchema = Yup.object({
  name: Yup.string().required("Name is empty !"),
  email: Yup.string().required("Email is empty !"),
  password: Yup.string().required("Password is empty !"),
});

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const messageData = useSelector((state) => state.auth.registerMessage);
  const token = useSelector((state) => state.auth.dataUser.token);
  const [showHidePass, setShowHidePass] = useState(false);
  const [load, setLoad] = useState(false);

  // submit action
  const doRegister = (values) => {
    setLoad(!load);
    dispatch(asyncRegister(values));
  };
  // end submit action

  // navigation
  useEffect(() => {
    if (token) {
      setLoad(false);
      navigate("/appTest");
    }
  }, [navigate, token, setLoad]);

  // show/hide password
  const handleShowPass = () => {
    setShowHidePass(!showHidePass);
  };

  // open alert modal
  useEffect(() => {
    if (messageData) {
      document.getElementById("my_modal_1").showModal();
      setLoad(false);
    }
  }, [messageData]);
  // end open alert modal

  // Delete alert message
  const deleteAlertMsg = () => {
    dispatch(deleteMessage());
  };
  // end Delete alert message

  return (
    <div className="flex justify-center items-center h-[100vh]">

      {/* Input Form */}
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={doRegister}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleSubmit,
          handleChange,
          isSubmitting,
        }) => {
          return (
            <div className="mx-auto mt-8 p-5 rounded-md bg-white dark:bg-slate-800">
              <h2 className="text-2xl font-bold mb-4">Register</h2>
              <form onSubmit={handleSubmit} className="w-64">
                <div className="mb-4 flex flex-col gap-2">
                  <label className="block text-sm font-medium text-gray-600">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    className={
                      errors.name
                        ? "input input-error w-full px-3 mb-2"
                        : "input w-full px-3 mb-2 outline-none"
                    }
                    required
                  />
                </div>
                <div className="mb-4 flex flex-col gap-2">
                  <label className="block text-sm font-medium text-gray-600">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className={
                      errors.email
                        ? "input input-error w-full px-3 mb-2"
                        : "input w-full px-3 mb-2 outline-none"
                    }
                    required
                  />
                </div>
                <div className="mb-4 flex flex-col gap-2">
                  <label className="block text-sm font-medium text-gray-600">
                    Password
                  </label>
                  <div className="relative flex justify-center items-center">
                    <input
                      type={showHidePass ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      className={
                        errors.password
                          ? "input input-error w-full px-3 mb-2"
                          : "input w-full px-3 mb-2 pr-10 outline-none"
                      }
                      required
                    />
                    {showHidePass ? (
                      <AiOutlineEye
                        size={20}
                        onClick={handleShowPass}
                        className="absolute right-2 top-4 cursor-pointer"
                      />
                    ) : (
                      <AiOutlineEyeInvisible
                        size={20}
                        onClick={handleShowPass}
                        className="absolute right-2 top-4 cursor-pointer"
                      />
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={load ? true : false}
                  className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                >
                  <p
                    className={load ? "loading loading-spinner loading-sm" : ""}
                  >
                    Register
                  </p>
                </button>
              </form>
            </div>
          );
        }}
      </Formik>

      {/* End Input Form */}

      {/* alert message modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <div className="text-red-400">
            <p className="font-bold">Error !!</p>
            {typeof messageData === "object" ? (
              messageData.map((msg) => {
                for (let key in msg) {
                  return <p key={key}>{msg[key]}</p>;
                }
              })
            ) : (
              <p>{messageData}</p>
            )}
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button onClick={deleteAlertMsg} className="btn">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>

      {/* end alert message modal */}
    </div>
  );
}
