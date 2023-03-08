import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
function Singup(props) {
  const {showAlert} = props
  const history = useNavigate()
  const [credentials, setCredentials] = useState({name:"",email:"",password:""})
  const onChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    const handleSubmit = async(e) => {
      e.preventDefault();
      const response = await fetch("http://localhost:5000/api/auth/register",{
          method:"POST",
          headers:{
           "Content-Type": "application/json",
          },
          body:JSON.stringify({name:credentials.name, email:credentials.email,password:credentials.password})
      })  
      const json = await response.json()
      console.log(json);
      if(json.success){
          localStorage.setItem("token",json.token)
          history("/")
          showAlert("sign upped successfully","success")
      }
      else{
        showAlert("something went wrong","danger")
      }
    };
  return (
    <>
   <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Name</label>
            <input
              type="name"
              required
              className="form-control"
              id="name"
              onChange={onChange}
              aria-describedby="emailHelp"
              name="name"
              placeholder="Enter email"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              onChange={onChange}
              name="email"
              placeholder="enter your email"
            />
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
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-primary  mt-2">
            Submit
          </button>
        </form>
      </div>
    </>
  )
}

export default Singup