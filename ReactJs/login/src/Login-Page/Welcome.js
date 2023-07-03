import  Api from "../Api";
import { useEffect } from "react";


export default function Welcome() {
    const fetchWelcome = async()=>{
        const response= await Api.post("/welcome").catch((err)=>{
            console.log(err);
        });
        console.log(response);
    };
    useEffect(()=>{
        fetchWelcome();
    });
    // console.log(Api);
    //    Api.defaults.headers.common["x-access-token"]=
    //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODYyMDI3NjMsImV4cCI6MTY4NjIwMjgyM30.PSZwpCA1QXb5XGx877h4S4Q72j9djIt-6--Pb2Ab9vU";
   
    // Api.post("/welcome").catch(err=>(console.log(err)));
    

return (
<>
<h1>Welcome Page</h1>
</>
);
}
