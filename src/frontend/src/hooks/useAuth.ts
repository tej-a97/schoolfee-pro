import { createActor } from "@/backend";
import { Role } from "@/backend";
import type { User } from "@/backend";
import { useAppStore } from "@/store/appStore";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useAuth() {
  const {
    login,
    clear,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    identity,
  } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const queryClient = useQueryClient();
  const { user, setUser, setRole } = useAppStore();
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !actor || actorFetching) return;

    const principal = identity?.getPrincipal();
    if (!principal) return;

    setIsLoadingUser(true);
    setAuthError(null);

    (async () => {
      try {
        // Try to register as new user; backend returns existing user if principal already exists
        const result = await actor.registerUser(
          principal.toString().slice(0, 8),
          "",
          Role.Teacher,
        );
        if (result.__kind__ === "ok") {
          setUser(result.ok);
          setRole(result.ok.role);
        } else {
          setAuthError(result.err);
        }
      } catch (err) {
        setAuthError(
          err instanceof Error ? err.message : "Authentication failed",
        );
      } finally {
        setIsLoadingUser(false);
      }
    })();
  }, [isAuthenticated, actor, actorFetching, identity, setUser, setRole]);

  const logout = () => {
    clear();
    queryClient.clear();
    setUser(null);
    setRole(null);
  };

  return {
    user,
    role: user?.role ?? null,
    isAuthenticated,
    isLoading:
      isInitializing ||
      isLoggingIn ||
      isLoadingUser ||
      (isAuthenticated && actorFetching),
    isInitializing,
    isLoggingIn,
    authError,
    login,
    logout,
    identity,
  };
}
