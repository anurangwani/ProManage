import { Button, Result } from 'antd';

import useLanguage from '@/locale/useLanguage';

const About = () => {
  const translate = useLanguage();
  return (
    <Result
      status="info"
      
      title={'ProManage'}
     
      extra={
        <>
          
          <p>
            GitHub :{' '}
            <a href="https://github.com/anurangwani">
            https://github.com/anurangwani
            </a>
          </p>
          <br></br>
          <Button
            type="primary"
            onClick={() => {
              window.open(`https://webfortuners.com/contact-us/`);
            }}
          >
            {translate('Contact us')}
          </Button>
        </>
      }
    />
  );
};

export default About;
