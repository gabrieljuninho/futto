import DOMPurify from "isomorphic-dompurify";

type SanitizeProps = {
  username?: string;
  email: string;
  password: string;
};

export const sanitize = (data: SanitizeProps): SanitizeProps => {
  const sanitizedUsername = DOMPurify.sanitize(data.username as string);
  const sanitizedEmail = DOMPurify.sanitize(data.email);
  const sanitizedPassword = DOMPurify.sanitize(data.password);

  return {
    username: sanitizedUsername,
    email: sanitizedEmail,
    password: sanitizedPassword,
  };
};
