document.getElementById("date").innerHTML= `Date:${new Date()}`;

const apiURL = "https://frcz3-8080.csb.app"
let currentPage = 1;
const limit = 10;
let q = null;
const prevButton = document.querySelector("#prev-button")
const nextButton = document.querySelector("#next-button")

const totalPage = async() => {
    try {
        let pageURL = `${apiURL}/jobs`
        const allPage = await fetch(pageURL);
        const allPageData = await allPage.json();
        console.log(allPageData.length);
        return allPageData.length;
        
    } catch (error) {
        console.log("error", error)
    }
}

const total = totalPage();

const getAllJobs = async() => {
    try {
        let apiJobs = `${apiURL}/jobs/?_page=${currentPage}&_limit=${limit}&q=${encodeURIComponent(q)}`

        const allJobs = await fetch(apiJobs);
        const allJobsData = await allJobs.json();
        console.log(allJobsData);
        return allJobsData;
    } catch (error) {
        console.log("error", error);
    }
}

const printAllJobs = async() => {
    try {
        const jobsList = await getAllJobs();
        const jobSection = document.querySelector(".job-section")
        jobSection.innerHTML = "";

        jobsList.forEach((job) => {
            const jobItem = document.createElement("li");
            jobItem.textContent = job.title;
            jobSection.appendChild(jobItem)
        })

        prevButton.disabled = currentPage === 1;
        nextButton.disabled = Math.ceil(total/limit) === currentPage;
    } catch (error) {
        console.log("error", error) //(1) silent error, (2) catch(err){
        //     if (err.code = 404) {
        //       console.log('missing job id');
        //       return;
        //      }
           
        //      throw err; 
        //    }
    }
}
printAllJobs();

//add event listener pagination
prevButton.addEventListener("click", () => {
    currentPage --;
    printAllJobs();
})

nextButton.addEventListener("click", () => {
    currentPage ++;
    printAllJobs();
})

//Search function
const jobInput = document.querySelector("#job-input");
const searchButton = document.querySelector("#search-button");

searchButton.addEventListener("click", () => {
    q = jobInput.value.trim();
    printAllJobs();
})

