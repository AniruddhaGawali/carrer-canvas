import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initalResumeState: Resume = {
  id: '',
  userId: '',
  template: null,
  personalInfo: null,
  social: null,
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState: initalResumeState,
  reducers: {},
});

export default resumeSlice.reducer;
export const {} = resumeSlice.actions;
