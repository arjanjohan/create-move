export type Args = string[];
export type MoveTemplate = string;
export type ExternalExtensionNameDev = string;

export type ExternalExtension = {
  repository: string;
  branch?: string | null;
};

type BaseOptions = {
  project: string | null;
  install: boolean;
  dev: boolean;
};

export type RawOptions = BaseOptions & {
  help: boolean;
};

export type Options = {
  [Prop in keyof BaseOptions]: NonNullable<BaseOptions[Prop]>;
};

export type TemplateDescriptor = {
  path: string;
  fileUrl: string;
  relativePath: string;
  source: string;
};

export type MoveTemplateChoices = (MoveTemplate | { value: any; name: string })[];
