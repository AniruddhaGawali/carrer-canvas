import { uploadResume, getResumeById } from "@/actions";
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
    const { res } = await uploadResume(resume, session);
    return res as Resume;
  },
);
export const saveResumeById = createAsyncThunk(
  "resume/saveResumeByIds",
  async ({ id, session }: { id: string; session: Session | null }) => {
    if (session) {
      throw new Error("User not found");
    }
    const { resume } = await getResumeById(id);
    return resume as Resume;
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
      return { ...action.payload, uploadStatus: "success" };
    });

    builder.addCase(saveResume.pending, (state) => {
      state.uploadStatus = "loading";
    });

    builder.addCase(saveResume.rejected, (state) => {
      state.uploadStatus = "failed";
    });

    builder.addCase(saveResumeById.fulfilled, (state, action) => {
      return { ...action.payload, uploadStatus: "success" };
    });

    builder.addCase(saveResumeById.pending, (state) => {
      state.uploadStatus = "loading";
    });

    builder.addCase(saveResumeById.rejected, (state) => {
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
