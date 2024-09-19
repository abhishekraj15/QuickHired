import { getMyJobs } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { BarLoader } from "react-spinners";
import JobCard from "./job-card";

const CreatedJobs = () => {
  const { user, isLoaded } = useUser();
  const {
    loading: loadingCreatedJobs,
    data: createdJobs,
    fn: fnCreatedjobs,
  } = useFetch(getMyJobs, {
    recruiter_id: user.id,
  });

  useEffect(() => {
    fnCreatedjobs();
  }, []);

  if (!isLoaded || loadingCreatedJobs) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }
  return (
    <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {createdJobs?.length ? (
        createdJobs?.map((job) => {
          return (
            <JobCard
              key={job.id}
              job={job}
              onJobSaved={fnCreatedjobs}
              isMyJob
            />
          );
        })
      ) : (
        <div>No Jobs Found 🙂</div>
      )}
    </div>
  );
};

export default CreatedJobs;
