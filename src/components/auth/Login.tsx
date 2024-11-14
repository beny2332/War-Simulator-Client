import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { fetchLogin } from "../../redux/slices/userSlice"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.user)
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    if (user?._id) {
        navigate(user.role === 'defense' ? '/defense-dashboard' : '/attack-dashboard')
    }
  }, [user, navigate])

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
      <button onClick={() => dispatch(fetchLogin({ username, password }))}>
        Login
      </button>
    </div>
  )
}

