import { IParseMailTemplateDTO } from '../../MailTemplateProvider/dtos/IParseMailTemplateDTO';

interface IMailContact {
  name: string;
  email: string;
}

interface ISendMailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplateDTO;
}

export { ISendMailDTO };
