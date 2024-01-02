import api from "./client";

export type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  album: Album;
};

export type Album = {
  userId: number;
  id: number;
  title: string;
};

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
