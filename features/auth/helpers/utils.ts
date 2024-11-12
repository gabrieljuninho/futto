import { PLACEHOLDER_IMAGE_URL } from "@/common/constant";

export const generateImage = (username: string): string => {
  return `${PLACEHOLDER_IMAGE_URL}?username=${username}`;
};

export const generateUsername = (email: string): string => {
  const name = email.split("@")[0].replace(/\d+$/, "");
  const randomNumber = Math.floor(Math.random() * 900) + 100;

  return `${name}${randomNumber}`;
};
