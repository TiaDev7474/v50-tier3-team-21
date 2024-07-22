import { useEffect, useState } from "react";
import { ProfileForm } from "../components/profile/profile-form";
import { httpClient } from "../lib/http-client";

interface UserType {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  contact: string;
}

// example of the user Object fetched from database
let exampleUser: UserType = {
  username: "minezzig",
  password: "12345",
  email: "myemail@gmail.com",
  firstName: "greg",
  lastName: "minezzi",
  contact: "123456789",
};

export const ProfilePage = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [balance, setBalance] = useState<number>(0);

  // make api request to getUser from database
  useEffect(() => {
    async function getUser() {
      //! GET PROFILE
      const res = await httpClient.get("http://localhost:3000/api/profile");
      console.log(res.data.data);
      setUser(res.data.data);
    }
    getUser();
    // }, [user]);
  }, []);

  // make api request to get balance for user based on userId
  useEffect(() => {
    async function getBalance() {
      //const res = await fetch();
      //const data = await res.json();
      setTimeout(() => setBalance(48.09), 1000);
    }
    getBalance();
  }, []);

  return (
    <div className="bg-white flex flex-col w-full gap-5 px-5 md:px-10 max-w-[1290px]">
      <h1 className="text-lg font-bold md:text-5xl pl-3">Profile</h1>

      <div className="md:flex md:gap-24">
        <div className="flex border border-primary bg-primary bg-opacity-10 rounded-lg p-3 text-primary h-fit md:w-1/3 items-center">
          <div className="bg-primary/30 mr-3 rounded px-2 py-2 items-start flex">
            <div className="icon-[ph--user-duotone] text-2xl"></div>
          </div>
          <div>
            <p className="text-lg">Account</p>
            <p className="text-xs opacity-60">Personal Information</p>
          </div>
        </div>
        <div className="my-5 md:my-0 md:w-2/3">
          <p className="text-primary text-lg mb-5">Personal Information</p>
          {user ? (
            <ProfileForm balance={balance} user={user} setUser={setUser} />
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};
