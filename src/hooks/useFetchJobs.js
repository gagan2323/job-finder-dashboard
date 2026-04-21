import { useState } from "react";

export default function useFetchJobs(){
    const [jobs,setJobs]=useState([]);
    const [status,setStatus]=useState("");

    const fetchJobs=async(query)=>{
        if(!query){
            setStatus("Please enter a job role");
            return ;
        }

        setStatus("Loading jobs...");
        setJobs([]);

        try{
            const res=await fetch(
                `https://remotive.com/api/remote-jobs?search=${query}`
                );
            const data =await res.json();

            if(data.jobs.length===0){
                setStatus("No jobs found");
                return ;
            }

            setJobs(data.jobs); 
            setStatus("");
        }
        catch (err) { 
        setStatus("Error loading jobs"); 
        }
    };
    return { jobs, status, fetchJobs };
}