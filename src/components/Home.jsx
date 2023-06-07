import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";

function Home() {
  const [Prompt, Useprompt] = useState("Enter your prompt here !!");
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
    <div className=" p-7 m-auto">
      <br />
      <div className="flex bg-neutral-500 rounded-lg  " >
        <input
          className=" min-w-[90%] min-h-[40px] m-auto bg-transparent"
          placeholder={Prompt}
          type="text"
          onChange={(e) => Useprompt(e.target.value)}
        />{" "}
        <button
          className=" relative p-3 min-w-[150px] min-h-[35px] bg-transparent "
          onClick={handleSurpriseMe}
        >
          Surprise me !!
        </button>
      </div>
      {/* buttons !!!!!!! */}
      <div className="mt-5 flex justify-around">
        <div>
          <button
            className="p-4 m-4 min-w-[150px] min-h-[80px]"
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
              <p>generate</p>
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
  );
}

export default Home;
