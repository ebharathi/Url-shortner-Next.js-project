import { useState } from "react";
import axios from "axios";
const Main=()=>{
    const [link,setLink]=useState("");
    const [error,setError]=useState("");
    const [btn,setBtn]=useState("GENERATE LINK")
    const [flag,setFlag]=useState(false);
    const [generatedLink,setGeneratedLink]=useState("");
    const [copyBtn,setCopyBtn]=useState("COPY")
    const HandleSubmit=async(e)=>{
        setFlag(false);
        setGeneratedLink("");
        e.preventDefault();
          if(link=="")
          {
              setError("Please paste a valid link !!!");
              setTimeout(() => {
                 setError("");
              }, 3000);
          }
          else{
              setBtn("Please Wait...")
              let data={url:link};
              await axios.post("/api/generate",data)
              .then((response)=>{
                // console.log(response);
                // console.log(response.data);
                if(response.data.error==false)
                {
                    setBtn("LINK CREATED !");
                    setGeneratedLink(response.data.url.result_url);
                    setFlag(true);
                    setTimeout(() => {
                        setBtn("GENERATE LINK")
                    }, 3000);
                }
                else
                {
                    setBtn("GENERATE LINK");
                    setError("Error occured while generating link!!");
                    setTimeout(() => {
                        setError("");
                     }, 3000);
                }
              })
          }
    }
    const handleCopyFunction=async()=>{
        setCopyBtn("COPIED!!!");
        await navigator.clipboard.writeText(generatedLink);
        setTimeout(() => {
            setCopyBtn("COPY");
        }, 8000);
    }
    return(
      <div className="flex flex-col justify-center items-center mt-44">
              <form>
                  <input placeholder="Paste the link here.." onChange={(e)=>setLink(e.target.value)} className="p-2 border-2 border-blue-300 rounded-lg w-three sm:w-four md:w-five "/>
                  {
                    error!=""&&
                     <div className="text-red-500 text-center ">{error}</div>
                  }
                  <br/><br/>
                  <div className="text-center"><button className="btn bg-blue-500 rounded-xl text-white px-5 py-2 hover:bg-white hover:text-blue-500" onClick={(e)=>HandleSubmit(e)}>{btn}</button></div>
              </form>
              <br/>
              <br/>
              {
                flag&&
                <div className="">
                    {generatedLink}
                    {
                        copyBtn=="COPIED!!!"?
                    <span className="mx-2 bg-green-500 text-white text-[12px] cursor-pointer px-2 py-1 rounded-md" onClick={handleCopyFunction}>{copyBtn}</span> 
                        :
                    <span className="mx-2 bg-blue-500 text-white text-[12px] cursor-pointer px-2 py-1 rounded-md" onClick={handleCopyFunction}>{copyBtn}</span> 
                    }
                </div>
              }
      </div>       
    )
}
export default Main;