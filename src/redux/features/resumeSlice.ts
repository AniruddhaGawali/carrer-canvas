import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initalResumeState: Resume = {
  id: "",
  title: "Untitled",
  userId: "",
  template: null,
  personalInfo: null,
  social: null,
};

const resumeSlice = createSlice({
  name: "resume",
  initialState: initalResumeState,
  reducers: {
    setResume(state, action: PayloadAction<Resume>) {
      return action.payload;
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
});

export default resumeSlice.reducer;
export const {
  setResume,
  selectTemplete,
  setPersonalInfo,
  setSocialLink,
  updateResumeTitle,
} = resumeSlice.actions;
