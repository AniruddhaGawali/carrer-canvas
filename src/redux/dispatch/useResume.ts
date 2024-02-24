"use client";

import {
  setResume,
  SelectTemplete,
  setPersonalInfo,
} from "@/redux/features/resumeSlice";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

const useResume = () => {
  const resumeState = useSelector((state: RootState) => state.resume);
  const dispatch = useDispatch();

  const setResumeState = (resume: Resume) => dispatch(setResume(resume));
  const setResumeTemplate = (template: ResumeTemplate | null) =>
    dispatch(SelectTemplete(template));

  const setResumePersonalInfo = (personalInfo: PersonalInfo) =>
    dispatch(setPersonalInfo(personalInfo));

  return {
    resumeState,
    setResumeState,
    setResumeTemplate,
    setResumePersonalInfo,
  };
};

export default useResume;
