import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../../redux/store";
import { fetchRegister } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { DefenseOrganizations, AttackOrganizations } from "../../types/enums/organizations";

export default function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"defense" | "attack">("defense");
  const [organization, setOrganization] = useState(Object.values(DefenseOrganizations)[0]);
  const [region, setRegion] = useState("North");
  const [filteredOrganizations, setFilteredOrganizations] = useState<string[]>([]);

  useEffect(() => {
    // Filter organizations based on the selected role
    if (role === "defense") {
      setFilteredOrganizations(Object.values(DefenseOrganizations));
      setOrganization(Object.values(DefenseOrganizations)[0]);

    } else {
      setFilteredOrganizations(Object.values(AttackOrganizations));
      setOrganization(Object.values(DefenseOrganizations)[0]);

    }
  }, [role]);

  const handleRegister = async () => {
    console.log("Sending registration data:", { username, password, role, organization, region }); // Log the organization name
    const resultAction = await dispatch(
      fetchRegister({ username, password, role, organization, region })
    );
    if (fetchRegister.fulfilled.match(resultAction)) {
      const user = resultAction.payload.user;
      if (user.role === "attack") {
        navigate("/attack-dashboard");
      } else if (user.role === "defense") {
        navigate("/defense-dashboard");
      }
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
      <select value={organization} onChange={(e) => setOrganization(e.target.value as DefenseOrganizations)}>
        <option value="">Select Organization</option>
        {filteredOrganizations.map((org) => (
          <option key={org} value={org}>
            {org}
          </option>
        ))}
      </select>
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