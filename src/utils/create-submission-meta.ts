export const createSubmissionMeta = () => ({
  id: crypto.randomUUID(),
  createdAt: Date.now(),
});