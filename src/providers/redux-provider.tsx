"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";

import { store } from "@/redux/store";

type ReduxProviderProps = {
    children: ReactNode;
};

export const ReduxProvider = ({ children }: ReduxProviderProps) => {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  )
};
