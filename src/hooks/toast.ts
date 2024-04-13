import { useEffect } from "react";
import { IToast } from "@/types/plugins";

declare global {
  interface Window {
    toast: IToast;
  }
}

const useToast = (toast?: IToast) => {
  useEffect(() => {
    if (window.toast) return;
    toast ??= {
      success: window.alert,
      info: window.alert,
      warning: window.alert,
      error: window.alert,
      loading: window.alert,
      dismiss: () => {}
    };
    window.toast = toast;
  }, []);
};

export default useToast;
