function data(data1,nextData){
    setTimeout(()=>{
        console.log("data:",data1);
        if(nextData){
            nextData();
        }
    },2000);
}

data(1,()=>{
    data(2);
})