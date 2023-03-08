import React,{useState} from "react";
import {useNavigate} from "react-router-dom"

const Login = (props) => {
  const {showAlert} = props
    let history = useNavigate()
    const [credentials, setCredentials] = useState({email:"",password:""})
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      };
  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login",{
        method:"POST",
        headers:{
         "Content-Type": "application/json",
        },
        "auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2NlMzM4Y2FhZmM5NjExMGY1YjMyZTEiLCJpYXQiOjE2NzQ0NjIyMjZ9.leyBkJvgJOr00Z9L4yDENnSmo016Pe_GdpM2fobVeVw"
        ,
        body:JSON.stringify({email:credentials.email,password:credentials.password})
    })
    const json = await response.json()
    console.log(json);
    if(json.success){
        localStorage.setItem("token",json.jsontoken)
        console.log(json.user);
        history("/")
        showAlert(" logged in succssfully ","success")
    }
    else{
        showAlert("wrong credentials","danger")
    }
  };
  return (

    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              onChange={onChange}
              aria-describedby="emailHelp"
              name="email"
              placeholder="Enter email"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={onChange}
              name="password"
              minLength={5}
              required
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-primary  mt-2">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
