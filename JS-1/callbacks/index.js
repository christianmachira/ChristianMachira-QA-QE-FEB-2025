//simulating netflix login
function loginUser (email, password, callBackFn){
    setTimeout(()=>{
        console.log("We have logged in to Netflix");
        callBackFn({userEmail:email});
    },3000)
}
//;access recently watched videos
function getRecentlyWatchedVideos({userEmail},callBackFn){
    setTimeout(()=>{
        console.log("Recently watched videos");
        callBackFn({userEmail,videos:["Star Wars","The Mando","The Lord of The Rings"]})
    },3000)
}

//getting the details of one video
function getDetailsOfOneVideo(videos, callBackFn){
    setTimeout(()=>{
        console.log("Getting details of one video");
        callBackFn({video:videos.videos[1]})
    },3000)
}

loginUser("chris@gmail.com","1234",(user)=>{
    console.log(user);

    getRecentlyWatchedVideos(user, (videos)=>{
        console.log(videos);

        getDetailsOfOneVideo(videos, (videoDetails)=>{
            console.log("The info of:",videoDetails.video);
        });
    });
});