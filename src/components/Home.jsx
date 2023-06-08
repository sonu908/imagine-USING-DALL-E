import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";
import Navbar from "./Navbar"

function Home() {
  const [Prompt, Useprompt] = useState("Enter your prompt here . . . . . . . . .");
  const [Image, UseImage] = useState("");
  const [Imageone, UseImageone] = useState("");
  const [Imagetwo, UseImagetwo] = useState("");
  const [Imagethree, UseImagethree] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const Keywords = [
    "A colorful hot air balloon floating above a picturesque landscape",
    "A serene waterfall cascading down a mossy cliff in a lush forest",
    "A group of friends laughing and enjoying a picnic in a sunny park",
    "A field of blooming sunflowers under a clear blue sky",
    "A majestic mountain peak covered in snow and surrounded by pine trees",
    "A peaceful lakeside cabin with a crackling fire and a view of the sunset",
    "A vibrant market with bustling stalls and people of various cultures",
    "A cozy cafe with bookshelves lining the walls and steaming cups of coffee",
    "A starry night sky with constellations forming magical patterns",
    "A breathtaking view of a vast canyon stretching into the distance",
    "A tranquil beach at sunrise, with gentle waves lapping against the shore and seagulls gliding through the air.",
    "A rustic cabin nestled in a lush forest, surrounded by towering trees and the soothing sounds of chirping birds.",
    "A bustling marketplace filled with vibrant colors, aromatic spices, and the lively chatter of vendors and shoppers.",
    "A peaceful meadow covered in a blanket of wildflowers, with butterflies dancing from petal to petal.",
    "A roaring waterfall cascading down moss-covered rocks, creating a misty oasis in the midst of a dense jungle.",
    "A charming European village with cobblestone streets, quaint houses adorned with colorful shutters, and the aroma of freshly baked bread wafting through the air.",
    "A majestic mountain peak piercing through fluffy clouds, offering a panoramic view of snow-capped ranges and a sea of evergreen forests."
  
  ];

  const config = new Configuration({
    apiKey: import.meta.env.VITE_api_key,
  });

  const openai = new OpenAIApi(config);

  const generateimg = async () => {
    setIsLoading(true);

    const response = await openai.createImage({
      prompt: Prompt,
      n: 4,
      size: "256x256",
    });
    console.log(response);
    const image_url = response.data.data[0].url;
    const image_url1 = response.data.data[1].url;
    const image_url2 = response.data.data[2].url;
    const image_url3 = response.data.data[3].url;

    UseImage(image_url);
    UseImageone(image_url1);
    UseImagetwo(image_url2);
    UseImagethree(image_url3);

    console.log(Image);

    if (image_url) {
      setIsLoading(false);
    }
  };
  // console.log(Prompt);

  const handleSurpriseMe = () => {
    const randomIndex = Math.floor(Math.random() * Keywords.length);
    Useprompt(Keywords[randomIndex]);
  };

  return (
    <>
    <Navbar/>
    <div className=" p-7 m-auto">
      <br />
      <div className="flex bg-slate-50 rounded-lg min-h-[55px] ">
        <input
          className=" text-black min-w-[88%] min-h-[40px] m-auto bg-transparent focus:outline-none placeholder:p-6  placeholder:text-black"
          placeholder={Prompt}
          type="text"
          onChange={(e) => Useprompt(e.target.value)}
        />{" "}
        <button
          className=" relative p-3 text-black hover:text-white min-w-[150px] min-h-[35px] bg-transparent border-l-2  border-gray-800 hover:bg-black hover:border-2"
          onClick={handleSurpriseMe}
        >
          Random Prompt
        </button>
      </div>
      {/* buttons !!!!!!! */}
      <div className="mt-5 flex justify-around">
        <div>
          <button
            className="p-2 m-2 min-w-[150px] min-h-[40px] border-2 hover:text-black hover:bg-white"
            onClick={generateimg}
          >
            {isLoading ? (
              <div>
                <div
                  className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              </div>
            ) : (
              <p>Generate</p>
            )}
          </button>
        </div>
      </div>{" "}
      <div className="flex max-w-[screen] justify-around p-5 mt-5">
        <img className="shadow-2xl" src={Image} alt="" />
        <img src={Imageone} alt="" />
        <img src={Imagetwo} alt="" />
        <img src={Imagethree} alt="" />
      </div>
    </div>
    </>
  );
}

export default Home;
