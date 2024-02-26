"use client";

import {
  setResume,
  selectTemplete,
  setPersonalInfo,
  updateResumeTitle,
  setSocialLink,
} from "@/redux/features/resumeSlice";

import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

const useResume = () => {
  const resumeState = useSelector((state: RootState) => state.resume);
  const dispatch = useDispatch();

  const setResumeState = (resume: Resume) => dispatch(setResume(resume));

  const setResumeTemplate = (template: ResumeTemplate | null) =>
    dispatch(selectTemplete(template));

  const setResumeTitle = (name: string) => dispatch(updateResumeTitle(name));

  const setResumePersonalInfo = (personalInfo: PersonalInfo) =>
    dispatch(setPersonalInfo(personalInfo));

  const setResumeSocialLink = (social: Social) =>
    dispatch(setSocialLink(social));

  return {
    resumeState,
    setResumeState,
    setResumeTemplate,
    setResumePersonalInfo,
    setResumeTitle,
    setResumeSocialLink,
  };
};

export default useResume;
