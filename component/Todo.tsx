"use client";
import React, {use, useEffect, useState} from "react";
let token: any = "";
if (typeof window !== "undefined") {
  token = localStorage.getItem("token");
}
export default function Todo() {
  console.log(token);
  const [todo, setTodo] = useState<{data: any[]}>({data: []}); // Update the type of todo state
  const [addContent, setAddContent] = useState<{}>({content: ""});
  useEffect(() => {
    console.log(addContent);
  }, [addContent]);
  const handdleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAddContent({...addContent, [e.target.name]: e.target.value});
  //check
  const check = async () => {
    const data = await fetch("https://todolist-api.hexschool.io/todos/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .catch((error) => console.error("Error:", error));
    console.log(data);
    setTodo(data);
  };
  //add
  const add = async (addContent: {}) => {
    const response = await fetch("https://todolist-api.hexschool.io/todos/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token,
      },
      body: JSON.stringify(addContent),
    });

    if (!response.ok) {
      console.log(`HTTP error! status: ${response.status}`);
      const errorData = await response.json();
      console.log(errorData);
      return;
    }

    const data = await response.json();
    console.log(data);
    check();
  };
  //update
  const update = async (itemId: string) => {
    const response = await fetch(
      `https://todolist-api.hexschool.io/todos/${itemId}/toggle`,
      {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token,
        },
      }
    );

    if (!response.ok) {
      console.log(`HTTP error! status: ${response.status}`);
      const errorData = await response.json();
      console.log(errorData);
      return;
    }

    const data = await response.json();
    console.log(data);
    check();
  };
  //delete
  const deleteItem = async (itemId: string) => {
    const response = await fetch(
      `https://todolist-api.hexschool.io/todos/${itemId}`,
      {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token,
        },
      }
    );

    if (!response.ok) {
      console.log(`HTTP error! status: ${response.status}`);
      const errorData = await response.json();
      console.log(errorData);
      return;
    }

    const data = await response.json();
    console.log(data);
    check();
  };
  useEffect(() => {
    // fetcher();
    check();
  }, []);

  return (
    <>
      <div className="todo">
        <label className="" htmlFor="enterTodo">
          輸入代辦事項
        </label>
        <input
          className="input"
          type="text"
          id="enterTodo"
          name="content"
          onChange={handdleChange}
        />
        <button type="button" className="btn" onClick={() => add(addContent)}>
          加入
        </button>
        <ul>
          {todo.data.map((item: any) => {
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    update(item.id);
                  }}
                >
                  完成
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    deleteItem(item.id);
                  }}
                >
                  刪除
                </button>
                項目:{item.content}
                {item.status ? "✔️" : "❌"}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
