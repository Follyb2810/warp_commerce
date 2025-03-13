import { useKeplr } from "@/hooks/useKeplr";
import React, { useEffect, useCallback, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { maskAddress } from "@/utils/maskAddress";
import { useWalletAuthMutation } from "@/api/authService";
import { setAuthenticated } from "@/features/authSlice";
import { IApiResponse, IUserResponse } from "@/@types/types";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import AppButton from "../shared/AppButton";
import AuthClientStore from "@/utils/AuthStore";

interface IWalletConnectProps {
  buttonProps?: React.ComponentProps<typeof Button>;
}

export const WalletConnect: React.FC<IWalletConnectProps> = ({ buttonProps }) => {
  const { address, connect, disconnect } = useKeplr();
  const [walletAuth, { isLoading }] = useWalletAuthMutation();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state: RootState) => state.auth);
  const [open, setOpen] = useState(false);

  const handleAuth = useCallback(async () => {
    if (!address) return;
    try {
      const response: IApiResponse = await walletAuth({ walletAddress: address }).unwrap();
      if (response.status === 200) {
        const successResponse = response.data as IUserResponse;
        dispatch(
          setAuthenticated({
            isAuthenticated: true,
            user: {
              id: successResponse.accessToken,
              roles: successResponse.result.role,
              walletAddress: successResponse.result.walletAddress,
            },
          })
        );
        AuthClientStore.setAccessToken(successResponse.accessToken)
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error("Wallet Auth Error:", error);
    }
  }, [address, walletAuth, dispatch]);

  useEffect(() => {
    if (!address) return;
    handleAuth();
  }, [address, handleAuth]);

  const handleDisconnect = () => {
    const confirmDisconnect = window.confirm("Are you sure you want to disconnect your wallet?");
    if (confirmDisconnect) {
      disconnect();
      dispatch(setAuthenticated({ isAuthenticated: false, user: null }));
      setOpen(false);
    }
  };

  return (
    <div>
      {isAuthenticated && user?.walletAddress ? (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <AppButton
              variant="default"
              className="flex items-center gap-2 px-4 py-2 w-full"
              {...buttonProps}
              size={'lg'}
            >
              <Avatar className="w-6 h-6">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>{user.walletAddress.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span>{maskAddress(user.walletAddress)}</span>
            </AppButton>
          </PopoverTrigger>

          <PopoverContent align="end" className="w-56 p-4 bg-white shadow-md rounded-md">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-12 h-12 mb-2">
                  <AvatarFallback>{user.walletAddress.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <p className="text-sm font-semibold">{maskAddress(user.walletAddress)}</p>
                <p className="text-xs text-gray-500">{user.roles.join(" and ")}</p>
              </div>
              <AppButton
                variant="destructive"
                className="w-full mt-3"
                onClick={handleDisconnect}
              >
                Disconnect Wallet
              </AppButton>
            </motion.div>
          </PopoverContent>
        </Popover>
      ) : (
        <AppButton
          variant="default"
          onClick={connect}
          isLoading={isLoading}
          className="w-full py-2 text-center"
          {...buttonProps}
          label="Connect Wallet"
        />
      )}
    </div>
  );
};
