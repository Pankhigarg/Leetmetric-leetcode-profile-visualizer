
document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById("search_btn");
    const userNameInput = document.getElementById("userName");
    const statsContainer = document.getElementById("question_tracker");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
     const hardLabel = document.getElementById("hard-label");
    const cardStatsContainer = document.querySelector(".stats-cards");

//return true or false based on regex

     function validateUsername(username) {
        if(username.trim() === "") {
            alert("Username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if(!isMatching) {
            alert("Invalid Username");
        }
        return isMatching;
    }

    async function fetchUserDetails(username) {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
        try{
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;
            //statsContainer.classList.add("hidden");

            // const response = await fetch(url);
            // const proxyUrl = 'https://cors-anywhere.herokuapp.com/' ;
            // const targetUrl = 'https://leetcode.com/graphql/';
            
            // const myHeaders = new Headers();
            // myHeaders.append("content-type", "application/json");

            // const graphql = JSON.stringify({
            //     query: "\n    query userSessionProgress($username: String!) {\n  allQuestionsCount {\n    difficulty\n    count\n  }\n  matchedUser(username: $username) {\n    submitStats {\n      acSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n      totalSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n    }\n  }\n}\n    ",
            //     variables: { "username": `${username}` }
            // })
            // const requestOptions = {
            //     method: "POST",
            //     headers: myHeaders,
            //     body: graphql,
            //     redirect: "follow"
            // };

            const response = await fetch(url);
            if(!response.ok) {
                throw new Error("Unable to fetch the User details");
            }
            const parsedData = await response.json();
            console.log("Logging data: ", parsedData) ;

           displayUserData(parsedData);
        }
        catch(error) {
            statsContainer.innerHTML = `<p>${error.message}</p>`
        } 
        finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }
   
function updateProgress(solved,total,label,circle){
    const progressDegree = (solved/total)*100;
    circle.style.setProperty("--progress-degree",`${progressDegree}%`)
    label.textContent = `${solved}/${total}`;
}
        function displayUserData(parsedData) {
            const totalQues = parsedData.totalQuestions;
            const totalEasyQues = parsedData.totalEasy;
            const totalMediumQues = parsedData.totalMedium;
            const totalHardQues = parsedData.totalHard;
        
            const solvedTotalQues = parsedData.totalSolved;
            const solvedTotalEasyQues = parsedData.easySolved;
            const solvedTotalMediumQues = parsedData.mediumSolved;
            const solvedTotalHardQues = parsedData.hardSolved;
        
            // Update progress for each difficulty level
            updateProgress(solvedTotalEasyQues, totalEasyQues, easyLabel, easyProgressCircle);
            updateProgress(solvedTotalMediumQues, totalMediumQues, mediumLabel, mediumProgressCircle);
            updateProgress(solvedTotalHardQues, totalHardQues, hardLabel, hardProgressCircle);
            
            // Optionally, update other stats like acceptance rate, ranking, etc.
            // const ranking = parsedData.ranking;
            // const acceptanceRate = parsedData.acceptanceRate;
            const cardsData = [
                    {label: "Overall Acceptance Rate", value:parsedData.ranking },
                    {label: "Overall Ranking", value:parsedData.acceptanceRate },
                    
                 ];
            // Update stats container or add any new elements for these additional da   
        
    //     if (cardStatsContainer) {
    //         const additionalStats = `
    //             <p>Acceptance Rate: ${acceptanceRate}%</p>
    //             <p>Ranking: ${ranking}</p>
    //         `;
    //         cardStatsContainer.innerHTML = additionalStats;
    //     } else {
    //         console.error("Error: .stats-cards container is missing.");
    //     }
    // }


    // const cardsData = [
    //     {label: "Overall Acceptance Rate", value:parsedData.ranking },
    //     {label: "Overall Ranking", value:parsedData.acceptanceRate },
        
    // ];

    console.log("card ka data: " , cardsData);  
    cardStatsContainer.innerHTML = cardsData.map(
        data => 
                `<div class="card">
                <h4>${data.label}</h4>
                <p>${data.value}</p>
                </div>`
    ).join("")
}

    searchButton.addEventListener('click', function() {
        const username = userNameInput.value;
        console.log("login username : ", username);
    if( validateUsername(username)){
        fetchUserDetails(username);
    }
   
    });

        });

