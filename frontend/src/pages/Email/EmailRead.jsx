import useLanguage from '@/locale/useLanguage';
import ReadEmailModule from '@/modules/EmailModule/ReadEmailModule';

export default function EmailRead() {
  const entity = 'email';
  const translate = useLanguage();

  const Labels = {
    PANEL_TITLE: translate('email_template'),
    DATATABLE_TITLE: translate('email_template_list'),
    ADD_NEW_ENTITY: translate('add_new_email_template'),
    ENTITY_NAME: translate('email_template'),
  };

  const configPage = {
    entity,
    create: true,
    ...Labels,
  };
  return <ReadEmailModule config={configPage} />;
}
