import { uploadResume } from "@/actions";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Session } from "next-auth";

const initalResumeState: Resume & {
  uploadStatus: "idle" | "loading" | "success" | "failed";
} = {
  id: "",
  title: "Untitled",
  userId: "",
  template: null,
  personalInfo: null,
  social: null,
  uploadStatus: "idle",
};

export const saveResume = createAsyncThunk(
  "resume/saveResume",
  async ({ resume, session }: { resume: Resume; session: Session | null }) => {
    console.log("resume", resume);
    const { res } = await uploadResume(resume, session);
    console.log("res", res);
    return res as Resume;
  },
);

const resumeSlice = createSlice({
  name: "resume",
  initialState: initalResumeState,
  reducers: {
    setResume(state, action: PayloadAction<Resume>) {
      return { ...action.payload, uploadStatus: "idle" };
    },

    setResumeToDefault(state) {
      return initalResumeState;
    },

    selectTemplete(state, action: PayloadAction<ResumeTemplate | null>) {
      if (!action.payload) {
        state.template = null;
      } else {
        state.template = action.payload.id;
      }
    },

    updateResumeTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
      console.log("state", state, action);
    },

    setPersonalInfo(state, action: PayloadAction<PersonalInfo>) {
      state.personalInfo = action.payload;
    },
    setSocialLink(state, action: PayloadAction<Social>) {
      state.social = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveResume.fulfilled, (state, action) => {
      console.log("action", action);
      return { ...action.payload, uploadStatus: "success" };
    });

    builder.addCase(saveResume.pending, (state) => {
      state.uploadStatus = "loading";
    });

    builder.addCase(saveResume.rejected, (state) => {
      state.uploadStatus = "failed";
    });
  },
});

export default resumeSlice.reducer;
export const {
  setResume,
  setResumeToDefault,
  selectTemplete,
  setPersonalInfo,
  setSocialLink,
  updateResumeTitle,
} = resumeSlice.actions;
