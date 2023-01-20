let leetcodeData = {
        submissionURL: "https://leetcode.com/api/submissions",
        
}

let configData ={
    host: "http://localhost:8080",
    problemExists: "/problem/exists",
    insertProblem: "/problem",
    insertStats:"/userstats"

}



async function main(sendResponse) {

    let has_next = true
    let offset = 0
    //max 20 works 
    let limit = 20
    let last = null

    while(has_next){
        try{
            let submissions = await getsubmissions(offset, limit, last)
            if(submissions == null) throw new Error("Some error occured")

            has_next = submissions.has_next
            last = submissions.last_key
            offset += limit

            console.log(submissions)
            console.log(has_next)
            
            let problemList = await getProblemList(submissions.submissions_dump)
            //let problemsToInsert = await checkProblemExists(sendResponse, problemList)
            //insertProblems(sendResponse, problemsToInsert)
            // insertStats(sendResponse, submissions)
        }
        catch(err){
            console.error(err)
        }

    }
}

async function getsubmissions(offset, limit, last){

    let url = new URL(leetcodeData.submissionURL)
    url.searchParams.append("offset", offset)
    url.searchParams.append("limit", limit)
    if(last != null){
        url.searchParams.append("last", last)
    }
    try{
    let response = await fetch(url)
    let submissionsData = await response.json()
    
    return submissionsData
    }
    catch(err){
        console.error(err)
        return null
    }

}

async function getProblemList(submissions){
    //get unique problems from the submissions list
    try{
        let questions = new Set()
        submissions.array.forEach(element => {
            questions.add(submissions.title)
        });
        console.log(questions)

        let url = new URL(configData.host+configData.problemExists)
        fetch(url,{
            method: "POST",
            credentials: "include",
            body: questions,
            headers: {
                'Content-Type': 'application/json',
              }

        })

    }
    catch(err){
        console.error(err)
    }
    

}

async function checkProblemExists(sendResponse, problemList){

}

async function insertProblems(sendResponse, problemsToInsert){

}

async function insertStats(sendResponse, submissions){

}


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        main(sendResponse).then(()=> console.log("ended"))

        console.log(sender)
        console.log(request)
        var abce= {"query":"\n    query singleQuestionTopicTags($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    topicTags {\n      name\n      slug\n    }\n  }\n}\n    ","variables":{"titleSlug":"longest-palindromic-substring"}}
        var query = {"query":" query questionTitle($titleSlug: String!) {question(titleSlug: $titleSlug) {questionId questionFrontendId title titleSlug    isPaidOnly    difficulty    likes    dislikes  }}    ","variables":{"titleSlug":"longest-palindromic-substring"}}
        var json = JSON.stringify(query)
        console.log(json)
        //fetch("https://leetcode.com/api/submissions/?offset=0&limit=20&lastkey")
        /*
        fetch("https://leetcode.com/graphql/",{
            method:"POST",
            body: json,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
              }
        })
        .then((response) =>{
            console.log(response)
            return response.json()
        })
        .then((response) => {
            console.log(response) 
            sendResponse({greeting:"hello"})
        });
        */
        return true
    }
    
  );
