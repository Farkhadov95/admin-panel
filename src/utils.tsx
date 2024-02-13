export const errorWithTimer = (
  data: string,
  showError: (data: string) => void
) => {
  showError(data);
  setTimeout(() => {
    showError("");
  }, 3000);
};
