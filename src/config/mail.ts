interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'hilquiasfmelo@hotmail.com',
      name: 'Hilquias Ferreira Melo',
    },
  },
} as IMailConfig;
