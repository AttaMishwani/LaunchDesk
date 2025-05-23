import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchJobById } from "../api/fetchJobById";
import { useParams } from "react-router-dom";

const ScreeningQuestions = () => {
  const { id } = useParams();
  const {
    data: job,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["job", id],
    queryFn: () => fetchJobById(id),
    enabled: !!id,
  });
  const questions = job?.questions || [];
  console.log("Job data:", job);
  console.log("Questions:", questions);

  return <div>Screening Questions Page</div>;
};

export default ScreeningQuestions;
