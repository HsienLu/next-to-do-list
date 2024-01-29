"use client";
import React, {useEffect, useState} from "react";

interface fetchMessage {
  status: boolean | string;
  message: string;
  uid?: string;
  token?: string;
}
interface userData {
  email: string;
  password: string;
  nickname: string;
}

const regUrl = "https://todolist-api.hexschool.io/users/sign_up";
const loginUrl = "https://todolist-api.hexschool.io/users/sign_in";
export default function Users() {
  const [fetchMessage, setFetchMessage] = useState<fetchMessage>({
    status: "",
    message: "",
  });
  const [userData, setUserData] = useState<userData>({
    email: "",
    password: "",
    nickname: "",
  });
  const [loginMessage, setLoginMessage] = useState<fetchMessage>({
    status: "",
    message: "",
  });
  const parm = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(userData),
  };
  const parmLogin = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({email: userData.email, password: userData.password}),
  };
  const fetcher = async (url: string, parm: {}) => {
    const data = await fetch(url, parm)
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error));
    if (url === regUrl) {
      setFetchMessage(data);
    } else {
      setLoginMessage(data);
    }
  };

  useEffect(() => {
    console.log(userData);
  }, [userData]);
  const handdleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUserData({...userData, [e.target.name]: e.target.value});
  return (
    <>
      <div className="com">
        <div className="div">
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            className="input"
            id="email"
            name="email"
            onChange={handdleChange}
          />
        </div>
        <div className="div">
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            className="input"
            id="password"
            name="password"
            onChange={handdleChange}
          />
        </div>
        <div className="div">
          <label className="label" htmlFor="nickname">
            Nickname
          </label>
          <input
            type="text"
            className="input"
            id="nickname"
            name="nickname"
            onChange={handdleChange}
          />
        </div>
        <div className="div">
          <button
            type="button"
            className="btn"
            onClick={() => fetcher(regUrl, parm)}
          >
            註冊
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => fetcher(loginUrl, parmLogin)}
          >
            登入
          </button>
        </div>
        <p>
          註冊狀態:
          {fetchMessage.status === ""
            ? null
            : fetchMessage.status === false
              ? fetchMessage.message
              : "註冊成功" + (fetchMessage.uid || "")}
        </p>
        <p style={{width: "100%", wordWrap: "break-word"}}>
          登入狀態:
          {loginMessage.status === ""
            ? null
            : loginMessage.status === false
              ? loginMessage.message
              : "登入成功" + (loginMessage.token || "")}
        </p>
      </div>
    </>
  );
}
