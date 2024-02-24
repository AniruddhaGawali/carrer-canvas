import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initalResumeState: Resume = {
  id: "",
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

    SelectTemplete(state, action: PayloadAction<ResumeTemplate | null>) {
      if (!action.payload) {
        state.template = null;
      } else {
        state.template = action.payload.id;
      }
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
export const { setResume, SelectTemplete, setPersonalInfo, setSocialLink } =
  resumeSlice.actions;
