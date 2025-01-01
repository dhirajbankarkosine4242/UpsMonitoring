
// export interface InputConfiguration {
//   key: string;
//   label: string;
//   value?: any[];
//   controlType: InputType;
//   controlType: InputType | 'document' | 'image' | 'date';
//   options?: any[],
//   validators?: any[];
//   defaultValue?: any;
//   multiLang?: boolean;
//   url?: string;
//   controlType: InputType;
//   order: number;
//   fileSettings?: {
//   acceptedFileTypes?: string[];
//   maxFileSize?: number; // in bytes
//   preview?: boolean; // for images
// };
// }

// export enum InputType {
//   PASSWORD, RADIO, TEXT, TOGGLE, DROP_DOWN, ADVANCE_DROPDOWN, SELECT, TEXT_AREA, HIDDEN, CHECK_BOX, IMAGE, NUMBER, DATE, FILE, PDF, YOUTUBE
// }

export class Global {
  static key_token = 'token';
  static key_refresh_token = 'refreshToken';
  // static key_role = 'role';
}

// export function PasswordValidator(control: AbstractControl): ValidationErrors | null {
//   const value: string = control.value || '';
//   const hasUppercase = /[A-Z]/.test(value);
//   const hasLowercase = /[a-z]/.test(value);
//   const hasNumber = /\d/.test(value);
//   const valid = hasUppercase && hasLowercase && hasNumber;
//   return valid ? null : { invalidPassword: true };
// }

