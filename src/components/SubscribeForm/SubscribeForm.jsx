import "./subscribeform.css";
import { useRef, useState } from "react";
import { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InfoIcon from "@mui/icons-material/Info";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import toastOptions from "../../utils/toastOptions";

function SubscribeForm() {
  const [user, setUser] = useState({});
  const toastId = useRef(null);

  const onChangeHandler = (fieldName, value) => {
    setUser({ ...user, [fieldName]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const response = await res.json();
      console.log(response);
      if (response.success === false) {
        if (response.message.includes("required")) {
          if (!toast.isActive(toastId.current)) {
            toastId.current = toast.error(
              "Toate campurile sunt obligatorii!",
              toastOptions
            );
          }
        } else if (response.message.includes("fill")) {
          if (!toast.isActive(toastId.current)) {
            toastId.current = toast.error(
              "Adresa de email invalida!",
              toastOptions
            );
          }
        } else if (response.message.includes("abonata")) {
          if (!toast.isActive(toastId.current)) {
            toastId.current = toast.error(response.message, toastOptions);
          }
        }
      } else {
        toast.success("Te-ai abonat cu succes!", toastOptions);
        setUser({});
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <form className="subscribe-form" onSubmit={submitHandler}>
      <div className="subscribe-info">
        <InfoIcon color="info" />
        <p>
          Te rog introdu numele si adresa de email pentru a fi la curent cu
          noile oferte si reduceri Optidora!
        </p>
      </div>
      <TextField
        name="nume"
        label="Nume"
        variant="outlined"
        value={user.nume || ""}
        onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
      />
      <TextField
        name="email"
        label="Email"
        variant="outlined"
        value={user.email || ""}
        onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
      />
      <Button variant="contained" type="submit">
        Abonează-te
      </Button>
      <ToastContainer limit={1} />
    </form>
  );
}

export default SubscribeForm;
