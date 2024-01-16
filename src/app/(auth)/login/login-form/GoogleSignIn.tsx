import { Icons } from "@/core/components/icons";
import { Button } from "@/core/components/ui/button";
import React from "react";
import {signIn} from 'next-auth/react'

interface Props {
  className?: string;
  disabled?: boolean;
}
const GoogleSignIn = ({ disabled }: Props) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const handleSignIn = async () => {
    setIsLoading(true);
    await signIn('google', {callbackUrl: '/'})
    setIsLoading(false);
  }
  
  return (
    <Button variant="outline"  disabled={isLoading || disabled} onClick={handleSignIn}>
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.google className="mr-2 h-4 w-4" />
      )}{" "}
      Google
    </Button>
  );
};

export default GoogleSignIn;
