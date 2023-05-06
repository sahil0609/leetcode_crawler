var button = document.getElementById("sync_button")
var syncContainer = document.getElementsByClassName("sync").item(0)
var loginContainer = document.getElementsByClassName("login").item(0)

const [tab] = await chrome.tabs.query({currentWindow: true, active: true});
var current_URL = tab.url
console.log("current_url :" + current_URL)

if(!(/^https:\/\/leetcode\.com.*/).test(current_URL)){
    button.disabled = true;
}

let configData ={
    host: "http://localhost:8080",
    user: "/leetstats/user/me",
    login: "/leetstats/auth/login"

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
        syncContainer.classList.add("hide")
        loginContainer.classList.remove("hide")
    }
    else{
        syncContainer.classList.remove("hide")
        loginContainer.classList.add("hide")
    }
    
}

async function getUsername(){

    try{
        let url = new URL(configData.host+configData.user)
        let response = await fetch(url, {
            credentials: "include"
        })
        if(!response.ok){
            return null
        }
        let username = await response.text()
        return username
    }
    catch(err){
        return null
    }
}


var loginButton = document.getElementById("login_button")
loginButton.addEventListener("click", (event) => login(event).then(() => console.log("login process completed")))

async function login(event){
    event.preventDefault()
    
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value

    let request = {"email": username, "password": password}
    try{
        let response = await fetch(configData.host+configData.login, {
            method: "POST",
            body: JSON.stringify(request),
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if(!response.ok){
            throw new Error("username or password is inavlid")
        }

        else{
            syncContainer.classList.remove("hide")
            loginContainer.classList.add("hide")
        }

    }
    catch(err){
        console.log("some error occured")
        //handle the error case
    }


}

checkLogin().then(()=>console.log("dasjlhdlahosfhoigbehgfi"))