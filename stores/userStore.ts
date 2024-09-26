import { User } from "@/core/entities/models/user.model";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UserState {
    user: User | null; 
    setUser: (user: any) => void; 
  }
  
  export const useUserStore = create<UserState>()(
    devtools(
      persist(
        (set) => ({
          user: null, 
          setUser: (user: User | null) =>
            set(() => ({
              user: user,
            })),
        }),
        { name: "user" }
      )
    )
  );