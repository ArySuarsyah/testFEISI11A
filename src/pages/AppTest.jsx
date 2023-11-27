/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import http from "../helper/http";
import { useDispatch, useSelector } from "react-redux";
import { userDataList, userView } from "../redux/reducers/userList";
import { Formik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { useNavigate } from "react-router-dom";

// add user form validation
const validationSchema = Yup.object({
  name: Yup.string().required("Name is empty !"),
  address: Yup.string().required("Address is empty !"),
  gender: Yup.string().required("Gender is empty !"),
  born_date: Yup.date().required("Address is empty !"),
});

export default function AppTest() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.dataUser.token);
  const usersList = useSelector((state) => state.userList.data);
  const [userId, setUserId] = useState("");
  console.log(usersList);
  console.log(token);

  // get userList from api
  const getData = useCallback(async () => {
    const { data } = await http(token).get("/user");
    if (data.data) {
      dispatch(userDataList(data.data));
    }
  }, [token, dispatch]);

  //  Add user action
  const addUser = async (values) => {
    try {
      const form = {
        name: values.name,
        address: values.address,
        gender: values.gender,
        born_date: values.born_date,
      };

      const { data } = await http(token).post("/user", form, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const updatedUsersList = [...usersList, data.data];
      dispatch(userDataList(updatedUsersList));
      document.getElementById("my_modal_3").close();
    } catch (error) {
      console.log(error);
    }
  };

  // Open edit modal
  const openEdit = (id) => {
    document.getElementById("my_modal_edit").showModal();
    setUserId(id);
  };

  // Save edit changes
  const editUser = async (values) => {
    try {
      const form = {
        name: values.name,
        address: values.address,
        gender: values.gender,
        born_date: values.born_date,
      };

      const { data } = await http(token).put(`/user/${userId}`, form, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const updatedUsersList = usersList.map(
        (user) => (user.id === userId ? data.data : user)
      );
      dispatch(userDataList(updatedUsersList));
    document.getElementById("my_modal_edit").close();
    } catch (error) {
      console.error("Error editing data:", error);
    }
  };

  // open delete modal
  const deleteButton = (id) => {
    setUserId(id);
    document.getElementById("my_modal_1").showModal();
  };

  // Confirm delete
  const confirmDelete = async () => {
    try {
      await http(token).delete(`user/${userId}`);

      const updatedUsersList = usersList.filter((user) => user.id !== userId);
      dispatch(userDataList(updatedUsersList));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  // To User View/detail
  const doView=(user)=>{
    dispatch(userView(user));
    navigate("/detail");
  }

  // execute getdata 
  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      {usersList ? (
        <div className="container mx-auto mt-8">
          <h2 className="text-2xl font-bold mb-4">Data Table</h2>

          {/* Add user Button */}
          <button
            className="btn mb-3"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            Tambah User
          </button>

          {/* Table user */}
          <table className="table-auto w-full border-collapse border">
            <thead>
              <tr>
                <th className="border p-2">No</th>
                <th className="border p-2">Nama</th>
                <th className="border p-2">Alamat</th>
                <th className="border p-2">Jenis Kelamin</th>
                <th className="border p-2">Tanggal Lahir</th>
                <th className="border p-2">Tanggal Input</th>
                <th className="border p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((user, index) => {
                return (
                  <tr key={index}>
                    <td className="border p-2 text-center">{index + 1}</td>
                    <td className="border p-2 text-center">{user.name}</td>
                    <td className="border p-2 text-center">{user.address}</td>
                    <td className="border p-2 text-center">
                      {user.gender === "l" ? "Pria" : "Wanita"}
                    </td>
                    <td className="border p-2 text-center">
                      {moment(user.born_date).format("DD MMM, YYYY")}
                    </td>
                    <td className="border p-2 text-center">
                      {moment(user.created_at).format("DD MMM YYYY h:mm")}
                    </td>
                    <td className="border p-2 text-center">
                      <button 
                      onClick={()=>doView(user)}
                      className="bg-blue-500 text-white px-2 py-1 mr-2 rounded-sm">
                        View
                      </button>
                      <button
                        onClick={() => openEdit(user.id)}
                        className="bg-blue-500 text-white px-2 py-1 mr-2 rounded-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteButton(user.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* end table */}

          {/* Add user modal */}
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <div>
                <Formik
                  initialValues={{
                    name: "",
                    address: "",
                    gender: "",
                    born_date: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={addUser}
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
                      <form onSubmit={handleSubmit} action="submit">
                        <h3 className="font-bold mb-3">Tambah User</h3>
                        <div className="flex items-center gap-3 mb-3">
                          <label className="w-32" htmlFor="name">
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            placeholder="Type here"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            className="h-12 p-2 rounded-lg border-b border-black w-full"
                          />
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                          <label className="w-32" htmlFor="address">
                            Address
                          </label>
                          <input
                            type="text"
                            name="address"
                            placeholder="Type here"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.address}
                            className="h-12 p-2 rounded-lg border-b border-black w-full"
                          />
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-24">P / W</div>
                          <div className="flex gap-5">
                            <div className="flex justify-center items-center gap-5">
                              <input
                                type="radio"
                                id="pria"
                                name="gender"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="radio"
                                value="l"
                                checked={values.gender === "l"}
                              />
                              <label htmlFor="pria">Pria</label>
                            </div>
                            <div className="flex justify-center items-center gap-5">
                              <input
                                type="radio"
                                id="wanita"
                                name="gender"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="radio"
                                value="p"
                                checked={values.gender === "p"}
                              />
                              <label htmlFor="wanita">Wanita</label>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                          <label className="w-32" htmlFor="born_date">
                            Born date
                          </label>
                          <input
                            type="date"
                            name="born_date"
                            placeholder="Type here"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.born_date}
                            className="h-12 p-2 rounded-lg border-b border-black w-full"
                          />
                        </div>
                        <button type="submit" className="btn w-full">
                          Save
                        </button>
                      </form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </dialog>
          {/* end add user modal*/}

          {/* Edit user modal */}
          <dialog id="my_modal_edit" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <div>
                <Formik
                  initialValues={{
                    name: "",
                    address: "",
                    gender: "",
                    born_date: "",
                  }}
                  onSubmit={editUser}
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
                      <form onSubmit={handleSubmit} action="submit">
                        <h3 className="font-bold mb-3">Edit User</h3>
                        <div className="flex items-center gap-3 mb-3">
                          <label className="w-32" htmlFor="name">
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            placeholder="Type here"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            className="h-12 p-2 rounded-lg border-b border-black w-full"
                          />
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                          <label className="w-32" htmlFor="address">
                            Address
                          </label>
                          <input
                            type="text"
                            name="address"
                            placeholder="Type here"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.address}
                            className="h-12 p-2 rounded-lg border-b border-black w-full"
                          />
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-24">P / W</div>
                          <div className="flex gap-5">
                            <div className="flex justify-center items-center gap-5">
                              <input
                                type="radio"
                                id="pria"
                                name="gender"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="radio"
                                value="l"
                                checked={values.gender === "l"}
                              />
                              <label htmlFor="pria">Pria</label>
                            </div>
                            <div className="flex justify-center items-center gap-5">
                              <input
                                type="radio"
                                id="wanita"
                                name="gender"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="radio"
                                value="p"
                                checked={values.gender === "p"}
                              />
                              <label htmlFor="wanita">Wanita</label>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                          <label className="w-32" htmlFor="born_date">
                            Born date
                          </label>
                          <input
                            type="date"
                            name="born_date"
                            placeholder="Type here"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.born_date}
                            className="h-12 p-2 rounded-lg border-b border-black w-full"
                          />
                        </div>
                        <button type="submit" className="btn w-full">
                          Save
                        </button>
                      </form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </dialog>
          {/* end edit user modal */}

          {/* Delete user modal */}
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <p className="py-4">Confirm delete user</p>
              <div className="modal-action">
                <form method="dialog">
                  <button onClick={confirmDelete} className="btn m-2 ">
                    Confirm
                  </button>
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Cancel</button>
                </form>
              </div>
            </div>
          </dialog>
          {/* End Delete user modal */}
        </div>
      ) : (
        <span className="loading loading-dots loading-lg"></span>
      )}
    </>
  );
}
