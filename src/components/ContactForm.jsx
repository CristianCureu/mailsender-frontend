import { useRef, useState } from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toastOptions from "../utils/toastOptions";

const validEmail = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");
const a = Math.floor(Math.random() * 5 + 1);
const b = Math.floor(Math.random() * 5 + 1);
const answer = a + b;

function ContactForm() {
  const [info, setInfo] = useState({});
  const [sent, setSent] = useState(false);
  const form = useRef();
  const toastId = useRef(null);

  const onChangeHandler = (fieldName, value) => {
    setInfo({ ...info, [fieldName]: value });
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      const result = await emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE,
        process.env.REACT_APP_EMAILJS_TEMPLATE,
        form.current,
        process.env.REACT_APP_EMAILJS_KEY
      );
      if (result.status === 200 && result.text === "OK") {
        e.target.reset();
        setSent(true);
      } else {
        if (!toast.isActive(toastId.current)) {
          toastId.current = toast.error(
            "Ne pare rău, încearcă din nou mai târziu!",
            toastOptions
          );
        }
      }
    } catch (err) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error(
          "Ne pare rău, încearcă din nou mai târziu sau contactează-ne prin telefon!",
          toastOptions
        );
      }
    }
  };

  return (
    <div className="h-screen w-full lg:w-1/3 flex flex-col items-center justify-evenly px-4 pb-6">
      {sent ? (
        <div className="h-screen w-full flex flex-col items-center justify-center text-center px-8">
          <CheckCircleIcon color="success" sx={{ scale: "1.2" }} />
          <h2 className="text-2xl pb-2 pt-4 lg:text-3xl">Mulțumim!</h2>
          <p className="text-lg p-4">Mesajul tău a fost trimis cu succes,</p>
          <p className="text-lg">Vei primi un răspuns în cel mai scurt timp!</p>
        </div>
      ) : (
        <form
          ref={form}
          onSubmit={sendEmail}
          className="h-screen w-full flex flex-col items-center justify-around px-4 pb-6 text-lg"
          autoComplete="nope"
        >
          <div className="text-gray-800">
            <p className="text-center mb-2 font-bold">
              Dorești să ne contactezi prin email?
            </p>
            <p className="text-center text-md">
              Completează formularul si trimite-ne un mesaj!
            </p>
          </div>
          <input
            className="shadow appearance-none border rounded w-3/4 py-3 px-3 text-gray-700 
          leading-tight focus:outline-none focus-within:shadow-blue-400/50 focus-within:shadow"
            name="from_name"
            type="text"
            placeholder="Nume"
            autoComplete="nope"
            onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
          />
          <input
            className="shadow appearance-none border rounded w-3/4 py-3 px-3 text-gray-700 
          leading-tight focus:outline-none focus-within:shadow-blue-400/50 focus-within:shadow"
            name="from_email"
            type="email"
            placeholder="Email"
            autoComplete="off"
            onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
          />
          <input
            className="shadow appearance-none border rounded w-3/4 py-3 px-3 text-gray-700 
          leading-tight focus:outline-none focus-within:shadow-blue-400/50 focus-within:shadow"
            name="from_phone"
            type="text"
            placeholder="Telefon"
            autoComplete="nope"
            onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
          />
          <textarea
            className="shadow appearance-none border rounded w-3/4 h-32 py-3 px-3 text-gray-700 
          leading-tight focus:outline-none focus-within:shadow-blue-400/50 focus-within:shadow"
            name="message"
            type="text"
            placeholder="Mesaj"
            autoComplete="nope"
            onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
          />
          <div className="flex w-3/4 items-center justify-between text-sm">
            <div
              className="flex items-center justify-center shadow appearance-none border rounded w-1/6 h-5/6
               text-gray-700 leading-tight"
            >
              {a}
            </div>
            +
            <div
              className="flex items-center justify-center shadow appearance-none border rounded w-1/6 h-5/6
               text-gray-700 leading-tight"
            >
              {b}
            </div>
            =
            <input
              type="number"
              name="answer"
              className="shadow appearance-none border rounded w-2/6 py-3 px-3 text-gray-700 leading-tight
              focus:outline-none focus-within:shadow-blue-400/50 focus-within:shadow"
              onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
            />
          </div>
          <Button
            disabled={
              !(
                info.from_name &&
                info.from_name.length > 2 &&
                info.from_email &&
                validEmail.test(info.from_email) &&
                info.from_phone &&
                info.from_phone.length > 9 &&
                info.message &&
                info.message.length > 2 &&
                info.answer &&
                parseInt(info.answer) === answer
              )
            }
            type="submit"
            variant="contained"
            endIcon={<SendIcon />}
          >
            Trimite mesaj
          </Button>
          <div className="absolute">
            <ToastContainer />
          </div>
        </form>
      )}
    </div>
  );
}

export default ContactForm;
