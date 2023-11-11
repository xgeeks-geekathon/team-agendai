import { mapCharacterData } from '@modules/Characters/client/characterClient.formatter';

export const mapBoardData = (data: Boards.BoardApi): Boards.Board => ({
  ...data.attributes,
  id: data.id,
  createdAt: new Date(data.attributes.createdAt),
  updatedAt: new Date(data.attributes.updatedAt),
});

export const mapExtendedBoardData = (data: Boards.ExtendedBoardApi): Boards.ExtendedBoard => {
  const { chapters, characters, ...attributes } = data.attributes;
  return {
    ...attributes,
    id: data.id,
    chapters: chapters.data.map(mapChapterData),
    characters: characters.data.map(mapCharacterData),
    createdAt: new Date(data.attributes.createdAt),
    updatedAt: new Date(data.attributes.updatedAt),
  };
};

export const mapChapterData = (data: Boards.Chapters.ChapterApi): Boards.Chapters.Chapter => ({
  ...data.attributes,
  id: data.id,
  createdAt: new Date(data.attributes.createdAt),
  updatedAt: new Date(data.attributes.updatedAt),
});

export const mapChapterSectionData = (data: Boards.ChapterSections.ChapterSectionApi): Boards.ChapterSections.ChapterSection => ({
  ...data.attributes,
  id: data.id,
  createdAt: new Date(data.attributes.createdAt),
  updatedAt: new Date(data.attributes.updatedAt),
});
