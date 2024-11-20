import React, { useState } from "react";
import { useAppDispatch } from "../../redux/store";
import { fetchLogin } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useAppDispatch();
//   const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const resultAction = await dispatch(fetchLogin({ username, password }));
    if (fetchLogin.fulfilled.match(resultAction)) {
      const user = resultAction.payload.user;
      if (user.role === "attack") {
        navigate("/attack-dashboard");
      } else if (user.role === "defense") {
        navigate("/defense-dashboard");
      }
    } else {
      // Handle login error if needed
      console.error(resultAction.payload);
    }
  };

  return (
    <div className="login">
      <input
        name="inp-name-login"
        type="text"
        placeholder="User Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        name="inp-pswd-login"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => navigate("/register")}>new to the system? register here</button>
      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}