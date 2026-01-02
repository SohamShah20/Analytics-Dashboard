import { apiFetch } from "./client";

export const fetchPosts = () => apiFetch("/blog");

export const createPost = (title, content) =>
  apiFetch("/blog", {
    method: "POST",
    body: JSON.stringify({ title, content }),
  });
