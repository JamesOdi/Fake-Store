export default function addExtraReducers({
  builder,
  thunk,
  initialState,
  responseKey,
  useComponentLoading = false,
  // Add a function that allows to format the fulfilled response if needed
  formatFulfilledResponse = (response, _state) => response,
}) {
  builder
    .addCase(thunk.pending, (state) => {
      if (useComponentLoading) {
        state.isComponentLoading = true;
      } else {
        state.isLoading = true;
      }
      state.error = null;
    })
    .addCase(thunk.fulfilled, (state, action) => {
      // If the formatFulfilledResponse function is provided, use it to format the response
      state[responseKey] = formatFulfilledResponse(action.payload, state);
      state.error = null;
      if (useComponentLoading) {
        state.isComponentLoading = false;
      } else {
        state.isLoading = false;
      }
    })
    .addCase(thunk.rejected, (state, action) => {
      if (useComponentLoading) {
        state.isComponentLoading = false;
      } else {
        state.isLoading = false;
      }
      state.error = action.payload;
      state[responseKey] = initialState[responseKey];
    });
}
