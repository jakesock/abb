import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
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
        <Navbar />
        <p>Home Page!</p>
        <p>Current user: {username}</p>
      </main>
    </div>
  );
};

export default Home;
