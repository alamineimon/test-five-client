import React, { useState } from "react";
import { useQuery } from "react-query";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { EditModal } from "../modal/EditModal";
import ConfirmationModal from "../modal/ConfirmationModal";
import Loader from "./Loader";

const Table = () => {
  const [product, setProduct] = useState(null);
  // const [editProfile, setEditProfile] = useState(null);
  const {
    data: allInformation = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allInformation"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/users");
      const data = await res.json();
      return data;
    },
  });
  //for close the confirm modal
  const closeModal = () => {
    setProduct(null);
  };

  //for delete any data
  const handleDelete = (allInformation) => {
    fetch(`http://localhost:5000/deleteUsers/${allInformation._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
        }
      });
  };
  if(isLoading){
    return <Loader/>
  }

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Position</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {allInformation?.map((information, index) => (
            <tr key={information._id}>
              <th>{index + 1}</th>
              <td>{information.name}</td>
              <td>{information.position}</td>
              <td>{information.age} Yrs</td>
              <td className="flex gap-4">
                <label onClick={() => setProduct(information)} htmlFor="editModal">
                  <AiOutlineEdit />
                </label>
                {product && <EditModal
                  refetch={refetch}
                  closeModal={closeModal}
                  product={product}
                />}
  
                <label
                  onClick={() => setProduct(information)}
                  htmlFor="confirmation-modal"
                >
                  <AiOutlineDelete className="cursor-pointer" />
                </label>
                {product && (
                  <ConfirmationModal
                    successAction={handleDelete}
                    modalData={product}
                    closeModal={closeModal}
                    title={`Are you sure you wanna delete? `}
                    message={`If you delete ${product.name}.  It cann't be undone`}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
