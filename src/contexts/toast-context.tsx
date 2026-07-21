import React, { createContext, useContext, useState, useCallback } from "react";
import { Text } from "../components/text";
import Icon from "../components/icon";
import CheckIcon from "../assets/icons/check.svg?react";
import XIcon from "../assets/icons/x.svg?react";
import { Button } from "../components/button";

export type ToastType = "success" | "error" | "info";

export interface ToastItem {
  id: string;
  message: string;
  title?: string;
  type: ToastType;
}

interface ToastContextData {
  addToast: (message: string, type?: ToastType, title?: string) => void;
  removeToast: (id: string) => void;
  toast: {
    success: (message: string, title?: string) => void;
    error: (message: string, title?: string) => void;
    info: (message: string, title?: string) => void;
  };
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: ToastType = "info", title?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, title, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, [removeToast]);

  const toastHelpers = React.useMemo(() => ({
    success: (message: string, title?: string) => addToast(message, "success", title),
    error: (message: string, title?: string) => addToast(message, "error", title),
    info: (message: string, title?: string) => addToast(message, "info", title),
  }), [addToast]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast, toast: toastHelpers }}>
      {children}

      <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {toasts.map((item) => (
          <div
            key={item.id}
            className="pointer-events-auto bg-background-secondary/95 border border-border-primary rounded-lg p-4 shadow-xl backdrop-blur-md flex items-start gap-3 transition-all animate-in fade-in slide-in-from-bottom-5 duration-300"
          >
            <div className="mt-0.5 shrink-0">
              {item.type === "success" && (
                <div className="w-6 h-6 rounded-full bg-accent-brand/20 flex items-center justify-center">
                  <Icon svg={CheckIcon} className="w-4 h-4 fill-accent-brand" />
                </div>
              )}
              {item.type === "error" && (
                <div className="w-6 h-6 rounded-full bg-accent-red/20 flex items-center justify-center">
                  <Icon svg={XIcon} className="w-4 h-4 fill-accent-red" />
                </div>
              )}
              {item.type === "info" && (
                <div className="w-6 h-6 rounded-full bg-accent-brand-light/20 flex items-center justify-center">
                  <Icon svg={CheckIcon} className="w-4 h-4 fill-accent-brand-light" />
                </div>
              )}
            </div>

            <div className="flex-1 flex flex-col gap-0.5">
              {item.title && (
                <Text variant="heading-small" className="text-white">
                  {item.title}
                </Text>
              )}
              <Text variant="paragraph-medium" className="text-accent-paragraph">
                {item.message}
              </Text>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="p-1 h-auto text-accent-span hover:text-white"
              onClick={() => removeToast(item.id)}
            >
              <Icon svg={XIcon} className="w-4 h-4 fill-current" />
            </Button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
