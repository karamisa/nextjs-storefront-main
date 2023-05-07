import { Store } from "@/utils/store";
import { Menu } from "@headlessui/react";
import { signOut, useSession } from 'next-auth/react';
import Head from "next/head";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DropdownLink from "./DropdownLink";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import SearchIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon'

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove('cart')
    dispatch({type: 'CART_RESET' });
    signOut({ callbackUrl: '/login'});
  }

  const [query , setQuery] = useState('');

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  }



  return (
    <>
      <Head>
        <title>{title ? title + " | SLEAK " : "SLEAK"}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex justify-between items-center h-12 px-4 shadow-md">
            <Link href="/" className="text-lg font-bold">
              SLEAK
            </Link>
            <form
              onSubmit={submitHandler}
              className="mx-auto hidden justify-center md:flex"
            >
              <input
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                className="rounded-tr-none rounded-br-none p-1 text-sm   focus:ring-0"
                placeholder="Search products"
              />
              <button
                className="rounded rounded-tl-none rounded-bl-none bg-amber-300 p-1 text-sm dark:text-black"
                type="submit"
                id="button-addon2"
              >
                <SearchIcon className="h-5 w-5"></SearchIcon>
              </button>
            </form>
            <div className="flex items-center z-10">
              <Link className="p-2" href="/cart">
                Cart
                {cartItemsCount > 0 && (
                  <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-white text-xs font-bold">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              {status === "loading" ? (
                "Loading"
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-blue-600">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      <DropdownLink href="/profile" className='dropdown-link'>
                        Profile
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink href="/order-history" className='dropdown-link'>
                        Orders History
                      </DropdownLink>
                    </Menu.Item>
                    {session.user.isAdmin && (
                      <Menu.Item>
                        <DropdownLink href="/admin/dashboard" className='dropdown-link'>
                          Admin Dashboard
                        </DropdownLink>
                      </Menu.Item>
                    )}
                    <Menu.Item>
                      <a className="dropdown-link" href="#" onClick={logoutClickHandler}>
                        Logout
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link className="p-2" href="/login">
                  Login
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="contianer m-auto mt-4 px-4">{children}</main>
        <footer className="flex justify-center items-center bg-white text-black shadow-sm font-mono">
          <p className="p-4">© 2023 SLEAK</p>
        </footer>
      </div>
    </>
  );
}
