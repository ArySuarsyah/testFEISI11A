import moment from "moment";
import { useSelector } from "react-redux";

export default function DetailUser() {
  const userData = useSelector((state) => state.userList.user);
  console.log(userData);
  return (
    <div className="flex justify-center">
      <div className="flex flex-col m-10 p-5 justify-center items-center gap-5 rounded-md w-96 text-black dark:text-slate-300 bg-blue-300 dark:bg-slate-600">
        <h2 className="font-bold text-lg">User Detail</h2>
        <img
          src={`https://cms-admin-v2.ihsansolusi.co.id/${userData.photo}`}
          alt={`${userData.name} Photo`}
          className="w-32 h-32 rounded-md border-[1px] border-white"
        />
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <h2 className="text-lg font-bold">Nama</h2>
            <p>{userData.name}</p>
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-bold">Alamat</h2>
            <p>{userData.address}</p>
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-bold">Jenis Kelamin</h2>
            <p>{userData.gender === "l" ? "Pria" : "Wanita"}</p>
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-bold">Tanggal Lahir</h2>
            <p>{moment(userData.born_date).format("DD MMM YYYY")}</p>
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-bold">Tanggal Input</h2>
            <p>{moment(userData.created_at).format("DD MMM YYYY hh:mm")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
