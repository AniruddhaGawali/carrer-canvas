import { AppDispatch, RootState } from "@/redux/store";
import { Session } from "next-auth";
import { useDispatch, useSelector } from "react-redux";
import {
  addResumeToList,
  getResumesList,
  removeResumeById,
} from "../features/resumeListSlice";

const useResumeList = () => {
  const resumeListState = useSelector((state: RootState) => state.resumeList);
  const dispatch = useDispatch<AppDispatch>();

  const fetchResumesList = (session: Session | null) => {
    dispatch(getResumesList(session));
  };

  const addResume = (resume: Resume) => {
    dispatch(addResumeToList(resume));
  };

  const deleteResume = (id: string) => {
    dispatch(removeResumeById(id));
  };
  return { resumeListState, fetchResumesList, addResume, deleteResume };
};

export default useResumeList;
