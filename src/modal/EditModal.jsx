import React, { useState } from "react";
import { useForm } from "react-hook-form";

export const EditModal = ({ refetch, product ,closeModal }) => {
  const [signUpError, setSingUpError] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  


//for update any user
  const handelUpdate = (data) => {
    const updatedProfile = {
      name: data.name,
      position: data.position,
      age: data.age,
    }
    fetch(
        `http://localhost:5000/users/${product?._id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(updatedProfile),
        }
      )
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          if (result.acknowledged) {
            refetch();
            closeModal()

          }
        });


  };

  return (
    <div>
      {/* Put this part before </body> tag */}
      {product && <>
        <input type="checkbox" id="editModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative rounded ">
          <label
          onClick={closeModal}
            htmlFor="editModal"
            className="btn btn-sm bg-blue-500 border-none btn-circle absolute right-2 top-2 mb-4 "
          >
            ✕
          </label>
          <p className="text-center mb-2 text-lg">Update your Info</p>
          <form onSubmit={handleSubmit(handelUpdate)} className="mt-6">
            <div className="form-control w-full relative ">
              <input
                type="name"
                name="name"
                {...register("name")}
                defaultValue={product.name}
                className="input input-bordered rounded-none w-full text-black px-8 "
              />
              {errors.name && (
                <p className="text-orange-400 mt-2">{errors.name?.message}</p>
              )}
            </div>
            <div className="form-control my-3 w-full relative ">
              <input
                type="text"
                name="position"
                {...register("position")}
                defaultValue={product.position}
                className="input input-bordered rounded-none w-full text-black px-8 "
              />
              {errors.name && (
                <p className="text-orange-400 mt-2">{errors.name?.message}</p>
              )}
            </div>
            <div className="form-control w-full relative ">
              <input
                type="text"
                name="age"
                {...register("age")}
                defaultValue={product.age}
                className="input input-bordered rounded-none w-full text-black px-8 "
              />
              {errors.name && (
                <p className="text-orange-400 mt-2">{errors.name?.message}</p>
              )}
            </div>
            <br />
            <label
            htmlFor="editModal"
          >
           <input
              className="hover:bg-blue-500 rounded border-2 mt-5 border-blue-500 text-blue-500 hover:text-white text-lg uppercase font-semibold w-full py-2 cursor-pointer"
              value="Update"
              type="submit"
            />
          </label>
            <div>
              {signUpError && <p className="text-orange-400">{signUpError}</p>}
            </div>
          </form>
        </div>
      </div>
      </>}

    </div>
  );
};
