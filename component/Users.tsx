const body = {
  email: "example3@gmail.com",
  password: "example3",
  nickname: "example3",
};
const fetcher = (url: string) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => {
      let data = res.json();
      console.log(data);
    })
    .catch((error) => console.error("Error:", error));

export default async function Users() {
  const data = await fetcher("https://todolist-api.hexschool.io/users/sign_up");
  console.log(data);
  return (
    <>
      <div className="com">
        <div className="div">
          <label className="label" htmlFor="account">
            Account
          </label>
          <input type="text" className="input" id="account" />
        </div>
        <div className="div">
          <label className="label" htmlFor="password">
            Password
          </label>
          <input type="password" className="input" id="password" />
        </div>
        <div className="div">
          <button type="button" className="btn">
            註冊
          </button>
          <button type="button" className="btn">
            登入
          </button>
        </div>
      </div>
    </>
  );
}
