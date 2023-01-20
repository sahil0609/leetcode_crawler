var button = document.getElementById("sync_button")
const [tab] = await chrome.tabs.query({currentWindow: true, active: true});
var current_URL = tab.url
console.log("current_url :" + current_URL)

if(!(/^https:\/\/leetcode\.com.*/).test(current_URL)){
    button.disabled = true;
}

let configData ={
    host: "http://localhost:8080",
    user: "/leetstats/user/me"

}

async function startSync(){

    // send the message to the backgrond java script to start the sync
    try{
        const response = await chrome.runtime.sendMessage({sync: true})
        console.log("sync completed")
        console.log(response)
    }
    catch(err){
        console.log("error occured while syncing the problems. Please try again after some time")
        console.log(err)
    }

}
button.addEventListener("click", () => startSync().then(() => console.log("sync completeddhff")), true)

async function checkLogin(){
    let username = await getUsername()
    if(username == null){
        button.style.display="none"
        // load the username and password page
    }
    
}

async function getUsername(){

    let url = new URL(configData.host+configData.user)
    let response = await fetch(url)
    if(!response.ok){
        return null
    }
    let username = await response.text()
    return username
}

checkLogin().then(()=>console.log("dasjlhdlahosfhoigbehgfi"))