import { useNavigate } from "react-router-dom";
import {AiOutlineArrowRight} from"react-icons/ai"

function Landing() {
  const navigate = useNavigate();
  const Handlebuttonclick = () => {
    navigate("/home");
  };

  return (
    <div>
      <h1 id="heading" className=" text-9xl p-5 m-5 mt-80 ">
        imagine
      </h1>
      <h5 className="p-5 m-5 ">
        imagine is an AI system that can create realistic images and art from a
        description in natural language with the help of DALL-E.
        <br />
        <button
          className=" flex mt-4 justify-center  min-w-[100px] border-2 min-h-[30px] hover:text-black hover:bg-white"
          onClick={Handlebuttonclick}
        >
          try now  <AiOutlineArrowRight className="m-1"/> {" "}
        </button>
      </h5>
    </div>
  );
}

export default Landing;
