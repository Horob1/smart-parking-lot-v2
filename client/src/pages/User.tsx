import { useEffect, useMemo, useState } from "react";
import { IUser } from "../interface";
import Table, { ColumnsType } from "rc-table";
import { FaPencilRuler } from "react-icons/fa";
import { BsTrash2 } from "react-icons/bs";
import axios from "./../utils/axios";
import { BiPlus } from "react-icons/bi";

export const User = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [status, setStatus] = useState(false);
  const columns: ColumnsType<IUser> = useMemo(
    () => [
      {
        title: "Id",
        dataIndex: "_id",
        key: "_id",
        width: 120,
        render: (value) => (
          <h5 className="font-semibold uppercase">{value.slice(-8)}</h5>
        ),
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: 300,
        render: (value) => (
          <h5 className="font-semibold capitalize">{value}</h5>
        ),
      },
      {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
        width: 300,
        render: (value) => (
          <h5 className="font-semibold capitalize">{value}</h5>
        ),
      },
      {
        title: "CCCD",
        dataIndex: "cccd",
        key: "cccd",
        width: 300,
        render: (value) => (
          <h5 className="font-semibold capitalize">{value}</h5>
        ),
      },
      {
        title: "CardId",
        dataIndex: "_id",
        key: "_id",
        width: 120,
        render: (value) => {
          const user = users.find((u) => u._id === value);
          const cardUid = user?.cardId?.uid ?? "Không có!";
          return <h5 className="font-semibold uppercase">{cardUid}</h5>;
        },
      },
      {
        title: "Actions",
        dataIndex: "_id",
        key: "_id",
        render: (value) => (
          <div className="flex gap-4">
            <div className="tooltip" data-tip="Edit">
              <button
                onClick={() => {
                  console.log(value);
                }}
                className="bg-cyan-500 h-fit w-fit rounded-md p-2 text-base-100"
              >
                <FaPencilRuler />
              </button>
            </div>
            <div className="tooltip" data-tip="Delete">
              <button
                onClick={() => {
                  //
                }}
                className="bg-red-500 h-fit w-fit rounded-md p-2 text-base-100"
              >
                <BsTrash2 />
              </button>
            </div>
          </div>
        ),
      },
    ],
    [users]
  );

  async function fetchUsers() {
    try {
      const response = await axios.get("/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    // fetch users
    fetchUsers();
  }, [status]);

  return (
    <div className="h-screen w-full p-4 relative">
      <div className="h-[100%] w-full bg-gray-200 rounded-md overflow-y-auto">
        <Table
          columns={columns}
          data={users}
          emptyText={() => (
            <div className="text-center">⚠️ No Data Found ⚠️</div>
          )}
        />
      </div>
      <div className="absolute bottom-16 right-16">
        <button
          onClick={() => {
            //
          }}
          className="h-fit w-fit rounded-full bg-gradient-to-tr from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% p-2 text-base-300 hover:opacity-75"
        >
          <BiPlus />
        </button>
      </div>
    </div>
  );
};

//model
