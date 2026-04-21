import JobCard from "./JobCard";

export default function JobList({ jobs }) {
  if (jobs.length === 0) return <p>No jobs found</p>;

  return jobs.map(job => <JobCard key={job.id} job={job} />);
}