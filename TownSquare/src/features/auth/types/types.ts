export type AuthActionState = {
  ok: boolean;
  error?: string;
  message?: string;
  fieldErrors?: Record<string, string>;
};