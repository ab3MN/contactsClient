export type ContactType = {
  _id: string;
  email: string;
  name: string;
  favorite: boolean;
  smallAvatarURL: string;
  largeAvatarURL: string;
  phone: string;
};

export interface IContactToEditForm {
  email: string;
  name: string;
  phone: string;
}
