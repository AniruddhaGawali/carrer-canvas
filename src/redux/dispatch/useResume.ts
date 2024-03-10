"use client";

import {
  setResume,
  selectTemplete,
  setPersonalInfo,
  updateResumeTitle,
  setSocialLink,
  setResumeToDB,
  saveResumeById,
  setResumeToDefault,
} from "@/redux/features/resumeSlice";

import { AppDispatch, RootState } from "@/redux/store";
import { Session } from "next-auth";
import { useDispatch, useSelector } from "react-redux";

const useResume = () => {
  const resumeState = useSelector((state: RootState) => state.resume);
  const dispatch = useDispatch<AppDispatch>();

  const pushResume = (resume: Resume, session: Session | null) => {
    dispatch(setResumeToDB({ resume, session }));
  };

  const setResumeStateById = (id: string, session: Session | null) => {
    dispatch(saveResumeById({ id, session }));
  };

  const setResumeState = (resume: Resume) => dispatch(setResume(resume));
  const setResumeToDefaultState = () => dispatch(setResumeToDefault());

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
    setResumeToDefaultState,
    setResumeTemplate,
    setResumePersonalInfo,
    setResumeTitle,
    setResumeSocialLink,
    pushResume,
    setResumeStateById,
  };
};

export default useResume;
