import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Session } from "next-auth";
import { getResumes } from "@/actions";

const initalResumeListState: {
  resumes: Resume[];
  status: "empty" | "idle" | "loading" | "success" | "failed";
} = {
  resumes: [],
  status: "empty",
};

export const getResumesList = createAsyncThunk(
  "resumeList/getResumesList",
  async (session: Session | null) => {
    const resumes = await getResumes(session);
    if (!resumes) throw new Error("User not found");

    return resumes as Resume[];
  },
);

const resumeListSlice = createSlice({
  name: "resumeList",
  initialState: initalResumeListState,
  reducers: {
    removeResumeById: (state, action: PayloadAction<string>) => {
      state.resumes = state.resumes.filter(
        (resume) => resume.id !== action.payload,
      );
    },

    addResumeToList: (state, action: PayloadAction<Resume>) => {
      state.resumes.push(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getResumesList.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      getResumesList.fulfilled,
      (state, action: PayloadAction<Resume[]>) => {
        state.status = "success";
        state.resumes = action.payload;
      },
    );
    builder.addCase(getResumesList.rejected, (state) => {
      state.status = "failed";
      if (state.resumes.length === 0) {
        state.status = "empty";
      }
    });
  },
});

export default resumeListSlice.reducer;

export const { addResumeToList, removeResumeById } = resumeListSlice.actions;
