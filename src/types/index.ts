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
