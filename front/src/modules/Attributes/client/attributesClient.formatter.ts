export const mapAttributeData = (data: Attributes.AttributeApi): Attributes.Attribute => ({
  ...data.attributes,
  id: data.id,
  createdAt: new Date(data.attributes.createdAt),
  updatedAt: new Date(data.attributes.updatedAt),
});
