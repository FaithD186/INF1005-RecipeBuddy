import React, { useState, useEffect } from "react";
import './Homepage.css';
import Header from "./Header";

function Inspo(){
    const [websites, setWebsites] = useState([]);
    const [showAddWebsite, setAddWebsite] = useState(true);
    const [showWebForm, setShowWebForm] = useState(false);
    const [websitename, setWebsitename] = useState("");
    const [description, setDescription] = useState("");
    const [websiteurl, setWebsiteurl] = useState("");
    const [showError, setError] = useState(true);


    useEffect(() => {
        fetch("http://localhost:8000/websites")
          .then(res => res.json() 
          .then(websites => setWebsites(websites))); 
      }, []);
    
    function addWebsite(){
        setShowWebForm(true);
        setAddWebsite(false);
    }
    const handleSubmitInspo = (event) => {
        event.preventDefault();
        fetch("http://localhost:8000/addwebsite",{
          method: "POST",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
          body: JSON.stringify({
                  "name": websitename, 
                  "description": description,
                  "shorturl": websiteurl,
                  "fullurl": websiteurl
                  
                }),
        })
        
        .then(() => {
          setWebsites((prevWebsites) => [
            {
              name: websitename,
              description: description,
              shorturl: websiteurl,
              fullurl: websiteurl
            },
            ...prevWebsites
          ]);
        });
        setShowWebForm(false);
        setAddWebsite(true);
        setWebsitename('');
        setDescription('');
        setWebsiteurl('');
    
      }
      function cancelSubmitInspo(){
        setShowWebForm(false);
        setAddWebsite(true);
        setWebsitename('');
        setDescription('');
        setWebsiteurl('');
      }

    return (
        <div>
            <Header/>
            <div className="section">
            <h2 class="text-4xl font-extrabold dark:text-white">Get Inspiration ✨ </h2>
                <p class="my-4 text-lg text-gray-500">Find new recipes and get inspiration for your next meal!</p>
                {showAddWebsite && (
                    <button class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-base px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={addWebsite}>
                        + Add Website
                    </button>
                )}
                {showWebForm && (
        <div class="w-full max-w-6xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Add a Website&nbsp;&nbsp;🌐 </h5>
        <form>
            <br></br>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name of website
                    <input 
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        value={websitename}
                        placeholder="Type the website name"
                        onChange={(e) => setWebsitename(e.target.value)} />
                 </label>

                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Website URL
                    <input 
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        value={websiteurl}
                        placeholder="Type the website url"
                        onChange={(e) => setWebsiteurl(e.target.value)} />
                 </label>

                 <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Description
                  <textarea rows={4} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={description}
                        placeholder="A brief description of the website."
                        onChange={(e) => setDescription(e.target.value)}>
                    </textarea>
                </label>
                {showError && (
                <div class="p-4 mb-4 text-sm text-blue-800 rounded-lg dark:bg-gray-800 dark:text-blue-400" role="alert">
                    <span class="font-medium">Remember to fill in all fields! </span> 
                    Ensure all fields are completed before submitting.
                </div>
                )}
          
                <button type="submit" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={handleSubmitInspo}>
                  Submit</button>
                <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={cancelSubmitInspo}>
                  Cancel</button>
            </div>
        </form>
      </div>
      )}
                <br></br>
                <br></br>
                { websites.map((website) => (
                <div>
                    <div class="max-w-4xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{website.name}</h5>
                        </a>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{website.description}</p>
                        <br></br>
                        <a href={website.fullurl} target="_blank" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 rounded-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Visit {website.shorturl}
                            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a>
                    </div>
                
                    <br></br>
                </div>
            ))}
    </div>
</div>
    )

}
export default Inspo;