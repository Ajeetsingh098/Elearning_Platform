import React from "react";
import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";

function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart);

  return (
    <div className="mx-auto w-11/12 max-w-6xl py-10 text-richblack-5">
      
      {/* Heading */}
      <h1 className="mb-2 text-3xl font-semibold text-white">Your Cart</h1>
      <p className="mb-8 text-white">
        {totalItems} Course{totalItems !== 1 && "s"} in Cart
      </p>

      {total > 0 ? (
        <div className="flex flex-col gap-10 lg:flex-row">
          
          {/*Courses */}
          <div className="flex-1">
            <RenderCartCourses />
          </div>

          {/* Total */}
          <div className="w-full lg:w-[35%]">
            <RenderTotalAmount />
          </div>
        </div>
      ) : (
        /* Empty Cart */
        <div className="flex flex-col items-center justify-center rounded-xl bg-richblack-800 py-16">
          <p className="text-xl text-white">
            Your cart is empty 🛒
          </p>
        </div>
      )}
    </div>
  );
}

export default Cart;
