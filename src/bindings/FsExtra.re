[@bs.module "fs-extra"]
external removeSync : string => unit = "";

[@bs.module "fs-extra"]
external copySync : (~src: string, ~dest:string) => unit = "";