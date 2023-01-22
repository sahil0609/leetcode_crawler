let leetcodeData = {
        submissionURL: "https://leetcode.com/api/submissions",
        garphql: "https://leetcode.com/graphql/",
        problemQuery: {"query":" query questionTitle($titleSlug: String!) {question(titleSlug: $titleSlug) {questionId questionFrontendId title titleSlug    isPaidOnly    difficulty    likes    dislikes  }}    ","variables":{"titleSlug":"longest-palindromic-substring"}},
        tagsQuery: {"query":"\n    query singleQuestionTopicTags($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    topicTags {\n      name\n      slug\n    }\n  }\n}\n    ","variables":{"titleSlug":"longest-palindromic-substring"}}
}

let configData ={
    host: "http://localhost:8080",
    problemExists: "/injest/problem/exists",
    insertProblem: "/injest/problem",
    insertStats:"/injest/userstats/"

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
            
            let problemList = getProblemList(submissions.submissions_dump)
            let problemsToInsert = await checkProblemExists(problemList)
            console.log(problemsToInsert)
            insertProblems(sendResponse, problemsToInsert)
            insertStats(sendResponse, submissions.submissions_dump, has_next)
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

function getProblemList(submissions){
    //get unique problems from the submissions list
    try{
        console.log(submissions)
        let questions = new Set()
        submissions.forEach(element => {
            questions.add(element.title_slug)
        });
        console.log(questions)

        return questions
    }
    catch(err){
        console.error(err)
    }
    

}

async function checkProblemExists(problemList){        
        try{
            let url = new URL(configData.host+configData.problemExists)
            let response = await fetch(url, {
                method: "POST",
                credentials: "include",
                body: JSON.stringify([...problemList]),
                headers: {
                    
                    'Content-Type': 'application/json',  
                }
            })
            if(!response.ok){ throw new Error("some Error occured")}
            let result = await response.json()
            return result
        }
        catch(err){
            console.log("some error occured")
            return null
        }
    

}

async function insertProblems(sendResponse, problemsToInsert){
    
    let problems = []
    
    for(let i=0; i<problemsToInsert.length; i++){
        question = getLeetcodeProblem(problemsToInsert[i])
        tags = getTopicTags(problemsToInsert[i])
        question = await question
        tags = await tags
        let tagNames = tags.map((t) => t.name)
        let request = {
            questionId: question.questionFrontendId,
            title:question.title,
            difficulty: question.difficulty,
            isPaidOnly: question.isPaidOnly,
            leetcode_name: question.titleSlug,
            tags: tagNames
        }
        problems.push(request)
    }
    // insert the problems
    let url = new URL(configData.host+configData.insertProblem)
    try{
        let response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(problems),
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            }

        })
        if(!response.ok) throw new Error("not able to insert the problems")
        else{ console.log("problems inserted successfully")}
    }
    catch(err){
        console.log(err)
        console.log("unable to insert problems")
    }       

}
async function getLeetcodeProblem(problem){
    try{
        let url = leetcodeData.garphql
        let query = leetcodeData.problemQuery
        query.variables.titleSlug = problem

        let response = await fetch(url, {
            method:"POST",
            body: JSON.stringify(query),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
              }
        })
        if(!response.ok) throw new Error("Error occured while fetching leetcode")

        let data = await response.json()
        return data.data.question

    }
    catch(err){
        console.log("unable to get the problem from leetcode")
        return null
    }
}

async function getTopicTags(problem){
    try{
        let url = leetcodeData.garphql
        let query = leetcodeData.tagsQuery
        query.variables.titleSlug = problem

        let response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(query),
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
              }

        })
        if(!response.ok) throw new Error("Error occured while fetching leetcode")
        let data = await response.json()
        return data.data.question.topicTags
    }
    catch(err){
        console.log("unable to get the problem from leetcode")
        return null
    }
}

async function insertStats(sendResponse, submissions, has_next){
    let url = new URL(configData.host+configData.insertStats)
    url.searchParams.append("last", has_next)

    let request = []
    for(let i=0; i<submissions.length; i++){
        let sub = submissions[i]
        //TODO notes are differrnt here not the code notes have to get the different query for that
        // for now setting the notes to false
        let data = {
            code:sub.code,
        status: sub.status_display,
        memory: sub.memory,
        language: sub.lang,
        timestamp: sub.timestamp,
        runtime: sub.runtime,
        questionTitle: sub.title,
        isNotesPresent: false,
        notes: ""
        }
        request.push(data)
    }
    try{
        let response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(request),
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if(!response.ok) throw new Error("unable to send the stats")

    }
    catch(err){
        console.log(err)
        console.log("unable to insert the stats")
    }

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
