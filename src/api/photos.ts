import { Photo } from "@/types";
import api from "@/api/client";

export const apiGetPhotos = () => {
  return api<Photo[]>({
    url: "/photos",
    method: "get",
    params: {
      _page: 1,
      _limit: 5,
      _expand: "album",
    },
  });
};
