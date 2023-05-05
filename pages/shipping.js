import CheckoutWizard from "@/components/CheckoutWizard";
import Layout from "@/components/Layout";
import { Store } from "@/utils/store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function ShippingScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;
  const router = useRouter();

  useEffect(() => {
    setValue("fullName", shippingAddress.fullName);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("postalCode", shippingAddress.postalCode);
    setValue("country", shippingAddress.country);
  }, [setValue, shippingAddress]);

  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { fullName, address, city, postalCode, country },
    });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        shippingAddress: { fullName, address, city, postalCode, country },
      })
    );
    router.push("/payment");
  };

  return (
    <Layout title="Shipping">
      <CheckoutWizard activeStep={1} />
      <form
        className="max-w-screen-md mx-auto"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Shipping Address</h1>
        <div className="mb-4">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            className="w-full"
            autoFocus
            {...register("fullName", { required: "Please enter full name" })}
          />
          {errors.fullName && (
            <p className="text-red-800">{errors.fullName.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            className="w-full"
            autoFocus
            {...register("address", {
              required: "Please enter address",
              minLength: { value: 3, message: "Address is too short" },
            })}
          />
          {errors.address && (
            <p className="text-red-800">{errors.address.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            className="w-full"
            autoFocus
            {...register("city", { required: "Please enter city" })}
          />
          {errors.city && <p className="text-red-800">{errors.city.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            className="w-full"
            autoFocus
            {...register("postalCode", {
              required: "Please enter postal code",
            })}
          />
          {errors.postalCode && (
            <p className="text-red-800">{errors.postalCode.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            className="w-full"
            autoFocus
            {...register("country", { required: "Please enter country" })}
          />
          {errors.country && (
            <p className="text-red-800">{errors.country.message}</p>
          )}
        </div>

        <div className="mb-4 flex justify-between">
          <button type="submit" className="primary-button">
            Next
          </button>
        </div>
      </form>
    </Layout>
  );
}


ShippingScreen.auth = true;