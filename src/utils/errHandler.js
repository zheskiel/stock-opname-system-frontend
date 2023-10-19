import { toast } from "react-toastify";

export default function errorHandler(err) {
  // if (err.response.data.message) {
  //   console.log("err.response.data.message : ", err.response.data.message);
  //   return toast.error(err.response.data.message);
  // }

  if (err.msg) return toast.error(err.msg);
  if (err.message) return toast.error(err.message);
}
