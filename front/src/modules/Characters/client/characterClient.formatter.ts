export const mapCharacterData = (data: Characters.CharacterApi): Characters.Character => ({
  ...data.attributes,
  id: data.id,
  birthday: data.attributes.birthday && new Date(data.attributes.birthday),
  createdAt: new Date(data.attributes.createdAt),
  updatedAt: new Date(data.attributes.updatedAt),
});
