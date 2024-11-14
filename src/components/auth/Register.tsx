import React, { useState } from "react";
import { useAppDispatch } from "../../redux/store";
import { fetchRegister } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"defense" | "attack">("defense");
  const [organization, setOrganization] = useState("");
  const [region, setRegion] = useState("North");

  const handleRegister = async () => {
    const resultAction = await dispatch(
      fetchRegister({ username, password, role, organization, region })
    );
    if (fetchRegister.fulfilled.match(resultAction)) {
      navigate("/login");
    } else {
      // Handle registration error if needed
      console.error(resultAction.payload);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <select value={role} onChange={(e) => setRole(e.target.value as "defense" | "attack")}>
        <option value="defense">Defense</option>
        <option value="attack">Attack</option>
      </select>
      <input
        type="text"
        placeholder="Organization"
        value={organization}
        onChange={(e) => setOrganization(e.target.value)}
      />
      {role === "defense" && (
        <select value={region} onChange={(e) => setRegion(e.target.value)}>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="Center">Center</option>
          <option value="WestBank">West Bank</option>
        </select>
      )}
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}