import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { LogoutButton } from "../components/LogoutButton";
import { GetCurrentUserQuery } from "../lib/graphql/generated";
import { GET_CURRENT_USER_QUERY } from "../lib/graphql/queries";

const Home: NextPage = () => {
  const [username, setUsername] = useState("");
  const { data, loading } = useQuery<GetCurrentUserQuery>(GET_CURRENT_USER_QUERY);

  useEffect(() => {
    if (loading) {
      setUsername("loading...");
    }
    if (!data?.getCurrentUser) {
      setUsername("Not logged in");
    }
    if (!loading && data?.getCurrentUser?.username) {
      setUsername(data.getCurrentUser.username);
    }
  }, [loading, data]);

  return (
    <div>
      <main>
        <p>Home Page!</p>
        <p>Current user: {username}</p>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
        <LogoutButton />
      </main>
    </div>
  );
};

export default Home;
